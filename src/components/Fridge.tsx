import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { foods as allFoods, type Food } from '../data/fridge'
import { img } from '../lib/img'

// Proporciones reales de las imágenes recortadas
const TOP_RATIO = 2076 / 1673 // alto / ancho del compartimento superior
const DRAWER_RATIO = 766 / 964
const LEFT_DOOR = 477 / 964 // ancho relativo de la puerta izquierda

const EASE = [0.65, 0, 0.18, 1] as const

interface FridgeProps {
  open: boolean
  scanning?: boolean
  showHotspots?: boolean
  foods?: Food[]
  selectedId?: string | null
  onSelect?: (id: string) => void
  interior?: 'ok' | 'messy'
  screen?: ReactNode
  className?: string
  /** contenido superpuesto en el interior (fichas, etiquetas) */
  overlay?: ReactNode
  reflection?: boolean
  /** 'full' = cajones completos, 'peek' = solo el principio con fundido */
  drawers?: 'full' | 'peek'
}

export function Fridge({
  open,
  scanning = false,
  showHotspots = false,
  foods = allFoods,
  selectedId = null,
  onSelect,
  interior = 'ok',
  screen,
  className = '',
  overlay,
  reflection = true,
  drawers = 'full',
}: FridgeProps) {
  return (
    <div className={`relative select-none ${className}`} style={{ perspective: '2400px' }}>
      {/* halo de luz cuando está abierta */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[30%] top-[5%] h-[70%] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(255,248,235,0.22), transparent)' }}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.8 }}
        transition={{ duration: 1.2, delay: open ? 0.35 : 0, ease: EASE }}
      />

      {/* COMPARTIMENTO SUPERIOR */}
      <div className="relative w-full" style={{ paddingBottom: `${TOP_RATIO * 100}%`, transformStyle: 'preserve-3d' }}>
        {/* interior */}
        <div className="absolute inset-0 overflow-hidden rounded-t-[1.2%] bg-[#0b0b0b]">
          <motion.img
            src={img(interior === 'ok' ? 'demo-interior' : 'demo-interior-desorden', 1200)}
            alt="Interior de la nevera Frigojefe con alimentos frescos"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            animate={{ filter: open ? 'brightness(1) saturate(1)' : 'brightness(0.15) saturate(0.4)' }}
            transition={{ duration: open ? 0.9 : 0.4, delay: open ? 0.3 : 0, ease: 'easeOut' }}
          />
          {/* vaho frío que se disipa */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="mist"
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(60% 40% at 50% 30%, rgba(255,255,255,0.55), transparent 70%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 1.8, delay: 0.35, times: [0, 0.3, 1] }}
              />
            )}
          </AnimatePresence>

          {/* línea de escaneo */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                key="scan"
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[12%]"
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: '850%', opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              >
                <div className="h-full w-full" style={{ background: 'linear-gradient(180deg, transparent, rgba(123,216,143,0.18) 70%, rgba(123,216,143,0.55))' }} />
                <div className="h-[2px] w-full bg-fresh shadow-[0_0_18px_4px_rgba(123,216,143,0.7)]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* puntos interactivos */}
          <AnimatePresence>
            {showHotspots &&
              foods.map((f, i) => (
                <Hotspot key={f.id} food={f} index={i} active={selectedId === f.id} onClick={() => onSelect?.(f.id)} />
              ))}
          </AnimatePresence>
          {overlay}
        </div>

        {/* PUERTAS (3D) */}
        <Door side="left" open={open} width={LEFT_DOOR} />
        <Door side="right" open={open} width={1 - LEFT_DOOR} screen={screen} />
      </div>

      {/* CAJONES */}
      <div
        className="relative w-full overflow-hidden"
        style={
          drawers === 'full'
            ? { paddingBottom: `${DRAWER_RATIO * 100}%` }
            : { paddingBottom: `${DRAWER_RATIO * 32}%`, maskImage: 'linear-gradient(#000 30%, transparent)', WebkitMaskImage: 'linear-gradient(#000 30%, transparent)' }
        }
      >
        <img src={img('demo-drawers', 1200)} alt="" className="absolute inset-x-0 top-0 w-full" style={{ height: drawers === 'full' ? '100%' : `${100 / 0.32}%` }} draggable={false} />
      </div>

      {/* reflejo en el suelo */}
      {reflection && drawers === 'full' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-[14%] -scale-y-100 opacity-25"
          style={{
            backgroundImage: `url(${img('demo-drawers', 1200)})`,
            backgroundSize: '100% auto',
            backgroundPosition: 'bottom',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 70%)',
          }}
        />
      )}
    </div>
  )
}

function Door({ side, open, width, screen }: { side: 'left' | 'right'; open: boolean; width: number; screen?: ReactNode }) {
  const isLeft = side === 'left'
  return (
    <motion.div
      className="absolute top-0 h-full"
      style={{
        [isLeft ? 'left' : 'right']: 0,
        width: `${width * 100}%`,
        transformOrigin: isLeft ? 'left center' : 'right center',
        transformStyle: 'preserve-3d',
        zIndex: 5,
      }}
      initial={false}
      animate={{ rotateY: open ? (isLeft ? -118 : 118) : 0 }}
      transition={{ duration: 1.25, ease: EASE, delay: isLeft ? 0 : 0.06 }}
    >
      {/* cara exterior */}
      <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
        <img
          src={img(isLeft ? 'demo-door-left' : 'demo-door-right', 600)}
          alt=""
          className="h-full w-full"
          style={{ objectFit: 'fill' }}
          draggable={false}
        />
        {/* reflejo que se desliza */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={false}
          animate={{ opacity: open ? 0 : 1 }}
        >
          <div className="absolute inset-y-0 -left-1/2 w-1/2 animate-[sheen_7s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </motion.div>
        {!isLeft && screen && (
          <div className="absolute overflow-hidden rounded-[3%]" style={{ left: '18.9%', top: '21.5%', width: '66.9%', height: '57.1%' }}>
            {screen}
          </div>
        )}
        {/* sombra que oscurece la puerta al girar */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" initial={false} animate={{ opacity: open ? 0.55 : 0 }} transition={{ duration: 1.2 }} />
      </div>
      {/* cara interior de la puerta (balconcillos) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', background: 'linear-gradient(90deg,#d9dcdf,#f2f3f2 40%,#e3e5e7)' }}
      >
        <div className="absolute inset-[4%] rounded-[4px] border border-black/10" />
        {[0.2, 0.42, 0.64, 0.84].map((t) => (
          <div key={t} className="absolute inset-x-[8%] h-[7%] rounded-b-[6px] border-x border-b border-black/10 bg-white/50 shadow-[inset_0_-6px_10px_rgba(0,0,0,0.06)]" style={{ top: `${t * 100}%` }}>
            <div className="h-[3px] w-full bg-gradient-to-r from-[#9aa0a6] via-[#e5e7e9] to-[#9aa0a6]" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Hotspot({ food, index, active, onClick }: { food: Food; index: number; active: boolean; onClick: () => void }) {
  const color = food.status === 'fresco' ? '#7BD88F' : food.status === 'pronto' ? '#F2B35B' : '#C9CDD2'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${food.name}: ver detalles`}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${food.x}%`, top: `${food.y}%` }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ delay: 0.15 + index * 0.07, type: 'spring', stiffness: 380, damping: 22 }}
    >
      <span className="absolute inset-0 rounded-full" style={{ background: color, animation: 'pulse-ring 2.2s ease-out infinite', animationDelay: `${index * 0.2}s` }} />
      <span
        className={`relative grid h-[clamp(14px,2.2vw,22px)] w-[clamp(14px,2.2vw,22px)] place-items-center rounded-full border-2 border-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-125 ${active ? 'scale-125' : ''}`}
        style={{ background: color }}
      />
    </motion.button>
  )
}

// Pantalla de la puerta (estado normal)
export function FridgeScreen({ message = 'Buenas tardes, Marta', alerts = 5, compact = false }: { message?: string; alerts?: number; compact?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-gradient-to-b from-[#0d1512] to-[#06090a] p-[9%] text-snow">
      <div>
        <div className="flex items-center gap-[6%]">
          <span className="h-[6px] w-[6px] rounded-full bg-fresh animate-blink" />
          <span className="font-mono text-[clamp(5px,0.9vw,9px)] tracking-widest text-fresh/80">IA ACTIVA</span>
        </div>
        <p className="mt-[10%] font-display text-[clamp(7px,1.3vw,13px)] font-semibold leading-tight">{message}</p>
      </div>
      {!compact && (
        <div className="space-y-[6%]">
          <div className="flex items-end justify-between">
            <span className="font-display text-[clamp(12px,2.6vw,26px)] font-bold leading-none">4°C</span>
            <span className="font-mono text-[clamp(5px,0.8vw,8px)] text-steel/60">-18°C</span>
          </div>
          <div className="rounded-[6px] bg-amber/15 px-[8%] py-[6%] font-mono text-[clamp(5px,0.85vw,8.5px)] text-amber">{alerts} avisos</div>
        </div>
      )}
    </div>
  )
}
