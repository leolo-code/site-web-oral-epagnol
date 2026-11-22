import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { getLenis, useLenis } from './hooks/useLenis'
import Home from './pages/Home'

const Funciones = lazy(() => import('./pages/Funciones'))
const Demo = lazy(() => import('./pages/Demo'))
const Campana = lazy(() => import('./pages/Campana'))
const Comprar = lazy(() => import('./pages/Comprar'))
const Presentacion = lazy(() => import('./presentation/Presentacion'))
const CartelPrint = lazy(() => import('./pages/CartelPrint'))

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const l = getLenis()
    if (l) l.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function SiteRoutes() {
  const location = useLocation()
  const isPresentation = location.pathname.startsWith('/presentacion')
  useLenis(!isPresentation)

  if (location.pathname === '/cartel') {
    return (
      <Suspense fallback={null}>
        <CartelPrint />
      </Suspense>
    )
  }

  if (isPresentation) {
    return (
      <Suspense fallback={<div className="h-screen bg-ink" />}>
        <Presentacion />
      </Suspense>
    )
  }

  return (
    <>
      <ScrollTop />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense fallback={<div className="h-screen" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/funciones" element={<Funciones />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/campana" element={<Campana />} />
              <Route path="/comprar" element={<Comprar />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <SiteRoutes />
    </HashRouter>
  )
}
