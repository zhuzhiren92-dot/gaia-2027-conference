import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { conference } from '../content/conference'
import { BlurText } from './BlurText'
import { DockSurface } from './DockSurface'
import { Navigation } from './Navigation'
import { SchoolCarousel } from './SchoolCarousel'
import { WeatherBadge } from './WeatherBadge'

type PageFrameProps = {
  pageName: string
  pageStatement: string
  children: ReactNode
  showIntroSections?: boolean
}

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function PageFrame({
  children,
  showIntroSections = true,
}: PageFrameProps) {
  const { identity } = conference

  return (
    <>
      <Navigation />
      <main id="main-content">
        <SchoolCarousel />

        {showIntroSections ? (
          <section className="conference-identity page-width" data-reveal>
            <div className="identity-meta">
              <WeatherBadge />
            </div>
            <BlurText
              as="h1"
              className="conference-title"
              text={`${identity.shortName} ${identity.year}`}
            />
            <p className="conference-full-name">
              {identity.edition} Geomechanics Alliance In Asia
            </p>
          </section>
        ) : null}

        {children}
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <div className="footer-left">
          <div className="footer-brand">
            <p className="footer-wordmark">GAIA</p>
            <p className="footer-edition">May / 2027</p>
          </div>

          <div className="footer-contact-card" aria-label="Contact us">
            <p className="section-kicker">CONTACT US</p>
            {conference.contactChannels.map((item) => (
              <a
                key={item.email}
                href={`mailto:${item.email}`}
                className="footer-contact-line"
              >
                <ContactIcon kind={item.kind} />
                <span>{item.label}</span>
                <strong>{item.email}</strong>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-organizations" aria-label="Organized and supported by">
          <div className="footer-logo-group">
            <p className="section-kicker">ORGANIZED BY</p>
            <div className="footer-logo-row">
              {conference.organizedBy.map((item) => (
                <img
                  key={item.name}
                  src={assetUrl(item.logo)}
                  alt={item.name}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <div className="footer-logo-group footer-supported-group">
            <p className="section-kicker">SUPPORTED BY</p>
            <div className="footer-logo-row">
              {conference.supportedBy.map((item) => (
                <img
                  key={item.name}
                  src={assetUrl(item.logo)}
                  alt={item.name}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

        <DockSurface
          as="nav"
          className="footer-links"
          aria-label="Footer navigation"
          distance={155}
          magnification={1.045}
          lift={5}
        >
          {conference.navigation.map((item) => (
            <Link key={item.path} to={item.path} data-dock-item>
              <span>{item.label}</span>
            </Link>
          ))}
        </DockSurface>
      </div>
      <div className="page-width footer-bottom">
        <p>© 2027 GAIA ORGANIZING COMMITTEE</p>
        <p>INFORMATION SUBJECT TO CONFIRMATION</p>
      </div>
    </footer>
  )
}

function ContactIcon({ kind }: { kind: 'person' | 'committee' }) {
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
