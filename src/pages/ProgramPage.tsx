import { PageFrame } from '../components/PageFrame'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { conference } from '../content/conference'

export function ProgramPage() {
  return (
    <PageFrame
      pageName="PROGRAM"
      pageStatement="A measured rhythm for presenting, questioning and connecting."
    >
      <section className="program-note page-width" data-reveal>
        <p className="section-kicker">TENTATIVE FRAMEWORK</p>
        <p>
          The programme below describes the intended workshop rhythm. Dates,
          times, speakers and session titles will be published after official
          confirmation.
        </p>
        <span>LAST STRUCTURE UPDATE / JUL 2026</span>
      </section>

      <section className="program-days page-width">
        {conference.program.map((day, dayIndex) => (
          <article className="program-day" key={day.date}>
            <header>
              <p>{day.date}</p>
              <h2>{day.label}</h2>
              <span>{String(dayIndex + 1).padStart(2, '0')} / 04</span>
            </header>
            <DockSurface
              className="program-items"
              distance={310}
              magnification={1.018}
              lift={7}
            >
              {day.items.map((item) => (
                <div
                  className="program-item"
                  key={`${day.date}-${item.title}`}
                  data-dock-item
                  tabIndex={0}
                >
                  <p className="program-time">{item.time}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </DockSurface>
          </article>
        ))}
      </section>

      <BorderGlow
        as="section"
        className="program-download page-width"
        backgroundColor="rgba(243, 247, 249, 0.88)"
        data-reveal
      >
        <div>
          <p className="section-kicker">DETAILED PROGRAMME</p>
          <h2>Full schedule forthcoming</h2>
        </div>
        <button type="button" disabled>
          PDF NOT YET AVAILABLE
        </button>
      </BorderGlow>
    </PageFrame>
  )
}
