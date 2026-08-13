import { PageFrame } from '../components/PageFrame'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { conference } from '../content/conference'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

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

      <section className="previous-photo-archive page-width">
        {conference.previousEvents.map((event) => (
          <BorderGlow
            as="article"
            className="previous-event-panel"
            key={event.year}
            backgroundColor="rgba(255, 255, 255, 0.84)"
            data-reveal
          >
            <div className="previous-event-heading">
              <div>
                <p className="section-kicker">{event.edition}</p>
                <h2>{event.title ?? `GAIA ${event.year}`}</h2>
              </div>
              <a
                className="text-link"
                href={event.href}
                target="_blank"
                rel="noreferrer"
              >
                Visit archive <i>→</i>
              </a>
            </div>

            <DockSurface className="previous-photo-grid" distance={420} lift={10}>
              {event.images?.map((image) => (
                <a
                  className={`previous-photo-card is-${image.variant ?? 'wide'}`}
                  href={event.href}
                  target="_blank"
                  rel="noreferrer"
                  key={image.src}
                  data-dock-item
                >
                  <img src={assetUrl(image.src)} alt={image.alt} loading="lazy" />
                </a>
              ))}
            </DockSurface>
          </BorderGlow>
        ))}
      </section>

      <section className="archive-footnote page-width" data-reveal>
        <p>01</p>
        <p>
          GAIA's first workshop was held in Atami, Japan, in 2025. The second
          gathered the community in Jinan, China, in 2026.
        </p>
      </section>
    </PageFrame>
  )
}
