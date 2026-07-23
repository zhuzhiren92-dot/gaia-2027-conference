import type { ReactNode } from 'react'
import { conference } from '../content/conference'
import { BlurText } from './BlurText'
import { DockSurface } from './DockSurface'
import { Navigation } from './Navigation'
import { SchoolCarousel } from './SchoolCarousel'

type PageFrameProps = {
  pageIndex: string
  pageName: string
  pageStatement: string
  children: ReactNode
}

export function PageFrame({
  pageIndex,
  pageName,
  pageStatement,
  children,
}: PageFrameProps) {
  const { identity } = conference

  return (
    <>
      <Navigation />
      <main id="main-content">
        <SchoolCarousel />

        <section className="conference-identity page-width">
          <div className="identity-meta">
            <p className="micro-label">
              <span>02</span> THE 2027 WORKSHOP
            </p>
            <p>
              {identity.edition} edition · {identity.location}
            </p>
          </div>
          <BlurText
            as="h1"
            className="conference-title"
            text={`${identity.shortName} ${identity.year}`}
          />
          <p className="conference-full-name">
            {identity.edition} {identity.fullName}
          </p>
          <div className="theme-line">
            <p>CONFERENCE THEME</p>
            <BlurText
              as="p"
              className="theme-value"
              text={identity.theme}
              delay={0.06}
            />
            <p className="theme-dates">
              {identity.location} <span>↗</span> {identity.dates}
            </p>
          </div>
        </section>

        <section className="page-intro page-width">
          <p className="micro-label">
            <span>{pageIndex}</span> {pageName}
          </p>
          <BlurText
            as="h2"
            className="page-statement"
            text={pageStatement}
          />
        </section>

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
        <div>
          <p className="footer-wordmark">GAIA</p>
          <p className="footer-edition">03 / 2027</p>
        </div>
        <p className="footer-description">
          Geomechanics Alliance In Asia connects emerging researchers through
          open exchange, careful listening and long-term collaboration.
        </p>
        <DockSurface
          as="nav"
          className="footer-links"
          aria-label="Footer navigation"
          distance={155}
          magnification={1.045}
          lift={5}
        >
          {conference.navigation.map((item) => (
            <a key={item.path} href={item.path} data-dock-item>
              <span>{item.label}</span>
            </a>
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
