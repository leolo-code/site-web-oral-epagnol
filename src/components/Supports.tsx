import { AnimatePresence, motion } from 'motion/react'
import { Eye, Heart, MessageCircle, MousePointerClick, Play, RotateCcw, Search, Share2, ShoppingBag } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MONTHLY, supports, type SupportId } from '../data/campaign'
import { img, media } from '../lib/img'
import { Logo } from './Logo'

export const SITE_URL = 'https://leolo-code.github.io/site-web-oral-epagnol/'

/* ¿Existe el archivo multimedia? (vídeo o audio grabado por el equipo) */
export function useMediaFile(file: string, kind: 'video' | 'audio') {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => {
    let alive = true
    fetch(media(file), { method: 'HEAD' })
      .then((r) => alive && setOk(r.ok && (r.headers.get('content-type') ?? '').startsWith(kind)))
      .catch(() => alive && setOk(false))
    return () => {
      alive = false
    }
  }, [file, kind])
  return ok
}

/* Reloj simple para la simulación */
function useClock(duration: number, playing: boolean, onEnd: () => void) {
  const [t, setT] = useState(0)
  const raf = useRef(0)
  const last = useRef(0)
  useEffect(() => {
    if (!playing) return
    last.current = performance.now()
    const tick = (now: number) => {
      setT((prev) => {
        const next = prev + (now - last.current) / 1000
        last.current = now
        if (next >= duration) {
          onEnd()
          return duration
        }
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing, duration, onEnd])
  return [t, setT] as const
}

/* ---------------- TIKTOK ---------------- */
const frames = [
  { from: 0, to: 2, src: () => img('per-01-marta', 900), caption: '«No hay nada para comer…» 😩', pos: 'center 30%' },
  { from: 2, to: 4, src: () => img('ref-03-pantalla', 1200), caption: 'Frigojefe escanea tu nevera', pos: 'center', scan: true },
  { from: 4, to: 9, src: () => img('dish-01-pasta', 1000), caption: '3 recetas con lo que tienes', pos: 'center', recipes: true },
  { from: 9, to: 12, src: () => img('life-01-cocina', 960), caption: 'Cena lista en 20 minutos ✨', pos: '40% center' },
  { from: 12, to: 15, end: true, caption: '' },
] as const

export function TikTokPlayer({ width = 300, autoPlay = false }: { width?: number; autoPlay?: boolean }) {
  const hasVideo = useMediaFile('tiktok.mp4', 'video')
  const [playing, setPlaying] = useState(autoPlay)
  const onEnd = useCallback(() => setPlaying(false), [])
  const [t, setT] = useClock(15, playing && !hasVideo, onEnd)
  const frame = frames.find((f) => t >= f.from && t < f.to) ?? frames[frames.length - 1]
  const s = width / 300

  return (
    <div className="relative shrink-0" style={{ width, height: 533 * s }}>
      <div className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[30px] bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10" style={{ width: 300, height: 533, transform: `scale(${s})` }}>
        {hasVideo ? (
          <video src={media('tiktok.mp4')} className="h-full w-full object-cover" controls playsInline />
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              <motion.div key={frame.from} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                {'end' in frame ? (
                  <div className="grid h-full place-items-center bg-ink text-center">
                    <div>
                      <Logo className="text-[26px]" />
                      <p className="mt-4 text-[17px] font-semibold text-snow">Tu nevera piensa por ti.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <motion.img src={frame.src()} alt="" className="h-full w-full object-cover" style={{ objectPosition: frame.pos }} animate={{ scale: [1, 1.08] }} transition={{ duration: frame.to - frame.from, ease: 'linear' }} />
                    {'scan' in frame && <motion.div className="absolute inset-x-0 h-[3px] bg-fresh shadow-[0_0_20px_6px_rgba(123,216,143,0.6)]" initial={{ top: '10%' }} animate={{ top: '90%' }} transition={{ duration: 1.8, ease: 'easeInOut' }} />}
                    {'recipes' in frame && (
                      <div className="absolute inset-x-4 top-20 space-y-2">
                        {['Pasta con verduras', 'Tortilla de calabacín', 'Ensalada de tomate'].map((r, i) => (
                          <motion.div key={r} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.5 }} className="glass rounded-xl px-3 py-2 text-[13px] font-semibold text-snow">
                            {i + 1}. {r}
                          </motion.div>
                        ))}
                      </div>
                    )}
                    <div className="absolute inset-x-0 top-[58%] flex justify-center px-6">
                      <span className="rounded-md bg-white px-2.5 py-1 text-center text-[15px] font-bold leading-snug text-ink">{frame.caption}</span>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            {/* interfaz de red social genérica */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-24 right-3 flex flex-col items-center gap-5 text-snow">
              {[Heart, MessageCircle, Share2].map((I, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <I size={26} fill={i === 0 ? '#fff' : 'none'} />
                  <span className="text-[10.5px] font-semibold">{['48,2K', '1.204', '3.391'][i]}</span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-6 left-4 right-16 text-snow">
              <p className="text-[14px] font-bold">@frigojefe</p>
              <p className="mt-1 text-[12.5px] leading-snug">Cuando tu nevera sabe más que tú 😂 #recetas #IA #familia</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
              <div className="h-full bg-snow" style={{ width: `${(t / 15) * 100}%` }} />
            </div>
            <button
              type="button"
              onClick={() => {
                if (t >= 15) setT(0)
                setPlaying((p) => !p)
              }}
              className="absolute inset-0 grid place-items-center"
              aria-label={playing ? 'Pausa' : 'Reproducir'}
            >
              {!playing && (
                <span className="grid h-16 w-16 place-items-center rounded-full bg-black/45 text-snow backdrop-blur">
                  {t >= 15 ? <RotateCcw size={26} /> : <Play size={28} fill="currentColor" />}
                </span>
              )}
            </button>
            {t === 0 && !playing && <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-snow">Storyboard · 15 s</span>}
          </>
        )}
      </div>
    </div>
  )
}

/* ---------------- PÁGINA WEB (+ Google Ads y SEO) ---------------- */
export function WebSupport({ width = 560 }: { width?: number }) {
  const s = width / 600
  const H = 700
  return (
    <div className="relative shrink-0" style={{ width, height: H * s }}>
      <div className="absolute left-0 top-0 origin-top-left space-y-4" style={{ width: 600, transform: `scale(${s})` }}>
        {/* navegador con la web en directo */}
        <div className="overflow-hidden rounded-2xl bg-[#1b1d20] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
          <div className="flex h-10 items-center gap-2 px-4">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 flex h-6 flex-1 items-center rounded-md bg-black/40 px-3 font-mono text-[11px] text-steel/60">frigojefe · web oficial</span>
          </div>
          <div className="relative h-[350px] overflow-hidden bg-ink">
            <iframe title="Web de Frigojefe" src={`${import.meta.env.BASE_URL}#/`} loading="lazy" className="absolute left-0 top-0 origin-top-left border-0" style={{ width: 1280, height: 800, transform: 'scale(0.46875)' }} />
          </div>
        </div>
        {/* buscador: anuncio + resultado SEO */}
        <div className="rounded-2xl bg-snow p-5 text-ink shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
          <div className="flex h-11 items-center gap-3 rounded-full border border-ink/10 px-4 text-[15px]">
            <Search size={17} className="text-ink/50" />
            nevera inteligente
          </div>
          <div className="mt-4 space-y-3.5">
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="text-[12px] text-ink/60"><span className="mr-2 rounded bg-ink px-1.5 py-0.5 text-[10.5px] font-bold text-snow">Patrocinado</span>Google Ads</p>
              <p className="mt-1 text-[18px] font-semibold text-[#1a0dab]">Frigojefe · La nevera que piensa por ti</p>
              <p className="text-[13px] text-ink/65">Reconoce tus alimentos y te propone recetas. Desde 111 €/mes.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              <p className="text-[12px] text-ink/60"><span className="mr-2 rounded bg-fresh px-1.5 py-0.5 text-[10.5px] font-bold text-ink">SEO</span>Resultado natural</p>
              <p className="mt-1 text-[18px] font-semibold text-[#1a0dab]">Frigojefe: nevera inteligente con IA | Web oficial</p>
            </motion.div>
          </div>
        </div>
        {/* medición */}
        <div className="grid grid-cols-3 gap-3">
          {[
            [Eye, 'Visitas'],
            [MousePointerClick, 'Clics'],
            [ShoppingBag, 'Ventas'],
          ].map(([Icon, label], i) => {
            const I = Icon as typeof Eye
            return (
              <div key={label as string} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-graphite/70 px-4 py-3">
                <I size={18} className="text-fresh" />
                <span className="text-[14px] font-medium text-snow">{label as string}</span>
                <svg viewBox="0 0 40 16" className="ml-auto h-4 w-10">
                  <motion.path d={['M0 14 L10 11 L20 12 L30 6 L40 3', 'M0 13 L10 12 L20 8 L30 7 L40 2', 'M0 15 L10 13 L20 11 L30 8 L40 4'][i]} fill="none" stroke="#7BD88F" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 + i * 0.15 }} />
                </svg>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ---------------- CARTEL (lienzo 1000 × 1400 = formato 50 × 70 cm) ---------------- */
export function Poster({ width = 400, className = '' }: { width?: number; className?: string }) {
  const s = width / 1000
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width, height: 1400 * s }}>
      <div className="absolute left-0 top-0 origin-top-left overflow-hidden bg-[#08090a] text-snow" style={{ width: 1000, height: 1400, transform: `scale(${s})` }} id="cartel">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 40% at 72% 58%, rgba(123,216,143,0.16), transparent 70%), radial-gradient(40% 30% at 20% 10%, rgba(201,205,210,0.08), transparent)' }} />
        {/* Z: arriba izquierda */}
        <div className="absolute left-[70px] right-[70px] top-[64px] flex items-center justify-between">
          <Logo className="text-[34px]" />
          <span className="font-mono text-[18px] uppercase tracking-[0.2em] text-fresh">Nuevo · Sept. 2027</span>
        </div>
        <div className="absolute left-[70px] top-[170px] w-[860px]">
          <p className="font-display text-[84px] font-extrabold leading-[0.98] tracking-[-0.03em]">¿No sabes qué cocinar?</p>
          <p className="mt-3 font-display text-[150px] font-extrabold leading-none tracking-[-0.04em] text-fresh">Ella sí.</p>
          <p className="mt-6 text-[32px] font-medium text-steel/85">La nevera más inteligente de tu cocina.</p>
        </div>
        {/* diagonal: la nevera */}
        <img src={img('open-01-abierto', 1400)} alt="" className="absolute right-[-120px] top-[360px] h-[1000px] w-auto mix-blend-lighten" />
        <img src={img('dish-01-pasta', 1000)} alt="" className="absolute left-[70px] top-[720px] h-[260px] w-[260px] rounded-full object-cover ring-[10px] ring-[#08090a]" />
        <div className="absolute left-[70px] top-[610px] flex items-center gap-4 rounded-[26px] border border-white/15 bg-white/[0.07] py-4 pl-4 pr-7 backdrop-blur">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fresh text-[26px]">🍅</span>
          <span>
            <span className="block text-[24px] font-bold">Tomates</span>
            <span className="block font-mono text-[17px] text-amber">Consumir pronto</span>
          </span>
        </div>
        <div className="absolute left-[200px] top-[1000px] flex items-center gap-4 rounded-[26px] border border-white/15 bg-white/[0.07] py-4 pl-4 pr-7 backdrop-blur">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[26px]">✨</span>
          <span>
            <span className="block text-[24px] font-bold">Pasta con verduras</span>
            <span className="block font-mono text-[17px] text-steel/70">Receta · 20 min</span>
          </span>
        </div>
        {/* Z: abajo */}
        <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-t from-[#08090a] via-[#08090a]/95 to-transparent" />
        <p className="absolute bottom-[26px] left-[70px] text-[14px] text-steel/45">3 999 € IVA incluido, o 36 cuotas de 111 € sin intereses. Frescura estimada por la IA.</p>
        <div className="absolute bottom-[70px] left-[70px] right-[70px] flex items-end justify-between gap-10">
          <div>
            <p className="whitespace-nowrap font-display text-[52px] font-extrabold leading-none tracking-[-0.02em]">Tu nevera piensa por ti.</p>
            <p className="mt-5 text-[26px] text-steel/80">
              Desde <span className="font-bold text-snow">{MONTHLY} €/mes</span> · Tiendas seleccionadas
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-[18px] bg-white p-3">
              <QRCodeSVG value={SITE_URL} size={128} bgColor="#ffffff" fgColor="#0a0b0c" level="M" />
            </div>
            <span className="whitespace-nowrap font-mono text-[15px] uppercase tracking-[0.14em] text-fresh">Escanea y descúbrela</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- ANÁLISIS DEL SOPORTE (método del curso) ---------------- */
const steps = [
  { k: 'general', label: 'Presentación general' },
  { k: 'denotativo', label: 'Nivel denotativo' },
  { k: 'connotativo', label: 'Nivel connotativo' },
  { k: 'conclusion', label: 'Conclusión' },
] as const

export function AnalysisPanel({ id, step: controlled }: { id: SupportId; step?: number }) {
  const sp = supports.find((x) => x.id === id)!
  const [inner, setInner] = useState(0)
  const step = controlled ?? inner
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-fresh px-3 py-1 text-[12.5px] font-bold text-ink">Objetivo: {sp.objective}</span>
        {sp.ganchos.map((g) => (
          <span key={g} className="rounded-full border border-white/15 px-3 py-1 text-[12.5px] text-steel/80">
            Gancho: {g}
          </span>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        {steps.map((st, i) => {
          const on = step === i
          return (
            <button key={st.k} type="button" onClick={() => setInner(i)} className={`block w-full rounded-2xl border p-4 text-left transition-colors duration-300 ${on ? 'border-fresh/40 bg-fresh/[0.06]' : 'border-white/[0.06] hover:border-white/15'}`}>
              <div className="flex items-center gap-3">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[12px] ${on ? 'bg-fresh text-ink' : 'bg-white/[0.06] text-steel/60'}`}>{i + 1}</span>
                <span className={`font-semibold ${on ? 'text-snow' : 'text-steel/70'}`}>{st.label}</span>
              </div>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden pl-10 text-[15.5px] leading-relaxed text-steel/85">
                    <span className="block pt-2">{sp.analysis[st.k]}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>
      <p className="mt-5 text-[13px] text-steel/50">{sp.format} · {sp.where}</p>
    </div>
  )
}
