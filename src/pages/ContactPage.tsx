import { PageFrame } from '../components/PageFrame'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { conference } from '../content/conference'

export function ContactPage() {
  return (
    <PageFrame
      pageName="CONTACT"
      pageStatement="Questions are welcome. Official contacts will appear here."
    >
      <section className="contact-directory page-width">
        <p className="section-kicker">CONTACT DIRECTORY</p>
        <DockSurface
          className="contact-list"
          distance={310}
          magnification={1.018}
          lift={8}
        >
          {conference.contacts.map((contact, index) => (
            <article key={contact.role} data-dock-item tabIndex={0}>
              <p className="contact-index">
                {String(index + 1).padStart(2, '0')}
              </p>
              <div>
                <p className="card-label">{contact.role}</p>
                <h2>{contact.name}</h2>
              </div>
              <p className="contact-email">{contact.email}</p>
            </article>
          ))}
        </DockSurface>
      </section>

      <section className="organizations-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">ORGANIZATIONS</p>
            <h2>The team behind GAIA 2027</h2>
          </div>
        </div>
        <DockSurface className="organization-grid" distance={320}>
          {conference.organizations.map((organization, index) => (
            <BorderGlow
              as="article"
              key={organization.role}
              backgroundColor="rgba(255, 255, 255, 0.78)"
              data-dock-item
            >
              <p>{String(index + 1).padStart(2, '0')}</p>
              <div className="organization-placeholder" aria-hidden="true">
                <span>LOGO</span>
              </div>
              <p className="card-label">{organization.role}</p>
              <h3>{organization.name}</h3>
            </BorderGlow>
          ))}
        </DockSurface>
      </section>

      <section className="contact-note page-width" data-reveal>
        <p className="section-kicker">PLEASE NOTE</p>
        <p>
          GAIA 2027 contacts, affiliations and email addresses are still being
          confirmed. This page will never request passwords or payment
          credentials.
        </p>
      </section>
    </PageFrame>
  )
}
