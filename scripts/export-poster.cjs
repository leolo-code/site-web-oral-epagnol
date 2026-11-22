// Exporta el cartel a public/media (PNG 2000×2800 y PDF 50×70 cm).
// Uso: npm run build, npx vite preview --port 4173, luego node scripts/export-poster.cjs
const { chromium } = require('playwright')
;(async () => {
  const url = process.env.URL || 'http://localhost:4173/#/cartel'
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: 2 })
  await p.goto(url, { waitUntil: 'networkidle' })
  await p.waitForTimeout(800)
  await p.screenshot({ path: 'public/media/cartel-frigojefe.png', clip: { x: 0, y: 0, width: 1000, height: 1400 } })
  await p.emulateMedia({ media: 'screen' })
  await p.pdf({ path: 'public/media/cartel-frigojefe.pdf', width: '500mm', height: '700mm', printBackground: true, scale: 1.889, margin: { top: 0, right: 0, bottom: 0, left: 0 }, pageRanges: '1' })
  await b.close()
  console.log('ok')
})()
