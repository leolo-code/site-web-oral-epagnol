import { AnimatePresence, motion } from 'motion/react'
import { ChefHat, ListChecks, Package, RotateCcw, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Fridge } from '../components/Fridge'
import { FreshBar, statusColor } from '../components/Screens'
import { foods, ingredientChips, recipes, shoppingList, statusLabel, type Recipe } from '../data/fridge'

type Phase = 'closed' | 'opening' | 'scanning' | 'ready'
type Tab = 'inventario' | 'recetas' | 'compra'

export function useDemoMachine() {
  const [phase, setPhase] = useState<Phase>('closed')
  useEffect(() => {
    if (phase === 'opening') {
      const t = setTimeout(() => setPhase('scanning'), 1300)
      return () => clearTimeout(t)
    }
    if (phase === 'scanning') {
      const t = setTimeout(() => setPhase('ready'), 2300)
      return () => clearTimeout(t)
    }
  }, [phase])
  return {
    phase,
    open: phase !== 'closed',
    toggle: () => setPhase((p) => (p === 'closed' ? 'opening' : 'closed')),
    reset: () => setPhase('closed'),
  }
}

export function DemoScreen({ phase }: { phase: Phase }) {
  const map = {
    closed: { k: 'IA ACTIVA', t: 'Buenas tardes, Marta', c: 'text-fresh' },
    opening: { k: 'PUERTA', t: 'Abriendo…', c: 'text-steel' },
    scanning: { k: 'ESCANEO', t: 'Analizando alimentos…', c: 'text-fresh' },
    ready: { k: 'LISTO', t: '12 alimentos · 5 avisos', c: 'text-amber' },
  }[phase]
  return (
    <div className="flex h-full w-full flex-col justify-between bg-gradient-to-b from-[#0d1512] to-[#06090a] p-[9%] text-snow">
      <div className="flex items-center gap-[6%]">
        <span className="h-[6px] w-[6px] rounded-full bg-fresh animate-blink" />
        <span className={`font-mono text-[clamp(5px,0.85vw,9px)] tracking-widest ${map.c}`}>{map.k}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={phase} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="font-display text-[clamp(7px,1.25vw,13px)] font-semibold leading-tight">
          {map.t}
        </motion.p>
      </AnimatePresence>
      <span className="font-display text-[clamp(11px,2.3vw,24px)] font-bold leading-none">4°C</span>
    </div>
  )
}

function bestRecipe(selected: string[]): Recipe {
  return [...recipes].sort((a, b) => b.uses.filter((u) => selected.includes(u)).length - a.uses.filter((u) => selected.includes(u)).length)[0]
}

export default function Demo() {
  const { phase, open, toggle, reset } = useDemoMachine()
  const [tab, setTab] = useState<Tab>('inventario')
  const [selected, setSelected] = useState<string | null>(null)
  const ready = phase === 'ready'
  const food = foods.find((f) => f.id === selected) ?? null

  useEffect(() => {
    if (!open) setSelected(null)
  }, [open])

  return (
    <section className="relative min-h-[100svh] overflow-hidden pb-20 pt-28">
      <div aria-hidden className="absolute left-[20%] top-[20%] h-[50vmax] w-[50vmax] rounded-full bg-fresh/[0.04] blur-[140px]" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Demo interactiva</p>
            <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-none">Abre tu Frigojefe.</h1>
          </div>
          <Steps phase={phase} />
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* nevera */}
          <div className="relative mx-auto w-full max-w-[min(380px,calc((100svh-200px)/1.5))]">
            <Fridge
              open={open}
              scanning={phase === 'scanning'}
              showHotspots={ready}
              selectedId={selected}
              onSelect={(id) => {
                setSelected(id)
                setTab('inventario')
              }}
              screen={<DemoScreen phase={phase} />}
              drawers="peek"
              reflection={false}
            />
            {!open && (
              <motion.button
                type="button"
                onClick={toggle}
                className="absolute inset-0 z-20 grid place-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                aria-label="Abrir la nevera"
              >
                <span className="relative">
                  <motion.span className="absolute inset-0 rounded-full bg-fresh" animate={{ scale: [1, 1.25], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />
                  <span className="relative flex h-14 items-center gap-2 rounded-full bg-fresh px-6 font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(123,216,143,0.8)]">Toca para abrir</span>
                </span>
              </motion.button>
            )}
          </div>

          {/* panel */}
          <div className="glass relative z-10 min-h-[520px] overflow-hidden rounded-[28px] p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex rounded-full bg-white/[0.05] p-1">
                {(
                  [
                    ['inventario', 'Inventario', Package],
                    ['recetas', 'Recetas', ChefHat],
                    ['compra', 'Compra', ListChecks],
                  ] as const
                ).map(([id, label, Icon]) => (
                  <button key={id} onClick={() => setTab(id)} className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors sm:px-4 ${tab === id ? 'text-ink' : 'text-steel/70 hover:text-snow'}`}>
                    {tab === id && <motion.span layoutId="demo-tab" className="absolute inset-0 rounded-full bg-snow" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                    <Icon size={15} className="relative" />
                    <span className="relative hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
              <button onClick={open ? toggle : reset} className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[13px] text-steel/80 hover:border-white/30">
                {open ? <X size={14} /> : <RotateCcw size={14} />} {open ? 'Cerrar' : 'Reiniciar'}
              </button>
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {tab === 'inventario' && (
                  <motion.div key="inv" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                    {!ready ? <Waiting phase={phase} onOpen={toggle} /> : <Inventory selected={selected} onSelect={setSelected} />}
                  </motion.div>
                )}
                {tab === 'recetas' && (
                  <motion.div key="rec" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                    <RecipeGenerator />
                  </motion.div>
                )}
                {tab === 'compra' && (
                  <motion.div key="comp" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                    <Shopping />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ficha de alimento */}
            <AnimatePresence>
              {food && tab === 'inventario' && (
                <motion.div
                  key={food.id}
                  className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/10 bg-[#121518]/95 p-5 shadow-2xl backdrop-blur md:inset-x-6 md:bottom-6"
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                >
                  <button onClick={() => setSelected(null)} className="absolute right-4 top-4 text-steel/50 hover:text-snow" aria-label="Cerrar ficha">
                    <X size={18} />
                  </button>
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.06] text-3xl">{food.emoji}</span>
                    <div>
                      <p className="text-xl font-bold">{food.name}</p>
                      <p className="text-sm text-steel/60">{food.qty}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <span className="text-sm font-medium" style={{ color: statusColor[food.status] }}>
                      {statusLabel[food.status]} · {food.note}
                    </span>
                    <span className="font-display text-2xl font-bold">{food.freshness}%</span>
                  </div>
                  <div className="mt-2">
                    <FreshBar value={food.freshness} status={food.status} />
                  </div>
                  <p className="mt-3 text-[12px] text-steel/45">Frescura estimada por la IA. Revisa siempre el alimento.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Steps({ phase }: { phase: Phase }) {
  const idx = { closed: 0, opening: 1, scanning: 1, ready: 2 }[phase]
  const labels = ['Abre', 'Escanea', 'Explora']
  return (
    <div className="flex items-center gap-2">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <span className={`flex h-8 items-center gap-2 rounded-full px-3 font-mono text-[11px] uppercase tracking-wider transition-colors duration-500 ${i <= idx ? 'bg-fresh/15 text-fresh' : 'bg-white/[0.04] text-steel/40'}`}>
            {i + 1}. {l}
          </span>
          {i < labels.length - 1 && <span className={`h-px w-4 ${i < idx ? 'bg-fresh/50' : 'bg-white/10'}`} />}
        </div>
      ))}
    </div>
  )
}

function Waiting({ phase, onOpen }: { phase: Phase; onOpen: () => void }) {
  return (
    <div className="grid min-h-[400px] place-items-center text-center">
      {phase === 'closed' ? (
        <div>
          <p className="text-2xl font-bold">La nevera está cerrada.</p>
          <p className="mt-2 text-steel/60">Ábrela para ver lo que reconoce la IA.</p>
          <button onClick={onOpen} className="btn btn-fresh mt-6">Abrir la nevera</button>
        </div>
      ) : (
        <div>
          <motion.div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-fresh/10 text-fresh" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            <Sparkles size={26} />
          </motion.div>
          <p className="mt-5 text-xl font-semibold">{phase === 'opening' ? 'Abriendo…' : 'Escaneando alimentos…'}</p>
          <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-fresh" initial={{ width: '0%' }} animate={{ width: phase === 'opening' ? '30%' : '100%' }} transition={{ duration: phase === 'opening' ? 1.2 : 2.2, ease: 'easeInOut' }} />
          </div>
        </div>
      )}
    </div>
  )
}

function Inventory({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const alerts = foods.filter((f) => f.status !== 'fresco').length
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-2xl font-bold">12 alimentos</p>
        <p className="text-sm text-amber">{alerts} para consumir pronto</p>
      </div>
      <p className="mt-1 text-sm text-steel/55">Toca un punto en la nevera o un alimento.</p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {foods.map((f, i) => (
          <motion.button
            key={f.id}
            type="button"
            onClick={() => onSelect(f.id)}
            className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-colors ${selected === f.id ? 'border-fresh/60 bg-fresh/10' : 'border-white/[0.06] bg-white/[0.03] hover:border-white/20'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <span className="text-xl">{f.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-medium">{f.name}</span>
              <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full" style={{ width: `${f.freshness}%`, background: statusColor[f.status] }} />
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function RecipeGenerator() {
  const [chosen, setChosen] = useState<string[]>(['tomates', 'calabacin'])
  const [state, setState] = useState<'idle' | 'thinking' | 'done'>('idle')
  const recipe = useMemo(() => bestRecipe(chosen), [chosen])
  useEffect(() => {
    if (state !== 'thinking') return
    const t = setTimeout(() => setState('done'), 1300)
    return () => clearTimeout(t)
  }, [state])

  return (
    <div>
      <p className="text-2xl font-bold">¿Qué cocino hoy?</p>
      <p className="mt-1 text-sm text-steel/55">Elige ingredientes. La IA propone una receta.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {ingredientChips.map((id) => {
          const f = foods.find((x) => x.id === id)!
          const on = chosen.includes(id)
          return (
            <button
              key={id}
              onClick={() => {
                setChosen((c) => (on ? c.filter((x) => x !== id) : [...c, id]))
                setState('idle')
              }}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13.5px] transition-all ${on ? 'border-fresh bg-fresh/15 text-snow' : 'border-white/10 text-steel/70 hover:border-white/25'}`}
            >
              {f.emoji} {f.name}
            </button>
          )
        })}
      </div>
      <button disabled={!chosen.length || state === 'thinking'} onClick={() => setState('thinking')} className="btn btn-fresh mt-6 disabled:opacity-40">
        <Sparkles size={17} /> Generar receta
      </button>

      <div className="mt-6 min-h-[190px]">
        <AnimatePresence mode="wait">
          {state === 'thinking' && (
            <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 rounded-3xl border border-white/[0.06] p-5">
              {[70, 45, 85].map((w, i) => (
                <div key={i} className="h-4 overflow-hidden rounded-full bg-white/[0.06]" style={{ width: `${w}%` }}>
                  <motion.div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" animate={{ x: ['-100%', '300%'] }} transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.1 }} />
                </div>
              ))}
            </motion.div>
          )}
          {state === 'done' && (
            <motion.div key={recipe.id} initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="rounded-3xl border border-fresh/25 bg-fresh/[0.06] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fresh">Receta sugerida</p>
              <p className="mt-2 text-2xl font-bold">{recipe.name}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[12.5px] text-steel/75">
                <span className="rounded-full bg-white/[0.06] px-3 py-1">{recipe.time}</span>
                <span className="rounded-full bg-white/[0.06] px-3 py-1">{recipe.kcal} kcal</span>
                <span className="rounded-full bg-white/[0.06] px-3 py-1">Proteínas {recipe.macros.prot} g</span>
              </div>
              <p className="mt-4 text-[14px] text-steel/70">
                Usa: {recipe.uses.map((u) => foods.find((f) => f.id === u)!.name.toLowerCase()).join(', ')}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Shopping() {
  const [done, setDone] = useState<string[]>([])
  return (
    <div>
      <p className="text-2xl font-bold">Lista de la compra</p>
      <p className="mt-1 text-sm text-steel/55">Creada sola, según lo que falta.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {shoppingList.map((g) => (
          <div key={g.aisle} className="rounded-2xl border border-white/[0.06] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel/45">{g.aisle}</p>
            <div className="mt-2 space-y-1">
              {g.items.map((it) => {
                const on = done.includes(it)
                return (
                  <button key={it} onClick={() => setDone((d) => (on ? d.filter((x) => x !== it) : [...d, it]))} className="flex w-full items-center gap-3 py-1.5 text-left text-[14px]">
                    <span className={`grid h-5 w-5 place-items-center rounded-md border text-[11px] transition-colors ${on ? 'border-fresh bg-fresh text-ink' : 'border-white/25'}`}>{on && '✓'}</span>
                    <span className={on ? 'text-steel/40 line-through' : ''}>{it}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
