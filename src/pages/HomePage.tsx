import { Link } from 'react-router-dom'
import { DockSurface } from '../components/DockSurface'
import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'

export function HomePage() {
  return (
    <PageFrame
      pageName="HOME"
      pageStatement="A workshop built for the next generation of geomechanics."
    >
      <section className="editorial-grid home-about-overview page-width" data-reveal>
        {conference.homeFeatures.map((item) => (
          <article className="home-info-block" key={item.title}>
            <h2 className="section-bullet-title">
              <span aria-hidden="true" />
              {item.title}
            </h2>
            <p>{item.body}</p>
            {item.linkTo && item.linkLabel ? (
              <Link className="home-info-link pill-action-link" to={item.linkTo}>
                <span className="pill-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
                <strong>{item.linkLabel}</strong>
              </Link>
            ) : null}
          </article>
        ))}
      </section>

      <section className="timeline-section home-timeline-section page-width">
        <div className="section-heading-row">
          <div>
            <h2>Update Timeline</h2>
          </div>
        </div>
        <DockSurface
          className="timeline-list home-timeline-list"
          distance={330}
          magnification={1.024}
          lift={10}
        >
          {conference.timeline.map((item, index) => (
            <article
              className={`timeline-item home-timeline-item status-${item.status} ${
                index === 0 ? 'is-active' : ''
              }`}
              key={`${item.title}-${index}`}
              data-dock-item
              tabIndex={0}
            >
              <span className="timeline-bullet" aria-hidden="true" />
              <p className="timeline-date">{item.date}</p>
              <div>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </DockSurface>
      </section>
    </PageFrame>
  )
}
