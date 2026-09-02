create extension if not exists pgcrypto;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  title text not null default '',
  first_name text not null default '',
  last_name text not null default '',
  gender text not null default '',
  institution text not null default '',
  department text not null default '',
  country_region text not null default '',
  contact_email text not null check (length(trim(contact_email)) > 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(user_id) on delete cascade,
  presentation_type text not null default '' check (presentation_type in ('', 'poster', 'oral')),
  topic text not null default '',
  paper_title text not null default '',
  authors_name text not null default '',
  institution_name text not null default '',
  country_region text not null default '',
  contact_email text not null default '',
  file_path text,
  file_name text,
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  constraint submitted_record_is_complete check (
    status = 'draft' or (
      presentation_type in ('poster', 'oral')
      and length(trim(topic)) > 0
      and length(trim(paper_title)) > 0
      and length(trim(authors_name)) > 0
      and length(trim(institution_name)) > 0
      and length(trim(country_region)) > 0
      and length(trim(contact_email)) > 3
      and file_path is not null
      and file_name is not null
      and submitted_at is not null
    )
  )
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger submissions_set_updated_at
before update on public.submissions
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, contact_email, first_name, last_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', '')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.submissions enable row level security;
-- Data API privileges; row-level security policies below still determine which rows are accessible.
grant select, insert, update on table public.profiles to authenticated;
grant select on table public.admins to authenticated;
grant select, insert, update on table public.submissions to authenticated;

create policy "profiles_select_own_or_admin"
on public.profiles for select to authenticated
using (auth.uid() = user_id or public.is_admin());

create policy "profiles_insert_own"
on public.profiles for insert to authenticated
with check (auth.uid() = user_id);

create policy "profiles_update_own"
on public.profiles for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "admins_select_own"
on public.admins for select to authenticated
using (auth.uid() = user_id);

create policy "submissions_select_own_or_admin"
on public.submissions for select to authenticated
using (auth.uid() = user_id or public.is_admin());

create policy "submissions_insert_own"
on public.submissions for insert to authenticated
with check (auth.uid() = user_id);

create policy "submissions_update_own"
on public.submissions for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'submission-files',
  'submission-files',
  false,
  20971520,
  array[
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "submission_files_select_own_or_admin"
on storage.objects for select to authenticated
using (
  bucket_id = 'submission-files'
  and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
);

create policy "submission_files_insert_own"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'submission-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "submission_files_update_own"
on storage.objects for update to authenticated
using (
  bucket_id = 'submission-files'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'submission-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "submission_files_delete_own"
on storage.objects for delete to authenticated
using (
  bucket_id = 'submission-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);