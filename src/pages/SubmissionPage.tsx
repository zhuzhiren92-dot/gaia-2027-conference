import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'
import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'
import { countries } from '../data/countries'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Submission, SubmissionStatus } from '../types/backend'

type SubmissionForm = {
  presentationType: 'poster' | 'oral' | ''
  topic: string
  paperTitle: string
  authorsName: string
  institutionName: string
  countryRegion: string
  contactEmail: string
}

const emptyForm: SubmissionForm = {
  presentationType: '',
  topic: '',
  paperTitle: '',
  authorsName: '',
  institutionName: '',
  countryRegion: '',
  contactEmail: '',
}

const maxFileSize = 20 * 1024 * 1024
const allowedExtensions = ['doc', 'docx', 'pdf']

export function SubmissionPage() {
  const { user, loading: authLoading } = useAuth()
  const [form, setForm] = useState<SubmissionForm>(emptyForm)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [existingFilePath, setExistingFilePath] = useState<string | null>(null)
  const [existingFileName, setExistingFileName] = useState<string | null>(null)
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null)
  const [showTopicError, setShowTopicError] = useState(false)
  const [loadingSubmission, setLoadingSubmission] = useState(false)
  const [savingAs, setSavingAs] = useState<SubmissionStatus | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const client = supabase
    if (!client || !user) return


    let active = true
    const loadSubmission = async () => {
      setLoadingSubmission(true)
      setMessage('')
      const [submissionResult, profileResult] = await Promise.all([
        client.from('submissions').select('*').eq('user_id', user.id).maybeSingle(),
        client.from('profiles').select('contact_email, institution, country_region').eq('user_id', user.id).maybeSingle(),
      ])
      if (!active) return

      if (submissionResult.error) {
        setMessage(submissionResult.error.message)
      }

      const submission = submissionResult.data as Submission | null
      const profile = profileResult.data as { contact_email?: string; institution?: string; country_region?: string } | null
      if (submission) {
        setForm({
          presentationType: submission.presentation_type,
          topic: submission.topic,
          paperTitle: submission.paper_title,
          authorsName: submission.authors_name,
          institutionName: submission.institution_name,
          countryRegion: submission.country_region,
          contactEmail: submission.contact_email,
        })
        setExistingFilePath(submission.file_path)
        setExistingFileName(submission.file_name)
        setSubmissionStatus(submission.status)
      } else {
        setForm({
          ...emptyForm,
          institutionName: profile?.institution ?? '',
          countryRegion: profile?.country_region ?? '',
          contactEmail: profile?.contact_email || user.email || '',
        })
      }
      setLoadingSubmission(false)
    }

    loadSubmission()
    return () => { active = false }
  }, [user])

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (name === 'topic') setShowTopicError(!value)
  }

  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setMessage('')
    if (!file) {
      setSelectedFile(null)
      return
    }

    const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
    if (!allowedExtensions.includes(extension)) {
      event.target.value = ''
      setMessage('Please upload a Word or PDF file.')
      return
    }
    if (file.size > maxFileSize) {
      event.target.value = ''
      setMessage('The file must be 20 MB or smaller.')
      return
    }
    setSelectedFile(file)
  }

  const saveSubmission = async (status: SubmissionStatus) => {
    if (!supabase || !user) return

    if (status === 'submitted') {
      setShowTopicError(!form.topic)
      const requiredFields = [
        form.presentationType,
        form.topic,
        form.paperTitle,
        form.authorsName,
        form.institutionName,
        form.countryRegion,
        form.contactEmail,
      ]
      if (requiredFields.some((value) => !value.trim()) || (!selectedFile && !existingFilePath)) {
        setMessage('Please complete all fields and upload a Word or PDF file before submitting.')
        return
      }
    }

    setSavingAs(status)
    setMessage('')
    let uploadedPath = existingFilePath
    let uploadedName = existingFileName
    let newUploadPath: string | null = null

    try {
      if (selectedFile) {
        const safeName = selectedFile.name.replace(/[^a-zA-Z0-9._-]+/g, '-')
        newUploadPath = `${user.id}/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage
          .from('submission-files')
          .upload(newUploadPath, selectedFile, { upsert: false })
        if (uploadError) throw uploadError
        uploadedPath = newUploadPath
        uploadedName = selectedFile.name
      }

      const timestamp = new Date().toISOString()
      const { data, error } = await supabase
        .from('submissions')
        .upsert({
          user_id: user.id,
          presentation_type: form.presentationType,
          topic: form.topic,
          paper_title: form.paperTitle,
          authors_name: form.authorsName,
          institution_name: form.institutionName,
          country_region: form.countryRegion,
          contact_email: form.contactEmail,
          file_path: uploadedPath,
          file_name: uploadedName,
          status,
          updated_at: timestamp,
          submitted_at: status === 'submitted' ? timestamp : null,
        }, { onConflict: 'user_id' })
        .select('*')
        .single()
      if (error) throw error

      if (newUploadPath && existingFilePath && existingFilePath !== newUploadPath) {
        await supabase.storage.from('submission-files').remove([existingFilePath])
      }

      const saved = data as Submission
      setExistingFilePath(saved.file_path)
      setExistingFileName(saved.file_name)
      setSubmissionStatus(saved.status)
      setSelectedFile(null)
      setMessage(status === 'submitted' ? 'Submission completed successfully. You can return here to make changes.' : 'Draft saved. You can continue editing after your next sign in.')
    } catch (error) {
      if (newUploadPath) await supabase.storage.from('submission-files').remove([newUploadPath])
      setMessage(error instanceof Error ? error.message : 'The submission could not be saved.')
    } finally {
      setSavingAs(null)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveSubmission('submitted')
  }

  return (
    <PageFrame pageName="SUBMISSION" pageStatement="Submit your poster or oral presentation abstract for GAIA 2027.">
      <section className="submission-intro page-width" data-reveal>
        <div className="section-heading-row"><div><h2>Submission</h2></div></div>
        <div className="about-prose">
          <p>This page is prepared for poster and oral presentation submissions. At the current stage, participants are invited to submit an abstract for their poster or presentation.</p>
          <div className="submission-template">
            <a className="pill-action-link" href={`${import.meta.env.BASE_URL}GAIA_2027_Template.docx`} download="GAIA_2027_Template.docx">
              <span className="pill-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg></span>
              <strong>Template</strong>
            </a>
            <p>Download the abstract or full paper template.</p>
          </div>
        </div>
      </section>

      {!isSupabaseConfigured ? (
        <section className="submission-form-section page-width" data-reveal><div className="utility-notice"><strong>Online submission setup is in progress.</strong><p>The submission form will open after the conference account service is connected.</p></div></section>
      ) : authLoading || loadingSubmission ? (
        <div className="utility-loading page-width">Loading your submission...</div>
      ) : !user ? (
        <section className="submission-form-section page-width" data-reveal>
          <div className="auth-gate"><p className="section-kicker">ACCOUNT REQUIRED</p><h2>Sign in before submitting.</h2><p>Your draft and uploaded file will be linked securely to your participant account.</p><Link className="pill-action-link" to="/login" state={{ from: '/submission' }}><span className="pill-link-icon" aria-hidden="true">→</span><strong>Sign in or register</strong></Link></div>
        </section>
      ) : (
        <section className="submission-form-section page-width" data-reveal>
          <form className="submission-form" onSubmit={handleSubmit}>
            {submissionStatus ? <p className={`submission-status is-${submissionStatus}`}>Current status: {submissionStatus}</p> : null}
            <div className="submission-fieldset">
              <p className="section-kicker">PRESENTATION TYPE</p>
              <div className="submission-choice-row">
                <label><input type="radio" name="presentationType" value="poster" checked={form.presentationType === 'poster'} onChange={updateField} /> Poster</label>
                <label><input type="radio" name="presentationType" value="oral" checked={form.presentationType === 'oral'} onChange={updateField} /> Oral presentation</label>
              </div>
            </div>

            <label className="submission-field"><span>Conference Topic</span><select name="topic" value={form.topic} onChange={updateField} onBlur={() => setShowTopicError(!form.topic)}><option value="">Select one topic</option>{conference.submissionTopics.map((item) => <option value={item} key={item}>{item}</option>)}</select>{showTopicError ? <small className="submission-error">Please select one topic</small> : null}</label>
            <label className="submission-field"><span>Paper Title</span><input type="text" name="paperTitle" value={form.paperTitle} onChange={updateField} placeholder="Enter the poster or presentation title" /></label>
            <label className="submission-field"><span>Authors Name</span><input type="text" name="authorsName" value={form.authorsName} onChange={updateField} placeholder="Enter author names" /></label>
            <label className="submission-field"><span>Institution Name</span><input type="text" name="institutionName" value={form.institutionName} onChange={updateField} placeholder="Enter institution information" /></label>
            <label className="submission-field"><span>Country/Region</span><select name="countryRegion" value={form.countryRegion} onChange={updateField}><option value="">Select country or region</option>{countries.map((country) => <option value={country} key={country}>{country}</option>)}</select></label>
            <label className="submission-field"><span>Contact Email</span><input type="email" name="contactEmail" value={form.contactEmail} onChange={updateField} placeholder="name@example.com" /></label>
            <label className="submission-field submission-file"><span>Upload File</span><input type="file" name="submissionFile" onChange={chooseFile} accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf" /><small>Accepted formats: Word or PDF. Maximum file size: 20 MB.{existingFileName ? ` Current file: ${existingFileName}` : ''}</small></label>

            {message ? <p className="form-message" role="status">{message}</p> : null}
            <div className="submission-actions">
              <button type="button" className="pill-action-link submission-button" onClick={() => saveSubmission('draft')} disabled={Boolean(savingAs)}><span className="pill-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12h12M12 6v12" /></svg></span><strong>{savingAs === 'draft' ? 'Saving...' : 'Save and exit'}</strong></button>
              <button type="submit" className="pill-action-link submission-button" disabled={Boolean(savingAs)}><span className="pill-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg></span><strong>{savingAs === 'submitted' ? 'Submitting...' : submissionStatus === 'submitted' ? 'Update submission' : 'Submit'}</strong></button>
            </div>
          </form>
        </section>
      )}
    </PageFrame>
  )
}