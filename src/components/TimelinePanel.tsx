import { DockSurface } from './DockSurface'

type TimelinePanelItem = {
  date: string
  title: string
  description?: string
  detail?: string
  status?: 'confirmed' | 'pending' | 'closed'
}

type TimelinePanelProps = {
  title: string
  kicker?: string
  items: TimelinePanelItem[]
  className?: string
  showDescriptions?: boolean
}

export function TimelinePanel({
  title,
  kicker,
  items,
  className = '',
  showDescriptions = false,
}: TimelinePanelProps) {
  return (
    <section
      className={`timeline-section event-timeline-section ${className} page-width`.trim()}
    >
      <div className="section-heading-row">
        <div>
          {kicker ? <p className="section-kicker">{kicker}</p> : null}
          <h2>{title}</h2>
        </div>
      </div>
      <DockSurface
        className="timeline-list home-timeline-list event-timeline-list"
        distance={330}
        magnification={1.024}
        lift={10}
      >
        {items.map((item, index) => {
          const description = item.description ?? item.detail

          return (
            <article
              className={`timeline-item home-timeline-item event-timeline-item status-${
                item.status ?? 'pending'
              } ${index === 0 ? 'is-active' : ''}`}
              key={`${item.date}-${item.title}-${index}`}
              data-dock-item
              tabIndex={0}
            >
              <span className="timeline-bullet" aria-hidden="true" />
              <p className="timeline-date">{item.date}</p>
              <div>
                <h3>{item.title}</h3>
                {showDescriptions && description ? <p>{description}</p> : null}
              </div>
            </article>
          )
        })}
      </DockSurface>
    </section>
  )
}
