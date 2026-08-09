import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import { conference } from '../content/conference'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { BorderGlow } from './BorderGlow'

function ArrowIcon({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg
      viewBox="0 0 28 12"
      aria-hidden="true"
      className={reverse ? 'is-reversed' : ''}
    >
      <path d="M0 6h26M20 1l6 5-6 5" />
    </svg>
  )
}

export function SchoolCarousel() {
  const slides = conference.schoolSlides
  const { identity } = conference
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStart = useRef<number | null>(null)
  const dragCurrent = useRef(0)
  const reducedMotion = useReducedMotion()

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      5600,
    )
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion, slides.length])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX
    dragCurrent.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return
    dragCurrent.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return
    const distance = dragCurrent.current - dragStart.current
    if (Math.abs(distance) > 48) {
      goTo(index + (distance < 0 ? 1 : -1))
    }
    dragStart.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    }
  }

  return (
    <section
      className="school-showcase"
      aria-labelledby="school-showcase-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <div className="carousel-heading carousel-theme-strip page-width">
        <div id="school-showcase-title" className="carousel-theme-copy">
          <p>{identity.theme}</p>
          <span>
            {identity.location}, {identity.dates}
          </span>
        </div>
      </div>

      <BorderGlow
        className="carousel-glow-shell"
        animated
        edgeSensitivity={18}
        glowRadius={28}
        glowIntensity={0.95}
        backgroundColor="rgba(248, 251, 252, 0.9)"
      >
        <div
          className="carousel-viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Host institution introduction"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStart.current = null
          }}
        >
          <div
            className="carousel-track"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {slides.map((slide, slideIndex) => (
              <article
                className="school-slide"
                key={slide.id}
                aria-hidden={slideIndex !== index}
                aria-label={`${slideIndex + 1} of ${slides.length}`}
              >
                <div className="slide-copy">
                  <div>
                    <p className="slide-eyebrow">{slide.eyebrow}</p>
                    <h2>{slide.title}</h2>
                    <p className="slide-description">{slide.description}</p>
                    <p className="slide-note">
                      <span />
                      {slide.note}
                    </p>
                  </div>
                </div>
                <div
                  className={`school-art art-${slide.art}`}
                  aria-hidden="true"
                >
                  <div className="art-core" />
                  <div className="art-ring ring-one" />
                  <div className="art-ring ring-two" />
                  <div className="art-mesh" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </BorderGlow>

      <div className="carousel-controls page-width">
        <div className="carousel-progress" aria-hidden="true">
          {slides.map((slide, dotIndex) => (
            <span
              key={slide.id}
              className={dotIndex === index ? 'is-active' : ''}
            />
          ))}
        </div>
        <p className="carousel-count" aria-live="polite">
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(slides.length).padStart(2, '0')}
        </p>
        <div className="carousel-buttons">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
          >
            <ArrowIcon reverse />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div className="carousel-dot-buttons">
        {slides.map((slide, dotIndex) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${dotIndex + 1}`}
            aria-current={dotIndex === index ? 'true' : undefined}
            onClick={() => goTo(dotIndex)}
          />
        ))}
      </div>
    </section>
  )
}
