import { PRODUCTS, MATERIALS, getProduct, filterProducts, sortProducts } from './products.js'

test('has thirteen products across four materials', () => {
  expect(PRODUCTS).toHaveLength(13)
  const materials = new Set(PRODUCTS.map((p) => p.material))
  expect(materials).toEqual(new Set(['Crochet', 'Leather', 'Denim', 'Custom']))
})

test('MATERIALS starts with All and lists each material once', () => {
  expect(MATERIALS).toEqual(['All', 'Crochet', 'Leather', 'Denim', 'Custom'])
})

test('getProduct finds by slug and returns undefined for unknown slugs', () => {
  expect(getProduct('bordova').name).toBe('Bordová')
  expect(getProduct('does-not-exist')).toBeUndefined()
})

test('filterProducts filters by material', () => {
  const result = filterProducts(PRODUCTS, { material: 'Leather' })
  expect(result).toHaveLength(1)
  expect(result[0].slug).toBe('petrolejova')
})

test('sortProducts sorts by name ascending and descending without mutating the input', () => {
  const asc = sortProducts(PRODUCTS, 'name-asc')
  const desc = sortProducts(PRODUCTS, 'name-desc')
  expect(asc.map((p) => p.name)).toEqual([...asc.map((p) => p.name)].sort((a, b) => a.localeCompare(b)))
  expect(desc.map((p) => p.name)).toEqual([...asc.map((p) => p.name)].reverse())
  expect(PRODUCTS.map((p) => p.name)).not.toEqual(asc.map((p) => p.name))
})
