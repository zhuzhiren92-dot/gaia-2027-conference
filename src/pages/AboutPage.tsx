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
          <p>
            The first GAIA workshop was held in Atami, Japan on February 22–24,
            2025 ({' '}
            <a className="about-history-link" href="https://www.kz.tsukuba.ac.jp/~tmatsu/GAIA_homepage/program.html" target="_blank" rel="noreferrer">
              https://www.kz.tsukuba.ac.jp/~tmatsu/GAIA_homepage/program.html
            </a>
            ) and the Second GAIA Workshop was held in Jinan, China on March
            27–30, 2026 ({' '}
            <a className="about-history-link" href="https://gaia2026.hi97.cn/workshop/" target="_blank" rel="noreferrer">
              https://gaia2026.hi97.cn/workshop/
            </a>
            ).
          </p>
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

    </PageFrame>
  )
}
