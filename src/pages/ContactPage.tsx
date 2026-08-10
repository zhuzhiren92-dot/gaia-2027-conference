import { BorderGlow } from '../components/BorderGlow'
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
