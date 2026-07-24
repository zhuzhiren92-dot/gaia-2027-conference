import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const revealSelector = '[data-reveal]'
const revealedClassName = 'is-revealed'

export function ViewportReveal() {
  const location = useLocation()

  useEffect(() => {
    let cleanupObserver: (() => void) | undefined

    const frame = window.requestAnimationFrame(() => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(revealSelector),
      )
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      elements.forEach((element, index) => {
        element.style.setProperty(
          '--reveal-delay',
          `${Math.min(index * 70, 260)}ms`,
        )

        if (prefersReducedMotion) {
          element.classList.add(revealedClassName)
        }
      })

      if (prefersReducedMotion) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement
            element.classList.toggle(revealedClassName, entry.isIntersecting)
          })
        },
        {
          rootMargin: '-7% 0px -12% 0px',
          threshold: 0.16,
        },
      )

      elements.forEach((element) => observer.observe(element))
      cleanupObserver = () => observer.disconnect()
    })

    return () => {
      window.cancelAnimationFrame(frame)
      cleanupObserver?.()
    }
  }, [location.pathname])

  return null
}
