import {
  useCallback,
  useEffect,
  useRef,
  type FocusEvent,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type DockSurfaceElement = 'div' | 'ol' | 'section' | 'nav' | 'dl'

interface DockSurfaceProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  as?: DockSurfaceElement
  distance?: number
  magnification?: number
  lift?: number
  selector?: string
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value)
}

function setItemMotion(
  item: HTMLElement,
  energy: number,
  magnification: number,
  lift: number,
) {
  const eased = smoothstep(Math.max(0, Math.min(energy, 1)))
  const scale = 1 + eased * (magnification - 1)
  const translate = eased * lift
  const shadowY = 16 + eased * 26
  const shadowBlur = 32 + eased * 54
  const shadowAlpha = 0.04 + eased * 0.16

  item.style.setProperty('--dock-scale', scale.toFixed(4))
  item.style.setProperty('--dock-lift', translate.toFixed(2))
  item.style.setProperty('--dock-energy', eased.toFixed(4))
  item.style.setProperty('--dock-z', String(1 + Math.round(eased * 20)))
  item.style.setProperty(
    '--dock-card-shadow',
    `0 ${shadowY.toFixed(1)}px ${shadowBlur.toFixed(1)}px rgba(36, 88, 255, ${shadowAlpha.toFixed(3)})`,
  )
}

function resetItemMotion(item: HTMLElement) {
  item.style.setProperty('--dock-scale', '1')
  item.style.setProperty('--dock-lift', '0')
  item.style.setProperty('--dock-energy', '0')
  item.style.setProperty('--dock-z', '1')
  item.style.setProperty(
    '--dock-card-shadow',
    '0 0 0 rgba(36, 88, 255, 0)',
  )
}

export function DockSurface({
  children,
  as: Element = 'div',
  className = '',
  distance = 360,
  magnification = 1.055,
  lift = 16,
  selector = '[data-dock-item]',
  onPointerMove,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: DockSurfaceProps) {
  const surfaceRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  const getItems = useCallback(() => {
    const surface = surfaceRef.current
    if (!surface) return []
    return Array.from(surface.querySelectorAll<HTMLElement>(selector))
  }, [selector])

  const resetItems = useCallback(() => {
    getItems().forEach(resetItemMotion)
  }, [getItems])

  const updateItems = useCallback(
    (clientX: number, clientY: number) => {
      if (reducedMotion) return

      getItems().forEach((item) => {
        const rect = item.getBoundingClientRect()
        const dx = clientX - (rect.left + rect.width / 2)
        const dy = clientY - (rect.top + rect.height / 2)
        const weightedDistance = Math.hypot(dx * 0.85, dy * 1.18)
        const energy = Math.max(0, 1 - weightedDistance / distance)

        setItemMotion(item, energy, magnification, lift)
      })
    },
    [distance, getItems, lift, magnification, reducedMotion],
  )

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    onPointerMove?.(event)
    if (reducedMotion) return

    const { clientX, clientY } = event
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => updateItems(clientX, clientY))
  }

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event)
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    resetItems()
  }

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    onFocus?.(event)
    if (reducedMotion) return

    const focusedItem = (event.target as HTMLElement).closest<HTMLElement>(
      selector,
    )
    if (!focusedItem || !surfaceRef.current?.contains(focusedItem)) return
    resetItems()
    setItemMotion(focusedItem, 0.8, magnification, lift)
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    onBlur?.(event)
    requestAnimationFrame(() => {
      if (!surfaceRef.current?.contains(document.activeElement)) resetItems()
    })
  }

  useEffect(() => {
    if (reducedMotion) resetItems()
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      resetItems()
    }
  }, [reducedMotion, resetItems])

  return (
    <Element
      {...rest}
      ref={(node: HTMLElement | null) => {
        surfaceRef.current = node
      }}
      className={`dock-surface ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </Element>
  )
}
