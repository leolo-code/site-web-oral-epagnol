import { Poster } from '../components/Supports'

// Página sin interfaz, usada para exportar el cartel (PNG y PDF 50×70 cm).
export default function CartelPrint() {
  return (
    <div className="bg-[#08090a]" style={{ width: 1000, height: 1400 }}>
      <Poster width={1000} />
    </div>
  )
}
