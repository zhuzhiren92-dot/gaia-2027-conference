export type Profile = {
  user_id: string
  title: string
  first_name: string
  last_name: string
  gender: string
  institution: string
  department: string
  country_region: string
  contact_email: string
  created_at?: string
  updated_at?: string
}

export type SubmissionStatus = 'draft' | 'submitted'

export type Submission = {
  id: string
  user_id: string
  presentation_type: 'poster' | 'oral' | ''
  topic: string
  paper_title: string
  authors_name: string
  institution_name: string
  country_region: string
  contact_email: string
  file_path: string | null
  file_name: string | null
  status: SubmissionStatus
  created_at: string
  updated_at: string
  submitted_at: string | null
}