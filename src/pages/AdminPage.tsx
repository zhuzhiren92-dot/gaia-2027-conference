import { useEffect, useState } from 'react'
import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'
import { supabase } from '../lib/supabase'
import type { Profile, Submission } from '../types/backend'

type AdminSubmission = Submission & {
  profiles: Pick<Profile, 'title' | 'first_name' | 'last_name' | 'institution' | 'contact_email'> | null
}

export function AdminPage() {
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([])
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const client = supabase
    if (!client) return
    let active = true

    const loadSubmissions = async () => {
      const adminResult = await client.rpc('is_admin')
      if (!active) return
      if (adminResult.error || !adminResult.data) {
        setAllowed(false)
        setMessage(adminResult.error?.message ?? 'This account does not have administrator access.')
        return
      }

      setAllowed(true)
      const { data, error } = await client
        .from('submissions')
        .select('*, profiles(title, first_name, last_name, institution, contact_email)')
        .order('updated_at', { ascending: false })
      if (!active) return
      if (error) {
        setMessage(error.message)
        return
      }
      setSubmissions((data as AdminSubmission[] | null) ?? [])
    }

    loadSubmissions()
    return () => { active = false }
  }, [])

  const downloadFile = async (submission: AdminSubmission) => {
    if (!supabase || !submission.file_path) return
    const { data, error } = await supabase.storage.from('submission-files').download(submission.file_path)
    if (error) {
      setMessage(error.message)
      return
    }

    const topicIndex = conference.submissionTopics.indexOf(submission.topic)
    const topicNumber = String(topicIndex + 1).padStart(2, '0')
    const presentationType = submission.presentation_type === 'oral'
      ? 'Oral'
      : submission.presentation_type === 'poster' ? 'Poster' : 'Unspecified'
    const contactEmail = submission.contact_email || submission.profiles?.contact_email || 'unknown-email'
    const invalidFilenameCharacters = '<>:"/\\|?*'
    const safeEmail = [...contactEmail]
      .map((character) => invalidFilenameCharacters.includes(character) ? '_' : character)
      .join('')
    const extension = submission.file_name?.match(/\.[^.]+$/)?.[0] ?? ''
    const downloadName = `${topicNumber}-${presentationType}-${safeEmail}${extension}`
    const objectUrl = URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = downloadName
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0)
  }

  return (
    <PageFrame showSchoolCarousel={false} showIntroSections={false} pageName="ADMIN" pageStatement="Submission administration">
      <section className="utility-page admin-page page-width" data-reveal>
        <div className="utility-heading">
          <p className="section-kicker">ADMINISTRATION</p>
          <h1>Submission dashboard</h1>
          <p>Review participant details and download submitted abstracts.</p>
        </div>

        {allowed === null ? <p className="utility-loading">Checking administrator access...</p> : null}
        {allowed === false ? <div className="utility-notice"><strong>Access restricted</strong><p>{message}</p></div> : null}
        {allowed ? (
          <>
            {message ? <p className="form-message" role="status">{message}</p> : null}
            <div className="admin-summary"><strong>{submissions.length}</strong><span>Total drafts and submissions</span></div>
            <div className="admin-list">
              {submissions.length === 0 ? <p>No submissions have been received yet.</p> : submissions.map((submission) => {
                const person = submission.profiles
                const fullName = [person?.title, person?.first_name, person?.last_name].filter(Boolean).join(' ') || 'Profile incomplete'
                return (
                  <article key={submission.id} className="admin-submission-card">
                    <div className="admin-card-heading">
                      <div><span className={`submission-status is-${submission.status}`}>{submission.status}</span><h2>{submission.paper_title || 'Untitled submission'}</h2></div>
                      <time>{new Date(submission.updated_at).toLocaleString('en-GB')}</time>
                    </div>
                    <dl>
                      <div><dt>Participant</dt><dd>{fullName}</dd></div>
                      <div><dt>Institution</dt><dd>{person?.institution || submission.institution_name || 'Not provided'}</dd></div>
                      <div><dt>Contact</dt><dd>{submission.contact_email || person?.contact_email || 'Not provided'}</dd></div>
                      <div><dt>Type</dt><dd>{submission.presentation_type || 'Not selected'}</dd></div>
                      <div><dt>Topic</dt><dd>{submission.topic || 'Not selected'}</dd></div>
                      <div><dt>File</dt><dd>{submission.file_name || 'No file uploaded'}</dd></div>
                    </dl>
                    <button className="pill-action-link utility-secondary-button" type="button" onClick={() => downloadFile(submission)} disabled={!submission.file_path}>
                      <span className="pill-link-icon" aria-hidden="true">↓</span><strong>Download file</strong>
                    </button>
                  </article>
                )
              })}
            </div>
          </>
        ) : null}
      </section>
    </PageFrame>
  )
}