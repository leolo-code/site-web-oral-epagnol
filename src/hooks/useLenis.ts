import Lenis from 'lenis'
import { useEffect } from 'react'

let instance: Lenis | null = null
export const getLenis = () => instance

// Desplazamiento suave en todo el sitio (desactivado si el usuario prefiere menos movimiento).
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    instance = lenis
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      instance = null
    }
  }, [enabled])
}
