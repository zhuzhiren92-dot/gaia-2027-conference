import { useState } from 'react'
import type { Speaker } from '../types/conference'
import { DockSurface } from './DockSurface'
import { SpotlightCard } from './SpotlightCard'

const keynoteNumbers = Array.from({ length: 6 }, (_, index) => index + 1)

export function KeynoteCarousel({ speakers }: { speakers: Speaker[] }) {
  const [index, setIndex] = useState(0)

  return (
    <div className="keynote-carousel" aria-label="Keynote speaker groups">
      <div className="keynote-carousel-viewport">
        <div
          className="keynote-carousel-track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {keynoteNumbers.map((keynoteNumber, groupIndex) => (
            <section
              className="keynote-carousel-slide"
              key={keynoteNumber}
              aria-hidden={groupIndex !== index}
            >
              <h3 className="keynote-carousel-title">Keynote {keynoteNumber}</h3>
              <DockSurface className="speaker-grid speaker-grid-six">
                {speakers.map((speaker) => (
                  <SpotlightCard key={`${keynoteNumber}-${speaker.name}`} data-dock-item>
                    <div className="speaker-portrait speaker-placeholder" aria-hidden="true" />
                    <p className="card-label">KEYNOTE / TBA</p>
                    <h3>{speaker.name}</h3>
                    <p>{speaker.affiliation}</p>
                    <p className="speaker-topic">{speaker.topic}</p>
                  </SpotlightCard>
                ))}
              </DockSurface>
            </section>
          ))}
        </div>
      </div>

      <div className="keynote-carousel-controls">
        <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0} aria-label="Previous keynote">
          ←
        </button>
        <div className="keynote-carousel-dots" aria-label="Choose keynote">
          {keynoteNumbers.map((keynoteNumber, dotIndex) => (
            <button
              type="button"
              key={keynoteNumber}
              className={dotIndex === index ? 'is-active' : ''}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show Keynote ${keynoteNumber}`}
              aria-current={dotIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
        <span>{String(index + 1).padStart(2, '0')} / 06</span>
        <button type="button" onClick={() => setIndex((current) => Math.min(5, current + 1))} disabled={index === 5} aria-label="Next keynote">
          →
        </button>
      </div>
    </div>
  )
}
