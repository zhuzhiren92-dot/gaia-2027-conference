import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'

export function AboutPage() {
  return (
    <PageFrame
      pageName="ABOUT"
      pageStatement="An alliance shaped by curiosity, generosity and durable research ties."
    >
      <section className="about-text-section page-width" data-reveal>
        <div className="section-heading-row">
          <div>
            <h2>What is GAIA?</h2>
          </div>
        </div>
        <div className="about-prose">
          {conference.about.whatIsGaia.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="about-text-section page-width" data-reveal>
        <div className="section-heading-row">
          <div>
            <h2>Scientific program highlights</h2>
          </div>
        </div>
        <ul className="about-bullet-list">
          {conference.about.scientificHighlights.map((item) => (
            <li key={item.title}>
              <p>
                {item.title === 'Academic exchange' ? null : (
                  <strong>{item.title}: </strong>
                )}
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-text-section page-width" data-reveal>
        <div className="section-heading-row">
          <div>
            <h2>International Scientific Committee</h2>
          </div>
        </div>
        <ul className="about-bullet-list">
          {conference.about.internationalScientificCommittee.map((member) => (
            <li key={member}>
              <p>{member}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageFrame>
  )
}
