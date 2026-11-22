import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-[18px]" />
          <p className="mt-4 max-w-sm text-[15px] text-steel/60">Tu nevera piensa por ti.</p>
        </div>
        <div className="text-[14px]">
          <p className="eyebrow !text-steel/50">Producto</p>
          <ul className="mt-4 space-y-2 text-steel/70">
            <li><Link className="hover:text-snow" to="/funciones">Funciones</Link></li>
            <li><Link className="hover:text-snow" to="/demo">Demo interactiva</Link></li>
            <li><Link className="hover:text-snow" to="/comprar">Comprar</Link></li>
          </ul>
        </div>
        <div className="text-[14px]">
          <p className="eyebrow !text-steel/50">Marca</p>
          <ul className="mt-4 space-y-2 text-steel/70">
            <li><Link className="hover:text-snow" to="/campana">Campaña</Link></li>
            <li><Link className="hover:text-snow" to="/presentacion">Presentación</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-white/[0.06] py-6 text-[12.5px] text-steel/40 sm:flex-row sm:justify-between">
        <p>© 2027 Frigojefe · Proyecto académico ficticio</p>
        <p>Cifras estimadas. La IA estima la frescura: revisa siempre tus alimentos.</p>
      </div>
    </footer>
  )
}
