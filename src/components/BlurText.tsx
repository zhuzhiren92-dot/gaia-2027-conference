import { motion } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type BlurTextProps = {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p'
}

export function BlurText({
  text,
  className = '',
  delay = 0.035,
  as: Tag = 'h1',
}: BlurTextProps) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="blur-word"
          initial={{ opacity: 0, filter: 'blur(9px)', y: 12 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{
            duration: 0.68,
            delay: index * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          key={`${word}-${index}`}
        >
          {word}
          {index < words.length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}
