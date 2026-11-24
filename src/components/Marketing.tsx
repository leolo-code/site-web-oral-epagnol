import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { Globe, Store, Building2, User, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { dafo, fidelizacion, fourP, mediaPlan, LAUNCH_DATE, OUR_MARGIN, FULL_COST, PRICE, RETAIL_MARGIN, priceOptions, MONTHLY } from '../data/campaign'

/* Contador animado */
export function CountUp({ to, duration = 1.6, suffix = '', className = '', start = true }: { to: number; duration?: number; suffix?: string; className?: string; start?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const v = useMotionValue(0)
  const text = useTransform(v, (n) => Math.round(n).toLocaleString('es-ES') + suffix)
  useEffect(() => {
    if (!inView || !start) return
    const c = animate(v, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [inView, start, to, duration, v])
  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </motion.span>
  )
}

/* Desglose del precio: coste → nuestro margen → margen tienda → IVA */
const IVA = PRICE - Math.round(PRICE / 1.21)
const priceParts = [
  { k: 'Coste completo', v: FULL_COST, c: '#3a3f45', t: 'text-snow' },
  { k: 'Nuestro margen (≈40 %)', v: OUR_MARGIN, c: '#7BD88F', t: 'text-ink' },
  { k: 'Margen tienda', v: RETAIL_MARGIN, c: '#C9CDD2', t: 'text-ink' },
  { k: 'IVA 21 %', v: IVA, c: '#F2B35B', t: 'text-ink' },
]

export function PriceBreakdown({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <div ref={ref}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={`text-sm ${light ? 'text-ink/50' : 'text-steel/55'}`}>Precio final</p>
          <p className="font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none tracking-tight">
            <CountUp to={PRICE} /> €
          </p>
        </div>
        <p className={`pb-2 text-right text-sm ${light ? 'text-ink/60' : 'text-steel/65'}`}>
          o <span className="font-semibold">{MONTHLY} €/mes</span>
          <br />
          en 36 meses
        </p>
      </div>
      <div className="mt-8 flex h-16 w-full overflow-hidden rounded-2xl">
        {priceParts.map((p, i) => (
          <motion.div
            key={p.k}
            className={`flex items-center justify-center overflow-hidden font-mono text-[12px] font-semibold ${p.t}`}
            style={{ background: p.c }}
            initial={{ width: '0%' }}
            animate={inView ? { width: `${(p.v / PRICE) * 100}%` } : {}}
            transition={{ duration: 1.1, delay: 0.2 + i * 0.25, ease: [0.65, 0, 0.35, 1] }}
          >
            <span className="whitespace-nowrap px-2">{p.v.toLocaleString('es-ES')} €</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
        {priceParts.map((p) => (
          <div key={p.k} className="flex items-center gap-2 text-[13px]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.c }} />
            <span className={light ? 'text-ink/65' : 'text-steel/70'}>{p.k}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Las 3 hipótesis de precio */
export function PriceOptions({ light = false }: { light?: boolean }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {priceOptions.map((o, i) => (
        <motion.div
          key={o.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.7 }}
          className={`relative rounded-3xl p-6 ${o.chosen ? 'bg-fresh text-ink shadow-[0_30px_80px_-30px_rgba(123,216,143,0.6)] md:-translate-y-3' : light ? 'border border-ink/10 bg-white' : 'border border-white/[0.08] bg-graphite/60'}`}
        >
          {o.chosen && <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-fresh"><Check size={12} /> Elegida</span>}
          <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${o.chosen ? 'text-ink/60' : 'opacity-50'}`}>Hipótesis {o.id}</p>
          <p className="mt-3 font-display text-4xl font-extrabold">{o.price.toLocaleString('es-ES')} €</p>
          <p className="mt-1 text-sm font-semibold">{o.strategy}</p>
          <p className={`mt-4 text-sm ${o.chosen ? 'text-ink/75' : 'opacity-60'}`}>{o.verdict}</p>
          <p className={`mt-4 font-mono text-[12px] ${o.chosen ? 'text-ink/70' : 'opacity-50'}`}>Margen: {o.margin}</p>
        </motion.div>
      ))}
    </div>
  )
}

/* 4P con tarjetas que giran */
export function FourPCards({ autoFlip = false }: { autoFlip?: boolean }) {
  const [flipped, setFlipped] = useState<string[]>([])
  useEffect(() => {
    if (!autoFlip) return
    const ids = fourP.map((p) => p.id)
    const timers = ids.map((id, i) => setTimeout(() => setFlipped((f) => [...f, id]), 900 + i * 700))
    return () => timers.forEach(clearTimeout)
  }, [autoFlip])
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {fourP.map((p, i) => {
        const on = flipped.includes(p.id)
        return (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => setFlipped((f) => (on ? f.filter((x) => x !== p.id) : [...f, p.id]))}
            className="relative aspect-[3/4] text-left [perspective:1200px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
          >
            <motion.div className="absolute inset-0 [transform-style:preserve-3d]" animate={{ rotateY: on ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}>
              <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-gradient-to-b from-graphite-2 to-graphite p-6 [backface-visibility:hidden]">
                <span className="font-display text-[clamp(3rem,6vw,5rem)] font-extrabold leading-none text-fresh">P</span>
                <div>
                  <p className="text-2xl font-bold">{p.title}</p>
                  <p className="mt-1 text-sm text-steel/60">{p.short}</p>
                  <p className="mt-4 font-mono text-[10.5px] uppercase tracking-widest text-steel/35">Toca para girar</p>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col rounded-3xl bg-snow p-6 text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-xl font-bold">{p.title}</p>
                <ul className="mt-auto space-y-3">
                  {p.back.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[14.5px] leading-snug">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-fresh-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.button>
        )
      })}
    </div>
  )
}

/* Matriz DAFO */
const dafoStyle = {
  D: 'bg-[#1d1a17] border-amber/20',
  A: 'bg-[#1c1719] border-[#e57373]/20',
  F: 'bg-[#141b16] border-fresh/25',
  O: 'bg-[#141a1c] border-[#7cc8e6]/20',
} as const
const dafoAccent = { D: 'text-amber', A: 'text-[#ef9a9a]', F: 'text-fresh', O: 'text-[#8fd3ee]' } as const

export function DafoMatrix() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {dafo.map((q, i) => (
        <motion.div key={q.id} className={`rounded-3xl border p-6 md:p-7 ${dafoStyle[q.id]}`} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-baseline justify-between">
            <p className={`font-display text-5xl font-extrabold ${dafoAccent[q.id]}`}>{q.id}</p>
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-steel/40">{q.tone === 'internal' ? 'Interno' : 'Externo'}</p>
          </div>
          <p className="mt-2 text-xl font-bold">{q.title}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {q.items.map((it) => (
              <li key={it} className="rounded-xl bg-white/[0.04] px-3 py-2 text-[13.5px] text-steel/85">
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}

/* Mapa de posicionamiento */
const competitors = [
  { name: 'Nevera clásica', x: 18, y: 82 },
  { name: 'Nevera low cost', x: 8, y: 92 },
  { name: 'Nevera con pantalla', x: 70, y: 52 },
  { name: 'Nevera premium sin IA', x: 82, y: 70 },
]
export function PositioningMap() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] rounded-3xl border border-white/[0.07] bg-graphite/40 p-4">
      <div className="absolute inset-x-6 top-1/2 h-px bg-white/10" />
      <div className="absolute inset-y-6 left-1/2 w-px bg-white/10" />
      <span className="absolute bottom-2 right-4 font-mono text-[10.5px] uppercase tracking-widest text-steel/45">Precio +</span>
      <span className="absolute left-4 top-3 font-mono text-[10.5px] uppercase tracking-widest text-steel/45">Inteligencia +</span>
      {competitors.map((c, i) => (
        <motion.div key={c.name} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: `${c.x}%`, top: `${c.y}%` }} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
          <span className="h-3 w-3 rounded-full bg-steel/40" />
          <span className="whitespace-nowrap text-[11.5px] text-steel/50">{c.name}</span>
        </motion.div>
      ))}
      <motion.div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2" style={{ left: '80%', top: '17%' }} initial={{ opacity: 0, scale: 0.3 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 14 }}>
        <span className="relative h-5 w-5 rounded-full bg-fresh">
          <span className="absolute inset-0 rounded-full bg-fresh" style={{ animation: 'pulse-ring 2.2s ease-out infinite' }} />
        </span>
        <span className="whitespace-nowrap rounded-full bg-fresh px-3 py-1 text-[12.5px] font-bold text-ink">Frigojefe</span>
      </motion.div>
    </div>
  )
}

/* Canal híbrido */
export function Distribution() {
  const direct = [
    { icon: Globe, label: 'Web oficial' },
    { icon: Building2, label: 'Showroom Madrid' },
  ]
  const indirect = [{ icon: Store, label: 'Tiendas premium seleccionadas' }]
  const Node = ({ icon: Icon, label, i, tone }: { icon: typeof Globe; label: string; i: number; tone: 'fresh' | 'steel' }) => (
    <motion.div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-graphite/70 px-4 py-3" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12 }}>
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${tone === 'fresh' ? 'bg-fresh/15 text-fresh' : 'bg-white/[0.07] text-steel'}`}>
        <Icon size={17} />
      </span>
      <span className="text-[14.5px] font-medium">{label}</span>
    </motion.div>
  )
  return (
    <div className="grid items-center gap-4 md:grid-cols-[auto_1fr_auto]">
      <div className="flex justify-center">
        <div className="rounded-2xl bg-snow px-5 py-4 text-center font-display font-extrabold tracking-[0.14em] text-ink">FRIGOJEFE</div>
      </div>
      <div className="grid gap-5">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fresh">Directo</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {direct.map((d, i) => (
              <Node key={d.label} {...d} i={i} tone="fresh" />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-steel/60">Indirecto · distribución selectiva</p>
          {indirect.map((d, i) => (
            <Node key={d.label} {...d} i={i + 2} tone="steel" />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-fresh/30 px-5 py-4">
          <User className="text-fresh" />
          <span className="text-sm font-semibold">Cliente</span>
        </div>
      </div>
    </div>
  )
}

/* Fidelización 3C */
export function Fidelizacion({ light = false }: { light?: boolean }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {fidelizacion.map((f, i) => (
        <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className={`rounded-3xl p-6 ${light ? 'bg-white' : 'border border-white/[0.07] bg-graphite/60'}`}>
          <span className="font-display text-5xl font-extrabold text-fresh">C</span>
          <p className="mt-4 text-xl font-bold">{f.title}</p>
          <p className={`mt-2 text-[15px] ${light ? 'text-ink/60' : 'text-steel/65'}`}>{f.text}</p>
        </motion.div>
      ))}
    </div>
  )
}

/* Plan de medios (calendario) */
const DAY = 86400000
const planStart = new Date('2027-08-30').getTime()
const planEnd = new Date('2027-10-11').getTime()
const span = planEnd - planStart
const pct = (d: string) => ((new Date(d).getTime() - planStart) / span) * 100
const barColor: Record<string, string> = { tiktok: '#7BD88F', cartel: '#F4F5F2', web: '#F2B35B', feria: '#8fd3ee' }
const fmt = (d: string) => new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })

export function MediaPlanTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const weeks = Array.from({ length: 6 }, (_, i) => new Date(planStart + i * 7 * DAY))
  return (
    <div ref={ref} className="overflow-x-auto">
      <div className="min-w-[680px]">
        <div className="relative ml-[110px] flex border-b border-white/10 pb-3">
          {weeks.map((w, i) => (
            <div key={i} className="flex-1 font-mono text-[11px] text-steel/50">
              {w.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
            </div>
          ))}
        </div>
        <div className="relative mt-3 space-y-3">
          {/* marca de lanzamiento */}
          <div className="pointer-events-none absolute inset-y-[-12px] left-[110px] right-0">
            <motion.div className="absolute inset-y-0 w-px bg-fresh" style={{ left: `${pct(LAUNCH_DATE)}%` }} initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 0.8 }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-fresh px-2 py-0.5 font-mono text-[10px] font-bold text-ink">Lanzamiento</span>
            </motion.div>
          </div>
          {mediaPlan.map((m, i) => (
            <div key={m.id} className="flex items-center">
              <div className="w-[110px] shrink-0">
                <p className="text-[14.5px] font-semibold">{m.label}</p>
                <p className="text-[11.5px] text-steel/50">{m.objective}</p>
              </div>
              <div className="relative h-12 flex-1 rounded-xl bg-white/[0.025]">
                <motion.div
                  className="absolute inset-y-1.5 flex items-center overflow-hidden rounded-lg px-3"
                  style={{ left: `${pct(m.start)}%`, background: barColor[m.id], transformOrigin: 'left' }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct(m.end) - pct(m.start) + 100 / 42}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: [0.65, 0, 0.35, 1] }}
                >
                  <span className="whitespace-nowrap font-mono text-[11px] font-semibold text-ink">
                    {fmt(m.start)} → {fmt(m.end)} · {m.detail}
                  </span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
