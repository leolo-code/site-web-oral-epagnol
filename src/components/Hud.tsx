import { motion } from 'motion/react'
import type { ReactNode } from 'react'

// Etiqueta flotante tipo "interfaz IA" que aparece sobre una imagen.
export function HudTag({
  title,
  detail,
  className = '',
  delay = 0,
  tone = 'fresh',
  icon,
  inView = true,
}: {
  title: string
  detail?: string
  className?: string
  delay?: number
  tone?: 'fresh' | 'amber' | 'steel'
  icon?: ReactNode
  inView?: boolean
}) {
  const color = tone === 'fresh' ? 'bg-fresh' : tone === 'amber' ? 'bg-amber' : 'bg-steel'
  const anim = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
  return (
    <motion.div
      className={`glass absolute z-10 flex items-center gap-2.5 rounded-2xl py-2 pl-2.5 pr-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] ${className}`}
      initial={{ opacity: 0, y: 12, scale: 0.92, filter: 'blur(6px)' }}
      {...(inView ? { whileInView: anim, viewport: { once: true } } : { animate: anim })}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-snow">
        {icon ?? <span className={`h-2 w-2 rounded-full ${color} animate-blink`} />}
      </span>
      <span className="leading-tight">
        <span className="block whitespace-nowrap text-[13px] font-semibold text-snow">{title}</span>
        {detail && <span className="hud-label block whitespace-nowrap text-steel/60">{detail}</span>}
      </span>
    </motion.div>
  )
}
