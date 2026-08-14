import { Link } from 'react-router-dom'
import { PageFrame } from '../components/PageFrame'
import { TimelinePanel } from '../components/TimelinePanel'
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

      <TimelinePanel
        title="Update Timeline"
        items={conference.timeline}
        className="home-timeline-section"
      />
    </PageFrame>
  )
}
