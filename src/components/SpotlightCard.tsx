import type { HTMLAttributes, ReactNode } from 'react'
import { BorderGlow } from './BorderGlow'

interface SpotlightCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
}

export function SpotlightCard({
  children,
  className = '',
  ...rest
}: SpotlightCardProps) {
  return (
    <BorderGlow
      {...rest}
      className={`spotlight-card ${className}`}
      backgroundColor="rgba(250, 252, 253, 0.84)"
      borderRadius={2}
      fillOpacity={0.14}
    >
      {children}
    </BorderGlow>
  )
}
