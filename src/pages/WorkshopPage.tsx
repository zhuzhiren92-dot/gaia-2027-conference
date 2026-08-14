import { Link } from 'react-router-dom'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { PageFrame } from '../components/PageFrame'
import { SpotlightCard } from '../components/SpotlightCard'
import { TimelinePanel } from '../components/TimelinePanel'
import { conference } from '../content/conference'

export function WorkshopPage() {
  return (
    <PageFrame
      pageName="WORKSHOP"
      pageStatement="Focused talks, serious questions and time to think together."
    >
      <section className="workshop-overview page-width" data-reveal>
        <p className="section-kicker">GAIA THIRD WORKSHOP (GAIA 2027)</p>
        <p className="large-body">{conference.workshop.overview}</p>
        <p className="workshop-theme-copy">
          The third workshop, GAIA 2027, will be hosted by City University of
          Hong Kong and is scheduled to take place from 20 to 25 May 2027 in
          Hong Kong, China. The main theme is{' '}
          <strong>Advances in Micro–Macro Geomechanics.</strong>
        </p>
      </section>

      <section className="topics-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">KEY TOPICS</p>
            <h2>A broad field, considered closely.</h2>
          </div>
          <p className="quiet-copy">
            These topics frame the current GAIA 2027 scientific scope.
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
            <h2>Keynote Speakers</h2>
          </div>
          <p className="quiet-copy">
            Portraits, lecture titles and biographies will be added after
            confirmation.
          </p>
        </div>
        <DockSurface className="speaker-grid speaker-grid-six">
          {conference.workshop.speakers.map((speaker, index) => (
            <SpotlightCard key={speaker.name} data-dock-item>
              <div className="speaker-portrait speaker-placeholder" aria-hidden="true">
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

      <TimelinePanel
        kicker="DATES"
        title="Key dates in Hong Kong."
        items={conference.workshop.dates}
        className="workshop-dates"
        showDescriptions
      />

      <section className="venue-section page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">WORKSHOP FRAMEWORK</p>
            <h2>Participation framework</h2>
          </div>
        </div>
        <DockSurface className="venue-grid" distance={320}>
          {conference.workshop.framework.map((item) => (
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

      <section className="poster-section page-width" data-reveal>
        <p className="section-kicker">POSTER SESSIONS</p>
        <div className="poster-copy">
          <h2>Poster Sessions</h2>
          <div>
            {conference.workshop.posterSessions.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <BorderGlow
        as="section"
        className="workshop-registration-cta page-width"
        backgroundColor="rgba(248, 251, 253, 0.9)"
        animated
        data-reveal
      >
        <p className="section-kicker">{conference.workshop.registrationCta.kicker}</p>
        <h2>{conference.workshop.registrationCta.title}</h2>
        <p>{conference.workshop.registrationCta.body}</p>
        <Link
          className="button-link"
          to={conference.workshop.registrationCta.linkTo ?? '/registration'}
        >
          {conference.workshop.registrationCta.linkLabel} <span>↗</span>
        </Link>
      </BorderGlow>

      <section className="tentative-timetable page-width" data-reveal>
        <p className="section-kicker">TENTATIVE TIMETABLE</p>
        <h2>Tentative Timetable</h2>
        <p>{conference.workshop.timetableNote}</p>
      </section>
    </PageFrame>
  )
}
