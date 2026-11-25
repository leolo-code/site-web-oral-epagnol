import { AnimatePresence, motion } from 'motion/react'
import { Download, Maximize2, X } from 'lucide-react'
import { useState } from 'react'
import { HudTag } from '../components/Hud'
import { DafoMatrix, Distribution, Fidelizacion, FourPCards, MediaPlanTimeline, PositioningMap, PriceBreakdown, PriceOptions } from '../components/Marketing'
import { Reveal, SectionHead, WordsReveal } from '../components/Reveal'
import { AnalysisPanel, Poster, TikTokPlayer, WebSupport } from '../components/Supports'
import { segmentation, supports, type SupportId } from '../data/campaign'
import { img, media } from '../lib/img'

export const objectives = [
  { k: 'Dar a conocer', v: 'Que las familias descubran Frigojefe.', o: 'Informar' },
  { k: 'Convencer', v: 'Mostrar que ahorra tiempo y comida.', o: 'Persuadir' },
  { k: 'Fidelizar', v: 'Que la marca se quede en la memoria.', o: 'Recordar' },
]

const sections = [
  ['objetivo', 'Objetivo'],
  ['cliente', 'Cliente'],
  ['precio', 'Precio'],
  ['estrategia', '4P y DAFO'],
  ['soportes', 'Soportes'],
  ['plan', 'Plan de medios'],
] as const

export default function Campana() {
  return (
    <>
      {/* cabecera */}
      <section className="relative overflow-hidden pb-20 pt-36 md:pt-44">
        <div aria-hidden className="absolute left-[-10%] top-0 h-[50vmax] w-[50vmax] rounded-full bg-fresh/[0.05] blur-[140px]" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow">Campaña de lanzamiento · Septiembre 2027</p>
          </Reveal>
          <WordsReveal as="h1" text="Una campaña para la vuelta al cole." className="mt-5 max-w-4xl text-[clamp(2.6rem,6.5vw,5.6rem)] font-extrabold leading-[0.98]" />
          <Reveal delay={0.25}>
            <nav className="mt-10 flex flex-wrap gap-2">
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }} className="rounded-full border border-white/10 px-4 py-2 text-[14px] text-steel/80 transition-colors hover:border-fresh/50 hover:text-snow">
                  {label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* objetivo */}
      <section id="objetivo" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Nuestra misión" title="Ayudar a las familias a comer mejor, sin perder tiempo." />
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {objectives.map((o, i) => (
              <Reveal key={o.k} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-white/[0.07] bg-graphite/50 p-7">
                  <span className="font-mono text-sm text-steel/40">0{i + 1}</span>
                  <p className="mt-6 text-2xl font-bold">{o.k}</p>
                  <p className="mt-2 text-steel/65">{o.v}</p>
                  <span className="mt-6 inline-block rounded-full bg-fresh/12 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fresh">{o.o}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cliente */}
      <section id="cliente" className="bg-porcelain py-24 text-ink md:py-32">
        <div className="container-x">
          <SectionHead light eyebrow="Segmentación" title="¿A quién le hablamos?" />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {segmentation.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.06}>
                  <div className="h-full rounded-3xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">{s.k}</p>
                    <p className="mt-3 text-xl font-semibold leading-snug">{s.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="relative overflow-hidden rounded-[28px]">
              <img src={img('per-01-marta', 900)} alt="Marta, la clienta ideal" loading="lazy" className="h-full max-h-[620px] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-7 pt-24 text-snow">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fresh">Clienta ideal</p>
                <p className="mt-2 text-3xl font-bold">Marta, 43 años</p>
                <p className="mt-1 text-steel/80">Directora de proyectos · 2 hijos · Barcelona</p>
                <p className="mt-4 max-w-sm text-[15px] text-snow/90">«Quiero comer sano, pero no tengo tiempo de pensar qué cocinar.»</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* posicionamiento */}
      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Posicionamiento" title="La única nevera que piensa." intro="Premium, inteligente y pensada para la familia." />
            <Reveal delay={0.2}>
              <div className="mt-10 rounded-3xl border border-fresh/25 bg-fresh/[0.05] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fresh">Nuestra promesa</p>
                <p className="mt-2 text-2xl font-bold">Menos desperdicio. Más tiempo. Mejor comida.</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="mx-auto w-full max-w-[520px]">
            <PositioningMap />
          </Reveal>
        </div>
      </section>

      {/* precio */}
      <section id="precio" className="bg-ink-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Precio" title="Un precio premium, pero accesible." />
          <Reveal className="mt-12 rounded-[28px] border border-white/[0.07] bg-graphite/40 p-6 md:p-10">
            <PriceBreakdown />
          </Reveal>
          <p className="mt-16 font-mono text-[11.5px] uppercase tracking-[0.18em] text-steel/50">Tres hipótesis</p>
          <div className="mt-5">
            <PriceOptions />
          </div>
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-3xl border border-white/[0.07] p-6 text-[15px] text-steel/75">
              <span><b className="text-snow">Paquete:</b> instalación + 5 años de garantía</span>
              <span><b className="text-snow">Freemium:</b> app gratis · Frigojefe Plus 4,99 €/mes</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4P + DAFO */}
      <section id="estrategia" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Marketing mix" title="Las 4P." />
          <div className="mt-12">
            <FourPCards />
          </div>
          <div className="mt-28">
            <SectionHead eyebrow="Análisis" title="DAFO." />
            <div className="mt-12">
              <DafoMatrix />
            </div>
          </div>
        </div>
      </section>

      {/* distribución + fidelización */}
      <section className="bg-ink-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Distribución" title="Canal híbrido, distribución selectiva." />
          <Reveal className="mt-12 rounded-[28px] border border-white/[0.07] p-6 md:p-10">
            <Distribution />
          </Reveal>
          <div className="mt-28">
            <SectionHead eyebrow="Fidelización" title="Las 3C." />
            <div className="mt-12">
              <Fidelizacion />
            </div>
          </div>
        </div>
      </section>

      {/* soportes */}
      <Supports />

      {/* plan de medios */}
      <section id="plan" className="bg-ink-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Plan de medios" title="Seis semanas para dejar huella." intro="Primero curiosidad, luego información y venta, después experiencia." />
          <Reveal className="mt-14 rounded-[28px] border border-white/[0.07] bg-graphite/30 p-6 pt-10 md:p-10 md:pt-12">
            <MediaPlanTimeline />
          </Reveal>
        </div>
      </section>

      {/* cierre */}
      <section className="relative overflow-hidden py-32 md:py-44">
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(50%_60%_at_50%_100%,rgba(123,216,143,0.1),transparent)]" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow">Para terminar</p>
          </Reveal>
          <WordsReveal text="«La buena publicidad vende el producto hoy y construye la marca mañana.»" className="mx-auto mt-6 max-w-4xl text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold leading-[1.1]" />
          <Reveal delay={0.4}>
            <p className="mt-6 text-steel/60">Luis Bassat</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* ---------------- SOPORTES ---------------- */
function Supports() {
  const [active, setActive] = useState<SupportId>('tiktok')
  const [posterOpen, setPosterOpen] = useState(false)
  return (
    <section id="soportes" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Soportes" title="Tres soportes. Un mensaje." />
        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-2">
          {supports.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)} className={`relative rounded-full px-5 py-2.5 text-[14.5px] font-medium transition-colors ${active === s.id ? 'text-ink' : 'border border-white/10 text-steel/75 hover:text-snow'}`}>
              {active === s.id && <motion.span layoutId="support-pill" className="absolute inset-0 rounded-full bg-snow" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{s.name}</span>
            </button>
          ))}
        </Reveal>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
              <div className="mx-auto flex flex-col items-center">
                {active === 'tiktok' && (
                  <TikTokPlayer width={320} />
                )}
                {active === 'cartel' && (
                  <>
                    <button onClick={() => setPosterOpen(true)} className="group relative block overflow-hidden rounded-xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10" aria-label="Ver el cartel en grande">
                      <Poster width={340} />
                      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-snow opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 size={16} />
                      </span>
                    </button>
                    <div className="mt-5 flex gap-2">
                      <a href={media('cartel-frigojefe.png')} download className="btn btn-ghost !h-10 !px-4 text-[13.5px]">
                        <Download size={15} /> PNG
                      </a>
                      <a href={media('cartel-frigojefe.pdf')} download className="btn btn-ghost !h-10 !px-4 text-[13.5px]">
                        <Download size={15} /> PDF 50×70
                      </a>
                    </div>
                  </>
                )}
                {active === 'web' && <WebSupport width={Math.min(560, typeof window !== 'undefined' ? window.innerWidth - 40 : 560)} />}
                {active === 'feria' && (
                  <div className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] lg:w-[560px]">
                    <img src={img('stand-01-feria', 1920)} alt="Stand de Frigojefe en una feria tecnológica" className="aspect-[4/3] w-full object-cover" />
                    <HudTag className="left-[6%] top-[8%]" title="Cocina Frigojefe" detail="Demo en directo" />
                  </div>
                )}
              </div>
              <div className="lg:pt-4">
                <h3 className="text-3xl font-bold">{supports.find((s) => s.id === active)!.name}</h3>
                <div className="mt-6">
                  <AnalysisPanel id={active} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {posterOpen && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-6 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPosterOpen(false)}>
            <button className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-snow" aria-label="Cerrar">
              <X />
            </button>
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
              <Poster width={Math.min(window.innerWidth - 48, (window.innerHeight - 48) / 1.4)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
