// Contenido comercial y de campaña. Todas las cifras son estimaciones ficticias (proyecto académico).

export const PRICE = 3999
export const MONTHLY = 111 // 3 999 € / 36 meses (redondeado)

export const costBreakdown = [
  { label: 'Fabricación', value: 720 },
  { label: 'Tecnología (cámaras, sensores, pantalla, IA)', value: 400 },
  { label: 'I+D, software y app', value: 160 },
  { label: 'Logística e instalación', value: 170 },
  { label: 'Marketing de lanzamiento', value: 150 },
]
export const FULL_COST = 1600
export const TRANSFER_PRICE = 2644 // precio de venta al distribuidor
export const OUR_MARGIN = 1044 // ≈ 40 %
export const RETAIL_HT = 3305
export const RETAIL_MARGIN = 661 // 20 %

export const priceOptions = [
  { id: 'A', price: 3299, margin: '27 %', strategy: 'Penetración de mercado', verdict: 'Más ventas, pero poco margen e imagen menos premium.' },
  { id: 'B', price: 3999, margin: '40 %', strategy: 'Prestigio + precio psicológico', verdict: 'Premium y creíble. Desde 111 €/mes.', chosen: true },
  { id: 'C', price: 4999, margin: '52 %', strategy: 'Descremado', verdict: 'Demasiado caro para una familia.' },
]

export const segmentation = [
  { k: 'Geográfico', v: 'Madrid, Barcelona, Valencia y Sevilla' },
  { k: 'Demográfico', v: '35–50 años, parejas y familias' },
  { k: 'Poder adquisitivo', v: 'Medio-alto y alto' },
  { k: 'Aficiones', v: 'Tecnología, cocina, vida sana' },
  { k: 'Comportamiento', v: 'Poco tiempo, compra online' },
]

export const fourP = [
  { id: 'producto', title: 'Producto', short: 'Nevera inteligente con IA', back: ['Nevera americana de 4 puertas', 'Cámaras, sensores y app', 'No solo conserva: te aconseja'] },
  { id: 'precio', title: 'Precio', short: '3 999 €', back: ['Estrategia de prestigio', 'Precio psicológico: .99', 'Desde 111 €/mes en 36 meses'] },
  { id: 'plaza', title: 'Plaza', short: 'Canal híbrido', back: ['Directo: web oficial y showroom', 'Indirecto: tiendas de electrodomésticos', 'Distribución selectiva'] },
  { id: 'promocion', title: 'Promoción', short: 'TikTok, cartel, web', back: ['TikTok con microinfluencers', 'Carteles en la vuelta al cole', 'Web con Google Ads y SEO', 'Ferias tecnológicas'] },
]

export const dafo = [
  { id: 'D', title: 'Debilidades', tone: 'internal', items: ['Precio alto', 'Depende de la tecnología', 'Datos que actualizar', 'Marca nueva'] },
  { id: 'A', title: 'Amenazas', tone: 'external', items: ['Grandes marcas', 'Tecnología que cambia rápido', 'Miedo por los datos', 'Presupuesto de las familias'] },
  { id: 'F', title: 'Fortalezas', tone: 'internal', items: ['Innovación', 'IA integrada', 'Ahorra tiempo', 'Menos desperdicio'] },
  { id: 'O', title: 'Oportunidades', tone: 'external', items: ['Casa conectada', 'Lucha contra el desperdicio', 'Auge de la IA', 'Interés por comer sano'] },
] as const

export const fidelizacion = [
  { title: 'Comunicación', text: 'Consejos personalizados en la app, sin saturar.' },
  { title: 'Compromiso', text: 'Club Frigojefe: recetas exclusivas, talleres y puntos.' },
  { title: 'Confianza', text: 'Garantía de 5 años y datos protegidos en Europa (RGPD).' },
]

export type SupportId = 'tiktok' | 'cartel' | 'web' | 'feria'

export interface Support {
  id: SupportId
  name: string
  format: string
  objective: string
  ganchos: string[]
  where: string
  analysis: { general: string; denotativo: string; connotativo: string; conclusion: string }
}

export const supports: Support[] = [
  {
    id: 'tiktok',
    name: 'Vídeo TikTok',
    format: 'Vertical 9:16 · 28 s',
    objective: 'Persuadir',
    ganchos: ['Humor', 'Familia', 'Modernidad'],
    where: '4 semanas · 3 vídeos por semana · microinfluencers',
    analysis: {
      general: 'Vídeo corto, vertical y con humor.',
      denotativo: 'Una madre abre la nevera: «No hay nada para comer…». Frigojefe propone 3 recetas.',
      connotativo: 'De la frustración a la sonrisa: la tecnología cuida de la familia.',
      conclusion: 'Un gancho en 2 segundos y un final con el eslogan.',
    },
  },
  {
    id: 'cartel',
    name: 'Cartel',
    format: 'Vertical 50 × 70 cm',
    objective: 'Informar',
    ganchos: ['Modernidad', 'Salud', 'Confort'],
    where: '3 semanas · metro, centros comerciales, gimnasios, oficinas',
    analysis: {
      general: 'Cartel elegante en negro, con QR hacia la web.',
      denotativo: 'Nevera abierta, comida fresca y un plato sano. Lectura en Z.',
      connotativo: 'Negro = elegancia. Verde = frescura y equilibrio.',
      conclusion: 'Se entiende en 3 segundos: qué es, qué hace, dónde verlo.',
    },
  },
  {
    id: 'web',
    name: 'Página web',
    format: 'Web + Google Ads · todo septiembre',
    objective: 'Informar y vender',
    ganchos: ['Modernidad', 'Confort'],
    where: 'Google Ads, posicionamiento SEO y medición de visitas y ventas',
    analysis: {
      general: 'Una web elegante, en negro, con una demo interactiva.',
      denotativo: 'Vemos la nevera, sus funciones, el precio y un botón para comprar.',
      connotativo: 'El negro y el verde transmiten elegancia y frescura: una marca moderna y seria.',
      conclusion: 'Es el centro de la campaña: el TikTok, el cartel y la feria llevan a la web.',
    },
  },
  {
    id: 'feria',
    name: 'Ferias tecnológicas',
    format: 'Stand · 4 días',
    objective: 'Experiencia',
    ganchos: ['Modernidad', 'Prestigio'],
    where: 'Ferias de tecnología y gastronomía · Madrid y Barcelona',
    analysis: {
      general: 'Stand «Cocina Frigojefe» con dos neveras.',
      denotativo: 'Un chef cocina, la IA reconoce los alimentos en directo.',
      connotativo: 'Ver para creer: la innovación se toca.',
      conclusion: 'Convierte el interés en pruebas y contactos.',
    },
  },
]

export const tiktokStoryboard = [
  { t: '0–2 s', text: '«No hay nada para comer…»' },
  { t: '2–4 s', text: 'La pantalla se enciende: escaneo' },
  { t: '4–9 s', text: '3 recetas aparecen' },
  { t: '9–12 s', text: 'Cena en familia' },
  { t: '12–15 s', text: '«Tu nevera piensa por ti.»' },
]

// Plan de medios (fechas ficticias, lanzamiento 2027)
export const mediaPlan = [
  { id: 'tiktok', label: 'TikTok', start: '2027-08-30', end: '2027-09-26', detail: '3 vídeos / semana', objective: 'Persuadir' },
  { id: 'cartel', label: 'Cartel', start: '2027-09-06', end: '2027-09-26', detail: 'Vuelta al cole', objective: 'Informar' },
  { id: 'web', label: 'Web + Ads', start: '2027-09-01', end: '2027-09-30', detail: 'Google Ads + SEO', objective: 'Vender' },
  { id: 'feria', label: 'Feria', start: '2027-10-07', end: '2027-10-10', detail: 'Madrid', objective: 'Experiencia' },
] as const
export const LAUNCH_DATE = '2027-09-06'
