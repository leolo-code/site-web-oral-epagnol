import { AnimatePresence, motion, useInView } from 'motion/react'
import { ArrowRight, Camera, ChefHat, Leaf, ListChecks, Mic, PieChart, ScanEye, CalendarDays } from 'lucide-react'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { HudTag } from '../components/Hud'
import { Reveal, SectionHead, WordsReveal } from '../components/Reveal'
import { CameraScreen, FreshnessScreen, InventoryScreen, MenuScreen, NutritionScreen, PhoneMockup, PushNotification, RecipeScreen, ShoppingScreen, VoiceScreen } from '../components/Screens'
import { img } from '../lib/img'

export const features: { id: string; icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>; title: string; text: string; screen: () => React.ReactNode }[] = [
  { id: 'reconoce', icon: ScanEye, title: 'Reconoce tus alimentos', text: 'Las cámaras ven lo que entra y lo que sale.', screen: () => <InventoryScreen /> },
  { id: 'frescura', icon: Leaf, title: 'Estima la frescura', text: 'Te avisa antes de que algo se estropee.', screen: () => <FreshnessScreen /> },
  { id: 'recetas', icon: ChefHat, title: 'Recetas con lo que tienes', text: 'Ideas rápidas, sin ir al supermercado.', screen: () => <RecipeScreen /> },
  { id: 'menu', icon: CalendarDays, title: 'Menú de la semana', text: 'Organiza las comidas en 5 minutos.', screen: () => <MenuScreen /> },
  { id: 'compra', icon: ListChecks, title: 'Lista de la compra', text: 'Se escribe sola. Nada repetido.', screen: () => <ShoppingScreen /> },
  { id: 'nutricion', icon: PieChart, title: 'Nutrición', text: 'Calorías y equilibrio de cada plato.', screen: () => <NutritionScreen /> },
  { id: 'camara', icon: Camera, title: 'Mira dentro desde el móvil', text: '¿Queda leche? Compruébalo en el súper.', screen: () => <CameraScreen src={img('demo-interior', 1200)} /> },
  { id: 'voz', icon: Mic, title: 'Asistente de voz', text: 'Pregunta. Tu nevera responde.', screen: () => <VoiceScreen /> },
]

export default function Funciones() {
  const [active, setActive] = useState(0)
  return (
    <>
      {/* cabecera */}
      <section className="relative overflow-hidden pb-16 pt-36 md:pt-44">
        <div aria-hidden className="absolute right-[-10%] top-0 h-[50vmax] w-[50vmax] rounded-full bg-fresh/[0.05] blur-[140px]" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow">Funciones</p>
          </Reveal>
          <WordsReveal as="h1" text="8 funciones. Una sola nevera." className="mt-5 max-w-4xl text-[clamp(2.6rem,6.5vw,5.6rem)] font-extrabold leading-[0.98]" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-steel/70">En la pantalla de la puerta y en tu móvil.</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {features.map((f, i) => (
              <Reveal key={f.id} delay={0.05 * i}>
                <a href={`#f-${f.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`f-${f.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.07] bg-graphite/50 transition-colors hover:border-fresh/40">
                  <f.icon size={22} strokeWidth={1.6} className="text-steel transition-colors group-hover:text-fresh" />
                  <span className="font-mono text-[10px] text-steel/40">0{i + 1}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* recorrido con móvil fijo */}
      <section className="relative pb-28">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            {features.map((f, i) => (
              <FeatureBlock key={f.id} index={i} onActive={setActive} />
            ))}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-330px)] py-6">
              <div className="relative">
                <div aria-hidden className="absolute inset-[-20%] rounded-full bg-fresh/[0.07] blur-[90px]" />
                <PhoneMockup width={320}>
                  <AnimatePresence mode="wait">
                    <motion.div key={active} className="h-full" initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                      {features[active].screen()}
                    </motion.div>
                  </AnimatePresence>
                </PhoneMockup>
                <div className="absolute -right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                  {features.map((f, i) => (
                    <span key={f.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-5 bg-fresh' : 'w-1.5 bg-white/20'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* notificaciones */}
      <section className="relative overflow-hidden bg-ink-2 py-28 md:py-36">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <SectionHead eyebrow="Siempre contigo" title="Te avisa en el momento justo." intro="Sin saturar: solo lo importante." />
          <div className="relative mx-auto w-full max-w-md space-y-3">
            {[
              { t: 'Tomates', d: 'Consumir en 2 días. ¿Pasta esta noche?' },
              { t: 'Leche', d: 'Se acaba mañana. Añadida a la lista.' },
              { t: 'Receta del día', d: 'Tortilla de calabacín · 15 min' },
            ].map((n, i) => (
              <Reveal key={n.t} delay={i * 0.15} y={20}>
                <PushNotification title={n.t} text={n.d} className={i === 1 ? 'ml-8' : ''} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* imagen abierta */}
      <section className="relative py-28 md:py-36">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[28px]">
            <img src={img('open-01-abierto', 1400)} alt="Frigojefe abierto con el interior iluminado" loading="lazy" className="aspect-[16/10] w-full object-cover md:aspect-[16/8]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 max-w-sm md:bottom-14 md:left-14">
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight">Pruébalo tú mismo.</h2>
              <Link to="/demo" className="btn btn-fresh mt-6">
                Abrir la demo <ArrowRight size={18} />
              </Link>
            </div>
            <HudTag className="right-[8%] top-[14%] hidden md:flex" title="12 alimentos" detail="Escaneo completo" />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function FeatureBlock({ index, onActive }: { index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])
  const f = features[index]
  return (
    <div id={`f-${f.id}`} ref={ref} className="flex min-h-[auto] flex-col justify-center py-14 lg:min-h-[78vh] lg:py-0">
      <motion.div initial={{ opacity: 0.25 }} animate={{ opacity: inView ? 1 : 0.25 }} transition={{ duration: 0.5 }} className="max-lg:!opacity-100">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fresh/10 text-fresh">
            <f.icon size={22} strokeWidth={1.7} />
          </span>
          <span className="font-mono text-sm text-steel/40">0{index + 1} / 08</span>
        </div>
        <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.04]">{f.title}</h2>
        <p className="mt-4 max-w-md text-lg text-steel/65">{f.text}</p>
      </motion.div>
      <div className="mt-10 flex justify-center lg:hidden">
        <PhoneMockup width={260}>{f.screen()}</PhoneMockup>
      </div>
    </div>
  )
}
