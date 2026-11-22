// Rutas de imágenes optimizadas (public/img).
export const img = (name: string, w: number) => `${import.meta.env.BASE_URL}img/${name}-${w}.webp`
export const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`
