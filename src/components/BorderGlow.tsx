import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type BorderGlowElement = 'div' | 'article' | 'section' | 'li'

interface BorderGlowProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  as?: BorderGlowElement
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  animated?: boolean
  colors?: string[]
  fillOpacity?: number
}

function parseHsl(hsl: string) {
  const match = hsl.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 211, s: 100, l: 72 }
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  }
}

function buildBoxShadow(glowColor: string, intensity: number) {
  const { h, s, l } = parseHsl(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const layers = [
    [2, 80, true],
    [6, 55, true],
    [15, 36, true],
    [26, 22, true],
    [4, 48, false],
    [12, 30, false],
    [28, 18, false],
    [48, 9, false],
  ] as const

  return layers
    .map(([blur, alpha, inset]) => {
      const opacity = Math.min(alpha * intensity, 100)
      return `${inset ? 'inset ' : ''}0 0 ${blur}px 0 hsl(${base} / ${opacity}%)`
    })
    .join(', ')
}

const gradientPositions = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
]
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function buildMeshGradients(colors: string[]) {
  return gradientPositions.map((position, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)]
    return `radial-gradient(at ${position}, ${color} 0, transparent 52%)`
  })
}

export function BorderGlow({
  children,
  as: Element = 'div',
  className = '',
  edgeSensitivity = 24,
  glowColor = '211 100 72',
  backgroundColor = 'rgba(255, 255, 255, 0.78)',
  borderRadius = 2,
  glowRadius = 24,
  glowIntensity = 0.85,
  coneSpread = 24,
  animated = false,
  colors = ['#2458ff', '#77dcff', '#c7a6ff'],
  fillOpacity = 0.12,
  style,
  ...rest
}: BorderGlowProps) {
  const cardRef = useRef<HTMLElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [cursorAngle, setCursorAngle] = useState(45)
  const [edgeProximity, setEdgeProximity] = useState(0)
  const [sweepActive, setSweepActive] = useState(false)
  const reducedMotion = useReducedMotion()

  const getGeometry = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return { rect, centerX: rect.width / 2, centerY: rect.height / 2 }
  }, [])

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const card = cardRef.current
      if (!card) return
      const { rect, centerX, centerY } = getGeometry(card)
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const dx = x - centerX
      const dy = y - centerY
      const scaleX = dx === 0 ? Infinity : centerX / Math.abs(dx)
      const scaleY = dy === 0 ? Infinity : centerY / Math.abs(dy)
      const proximity = Math.min(
        Math.max(1 / Math.min(scaleX, scaleY), 0),
        1,
      )
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      if (angle < 0) angle += 360
      setEdgeProximity(proximity)
      setCursorAngle(angle)
      rest.onPointerMove?.(event)
    },
    [getGeometry, rest],
  )

  useEffect(() => {
    if (!animated || reducedMotion) return
    let frame = 0
    const startedAt = performance.now()

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / 2200, 1)
      setSweepActive(true)
      setCursorAngle(95 + progress * 360)
      setEdgeProximity(Math.sin(progress * Math.PI))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setSweepActive(false)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animated, reducedMotion])

  const visible = isHovered || sweepActive
  const threshold = Math.min(edgeSensitivity / 100, 0.95)
  const directionalStrength = visible
    ? Math.max(0, (edgeProximity - threshold) / (1 - threshold))
    : 0
  const borderOpacity = 0.42 + directionalStrength * 0.58
  const glowOpacity = directionalStrength
  const angle = `${cursorAngle.toFixed(2)}deg`
  const meshGradients = buildMeshGradients(colors)
  const borderBackground = [
    `linear-gradient(${backgroundColor} 0 100%) padding-box`,
    ...meshGradients.map((gradient) => `${gradient} border-box`),
    `linear-gradient(110deg, ${colors[0]}, ${colors[1]}, ${colors[2]}) border-box`,
  ].join(', ')
  const fillBackground = meshGradients
    .map((gradient) => `${gradient} padding-box`)
    .join(', ')

  const rootStyle = {
    '--border-glow-radius': `${borderRadius}px`,
    background: backgroundColor,
    borderRadius: `${borderRadius}px`,
    boxShadow:
      '0 12px 34px rgba(36, 88, 255, 0.055), inset 0 0 0 1px rgba(255, 255, 255, 0.78), var(--dock-card-shadow, 0 0 0 rgba(36, 88, 255, 0))',
    ...style,
  } as CSSProperties

  return (
    <Element
      {...rest}
      ref={(node: HTMLElement | null) => {
        cardRef.current = node
      }}
      className={`border-glow ${className}`.trim()}
      style={rootStyle}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        setIsHovered(true)
        rest.onPointerEnter?.(event)
      }}
      onPointerLeave={(event) => {
        setIsHovered(false)
        setEdgeProximity(0)
        rest.onPointerLeave?.(event)
      }}
    >
      <span
        className="border-glow-border"
        style={{
          background: borderBackground,
          opacity: borderOpacity,
          maskImage: `conic-gradient(from ${angle} at center, #000 ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${85 - coneSpread}%, #000 ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from ${angle} at center, #000 ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${85 - coneSpread}%, #000 ${100 - coneSpread}%)`,
        }}
      />
      <span
        className="border-glow-fill"
        style={{
          background: fillBackground,
          opacity: borderOpacity * fillOpacity,
          maskImage: `conic-gradient(from ${angle} at center, transparent 4%, #000 16%, #000 84%, transparent 96%)`,
          WebkitMaskImage: `conic-gradient(from ${angle} at center, transparent 4%, #000 16%, #000 84%, transparent 96%)`,
        }}
      />
      <span
        className="border-glow-halo"
        style={{
          inset: `${-glowRadius}px`,
          opacity: glowOpacity,
          maskImage: `conic-gradient(from ${angle} at center, #000 3%, transparent 12%, transparent 88%, #000 97%)`,
          WebkitMaskImage: `conic-gradient(from ${angle} at center, #000 3%, transparent 12%, transparent 88%, #000 97%)`,
        }}
      >
        <span
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>
      {children}
    </Element>
  )
}
