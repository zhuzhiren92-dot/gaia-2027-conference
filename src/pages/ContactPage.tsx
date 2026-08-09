import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function ContactPage() {
  return (
    <PageFrame
      pageName="CONTACT"
      pageStatement="Questions are welcome. Official contacts will appear here."
      showIntroSections={false}
    >
      <section className="committee-section page-width" data-reveal>
        <div className="section-heading-row contact-heading-row">
          <div>
            <p className="section-kicker">ORGANIZING COMMITTEE</p>
            <h2>People behind GAIA 2027</h2>
          </div>
          <p className="quiet-copy">
            Select a profile card to open the corresponding CityU Scholars page.
          </p>
        </div>

        <DockSurface
          className="committee-list"
          distance={420}
          magnification={1.018}
          lift={8}
        >
          {conference.committee.map((member, index) => (
            <BorderGlow
              as="article"
              className="committee-card"
              backgroundColor="rgba(255, 255, 255, 0.82)"
              key={member.profileUrl}
              data-dock-item
            >
              <a
                className="committee-card-link"
                href={member.profileUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name}, ${member.role}`}
              >
                <div className="committee-photo-stage" aria-hidden="true">
                  <img src={assetUrl(member.photo)} alt="" loading="lazy" />
                </div>
                <div className="committee-copy">
                  <p className="card-label">{member.role}</p>
                  <h2>{member.name}</h2>
                  {member.biography ? <p>{member.biography}</p> : null}
                  <span className="text-link">
                    View CityU profile <i>→</i>
                  </span>
                </div>
                <p className="committee-number">
                  {String(index + 1).padStart(2, '0')}
                </p>
              </a>
            </BorderGlow>
          ))}
        </DockSurface>
      </section>

      <BorderGlow
        as="section"
        className="contact-us-panel page-width"
        backgroundColor="rgba(248, 251, 253, 0.9)"
        data-reveal
      >
        <p className="section-kicker">CONTACT US</p>
        <div className="contact-us-lines">
          {conference.contactChannels.map((item) => (
            <a key={item.email} href={`mailto:${item.email}`}>
              <ContactGlyph kind={item.kind} />
              <span>{item.label}</span>
              <strong>{item.email}</strong>
            </a>
          ))}
        </div>
      </BorderGlow>

      <section className="contact-organizations page-width" data-reveal>
        <BorderGlow
          className="contact-logo-panel"
          backgroundColor="rgba(255, 255, 255, 0.82)"
        >
          <div className="logo-group logo-group-organized">
            <p className="section-kicker">ORGANIZED BY</p>
            {conference.organizedBy.map((organization) => (
              <div className="contact-logo-frame" key={organization.name}>
                <img
                  src={assetUrl(organization.logo)}
                  alt={organization.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="logo-group logo-group-supported">
            <p className="section-kicker">SUPPORTED BY</p>
            <div className="supported-logo-row">
              {conference.supportedBy.map((organization) => (
                <div className="contact-logo-frame" key={organization.name}>
                  <img
                    src={assetUrl(organization.logo)}
                    alt={organization.name}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </BorderGlow>
      </section>
    </PageFrame>
  )
}

function ContactGlyph({ kind }: { kind: 'person' | 'committee' }) {
  if (kind === 'committee') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.5 19v-1.4c0-2.2 1.9-4 4.2-4h.6c2.3 0 4.2 1.8 4.2 4V19m-1.8-4.2a4.9 4.9 0 0 1 3-1.2h.6c2.3 0 4.2 1.8 4.2 4V19" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8v-1.4c0-3.1 3.1-5.6 7-5.6s7 2.5 7 5.6V20" />
    </svg>
  )
}
