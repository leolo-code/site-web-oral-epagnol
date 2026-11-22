import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

interface Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  y?: number
}

// Aparición suave al entrar en pantalla.
export function Reveal({ children, delay = 0, y = 28, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Título que aparece palabra por palabra.
export function WordsReveal({ text, className = '', delay = 0, as: Tag = 'h2' }: { text: string; className?: string; delay?: number; as?: 'h1' | 'h2' | 'h3' | 'p' }) {
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, intro, align = 'left', light = false }: { eyebrow: string; title: string; intro?: string; align?: 'left' | 'center'; light?: boolean }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <p className={`eyebrow ${light ? '!text-fresh-2' : ''}`}>{eyebrow}</p>
      </Reveal>
      <WordsReveal text={title} className={`mt-4 text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.05] ${light ? 'text-ink' : 'text-snow'}`} />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-ink/60' : 'text-steel/70'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
