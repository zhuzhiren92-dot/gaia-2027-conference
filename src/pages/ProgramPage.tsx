import { PageFrame } from '../components/PageFrame'
import { conference } from '../content/conference'

export function ProgramPage() {
  return (
    <PageFrame
      pageName="PROGRAM"
      pageStatement="A measured rhythm for presenting, questioning and connecting."
    >
      <section className="program-days page-width">
        {conference.program.map((day, dayIndex) => (
          <article className="program-day program-day-simple" key={`${day.date}-${day.label}`}>
            <header>
              <p>{day.date}</p>
              <h2>{day.label}</h2>
              <span>{String(dayIndex + 1).padStart(2, '0')} / {String(conference.program.length).padStart(2, '0')}</span>
            </header>
          </article>
        ))}
      </section>
    </PageFrame>
  )
}
