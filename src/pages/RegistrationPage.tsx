import { Link } from 'react-router-dom'
import { PageFrame } from '../components/PageFrame'
import { TimelinePanel } from '../components/TimelinePanel'
import { conference } from '../content/conference'

export function RegistrationPage() {
  const { registration } = conference

  return (
    <PageFrame
      pageName="REGISTRATION"
      pageStatement="Everything you will need to join GAIA 2027, in one clear place."
    >
      <section className="registration-open page-width" data-reveal>
        <div className="section-heading-row">
          <div>
            <h2>Registration is open now</h2>
          </div>
        </div>
        <div className="registration-open-grid">
          <div className="registration-open-copy">
            <p>{registration.message}</p>
            <ul className="registration-input-list">
              {registration.steps.map((step) => (
                <li key={step}>
                  <p>{step}</p>
                </li>
              ))}
            </ul>
            <p className="registration-note">{registration.note}</p>
          </div>
          <div className="registration-actions" aria-label="Registration links">
            {registration.actions.map((action) => (
              <Link className="pill-action-link" key={action.label} to={action.href}>
                <span className="pill-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
                <strong>{action.label}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TimelinePanel
        title="Registration timeline"
        items={registration.timeline}
        className="registration-timeline"
      />

      <section className="fees-section page-width">
        <div className="section-heading-row">
          <div>
            <h2>Registration Fees</h2>
          </div>
        </div>
        <div className="fees-table" role="table" aria-label="Registration fees">
          <div className="fee-row fee-head" role="row">
            <p role="columnheader">CATEGORY</p>
            <p role="columnheader">EARLY-BIRD FEES (before 28 February 2027)</p>
            <p role="columnheader">REGULAR FEES (after 28 February 2027)</p>
          </div>
          <div className="fee-rows">
            {registration.fees.map((fee) => (
              <div className="fee-row" role="row" key={fee.category}>
                <p role="cell">{fee.category}</p>
                <p role="cell">{fee.early}</p>
                <p role="cell">{fee.regular}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="fee-note">{registration.feeNote}</p>
      </section>
    </PageFrame>
  )
}
