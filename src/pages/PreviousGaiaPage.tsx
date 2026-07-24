import { PageFrame } from '../components/PageFrame'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { conference } from '../content/conference'

export function PreviousGaiaPage() {
  return (
    <PageFrame
      pageName="PREVIOUS GAIA"
      pageStatement="A young alliance already gathering momentum across Asia."
    >
      <section className="archive-intro page-width" data-reveal>
        <p className="section-kicker">THE ARCHIVE</p>
        <p className="large-body">
          Each host adds a new chapter: a different place, a renewed
          conversation and a growing community of geomechanics researchers.
        </p>
      </section>

      <DockSurface
        as="section"
        className="archive-list page-width"
        distance={560}
        magnification={1.014}
        lift={12}
      >
        {conference.previousEvents.map((event, index) => (
          <BorderGlow
            className="archive-glow"
            key={event.year}
            backgroundColor="rgba(255, 255, 255, 0.82)"
            data-dock-item
          >
            <a
              className={`archive-card ${index % 2 ? 'is-reverse' : ''}`}
              href={event.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className={`archive-art archive-art-${index + 1}`}>
                <span className="archive-orbit" />
                <span className="archive-year">{event.year}</span>
                <span className="archive-coordinate">
                  GAIA / {String(2 - index).padStart(2, '0')}
                </span>
              </div>
              <div className="archive-copy">
                <p className="card-label">{event.edition}</p>
                <h2>GAIA {event.year}</h2>
                <p className="archive-location">{event.location}</p>
                <p>{event.dates}</p>
                <p className="archive-theme">{event.theme}</p>
                <span className="text-link">
                  Visit archive <i>↗</i>
                </span>
              </div>
            </a>
          </BorderGlow>
        ))}
      </DockSurface>

      <section className="archive-footnote page-width" data-reveal>
        <p>01</p>
        <p>
          GAIA’s first workshop was held in Atami, Japan, in 2025. The second
          gathered the community in Jinan, China, in 2026.
        </p>
      </section>
    </PageFrame>
  )
}
