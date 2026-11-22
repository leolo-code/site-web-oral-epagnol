import { AnimatePresence, motion } from 'motion/react'
import { Bell, Check, ChefHat, Mic, ShoppingCart } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { foods, recipes, shoppingList, statusLabel, weekMenu, type Food } from '../data/fridge'

/* Marco de móvil dibujado en CSS. El contenido vive en un lienzo fijo de 320×660 escalado. */
export function PhoneMockup({ children, width = 300, className = '' }: { children: ReactNode; width?: number; className?: string }) {
  const s = width / 320
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width, height: 660 * s }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: 320, height: 660, transform: `scale(${s})` }}>
        <div className="relative h-full w-full rounded-[48px] bg-[#1b1d20] p-[10px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1.5px_#3a3e44]">
          <div className="relative h-full w-full overflow-hidden rounded-[39px] bg-[#0c0e10]">
            <div className="absolute left-1/2 top-[10px] z-30 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
            <div className="flex h-[46px] items-end justify-between px-7 pb-1 text-[12px] font-semibold text-snow">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="h-[9px] w-[16px] rounded-[3px] border border-snow/70 p-[1px]">
                  <span className="block h-full w-3/4 rounded-[1px] bg-snow" />
                </span>
              </span>
            </div>
            <div className="h-[calc(100%-46px)] overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const statusColor = { fresco: '#7BD88F', pronto: '#F2B35B', revisar: '#C9CDD2' } as const

function ScreenHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="px-5 pt-3">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-fresh">{kicker}</p>
      <h4 className="mt-1 text-[22px] font-bold leading-tight text-snow">{title}</h4>
    </div>
  )
}

export function FreshBar({ value, status }: { value: number; status: Food['status'] }) {
  return (
    <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/10">
      <motion.div className="h-full rounded-full" style={{ background: statusColor[status] }} initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
    </div>
  )
}

/* 1 · Inventario */
export function InventoryScreen() {
  const list = foods.slice(0, 7)
  return (
    <div className="h-full">
      <ScreenHead kicker="Inventario" title="Tu nevera hoy" />
      <div className="mx-5 mt-3 flex gap-2 text-[10.5px]">
        <span className="rounded-full bg-fresh/15 px-2.5 py-1 text-fresh">12 alimentos</span>
        <span className="rounded-full bg-amber/15 px-2.5 py-1 text-amber">5 avisos</span>
      </div>
      <div className="mt-3 space-y-2 px-4">
        {list.map((f, i) => (
          <motion.div key={f.id} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3 py-2.5" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <span className="text-[20px]">{f.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between text-[12.5px]">
                <span className="font-semibold text-snow">{f.name}</span>
                <span className="text-steel/50">{f.qty}</span>
              </div>
              <div className="mt-1.5">
                <FreshBar value={f.freshness} status={f.status} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* 2 · Frescura */
export function FreshnessScreen() {
  const alerts = foods.filter((f) => f.status !== 'fresco').slice(0, 4)
  return (
    <div className="h-full">
      <ScreenHead kicker="Avisos" title="Consumir pronto" />
      <div className="mt-4 space-y-2.5 px-4">
        {alerts.map((f, i) => (
          <motion.div key={f.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-3.5" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-3">
              <span className="text-[22px]">{f.emoji}</span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-snow">{f.name}</p>
                <p className="text-[11px]" style={{ color: statusColor[f.status] }}>{f.note}</p>
              </div>
              <span className="font-mono text-[12px] text-snow">{f.freshness}%</span>
            </div>
          </motion.div>
        ))}
        <p className="px-1 pt-1 text-[10px] leading-snug text-steel/45">Frescura estimada por la IA. Revisa siempre tus alimentos.</p>
      </div>
    </div>
  )
}

/* 3 · Recetas */
export function RecipeScreen({ recipeId = 'pasta' }: { recipeId?: string }) {
  const r = recipes.find((x) => x.id === recipeId) ?? recipes[0]
  return (
    <div className="h-full">
      <ScreenHead kicker="Receta sugerida" title={r.name} />
      <div className="mx-5 mt-3 flex gap-2 text-[10.5px] text-steel/70">
        <span className="rounded-full bg-white/[0.06] px-2.5 py-1">{r.time}</span>
        <span className="rounded-full bg-white/[0.06] px-2.5 py-1">{r.kcal} kcal</span>
        <span className="rounded-full bg-fresh/15 px-2.5 py-1 text-fresh">Usa {r.uses.length} alimentos</span>
      </div>
      <div className="mx-4 mt-4 grid h-[150px] place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1d14] to-[#14100c] text-[64px]">🍝</div>
      <p className="mx-5 mt-4 font-mono text-[9.5px] uppercase tracking-[0.16em] text-steel/50">Con lo que tienes</p>
      <div className="mx-4 mt-2 flex flex-wrap gap-1.5">
        {r.uses.map((id) => {
          const f = foods.find((x) => x.id === id)!
          return (
            <span key={id} className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1.5 text-[11.5px] text-snow">
              {f.emoji} {f.name}
            </span>
          )
        })}
      </div>
      <div className="mx-4 mt-5 flex h-11 items-center justify-center gap-2 rounded-full bg-fresh text-[13px] font-semibold text-ink">
        <ChefHat size={16} /> Empezar a cocinar
      </div>
    </div>
  )
}

/* 4 · Menú semanal */
export function MenuScreen() {
  return (
    <div className="h-full">
      <ScreenHead kicker="Planificación" title="Menú de la semana" />
      <div className="mt-3 space-y-1.5 px-4">
        {weekMenu.map((d, i) => (
          <motion.div key={d.day} className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${i === 1 ? 'bg-fresh/12 ring-1 ring-fresh/40' : 'bg-white/[0.035]'}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <span className={`w-9 font-mono text-[11px] ${i === 1 ? 'text-fresh' : 'text-steel/50'}`}>{d.day}</span>
            <div className="text-[11.5px] leading-snug">
              <p className="text-snow">{d.lunch}</p>
              <p className="text-steel/50">{d.dinner}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* 5 · Lista de la compra */
export function ShoppingScreen() {
  const [done, setDone] = useState<string[]>(['Yogur natural'])
  return (
    <div className="h-full">
      <ScreenHead kicker="Automática" title="Lista de la compra" />
      <div className="mt-3 space-y-3 px-4">
        {shoppingList.map((g) => (
          <div key={g.aisle}>
            <p className="px-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-steel/45">{g.aisle}</p>
            <div className="mt-1.5 space-y-1">
              {g.items.map((it) => {
                const on = done.includes(it)
                return (
                  <button key={it} type="button" onClick={() => setDone((d) => (on ? d.filter((x) => x !== it) : [...d, it]))} className="flex w-full items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-2 text-left text-[12.5px]">
                    <span className={`grid h-[18px] w-[18px] place-items-center rounded-md border transition-colors ${on ? 'border-fresh bg-fresh text-ink' : 'border-white/25'}`}>{on && <Check size={12} strokeWidth={3} />}</span>
                    <span className={on ? 'text-steel/40 line-through' : 'text-snow'}>{it}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-4 mt-4 flex h-10 items-center justify-center gap-2 rounded-full bg-snow text-[12.5px] font-semibold text-ink">
        <ShoppingCart size={15} /> Pedir online
      </div>
    </div>
  )
}

/* 6 · Nutrición */
export function NutritionScreen() {
  const r = recipes[0]
  const total = r.macros.prot + r.macros.carb + r.macros.fat
  const parts = [
    { k: 'Proteínas', v: r.macros.prot, c: '#7BD88F' },
    { k: 'Hidratos', v: r.macros.carb, c: '#F2B35B' },
    { k: 'Grasas', v: r.macros.fat, c: '#C9CDD2' },
  ]
  let acc = 0
  return (
    <div className="h-full">
      <ScreenHead kicker="Nutrición" title="Tu comida de hoy" />
      <div className="relative mx-auto mt-5 h-[170px] w-[170px]">
        <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
          {parts.map((p) => {
            const len = (p.v / total) * 100
            const el = <motion.circle key={p.k} cx="21" cy="21" r="15.9" fill="none" stroke={p.c} strokeWidth="4" strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={-acc} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} />
            acc += len
            return el
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-[30px] font-bold text-snow">{r.kcal}</p>
            <p className="text-[10px] text-steel/50">kcal</p>
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-2 px-5">
        {parts.map((p) => (
          <div key={p.k} className="flex items-center gap-3 text-[12.5px]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.c }} />
            <span className="flex-1 text-steel/70">{p.k}</span>
            <span className="font-mono text-snow">{p.v} g</span>
          </div>
        ))}
      </div>
      <p className="mx-5 mt-5 rounded-2xl bg-fresh/10 px-3 py-2.5 text-[11.5px] text-fresh">Equilibrado. ¡Buena elección!</p>
    </div>
  )
}

/* 7 · Cámara remota (ver el interior desde el súper) */
export function CameraScreen({ src }: { src: string }) {
  return (
    <div className="h-full">
      <ScreenHead kicker="En directo" title="Mira dentro" />
      <div className="relative mx-4 mt-4 overflow-hidden rounded-3xl">
        <img src={src} alt="" className="aspect-[3/4] w-full object-cover" />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[9.5px] text-snow">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-blink" /> LIVE
        </span>
        <motion.div className="absolute inset-x-0 h-[2px] bg-fresh shadow-[0_0_12px_rgba(123,216,143,0.8)]" animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
      <p className="mx-5 mt-3 text-[12px] text-steel/60">¿Queda leche? Míralo desde el supermercado.</p>
    </div>
  )
}

/* 8 · Asistente de voz */
const voiceLines = [
  { who: 'tú', text: '¿Qué puedo cenar hoy?' },
  { who: 'ia', text: 'Tienes huevos y calabacín: ¿una tortilla en 15 minutos?' },
  { who: 'tú', text: 'Perfecto.' },
  { who: 'ia', text: 'Y recuerda: los tomates, mejor mañana.' },
]
export function VoiceScreen() {
  const [n, setN] = useState(1)
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= voiceLines.length ? 1 : v + 1)), 1800)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex h-full flex-col">
      <ScreenHead kicker="Asistente" title="Habla con tu nevera" />
      <div className="mt-4 flex-1 space-y-2 px-4">
        <AnimatePresence initial={false}>
          {voiceLines.slice(0, n).map((l, i) => (
            <motion.div key={i} layout initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-snug ${l.who === 'tú' ? 'ml-auto rounded-br-md bg-snow text-ink' : 'rounded-bl-md bg-white/[0.07] text-snow'}`}>
              {l.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className="flex h-8 items-center gap-[3px]">
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.span key={i} className="w-[3px] rounded-full bg-fresh" animate={{ height: [6, 8 + ((i * 37) % 22), 6] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.04 }} />
          ))}
        </div>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-fresh text-ink shadow-[0_0_0_8px_rgba(123,216,143,0.15)]">
          <Mic size={22} />
        </span>
      </div>
    </div>
  )
}

/* Notificación tipo push */
export function PushNotification({ title, text, className = '' }: { title: string; text: string; className?: string }) {
  return (
    <div className={`glass flex items-start gap-3 rounded-2xl p-3 ${className}`}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fresh text-ink">
        <Bell size={15} />
      </span>
      <div className="leading-snug">
        <p className="text-[12.5px] font-semibold text-snow">{title}</p>
        <p className="text-[11.5px] text-steel/70">{text}</p>
      </div>
    </div>
  )
}

export { statusLabel, statusColor }
