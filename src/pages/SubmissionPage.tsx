import { Link } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'
import { PageFrame } from '../components/PageFrame'

export function SubmissionPage() {
  const { user, loading } = useAuth()

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

      {!loading && !user ? (
        <div className="page-width">
          <section className="submission-form-section" data-reveal>
            <div className="auth-gate">
              <p className="section-kicker">ACCOUNT REQUIRED</p>
              <h2>Sign in before submitting.</h2>
              <p>Your draft and uploaded file will be linked securely to your participant account.</p>
              <Link className="pill-action-link" to="/login" state={{ from: '/submission' }}>
                <span className="pill-link-icon" aria-hidden="true">→</span>
                <strong>Sign in or register</strong>
              </Link>
            </div>
          </section>
        </div>
      ) : null}
    </PageFrame>
  )
}
