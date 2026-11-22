import { AnimatePresence, motion } from 'motion/react'
import { Check, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { MONTHLY, PRICE } from '../data/campaign'
import { img } from '../lib/img'

const finishes = [
  { id: 'negro', name: 'Negro mate', swatch: 'linear-gradient(135deg,#2a2d31,#0e0f11)', image: 'ref-02-tres-cuartos' },
  { id: 'inox', name: 'Acero inoxidable', swatch: 'linear-gradient(135deg,#e6e8ea,#9ba1a8)', image: 'ref-04-inox' },
] as const

const plans = [
  { id: 'contado', title: 'Pago único', price: `${PRICE.toLocaleString('es-ES')} €`, note: 'IVA incluido' },
  { id: 'cuotas', title: 'En 36 meses', price: `${MONTHLY} €/mes`, note: 'Sin intereses' },
] as const

export default function Comprar() {
  const [finish, setFinish] = useState<(typeof finishes)[number]['id']>('negro')
  const [plan, setPlan] = useState<(typeof plans)[number]['id']>('cuotas')
  const [plus, setPlus] = useState(true)
  const [done, setDone] = useState(false)
  const f = finishes.find((x) => x.id === finish)!

  return (
    <section className="relative min-h-screen pb-24 pt-28 md:pt-32">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* imagen */}
        <div className="lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-[32px] bg-black">
            <AnimatePresence mode="wait">
              <motion.img key={f.id} src={img(f.image, 1400)} alt={`Frigojefe ${f.name}`} className="aspect-[4/5] w-full object-cover" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
            </AnimatePresence>
            <span className="glass absolute left-5 top-5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest">Septiembre 2027</span>
          </div>
        </div>

        {/* configurador */}
        <div>
          <Reveal>
            <p className="eyebrow">Comprar</p>
            <h1 className="mt-3 text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-none">Frigojefe</h1>
            <p className="mt-3 text-lg text-steel/65">Nevera inteligente de 4 puertas · 635 L</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <p className="text-sm font-semibold">Acabado · <span className="font-normal text-steel/60">{f.name}</span></p>
            <div className="mt-3 flex gap-3">
              {finishes.map((x) => (
                <button key={x.id} onClick={() => setFinish(x.id)} className={`relative h-14 w-14 rounded-full p-1 transition-all ${finish === x.id ? 'ring-2 ring-fresh' : 'ring-1 ring-white/15'}`} aria-label={x.name}>
                  <span className="block h-full w-full rounded-full" style={{ background: x.swatch }} />
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <p className="text-sm font-semibold">Forma de pago</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {plans.map((p) => (
                <button key={p.id} onClick={() => setPlan(p.id)} className={`rounded-2xl border p-5 text-left transition-colors ${plan === p.id ? 'border-fresh bg-fresh/[0.07]' : 'border-white/10 hover:border-white/25'}`}>
                  <p className="text-sm text-steel/65">{p.title}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{p.price}</p>
                  <p className="mt-1 text-[12.5px] text-steel/50">{p.note}</p>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <button onClick={() => setPlus((v) => !v)} className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-colors ${plus ? 'border-fresh/50 bg-fresh/[0.05]' : 'border-white/10'}`}>
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border ${plus ? 'border-fresh bg-fresh text-ink' : 'border-white/30'}`}>{plus && <Check size={15} strokeWidth={3} />}</span>
              <span className="flex-1">
                <span className="block font-semibold">Frigojefe Plus</span>
                <span className="block text-[13.5px] text-steel/60">Menús semanales, nutrición avanzada. 3 meses gratis.</span>
              </span>
              <span className="font-mono text-sm">4,99 €/mes</span>
            </button>
          </Reveal>

          <Reveal delay={0.25} className="mt-8 grid grid-cols-3 gap-3">
            {[
              [Truck, 'Entrega gratis'],
              [Wrench, 'Instalación incluida'],
              [ShieldCheck, 'Garantía 5 años'],
            ].map(([Icon, t]) => {
              const I = Icon as typeof Truck
              return (
                <div key={t as string} className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.03] p-4 text-center text-[12.5px] text-steel/75">
                  <I size={20} className="text-fresh" />
                  {t as string}
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={0.3} className="mt-10 border-t border-white/[0.07] pt-8">
            <div className="flex items-end justify-between">
              <span className="text-steel/65">Total</span>
              <span className="font-display text-4xl font-extrabold">{plan === 'cuotas' ? `${MONTHLY} €/mes` : `${PRICE.toLocaleString('es-ES')} €`}</span>
            </div>
            <button onClick={() => setDone(true)} className="btn btn-fresh mt-6 w-full justify-center !h-14 text-base">
              Reservar mi Frigojefe
            </button>
            <p className="mt-3 text-center text-[12.5px] text-steel/45">También en el showroom de Madrid y en tiendas seleccionadas.</p>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {done && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-6 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDone(false)}>
            <motion.div className="w-full max-w-sm rounded-[28px] bg-graphite p-8 text-center" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
              <motion.span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-fresh text-ink" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 15 }}>
                <Check size={30} strokeWidth={3} />
              </motion.span>
              <p className="mt-6 text-2xl font-bold">¡Reserva hecha!</p>
              <p className="mt-2 text-steel/65">Te avisaremos en septiembre.</p>
              <p className="mt-5 text-[12px] text-steel/40">Proyecto académico: no se realiza ningún pago.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
