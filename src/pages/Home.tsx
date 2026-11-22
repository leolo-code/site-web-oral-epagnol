import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, Camera, Clock, Leaf, ScanLine, Smartphone, Sparkles, Utensils } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BeforeAfter } from '../components/BeforeAfter'
import { Fridge, FridgeScreen } from '../components/Fridge'
import { HudTag } from '../components/Hud'
import { Reveal, SectionHead, WordsReveal } from '../components/Reveal'
import { MONTHLY, PRICE, segmentation } from '../data/campaign'
import { img } from '../lib/img'

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <DemoTeaser />
      <ForWho />
      <Design />
      <BuyCta />
    </>
  )
}

/* ---------------- HERO ---------------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const fx = useTransform(sx, (v) => v * 14)
  const fy = useTransform(sy, (v) => v * 10)
  const tx = useTransform(sx, (v) => v * -26)
  const ty = useTransform(sy, (v) => v * -18)

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-16"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
    >
      {/* fondo */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_40%,#15191a_0%,#0a0b0c_70%)]" />
      <motion.div aria-hidden className="absolute right-[8%] top-[20%] h-[40vmax] w-[40vmax] rounded-full bg-fresh/[0.06] blur-[120px]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 8, repeat: Infinity }} />

      <div className="container-x relative grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 pt-10 lg:pt-0">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Nueva nevera inteligente · 2027
          </motion.p>
          <h1 className="mt-6 text-[clamp(2.9rem,7.4vw,6.4rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            {['Tu nevera', 'piensa', 'por ti.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 2 ? 'steel-text' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="mt-7 max-w-md text-[18px] leading-relaxed text-steel/75" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9 }}>
            Frigojefe reconoce tus alimentos, te avisa antes de que caduquen y te propone recetas.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.9 }}>
            <a href="#problema" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Descubre Frigojefe <ArrowRight size={18} />
            </a>
            <Link to="/funciones" className="btn btn-ghost">
              Explora sus funciones
            </Link>
          </motion.div>
        </motion.div>

        {/* producto */}
        <motion.div style={{ y, scale }} className="relative mx-auto w-full max-w-[560px]">
          <motion.div style={{ x: fx, y: fy }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: 'brightness(0)' }}
              animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
              transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img src={img('ref-01-frente', 1400)} srcSet={`${img('ref-01-frente', 800)} 800w, ${img('ref-01-frente', 1400)} 1400w`} sizes="(max-width: 1024px) 90vw, 560px" alt="Nevera Frigojefe de cuatro puertas, acabado negro mate" className="w-full mix-blend-lighten [mask-image:radial-gradient(ellipse_58%_62%_at_50%_50%,#000_60%,transparent_92%)]" fetchPriority="high" />
              {/* barrido de luz sobre el acero */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-[8%] left-[23%] right-[23%] overflow-hidden mix-blend-screen"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
              >
                <motion.div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" initial={{ x: '-120%', skewX: -14 }} animate={{ x: '360%' }} transition={{ duration: 1.6, delay: 0.9, ease: [0.65, 0, 0.35, 1] }} />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div style={{ x: tx, y: ty }} className="pointer-events-none absolute inset-0">
            <HudTag className="left-[-4%] top-[30%]" delay={2} tone="amber" title="Tomates" detail="Consumir pronto" />
            <HudTag className="right-[-2%] top-[18%]" delay={2.3} title="Receta sugerida" detail="Pasta con verduras" />
            <HudTag className="bottom-[26%] right-[-6%]" delay={2.6} title="Leche" detail="Se acaba mañana" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: fade }}>
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <motion.span className="h-2 w-[3px] rounded-full bg-snow/70" animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  )
}

/* ---------------- PROBLEMA ---------------- */
const questions = [
  { q: '¿Cuántas veces has tirado comida sin darte cuenta?', tag: 'Desperdicio' },
  { q: '¿Nunca sabes qué cocinar?', tag: 'Inspiración' },
  { q: '¿Compras productos que ya tienes en casa?', tag: 'Organización' },
]

function Problem() {
  return (
    <section id="problema" className="relative py-28 md:py-40">
      <div className="container-x">
        <p className="eyebrow">El problema</p>
        <div className="mt-10 space-y-14 md:space-y-20">
          {questions.map((item, i) => (
            <div key={item.q} className="grid items-baseline gap-4 md:grid-cols-[120px_1fr]">
              <Reveal>
                <span className="font-mono text-sm text-steel/40">0{i + 1} · {item.tag}</span>
              </Reveal>
              <WordsReveal text={item.q} className="text-[clamp(1.9rem,4.8vw,4rem)] font-bold leading-[1.05] text-snow" />
            </div>
          ))}
        </div>

        <div className="mt-28 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead eyebrow="Antes / Después" title="Mismo frigorífico. Otra vida." intro="Desliza y compara. Con Frigojefe, todo está a la vista y nada se olvida." />
          </div>
          <Reveal>
            <BeforeAfter />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SOLUCIÓN ---------------- */
const benefits = [
  { icon: Clock, title: 'Ahorra tiempo', text: 'Sabes qué tienes sin abrir la puerta.' },
  { icon: Leaf, title: 'Reduce el desperdicio', text: 'Te avisa antes de que algo se estropee.' },
  { icon: Utensils, title: 'Come mejor', text: 'Recetas sanas con lo que ya tienes.' },
]

function Solution() {
  return (
    <section className="relative overflow-hidden bg-ink-2 py-28 md:py-36">
      <div className="container-x">
        <SectionHead eyebrow="La solución" title="Frigojefe ve, entiende y te ayuda." />
        <Reveal className="relative mt-14 overflow-hidden rounded-[28px]">
          <ParallaxImage src={img('life-01-cocina', 1920)} srcSmall={img('life-01-cocina', 960)} alt="Una madre y su hijo abren la nevera Frigojefe en una cocina luminosa de Barcelona" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <HudTag className="left-[50%] top-[14%] hidden sm:flex" delay={0.4} title="Hola, Marta" detail="3 recetas para hoy" />
          <HudTag className="bottom-[10%] left-[6%]" delay={0.6} tone="amber" title="Fresas" detail="Mejor hoy o mañana" />
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-white/[0.07] bg-graphite/60 p-7 transition-colors duration-500 hover:border-fresh/30">
                <b.icon className="text-fresh" size={26} strokeWidth={1.6} />
                <h3 className="mt-8 text-2xl font-bold">{b.title}</h3>
                <p className="mt-2 text-steel/65">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ParallaxImage({ src, srcSmall, alt }: { src: string; srcSmall: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden md:aspect-[16/8]">
      <motion.img style={{ y, scale: 1.18 }} src={src} srcSet={`${srcSmall} 960w, ${src} 1920w`} sizes="(max-width: 1240px) 100vw, 1160px" alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
}

/* ---------------- CÓMO FUNCIONA ---------------- */
const steps = [
  { icon: Camera, title: 'Ve', text: '4 cámaras discretas reconocen cada alimento.' },
  { icon: Sparkles, title: 'Entiende', text: 'La IA estima la frescura y aprende tus hábitos.' },
  { icon: Smartphone, title: 'Te ayuda', text: 'Avisos, recetas y lista de la compra en tu móvil.' },
]

function HowItWorks() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Cómo funciona" title="Tres pasos. Cero esfuerzo." />
          <div className="mt-12 space-y-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="flex gap-5 rounded-2xl border border-white/[0.06] p-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-fresh/10 text-fresh">
                    <s.icon size={22} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="mt-1 text-steel/65">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="relative overflow-hidden rounded-[28px]">
          <img src={img('det-01-camara', 1920)} srcSet={`${img('det-01-camara', 960)} 960w, ${img('det-01-camara', 1920)} 1920w`} sizes="(max-width: 1024px) 100vw, 580px" alt="Cámara discreta en el techo interior de la nevera" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div className="absolute left-[45%] top-[28%]">
            <span className="block h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fresh/70" style={{ animation: 'pulse-ring 2.4s ease-out infinite' }} />
          </div>
          <HudTag className="bottom-[12%] left-[8%]" delay={0.3} title="Cámara 2/4" detail="Estante central" icon={<ScanLine size={13} />} />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- DEMO TEASER ---------------- */
function DemoTeaser() {
  const [open, setOpen] = useState(false)
  return (
    <section className="relative overflow-hidden bg-ink-2 py-28 md:py-36">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fresh/[0.04] blur-[140px]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHead eyebrow="Pruébala" title="Abre la puerta. Mira lo que ve." intro="Haz clic en la nevera. Después, prueba la demo completa." />
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <button className="btn btn-fresh" onClick={() => setOpen((o) => !o)}>
              {open ? 'Cerrar la nevera' : 'Abrir la nevera'}
            </button>
            <Link to="/demo" className="btn btn-ghost">
              Demo completa <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
        <Reveal>
          <button type="button" onClick={() => setOpen((o) => !o)} className="mx-auto block w-[min(78vw,380px)] cursor-pointer" aria-label={open ? 'Cerrar la nevera' : 'Abrir la nevera'}>
            <Fridge open={open} scanning={open} screen={<FridgeScreen />} />
          </button>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- PARA QUIÉN ---------------- */
function ForWho() {
  return (
    <section className="bg-porcelain py-28 text-ink md:py-36">
      <div className="container-x">
        <SectionHead light eyebrow="Para quién" title="Para familias con mucha vida y poco tiempo." />
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
            <div className="grid sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1 xl:grid-cols-[0.9fr_1.1fr]">
              <img src={img('per-01-marta', 900)} alt="Marta, 43 años, en su cocina de Barcelona" loading="lazy" className="h-full max-h-[420px] w-full object-cover sm:max-h-none" />
              <div className="p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fresh-2">Clienta ideal</p>
                <h3 className="mt-3 text-3xl font-bold">Marta, 43 años</h3>
                <p className="mt-1 text-ink/55">Barcelona · pareja y 2 hijos · trabaja</p>
                <ul className="mt-6 space-y-3 text-[15px]">
                  {['Tiene poco tiempo para cocinar.', 'Olvida alimentos en la nevera.', 'Compra cosas que ya tiene.'].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-2xl bg-fresh/15 px-4 py-3 text-[15px] font-medium text-ink">Con Frigojefe, organiza la semana en 5 minutos.</p>
              </div>
            </div>
          </Reveal>
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {segmentation.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-ink/[0.07] bg-white/70 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">{s.k}</p>
                  <p className="mt-3 text-xl font-semibold leading-snug">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- DISEÑO ---------------- */
function Design() {
  const [finish, setFinish] = useState<'negro' | 'inox'>('negro')
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead eyebrow="Diseño" title="Elegante por fuera. Brillante por dentro." intro="Cuatro puertas, pantalla de 21 pulgadas y acabados premium." />
          <Reveal delay={0.2} className="mt-10 inline-flex rounded-full border border-white/10 p-1">
            {(['negro', 'inox'] as const).map((f) => (
              <button key={f} onClick={() => setFinish(f)} className={`relative rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors ${finish === f ? 'text-ink' : 'text-steel/70'}`}>
                {finish === f && <motion.span layoutId="finish" className="absolute inset-0 rounded-full bg-snow" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{f === 'negro' ? 'Negro mate' : 'Inox'}</span>
              </button>
            ))}
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/[0.07] pt-8">
              {[
                ['635 L', 'Capacidad'],
                ['21"', 'Pantalla'],
                ['4', 'Cámaras'],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="text-[13px] text-steel/50">{k}</dt>
                  <dd className="mt-1 font-display text-3xl font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <div className="relative grid grid-cols-[1.4fr_1fr] gap-4">
          <Reveal className="relative overflow-hidden rounded-[28px] bg-black">
            <motion.img
              key={finish}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src={img(finish === 'negro' ? 'ref-02-tres-cuartos' : 'ref-04-inox', 800)}
              alt={finish === 'negro' ? 'Frigojefe negro mate, vista de tres cuartos' : 'Frigojefe acabado inox'}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <div className="grid gap-4">
            <Reveal delay={0.1} className="overflow-hidden rounded-[28px] bg-black">
              <img src={img('ref-03-pantalla', 1200)} alt="Detalle de la pantalla táctil de 21 pulgadas" loading="lazy" className="aspect-square h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={0.2} className="overflow-hidden rounded-[28px] bg-black">
              <img src={img('interior-full', 1200)} alt="Interior iluminado y ordenado" loading="lazy" className="aspect-square h-full w-full object-cover object-top" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CTA ---------------- */
function BuyCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(50%_60%_at_50%_100%,rgba(123,216,143,0.12),transparent)]" />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow">Disponible en septiembre</p>
        </Reveal>
        <WordsReveal text="Menos estrés. Más sabor." className="mx-auto mt-5 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.98]" />
        <Reveal delay={0.2}>
          <p className="mt-8 text-lg text-steel/70">
            <span className="font-display text-3xl font-bold text-snow">{PRICE.toLocaleString('es-ES')} €</span>
            <span className="mx-3 text-steel/30">·</span>
            o desde {MONTHLY} €/mes
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/comprar" className="btn btn-primary">
              Comprar ahora <ArrowRight size={18} />
            </Link>
            <Link to="/demo" className="btn btn-ghost">
              Ver la demo
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
