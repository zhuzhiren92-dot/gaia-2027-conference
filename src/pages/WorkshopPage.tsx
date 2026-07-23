import { PageFrame } from '../components/PageFrame'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { SpotlightCard } from '../components/SpotlightCard'
import { conference } from '../content/conference'

export function WorkshopPage() {
  return (
    <PageFrame
      pageIndex="03"
      pageName="WORKSHOP"
      pageStatement="Focused talks, serious questions and time to think together."
    >
      <section className="workshop-overview page-width">
        <p className="section-kicker">THE FORMAT</p>
        <p className="large-body">{conference.workshop.overview}</p>
        <DockSurface
          as="dl"
          className="format-list"
          distance={240}
          magnification={1.022}
          lift={6}
        >
          <div data-dock-item tabIndex={0}>
            <dt>Audience</dt>
            <dd>Young researchers, graduate students and invited scholars</dd>
          </div>
          <div data-dock-item tabIndex={0}>
            <dt>Language</dt>
            <dd>English</dd>
          </div>
          <div data-dock-item tabIndex={0}>
            <dt>Presentation format</dt>
            <dd>Keynotes, focused talks, posters and discussion</dd>
          </div>
          <div data-dock-item tabIndex={0}>
            <dt>Capacity</dt>
            <dd>To be announced</dd>
          </div>
        </DockSurface>
      </section>

      <section className="topics-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">AREAS OF INTEREST</p>
            <h2>A broad field, considered closely.</h2>
          </div>
          <p className="quiet-copy">
            The final GAIA 2027 theme and detailed scope remain subject to
            confirmation.
          </p>
        </div>
        <DockSurface
          as="ol"
          className="topic-list"
          distance={360}
          magnification={1.02}
          lift={9}
        >
          {conference.workshop.topics.map((topic, index) => (
            <li key={topic} data-dock-item tabIndex={0}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{topic}</p>
              <i aria-hidden="true">↗</i>
            </li>
          ))}
        </DockSurface>
      </section>

      <section className="speakers-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">KEYNOTE SPEAKERS</p>
            <h2>Voices for GAIA 2027</h2>
          </div>
          <p className="quiet-copy">Speaker announcements are forthcoming.</p>
        </div>
        <DockSurface className="speaker-grid">
          {conference.workshop.speakers.map((speaker, index) => (
            <SpotlightCard key={speaker.name} data-dock-item>
              <div className="speaker-portrait" aria-hidden="true">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="card-label">KEYNOTE / TBA</p>
              <h3>{speaker.name}</h3>
              <p>{speaker.affiliation}</p>
              <p className="speaker-topic">{speaker.topic}</p>
            </SpotlightCard>
          ))}
        </DockSurface>
      </section>

      <section className="venue-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">VENUE & ACCESS</p>
            <h2>Plan your arrival</h2>
          </div>
        </div>
        <DockSurface className="venue-grid" distance={320}>
          {conference.workshop.venue.map((item) => (
            <BorderGlow
              as="article"
              className="venue-card"
              key={item.label}
              backgroundColor="rgba(255, 255, 255, 0.76)"
              data-dock-item
            >
              <p className="card-label">{item.label}</p>
              <p className="venue-value">{item.value}</p>
              <p>{item.detail}</p>
            </BorderGlow>
          ))}
        </DockSurface>
      </section>
    </PageFrame>
  )
}
