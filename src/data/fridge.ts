// Datos de la simulación (ficticios). La IA "estima": nada aquí es una garantía.

export type FoodStatus = 'fresco' | 'pronto' | 'revisar'

export interface Food {
  id: string
  name: string
  qty: string
  freshness: number // % estimado
  status: FoodStatus
  note: string
  // posición del punto en la imagen del interior (en %)
  x: number
  y: number
  emoji: string
}

export const foods: Food[] = [
  { id: 'leche', name: 'Leche', qty: '1 botella · 20 %', freshness: 70, status: 'pronto', note: 'Podría acabarse mañana', x: 21.1, y: 27.3, emoji: '🥛' },
  { id: 'yogures', name: 'Yogures', qty: '4 unidades', freshness: 88, status: 'fresco', note: 'Caducan en 9 días', x: 31.2, y: 32.6, emoji: '🥣' },
  { id: 'huevos', name: 'Huevos', qty: '4 unidades', freshness: 90, status: 'fresco', note: 'Caducan en 12 días', x: 60.6, y: 31.1, emoji: '🥚' },
  { id: 'queso', name: 'Queso', qty: '1 cuña', freshness: 84, status: 'fresco', note: 'Abierto hace 3 días', x: 78.7, y: 32.1, emoji: '🧀' },
  { id: 'tomates', name: 'Tomates', qty: '6 unidades', freshness: 38, status: 'pronto', note: 'Consumir en 2 días', x: 28.5, y: 48.9, emoji: '🍅' },
  { id: 'fresas', name: 'Fresas', qty: '1 bol', freshness: 45, status: 'pronto', note: 'Mejor hoy o mañana', x: 53.6, y: 48.5, emoji: '🍓' },
  { id: 'sobras', name: 'Sobras', qty: '1 táper', freshness: 55, status: 'revisar', note: 'Guardado hace 3 días', x: 75.1, y: 50.9, emoji: '🍱' },
  { id: 'calabacin', name: 'Calabacines', qty: '2 unidades', freshness: 80, status: 'fresco', note: 'Frescos 5 días', x: 26.7, y: 67.2, emoji: '🥒' },
  { id: 'pimientos', name: 'Pimientos', qty: '2 unidades', freshness: 86, status: 'fresco', note: 'Frescos 6 días', x: 50, y: 67.2, emoji: '🫑' },
  { id: 'pollo', name: 'Pechuga de pollo', qty: '400 g', freshness: 60, status: 'pronto', note: 'Caduca en 2 días', x: 73.3, y: 67.7, emoji: '🍗' },
  { id: 'lechuga', name: 'Lechuga', qty: '1 unidad', freshness: 72, status: 'fresco', note: 'Fresca 4 días', x: 30.9, y: 84.1, emoji: '🥬' },
  { id: 'zanahorias', name: 'Zanahorias', qty: '5 unidades', freshness: 92, status: 'fresco', note: 'Frescas 2 semanas', x: 64.4, y: 84.6, emoji: '🥕' },
]

export const statusLabel: Record<FoodStatus, string> = {
  fresco: 'Fresco',
  pronto: 'Consumir pronto',
  revisar: 'Revisar',
}

export interface Recipe {
  id: string
  name: string
  time: string
  kcal: number
  uses: string[] // ids de foods
  macros: { prot: number; carb: number; fat: number } // gramos estimados
}

export const recipes: Recipe[] = [
  { id: 'pasta', name: 'Pasta con verduras', time: '20 min', kcal: 520, uses: ['tomates', 'calabacin', 'pimientos', 'queso'], macros: { prot: 18, carb: 78, fat: 14 } },
  { id: 'tortilla', name: 'Tortilla de calabacín', time: '15 min', kcal: 380, uses: ['huevos', 'calabacin', 'queso'], macros: { prot: 22, carb: 10, fat: 26 } },
  { id: 'pollo-limon', name: 'Pollo al limón con ensalada', time: '25 min', kcal: 450, uses: ['pollo', 'lechuga', 'zanahorias', 'tomates'], macros: { prot: 42, carb: 16, fat: 20 } },
  { id: 'batido', name: 'Batido de fresas', time: '5 min', kcal: 210, uses: ['fresas', 'yogures', 'leche'], macros: { prot: 9, carb: 34, fat: 5 } },
  { id: 'ensalada', name: 'Ensalada de tomate y queso', time: '10 min', kcal: 290, uses: ['tomates', 'queso', 'lechuga'], macros: { prot: 14, carb: 12, fat: 20 } },
]

export const ingredientChips = ['tomates', 'calabacin', 'huevos', 'queso', 'pollo', 'fresas', 'lechuga', 'pimientos'] as const

export const weekMenu = [
  { day: 'Lun', lunch: 'Ensalada de pollo', dinner: 'Crema de calabacín' },
  { day: 'Mar', lunch: 'Pasta con verduras', dinner: 'Tortilla y ensalada' },
  { day: 'Mié', lunch: 'Lentejas', dinner: 'Pescado al horno' },
  { day: 'Jue', lunch: 'Arroz con verduras', dinner: 'Sopa y yogur' },
  { day: 'Vie', lunch: 'Pollo al limón', dinner: 'Pizza casera' },
  { day: 'Sáb', lunch: 'Paella', dinner: 'Tostas de tomate' },
  { day: 'Dom', lunch: 'Asado familiar', dinner: 'Batido y fruta' },
]

export const shoppingList = [
  { aisle: 'Lácteos', items: ['Leche (2 botellas)', 'Yogur natural'] },
  { aisle: 'Fruta y verdura', items: ['Plátanos', 'Espinacas', 'Cebollas'] },
  { aisle: 'Despensa', items: ['Lentejas', 'Arroz integral', 'Aceite de oliva'] },
  { aisle: 'Pescado', items: ['Merluza'] },
]
