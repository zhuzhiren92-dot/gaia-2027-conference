import { FormEvent, useState } from 'react'
import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'

const countries = [
  'China',
  'Hong Kong, China',
  'Japan',
  'Korea',
  'Singapore',
  'India',
  'Thailand',
  'Malaysia',
  'Indonesia',
  'Vietnam',
  'Other',
]

export function SubmissionPage() {
  const [topic, setTopic] = useState('')
  const [showTopicError, setShowTopicError] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!topic) {
      setShowTopicError(true)
      return
    }
    setShowTopicError(false)
  }

  return (
    <PageFrame
      pageName="SUBMISSION"
      pageStatement="Submit your poster or oral presentation abstract for GAIA 2027."
    >
      <section className="submission-intro page-width" data-reveal>
        <div className="section-heading-row">
          <div>
            <h2>Submission</h2>
          </div>
        </div>
        <div className="about-prose">
          <p>
            This page is prepared for poster and oral presentation submissions.
            At the current stage, participants are invited to submit an abstract
            for their poster or presentation.
          </p>
        </div>
      </section>

      <section className="submission-form-section page-width" data-reveal>
        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="submission-fieldset">
            <p className="section-kicker">PRESENTATION TYPE</p>
            <div className="submission-choice-row">
              <label><input type="radio" name="presentationType" value="poster" /> Poster</label>
              <label><input type="radio" name="presentationType" value="oral" /> Oral presentation</label>
            </div>
          </div>

          <label className="submission-field">
            <span>Conference Topic</span>
            <select value={topic} onChange={(event) => setTopic(event.target.value)} onBlur={() => setShowTopicError(!topic)}>
              <option value="">Select one topic</option>
              {conference.submissionTopics.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
            {showTopicError ? <small className="submission-error">Please select one topic</small> : null}
          </label>

          <label className="submission-field">
            <span>Paper Title</span>
            <input type="text" name="paperTitle" placeholder="Enter the poster or presentation title" />
          </label>

          <label className="submission-field">
            <span>Authors Name</span>
            <input type="text" name="authorsName" placeholder="Enter author names" />
          </label>

          <label className="submission-field">
            <span>Institution Name</span>
            <input type="text" name="institutionName" placeholder="Enter institution information" />
          </label>

          <label className="submission-field">
            <span>Nationality</span>
            <select name="nationality" defaultValue="">
              <option value="">Select nationality</option>
              {countries.map((country) => (
                <option value={country} key={country}>{country}</option>
              ))}
            </select>
          </label>

          <label className="submission-field">
            <span>Contact Email</span>
            <input type="email" name="contactEmail" placeholder="name@example.com" />
          </label>

          <label className="submission-field submission-file">
            <span>Upload File</span>
            <input type="file" name="submissionFile" accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf" />
            <small>Accepted formats: Word or PDF.</small>
          </label>

          <div className="submission-actions">
            <button type="button" className="pill-action-link submission-button">
              <span className="pill-link-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M6 12h12M12 6v12" /></svg>
              </span>
              <strong>Save and exit</strong>
            </button>
            <button type="submit" className="pill-action-link submission-button">
              <span className="pill-link-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </span>
              <strong>Submit</strong>
            </button>
          </div>
        </form>
      </section>

      <section className="submission-template page-width" data-reveal>
        <a className="pill-action-link" href={`${import.meta.env.BASE_URL}GAIA_2027_Template.docx`} download="GAIA_2027_Template.docx">
          <span className="pill-link-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>
          </span>
          <strong>Template</strong>
        </a>
        <p>Download the abstract or full paper Template.</p>
      </section>
    </PageFrame>
  )
}
