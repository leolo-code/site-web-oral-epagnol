import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { img } from '../lib/img'

// Comparador Antes / Después que se arrastra (ratón, dedo o teclado).
export function BeforeAfter({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useMotionValue(50)
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`)
  const left = useTransform(pos, (p) => `${p}%`)
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)

  // pequeña animación de invitación
  useEffect(() => {
    if (touched) return
    const c = animate(pos, [50, 30, 70, 50], { duration: 3.2, delay: 1, ease: 'easeInOut' })
    return () => c.stop()
  }, [pos, touched])

  const setFromX = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className={`relative aspect-[4/5] cursor-ew-resize touch-none overflow-hidden rounded-[28px] bg-black ${className}`}
      onPointerDown={(e) => {
        setTouched(true)
        setDragging(true)
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        setFromX(e.clientX)
      }}
      onPointerMove={(e) => dragging && setFromX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* Después (fondo) */}
      <img src={img('demo-interior', 1200)} alt="Después: nevera ordenada con Frigojefe" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      {/* Antes (recortado) */}
      <motion.img style={{ clipPath: clip }} src={img('demo-interior-desorden', 1200)} alt="Antes: nevera desordenada" className="absolute inset-0 h-full w-full object-cover" draggable={false} />

      <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-snow">Antes</span>
      <span className="absolute right-4 top-4 rounded-full bg-fresh px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink">Después</span>

      <motion.div style={{ left }} className="absolute inset-y-0 w-0">
        <div className="absolute inset-y-0 -left-px w-[2px] bg-snow/90 shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
        <button
          type="button"
          aria-label="Desliza para comparar"
          className="absolute left-0 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-snow text-ink shadow-xl"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') pos.set(Math.max(0, pos.get() - 5))
            if (e.key === 'ArrowRight') pos.set(Math.min(100, pos.get() + 5))
            setTouched(true)
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
        </button>
      </motion.div>
    </div>
  )
}
