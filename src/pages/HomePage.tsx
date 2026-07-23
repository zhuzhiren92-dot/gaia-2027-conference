import { Link } from 'react-router-dom'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { PageFrame } from '../components/PageFrame'
import { SpotlightCard } from '../components/SpotlightCard'
import { conference } from '../content/conference'

export function HomePage() {
  return (
    <PageFrame
      pageIndex="03"
      pageName="HOME"
      pageStatement="A workshop built for the next generation of geomechanics."
    >
      <section className="editorial-grid page-width">
        <div className="editorial-lead">
          <p className="section-kicker">WHY GAIA</p>
          <p className="large-body">
            Geomechanics advances when different scales, disciplines and
            generations meet. GAIA creates the room for that exchange.
          </p>
        </div>
        <div className="editorial-copy">
          <p>
            The Geomechanics Alliance In Asia is a platform for graduate
            students and young researchers to share work in progress, learn
            from leading scholars and develop a lasting regional research
            network.
          </p>
          <Link className="text-link" to="/about">
            Discover the alliance <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="highlights-section page-width">
        <div className="section-heading-row">
          <p className="section-kicker">WORKSHOP AT A GLANCE</p>
          <p className="section-number">03 — 06</p>
        </div>
        <DockSurface className="highlight-grid">
          {conference.highlights.map((item) => (
            <SpotlightCard key={item.label} data-dock-item>
              <p className="card-label">{item.label}</p>
              <p className="card-value">{item.value}</p>
              <p className="card-detail">{item.detail}</p>
            </SpotlightCard>
          ))}
        </DockSurface>
      </section>

      <section className="timeline-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">UPDATE TIMELINE</p>
            <h2>What happens next</h2>
          </div>
          <p className="quiet-copy">
            Dates marked TBA will be replaced only after official confirmation.
          </p>
        </div>
        <DockSurface
          className="timeline-list"
          distance={330}
          magnification={1.024}
          lift={10}
        >
          {conference.timeline.map((item, index) => (
            <article
              className="timeline-item"
              key={`${item.title}-${index}`}
              data-dock-item
              tabIndex={0}
            >
              <p className="timeline-index">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="timeline-date">{item.date}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span
                className={`status-dot status-${item.status}`}
                aria-label={item.status}
              />
            </article>
          ))}
        </DockSurface>
      </section>

      <BorderGlow
        as="section"
        className="closing-cta page-width"
        backgroundColor="rgba(248, 251, 253, 0.88)"
        animated
      >
        <p className="section-kicker">GAIA 2027</p>
        <h2>Research moves forward through conversation.</h2>
        <Link className="button-link" to="/workshop">
          Explore the workshop <span>↗</span>
        </Link>
      </BorderGlow>
    </PageFrame>
  )
}
