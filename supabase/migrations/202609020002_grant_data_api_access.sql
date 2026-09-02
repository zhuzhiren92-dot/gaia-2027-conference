-- This migration is required when "Automatically expose new tables" is disabled.
-- RLS policies remain the final authority for row access.
grant select, insert, update on table public.profiles to authenticated;
grant select on table public.admins to authenticated;
grant select, insert, update on table public.submissions to authenticated;