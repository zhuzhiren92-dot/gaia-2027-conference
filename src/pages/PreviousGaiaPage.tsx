import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function PreviousGaiaPage() {
  return (
    <PageFrame
      pageName="PREVIOUS GAIA"
      pageStatement="A young alliance already gathering momentum across Asia."
    >
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
              <h2>{event.title ?? `GAIA ${event.year}`}</h2>
              <a
                className="archive-website-link pill-action-link"
                href={event.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit GAIA ${event.year} Website`}
              >
                <span className="pill-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
                <strong>Visit GAIA {event.year} Website</strong>
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
    </PageFrame>
  )
}
