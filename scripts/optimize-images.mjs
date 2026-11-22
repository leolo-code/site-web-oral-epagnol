// Convertit les images Gemini d'origine (assets-src/, non versionné) en WebP optimisés (public/img/).
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const SRC = 'assets-src'
const OUT = 'public/img'
mkdirSync(OUT, { recursive: true })

const jobs = [
  { src: 'ref-01-frente', widths: [1400, 800] },
  { src: 'ref-02-tres-cuartos', widths: [1400, 800] },
  { src: 'ref-04-inox', widths: [1400, 800] },
  { src: 'ref-03-pantalla', widths: [1200] },
  { src: 'open-01-abierto', widths: [1400] },
  { src: 'life-01-cocina', widths: [1920, 960] },
  { src: 'stand-01-feria', widths: [1920, 960] },
  { src: 'det-01-camara', widths: [1920, 960] },
  { src: 'per-01-marta', widths: [900] },
  { src: 'dish-01-pasta', widths: [1000] },
  // Démo : intérieur recadré sur la façade du frigo, portes et tiroirs découpés dans REF-01
  { src: 'int-01-interior', out: 'demo-interior', crop: { left: 83, top: 124, width: 1673, height: 2076 }, widths: [1200] },
  { src: 'int-02-desorden', out: 'demo-interior-desorden', crop: { left: 83, top: 124, width: 1673, height: 2076 }, widths: [1200] },
  { src: 'int-01-interior', out: 'interior-full', widths: [1200] },
  { src: 'ref-01-frente', out: 'demo-door-left', crop: { left: 437, top: 203, width: 477, height: 1141 }, widths: [600] },
  { src: 'ref-01-frente', out: 'demo-door-right', crop: { left: 914, top: 203, width: 487, height: 1141 }, widths: [600] },
  { src: 'ref-01-frente', out: 'demo-drawers', crop: { left: 437, top: 1344, width: 964, height: 766 }, widths: [1200] },
]

for (const j of jobs) {
  for (const w of j.widths) {
    let img = sharp(`${SRC}/${j.src}.png`)
    if (j.crop) img = img.extract(j.crop)
    const name = `${j.out ?? j.src}-${w}.webp`
    await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(`${OUT}/${name}`)
    console.log('✓', name)
  }
}
