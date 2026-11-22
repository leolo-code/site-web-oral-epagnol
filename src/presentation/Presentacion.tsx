import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scenes, speakers } from './scenes'

const W = 1600
const H = 900

function useStageScale() {
  const [s, setS] = useState(1)
  useEffect(() => {
    const f = () => setS(Math.min(window.innerWidth / W, window.innerHeight / H))
    f()
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  return s
}

const readStart = () => {
  try {
    const v = Number(sessionStorage.getItem('fj-scene'))
    return Number.isFinite(v) && v >= 0 && v < scenes.length ? v : 0
  } catch {
    return 0
  }
}

export default function Presentacion() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const ensayo = new URLSearchParams(search).has('ensayo')
  const scale = useStageScale()
  const [pos, setPos] = useState({ i: readStart(), step: 0, dir: 1 })
  const [sweep, setSweep] = useState<number | null>(null)
  const [idle, setIdle] = useState(false)
  const idleTimer = useRef<number>(0)

  const scene = scenes[pos.i]
  const speaker = speakers.find((s) => s.id === scene.speaker)!

  const go = useCallback((i: number, dir: number, step = 0) => {
    if (i < 0 || i >= scenes.length) return
    setPos((p) => {
      if (scenes[i].speaker !== scenes[p.i].speaker) setSweep(scenes[i].speaker)
      return { i, step, dir }
    })
  }, [])

  const next = useCallback(() => {
    setPos((p) => {
      const steps = scenes[p.i].steps ?? 1
      if (p.step < steps - 1) return { ...p, step: p.step + 1 }
      const i = p.i + 1
      if (i >= scenes.length) return p
      if (scenes[i].speaker !== scenes[p.i].speaker) setSweep(scenes[i].speaker)
      return { i, step: 0, dir: 1 }
    })
  }, [])
  const prev = useCallback(() => {
    setPos((p) => {
      if (p.step > 0) return { ...p, step: p.step - 1 }
      const i = p.i - 1
      if (i < 0) return p
      if (scenes[i].speaker !== scenes[p.i].speaker) setSweep(scenes[i].speaker)
      return { i, step: (scenes[i].steps ?? 1) - 1, dir: -1 }
    })
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('fj-scene', String(pos.i))
    } catch {
      /* sin almacenamiento */
    }
  }, [pos.i])

  useEffect(() => {
    if (sweep === null) return
    const t = setTimeout(() => setSweep(null), 1500)
    return () => clearTimeout(t)
  }, [sweep])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        next()
      } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault()
        prev()
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) navigate('/')
      } else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen?.()
      } else if (e.key === 'Home') go(0, -1)
      else if (e.key === 'End') go(scenes.length - 1, 1)
      else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = scenes.findIndex((s) => s.speaker === Number(e.key))
        if (idx >= 0) go(idx, 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, navigate])

  // el cursor desaparece si no se mueve
  useEffect(() => {
    const onMove = () => {
      setIdle(false)
      clearTimeout(idleTimer.current)
      idleTimer.current = window.setTimeout(() => setIdle(true), 2500)
    }
    onMove()
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className={`fixed inset-0 overflow-hidden bg-ink text-snow ${idle ? 'cursor-none' : ''}`}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_40%,#13181a_0%,#0a0b0c_70%)]" />

      {/* escenario 16:9 escalado */}
      <div className="absolute left-1/2 top-1/2" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
        <AnimatePresence mode="wait" custom={pos.dir}>
          <motion.div
            key={pos.i}
            className="absolute inset-0"
            initial={{ opacity: 0, x: pos.dir * 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
            exit={{ opacity: 0, x: pos.dir * -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {scene.render(pos.step)}
          </motion.div>
        </AnimatePresence>

        {/* indicador discreto */}
        <div className={`pointer-events-none absolute bottom-[34px] left-[110px] flex items-center gap-3 font-mono text-[13px] tracking-wider text-steel/40 transition-opacity duration-700 ${idle ? 'opacity-60' : 'opacity-100'}`}>
          <span className="text-steel/70">{speaker.name}</span>
          <span>·</span>
          <span>{speaker.part}</span>
          <span>·</span>
          <span>{scene.title}</span>
          <span>·</span>
          <span>
            {pos.i + 1}/{scenes.length}
          </span>
        </div>
        <div className="absolute bottom-[38px] right-[110px] flex gap-1.5">
          {speakers.map((sp) => {
            const list = scenes.map((s, j) => ({ s, j })).filter(({ s }) => s.speaker === sp.id)
            return (
              <div key={sp.id} className="flex gap-[3px]">
                {list.map(({ j }) => (
                  <button key={j} onClick={() => go(j, j > pos.i ? 1 : -1)} className={`h-[5px] rounded-full transition-all duration-500 ${j === pos.i ? 'w-6 bg-fresh' : j < pos.i ? 'w-[10px] bg-steel/50' : 'w-[10px] bg-white/12'}`} aria-label={`Escena ${j + 1}`} />
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* controles (solo visibles al mover el ratón) */}
      <div className={`absolute right-4 top-4 flex gap-2 transition-opacity duration-500 ${idle ? 'opacity-0' : 'opacity-100'}`}>
        <button onClick={() => document.documentElement.requestFullscreen?.()} className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-steel/70 hover:text-snow" aria-label="Pantalla completa (F)">
          <Maximize size={17} />
        </button>
        <button onClick={() => navigate('/')} className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-steel/70 hover:text-snow" aria-label="Salir (Esc)">
          <X size={18} />
        </button>
      </div>
      <div className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-opacity duration-500 ${idle ? 'opacity-0' : 'opacity-100'}`}>
        <button onClick={prev} className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.05] text-steel/60 hover:text-snow" aria-label="Anterior">
          <ChevronLeft />
        </button>
      </div>
      <div className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-500 ${idle ? 'opacity-0' : 'opacity-100'}`}>
        <button onClick={next} className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.05] text-steel/60 hover:text-snow" aria-label="Siguiente">
          <ChevronRight />
        </button>
      </div>

      {/* barrido verde entre intervenientes */}
      <AnimatePresence>
        {sweep !== null && (
          <motion.div key={sweep} className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <motion.div className="absolute inset-0 flex items-center bg-fresh px-[8vw] text-ink" initial={{ x: '-100%' }} animate={{ x: ['-100%', '0%', '0%', '100%'] }} transition={{ duration: 1.45, times: [0, 0.3, 0.68, 1], ease: [0.76, 0, 0.24, 1] }}>
              <div>
                <p className="font-mono text-[1.4vw] uppercase tracking-[0.2em] opacity-60">Parte {sweep} / 4</p>
                <p className="mt-2 text-[7vw] font-extrabold leading-none tracking-[-0.04em]">{speakers[sweep - 1].name}</p>
                <p className="mt-3 text-[2.2vw] font-semibold">{speakers[sweep - 1].part}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* modo ensayo: notas (nunca visibles en la presentación normal) */}
      {ensayo && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[min(720px,90vw)] -translate-x-1/2 rounded-2xl border border-amber/30 bg-black/85 p-4 font-mono text-[13px] text-amber backdrop-blur">
          <span className="opacity-60">ENSAYO · {speaker.name} · </span>
          {scene.notes}
          {scene.steps && scene.steps > 1 && <span className="opacity-60"> · paso {pos.step + 1}/{scene.steps}</span>}
        </div>
      )}
    </div>
  )
}
