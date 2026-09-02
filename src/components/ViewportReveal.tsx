import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const revealSelector = '[data-reveal]'
const revealedClassName = 'is-revealed'

export function ViewportReveal() {
  const location = useLocation()

  useEffect(() => {
    let cleanupObserver: (() => void) | undefined

    const frame = window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      let revealIndex = 0
      const observer = prefersReducedMotion
        ? null
        : new IntersectionObserver(
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

      const observeElement = (element: HTMLElement) => {
        element.style.setProperty(
          '--reveal-delay',
          `${Math.min(revealIndex * 70, 260)}ms`,
        )
        revealIndex += 1

        if (prefersReducedMotion) {
          element.classList.add(revealedClassName)
          return
        }
        observer?.observe(element)
      }

      document.querySelectorAll<HTMLElement>(revealSelector).forEach(observeElement)

      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return
            if (node.matches(revealSelector)) observeElement(node)
            node.querySelectorAll<HTMLElement>(revealSelector).forEach(observeElement)
          })
        })
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })

      cleanupObserver = () => {
        observer?.disconnect()
        mutationObserver.disconnect()
      }
    })

    return () => {
      window.cancelAnimationFrame(frame)
      cleanupObserver?.()
    }
  }, [location.pathname])

  return null
}
