import { PageFrame } from '../components/PageFrame'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { TimelinePanel } from '../components/TimelinePanel'
import { conference } from '../content/conference'

export function RegistrationPage() {
  const { registration } = conference

  return (
    <PageFrame
      pageName="REGISTRATION"
      pageStatement="Everything you will need to join GAIA 2027, in one clear place."
    >
      <BorderGlow
        as="section"
        className="registration-status page-width"
        backgroundColor="rgba(239, 245, 255, 0.88)"
        animated
        data-reveal
      >
        <div className="status-mark" aria-hidden="true">
          <span />
        </div>
        <div>
          <p className="section-kicker">CURRENT STATUS</p>
          <h2>{registration.status}</h2>
          <p>{registration.message}</p>
        </div>
        <button type="button" disabled>
          OFFICIAL LINK FORTHCOMING
        </button>
      </BorderGlow>

      <section className="registration-steps page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">REGISTRATION INPUTS</p>
            <h2>Information required for registration</h2>
          </div>
        </div>
        <DockSurface as="ol" distance={320}>
          {registration.steps.map((step, index) => (
            <BorderGlow
              as="li"
              key={step}
              backgroundColor="rgba(255, 255, 255, 0.78)"
              data-dock-item
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </BorderGlow>
          ))}
        </DockSurface>
      </section>

      <TimelinePanel
        kicker="IMPORTANT DATES"
        title="Registration timeline"
        items={registration.timeline}
        className="registration-timeline"
        showDescriptions
      />

      <section className="fees-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">REGISTRATION FEES</p>
            <h2>Participation categories</h2>
          </div>
          <p className="quiet-copy">
            Fees are shown in HKD and remain subject to final confirmation.
          </p>
        </div>
        <BorderGlow
          className="fees-table"
          role="table"
          aria-label="Registration fees"
          backgroundColor="rgba(255, 255, 255, 0.8)"
        >
          <div className="fee-row fee-head" role="row">
            <p role="columnheader">CATEGORY</p>
            <p role="columnheader">EARLY-BIRD FEES (before 22 March 2027)</p>
            <p role="columnheader">REGULAR FEES (after 22 March 2027)</p>
          </div>
          <DockSurface
            className="fee-rows"
            distance={260}
            magnification={1.016}
            lift={5}
          >
            {registration.fees.map((fee) => (
              <div
                className="fee-row"
                role="row"
                key={fee.category}
                data-dock-item
                tabIndex={0}
              >
                <p role="cell">{fee.category}</p>
                <p role="cell">{fee.early}</p>
                <p role="cell">{fee.regular}</p>
              </div>
            ))}
          </DockSurface>
          <p className="fee-note">{registration.feeNote}</p>
        </BorderGlow>
      </section>

      <section className="policy-section page-width">
        <p className="section-kicker">BEFORE YOU REGISTER</p>
        <DockSurface
          className="policy-list"
          distance={300}
          magnification={1.018}
          lift={7}
        >
          {registration.policies.map((policy, index) => (
            <article key={policy} data-dock-item tabIndex={0}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{policy}</p>
            </article>
          ))}
        </DockSurface>
      </section>
    </PageFrame>
  )
}
