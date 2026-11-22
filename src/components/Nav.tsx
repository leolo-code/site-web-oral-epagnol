import { AnimatePresence, motion } from 'motion/react'
import { Menu, Presentation, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/funciones', label: 'Funciones' },
  { to: '/demo', label: 'Demo' },
  { to: '/campana', label: 'Campaña' },
  { to: '/comprar', label: 'Comprar' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lightPage = false

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-all duration-500 ${scrolled || lightPage ? 'glass !border-x-0 !border-t-0' : 'border-b border-transparent'}`}>
        <nav className="container-x flex h-16 items-center justify-between" aria-label="Principal">
          <Link to="/" className="text-[17px]" aria-label="Frigojefe, inicio">
            <Logo />
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${isActive ? 'text-snow' : 'text-steel/60 hover:text-snow'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.07]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                      <span className="relative">{l.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link
              to="/presentacion"
              className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[12.5px] text-steel/60 transition hover:border-fresh/50 hover:text-snow sm:inline-flex"
              title="Modo presentación"
            >
              <Presentation size={14} /> Presentación
            </Link>
            <Link to="/comprar" className="btn btn-primary hidden !h-9 !px-4 !text-[13.5px] md:inline-flex">
              Comprar
            </Link>
            <button className="grid h-10 w-10 place-items-center rounded-full text-snow md:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-3 mt-2 rounded-2xl p-3 md:hidden"
          >
            {[...links, { to: '/presentacion', label: 'Modo presentación' }].map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `block rounded-xl px-4 py-3 text-[16px] ${isActive ? 'bg-white/[0.07] text-snow' : 'text-steel/70'}`}>
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
