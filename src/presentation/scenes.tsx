import { AnimatePresence, motion } from 'motion/react'
import { Clock, Leaf, Utensils } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState, type ReactNode } from 'react'
import { BeforeAfter } from '../components/BeforeAfter'
import { Fridge, FridgeScreen } from '../components/Fridge'
import { HudTag } from '../components/Hud'
import { Logo } from '../components/Logo'
import { DafoMatrix, Distribution, Fidelizacion, FourPCards, MediaPlanTimeline, PositioningMap, PriceBreakdown, PriceOptions } from '../components/Marketing'
import { InventoryScreen, PhoneMockup, RecipeScreen, statusColor, VoiceScreen, FreshBar } from '../components/Screens'
import { AnalysisPanel, Poster, RadioPlayer, SITE_URL, TikTokPlayer } from '../components/Supports'
import { segmentation, PRICE, MONTHLY } from '../data/campaign'
import { foods, statusLabel } from '../data/fridge'
import { img } from '../lib/img'
import { objectives } from '../pages/Campana'
import { DemoScreen, useDemoMachine } from '../pages/Demo'

export interface Speaker {
  id: number
  name: string
  part: string
}
export const speakers: Speaker[] = [
  { id: 1, name: 'Hugo', part: 'La idea' },
  { id: 2, name: 'Youssouf', part: 'Producto y cliente' },
  { id: 3, name: 'Romain', part: 'Estrategia' },
  { id: 4, name: 'Léo', part: 'Campaña' },
]

export interface Scene {
  speaker: number
  title: string
  steps?: number
  notes: string
  render: (step: number) => ReactNode
}

/* ---------- piezas de maquetación (lienzo fijo 1600 × 900) ---------- */
const ease = [0.16, 1, 0.3, 1] as const

function In({ children, d = 0, y = 24, className = '' }: { children: ReactNode; d?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, delay: d, ease }}>
      {children}
    </motion.div>
  )
}

function Title({ eyebrow, children, className = '' }: { eyebrow: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <In>
        <p className="font-mono text-[15px] uppercase tracking-[0.2em] text-fresh">{eyebrow}</p>
      </In>
      <In d={0.08}>
        <h2 className="mt-4 text-[64px] font-extrabold leading-[1.02] tracking-[-0.03em]">{children}</h2>
      </In>
    </div>
  )
}

function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`absolute inset-0 px-[110px] pb-[90px] pt-[80px] ${className}`}>{children}</div>
}

/* ---------- escenas específicas ---------- */
function OpeningScene() {
  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_620px] items-center gap-10 px-[120px]">
      <div>
        <motion.div initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.18em' }} transition={{ duration: 1.6, ease }}>
          <Logo className="text-[46px]" />
        </motion.div>
        <h1 className="mt-10 text-[112px] font-extrabold leading-[0.94] tracking-[-0.04em]">
          {['Tu nevera', 'piensa', 'por ti.'].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <motion.span className={`block ${i === 2 ? 'steel-text' : ''}`} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.6 + i * 0.14, ease }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>
      <motion.img src={img('ref-01-frente', 1400)} alt="" className="fade-edges h-[760px] w-auto justify-self-center mix-blend-lighten" initial={{ opacity: 0, scale: 0.94, filter: 'brightness(0)' }} animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }} transition={{ duration: 2.2, delay: 0.3, ease }} />
    </div>
  )
}

const problems = ['¿Cuántas veces has tirado comida sin darte cuenta?', '¿Nunca sabes qué cocinar?', '¿Compras productos que ya tienes en casa?']
function ProblemsScene({ step }: { step: number }) {
  return (
    <Frame className="flex flex-col justify-center">
      <In>
        <p className="font-mono text-[15px] uppercase tracking-[0.2em] text-fresh">El problema</p>
      </In>
      <div className="mt-10 space-y-10">
        {problems.map((q, i) => (
          <motion.p key={q} className="text-[64px] font-bold leading-[1.05] tracking-[-0.025em]" initial={{ opacity: 0, x: -30 }} animate={{ opacity: i <= step ? (i === step ? 1 : 0.3) : 0, x: i <= step ? 0 : -30 }} transition={{ duration: 0.8, ease }}>
            {q}
          </motion.p>
        ))}
      </div>
    </Frame>
  )
}

function SolutionScene() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <Frame className="grid grid-cols-[1fr_auto] items-center gap-16">
      <div>
        <Title eyebrow="La solución">
          Frigojefe:
          <br />
          la nevera con IA.
        </Title>
        <In d={0.4}>
          <p className="mt-8 max-w-[560px] text-[26px] leading-snug text-steel/75">Ve tus alimentos, estima su frescura y te propone recetas.</p>
        </In>
      </div>
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-[330px]">
        <Fridge open={open} scanning={open} screen={<FridgeScreen />} drawers="peek" reflection={false} />
      </button>
    </Frame>
  )
}

const benefitList = [
  { icon: Clock, t: 'Ahorra tiempo', d: 'Sabes qué tienes sin abrir la puerta.' },
  { icon: Leaf, t: 'Reduce el desperdicio', d: 'Te avisa antes de que algo se estropee.' },
  { icon: Utensils, t: 'Come mejor', d: 'Recetas sanas con lo que ya tienes.' },
]
function BenefitsScene({ step }: { step: number }) {
  return (
    <Frame className="flex flex-col justify-center">
      <Title eyebrow="3 beneficios">Más fácil. Más sano. Más ahorro.</Title>
      <div className="mt-16 grid grid-cols-3 gap-6">
        {benefitList.map((b, i) => (
          <motion.div key={b.t} className="rounded-[32px] border border-white/[0.08] bg-graphite/60 p-10" initial={{ opacity: 0, y: 40 }} animate={{ opacity: i <= step ? 1 : 0.15, y: i <= step ? 0 : 20, borderColor: i === step ? 'rgba(123,216,143,0.5)' : 'rgba(255,255,255,0.08)' }} transition={{ duration: 0.7, ease }}>
            <b.icon size={44} strokeWidth={1.5} className="text-fresh" />
            <p className="mt-12 text-[36px] font-bold">{b.t}</p>
            <p className="mt-3 text-[21px] text-steel/65">{b.d}</p>
          </motion.div>
        ))}
      </div>
    </Frame>
  )
}

function ViewsScene() {
  const pics = [
    { s: 'ref-02-tres-cuartos', w: 1400, l: 'Negro mate' },
    { s: 'ref-03-pantalla', w: 1200, l: 'Pantalla 21"' },
    { s: 'ref-04-inox', w: 1400, l: 'Inox' },
  ]
  return (
    <Frame className="flex flex-col">
      <div className="flex items-end justify-between">
        <Title eyebrow="El producto">Elegante y conectada.</Title>
        <In d={0.3} className="flex gap-12 pb-3">
          {[
            ['635 L', 'Capacidad'],
            ['21"', 'Pantalla'],
            ['4', 'Cámaras'],
          ].map(([v, k]) => (
            <div key={k}>
              <p className="text-[15px] text-steel/50">{k}</p>
              <p className="font-display text-[44px] font-bold leading-none">{v}</p>
            </div>
          ))}
        </In>
      </div>
      <div className="mt-10 grid flex-1 grid-cols-3 gap-5">
        {pics.map((p, i) => (
          <motion.div key={p.s} className="relative overflow-hidden rounded-[28px] bg-black" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 + i * 0.15, ease }}>
            <img src={img(p.s, p.w)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-[16px] font-medium">{p.l}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  )
}

function DemoLiveScene() {
  const { phase, open, toggle } = useDemoMachine()
  const [sel, setSel] = useState<string | null>('tomates')
  const f = foods.find((x) => x.id === sel)
  return (
    <Frame className="grid grid-cols-[360px_1fr] items-center gap-[190px] !pl-[230px]">
      <div className="relative">
        <Fridge open={open} scanning={phase === 'scanning'} showHotspots={phase === 'ready'} selectedId={sel} onSelect={setSel} screen={<DemoScreen phase={phase} />} drawers="peek" reflection={false} />
        {!open && (
          <button type="button" onClick={toggle} className="absolute inset-0 grid place-items-center">
            <span className="rounded-full bg-fresh px-7 py-4 text-[18px] font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(123,216,143,0.8)]">Abrir</span>
          </button>
        )}
      </div>
      <div>
        <Title eyebrow="Demo en directo">Abrimos la nevera.</Title>
        <div className="mt-10 h-[300px]">
          <AnimatePresence mode="wait">
            {phase === 'ready' && f ? (
              <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-[620px] rounded-[28px] border border-white/10 bg-graphite/80 p-8">
                <div className="flex items-center gap-5">
                  <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/[0.06] text-[44px]">{f.emoji}</span>
                  <div>
                    <p className="text-[34px] font-bold">{f.name}</p>
                    <p className="text-[18px] text-steel/60">{f.qty}</p>
                  </div>
                  <span className="ml-auto font-display text-[48px] font-bold">{f.freshness}%</span>
                </div>
                <p className="mt-6 text-[20px] font-medium" style={{ color: statusColor[f.status] }}>
                  {statusLabel[f.status]} · {f.note}
                </p>
                <div className="mt-3">
                  <FreshBar value={f.freshness} status={f.status} />
                </div>
                <p className="mt-4 text-[15px] text-steel/45">Frescura estimada por la IA.</p>
              </motion.div>
            ) : (
              <motion.p key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[26px] text-steel/60">
                {phase === 'closed' ? 'Toca la nevera para abrirla.' : 'Escaneando…'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  )
}

function AiScene() {
  const phones = [<InventoryScreen key="a" />, <RecipeScreen key="b" />, <VoiceScreen key="c" />]
  const labels = ['Reconoce', 'Propone', 'Responde']
  return (
    <Frame className="flex flex-col">
      <Title eyebrow="La inteligencia artificial">Ve. Entiende. Te ayuda.</Title>
      <div className="mt-8 flex flex-1 items-start justify-center gap-14">
        {phones.map((p, i) => (
          <motion.div key={i} className="flex flex-col items-center gap-4" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25 + i * 0.18, ease }}>
            <PhoneMockup width={260}>{p}</PhoneMockup>
            <span className="font-mono text-[15px] uppercase tracking-[0.18em] text-fresh">{labels[i]}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  )
}

function SegmentScene() {
  return (
    <Frame className="flex flex-col justify-center">
      <Title eyebrow="Segmentación">¿A quién le hablamos?</Title>
      <div className="mt-14 grid grid-cols-3 gap-5">
        {segmentation.map((s, i) => (
          <motion.div key={s.k} className={`rounded-[28px] border border-white/[0.08] bg-graphite/60 p-8 ${i === 0 ? 'col-span-1' : ''}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease }}>
            <p className="font-mono text-[14px] uppercase tracking-[0.16em] text-steel/45">{s.k}</p>
            <p className="mt-4 text-[28px] font-semibold leading-snug">{s.v}</p>
          </motion.div>
        ))}
      </div>
    </Frame>
  )
}

function MartaScene() {
  return (
    <Frame className="grid grid-cols-[560px_1fr] items-center gap-20">
      <motion.div className="overflow-hidden rounded-[32px]" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease }}>
        <img src={img('per-01-marta', 900)} alt="" className="h-[720px] w-full object-cover" />
      </motion.div>
      <div>
        <Title eyebrow="Clienta ideal">Marta, 43 años.</Title>
        <In d={0.3}>
          <p className="mt-4 text-[24px] text-steel/65">Directora de proyectos · 2 hijos · Barcelona</p>
        </In>
        <div className="mt-10 space-y-5">
          {['Tiene poco tiempo para cocinar.', 'Olvida alimentos en la nevera.', 'Compra cosas que ya tiene.'].map((t, i) => (
            <In key={t} d={0.45 + i * 0.12}>
              <p className="flex items-center gap-5 text-[28px]">
                <span className="h-3 w-3 rounded-full bg-amber" />
                {t}
              </p>
            </In>
          ))}
        </div>
        <In d={0.9}>
          <p className="mt-10 inline-block rounded-3xl bg-fresh/15 px-7 py-5 text-[26px] font-semibold text-fresh">Con Frigojefe: la semana organizada en 5 minutos.</p>
        </In>
      </div>
    </Frame>
  )
}

function PositionScene() {
  return (
    <Frame className="grid grid-cols-[1fr_650px] items-center gap-16">
      <div>
        <Title eyebrow="Posicionamiento">La única nevera que piensa.</Title>
        <In d={0.3}>
          <div className="mt-12 rounded-[28px] border border-fresh/25 bg-fresh/[0.06] p-8">
            <p className="font-mono text-[14px] uppercase tracking-[0.16em] text-fresh">Nuestra promesa</p>
            <p className="mt-3 text-[34px] font-bold leading-tight">Menos desperdicio. Más tiempo. Mejor comida.</p>
          </div>
        </In>
      </div>
      <In d={0.2} className="[zoom:1.25]">
        <PositioningMap />
      </In>
    </Frame>
  )
}

function SupportScene({ id, step, media }: { id: 'tiktok' | 'cartel' | 'radio'; step: number; media: ReactNode }) {
  const names = { tiktok: 'Soporte 1 · TikTok', cartel: 'Soporte 2 · Cartel', radio: 'Soporte 3 · Radio' }
  return (
    <Frame className="grid grid-cols-[auto_1fr] items-center gap-20 !pt-[60px]">
      <In className="flex justify-center">{media}</In>
      <div>
        <In>
          <p className="font-mono text-[15px] uppercase tracking-[0.2em] text-fresh">{names[id]}</p>
        </In>
        <div className="mt-6 [zoom:1.3]">
          <AnalysisPanel id={id} step={step} />
        </div>
      </div>
    </Frame>
  )
}

/* ---------- las 24 escenas ---------- */
export const scenes: Scene[] = [
  // HUGO
  { speaker: 1, title: 'Frigojefe', notes: 'Presentación del grupo · nombre · eslogan', render: () => <OpeningScene /> },
  { speaker: 1, title: 'El problema', steps: 3, notes: 'Desperdicio · inspiración · compras repetidas', render: (s) => <ProblemsScene step={s} /> },
  {
    speaker: 1,
    title: 'Antes / Después',
    notes: 'Deslizar el comparador · nevera desordenada vs ordenada',
    render: () => (
      <Frame className="grid grid-cols-[1fr_560px] items-center gap-20">
        <Title eyebrow="Antes / Después">
          Mismo frigorífico.
          <br />
          Otra vida.
        </Title>
        <In d={0.2}>
          <BeforeAfter className="!aspect-[4/5]" />
        </In>
      </Frame>
    ),
  },
  { speaker: 1, title: 'La solución', notes: 'Cámaras + IA + app · la nevera se abre', render: () => <SolutionScene /> },
  { speaker: 1, title: '3 beneficios', steps: 3, notes: 'Tiempo · desperdicio · salud', render: (s) => <BenefitsScene step={s} /> },
  {
    speaker: 1,
    title: 'Objetivo global',
    notes: 'Misión · 3 objetivos: informar, persuadir, recordar',
    render: () => (
      <Frame className="flex flex-col justify-center">
        <Title eyebrow="Nuestra misión">Ayudar a las familias a comer mejor, sin perder tiempo.</Title>
        <div className="mt-14 grid grid-cols-3 gap-6">
          {objectives.map((o, i) => (
            <In key={o.k} d={0.3 + i * 0.12}>
              <div className="rounded-[28px] border border-white/[0.08] bg-graphite/60 p-9">
                <p className="text-[34px] font-bold">{o.k}</p>
                <p className="mt-3 text-[21px] text-steel/65">{o.v}</p>
                <span className="mt-8 inline-block rounded-full bg-fresh/15 px-4 py-1.5 font-mono text-[14px] uppercase tracking-wider text-fresh">{o.o}</span>
              </div>
            </In>
          ))}
        </div>
      </Frame>
    ),
  },
  // YOUSSOUF
  { speaker: 2, title: 'El producto', notes: '635 L · pantalla 21" · 4 cámaras · 2 acabados', render: () => <ViewsScene /> },
  { speaker: 2, title: 'Demo en directo', notes: 'Abrir · escaneo · tocar los tomates', render: () => <DemoLiveScene /> },
  { speaker: 2, title: 'La IA', notes: 'Inventario · recetas · asistente de voz', render: () => <AiScene /> },
  { speaker: 2, title: 'Segmentación', notes: 'Geográfico · demográfico · poder adquisitivo · aficiones · comportamiento', render: () => <SegmentScene /> },
  { speaker: 2, title: 'Marta', notes: 'Consumidora ideal · sus problemas · nuestra respuesta', render: () => <MartaScene /> },
  { speaker: 2, title: 'Posicionamiento', notes: 'Mapa: precio / inteligencia · promesa', render: () => <PositionScene /> },
  // ROMAIN
  {
    speaker: 3,
    title: 'Precio',
    notes: 'Coste 1 600 € · margen 40 % · tienda · IVA · 3 999 €',
    render: () => (
      <Frame className="flex flex-col justify-center">
        <Title eyebrow="Precio">Premium, pero accesible.</Title>
        <In d={0.3} className="mt-12 rounded-[32px] border border-white/[0.07] bg-graphite/40 p-10 [zoom:1.4]">
          <PriceBreakdown />
        </In>
      </Frame>
    ),
  },
  {
    speaker: 3,
    title: '3 hipótesis',
    notes: 'A penetración · B prestigio (elegida) · C descremado',
    render: () => (
      <Frame className="flex flex-col justify-center">
        <Title eyebrow="Tres hipótesis de precio">Elegimos {PRICE.toLocaleString('es-ES')} €.</Title>
        <div className="mt-14 [zoom:1.45]">
          <PriceOptions />
        </div>
        <In d={0.6}>
          <p className="mt-16 text-[22px] text-steel/65">Precio psicológico · desde {MONTHLY} €/mes · app freemium (Plus 4,99 €/mes)</p>
        </In>
      </Frame>
    ),
  },
  {
    speaker: 3,
    title: '4P',
    notes: 'Producto · precio · plaza · promoción',
    render: () => (
      <Frame className="flex flex-col">
        <Title eyebrow="Marketing mix">Las 4P.</Title>
        <div className="mx-auto mt-4 w-[900px] [zoom:1.4]">
          <FourPCards autoFlip />
        </div>
      </Frame>
    ),
  },
  {
    speaker: 3,
    title: 'DAFO',
    notes: 'Interno: debilidades, fortalezas · externo: amenazas, oportunidades',
    render: () => (
      <Frame className="grid grid-cols-[360px_1fr] items-center gap-14">
        <Title eyebrow="Análisis">DAFO.</Title>
        <div className="[zoom:1.3]">
          <DafoMatrix />
        </div>
      </Frame>
    ),
  },
  {
    speaker: 3,
    title: 'Distribución y fidelización',
    notes: 'Canal híbrido · selectiva · 3C: comunicación, compromiso, confianza',
    render: () => (
      <Frame className="flex flex-col">
        <Title eyebrow="Distribución y fidelización">Canal híbrido. Clientes fieles.</Title>
        <In d={0.2} className="mt-8 rounded-[28px] border border-white/[0.07] p-7 [zoom:1.2]">
          <Distribution />
        </In>
        <div className="mt-5 [zoom:1.2]">
          <Fidelizacion />
        </div>
      </Frame>
    ),
  },
  { speaker: 3, title: 'TikTok', steps: 4, notes: 'Persuadir · humor · análisis en 4 pasos', render: (s) => <SupportScene id="tiktok" step={s} media={<TikTokPlayer width={400} />} /> },
  // LÉO
  { speaker: 4, title: 'Cartel', steps: 4, notes: 'Informar · lectura en Z · colores · QR', render: (s) => <SupportScene id="cartel" step={s} media={<Poster width={540} className="overflow-hidden rounded-xl ring-1 ring-white/10" />} /> },
  {
    speaker: 4,
    title: 'Radio',
    steps: 4,
    notes: 'Recordar · padre + nevera · eslogan al final',
    render: (s) => (
      <SupportScene
        id="radio"
        step={s}
        media={
          <div className="w-[560px] [zoom:1.15]">
            <RadioPlayer />
          </div>
        }
      />
    ),
  },
  {
    speaker: 4,
    title: 'Ferias',
    notes: 'Experiencia · chef en directo · contactos',
    render: () => (
      <div className="absolute inset-0">
        <motion.img src={img('stand-01-feria', 1920)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 6, ease: 'easeOut' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="absolute bottom-[110px] left-[110px] max-w-[700px]">
          <Title eyebrow="Ferias tecnológicas · Madrid">Ver para creer.</Title>
          <In d={0.4}>
            <p className="mt-6 text-[26px] text-steel/80">Un chef cocina en directo. La IA reconoce los alimentos delante del público.</p>
          </In>
        </div>
        <HudTag inView={false} className="right-[140px] top-[140px] scale-[1.4]" delay={0.8} title="Cocina Frigojefe" detail="Demo en directo" />
      </div>
    ),
  },
  {
    speaker: 4,
    title: 'Plan de medios',
    notes: 'TikTok 4 sem · cartel 3 sem · radio 2 sem · feria octubre',
    render: () => (
      <Frame className="flex flex-col justify-center">
        <Title eyebrow="Plan de medios">Seis semanas para dejar huella.</Title>
        <In d={0.2} className="mt-16 rounded-[32px] border border-white/[0.07] bg-graphite/30 p-10 pt-14 [zoom:1.3]">
          <MediaPlanTimeline />
        </In>
      </Frame>
    ),
  },
  {
    speaker: 4,
    title: 'Cierre',
    notes: 'Cita de Luis Bassat · eslogan',
    render: () => (
      <div className="absolute inset-0 grid place-items-center px-[160px] text-center">
        <div>
          <In>
            <p className="text-[58px] font-bold leading-[1.12] tracking-[-0.02em]">«La buena publicidad vende el producto hoy y construye la marca mañana.»</p>
          </In>
          <In d={0.5}>
            <p className="mt-8 text-[24px] text-steel/60">Luis Bassat</p>
          </In>
          <In d={1.2}>
            <div className="mt-20 flex flex-col items-center gap-6">
              <Logo className="text-[40px]" />
              <p className="text-[30px] font-semibold text-fresh">Tu nevera piensa por ti.</p>
            </div>
          </In>
        </div>
      </div>
    ),
  },
  {
    speaker: 4,
    title: '¿Preguntas?',
    notes: 'Gracias · preguntas del profesor',
    render: () => (
      <div className="absolute inset-0 grid grid-cols-[1fr_auto] items-center gap-20 px-[140px]">
        <div>
          <In>
            <p className="text-[150px] font-extrabold leading-none tracking-[-0.04em]">¿Preguntas?</p>
          </In>
          <In d={0.3}>
            <p className="mt-8 text-[30px] text-steel/70">¡Gracias por vuestra atención!</p>
          </In>
          <In d={0.5}>
            <p className="mt-14 font-mono text-[18px] text-steel/50">Hugo · Youssouf · Romain · Léo</p>
          </In>
        </div>
        <In d={0.6} className="flex flex-col items-center gap-5">
          <div className="rounded-[28px] bg-white p-6">
            <QRCodeSVG value={SITE_URL} size={260} level="M" />
          </div>
          <p className="font-mono text-[16px] uppercase tracking-[0.18em] text-steel/60">Visita la web</p>
        </In>
      </div>
    ),
  },
]
