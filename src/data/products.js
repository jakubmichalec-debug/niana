const ORDER_HREF = 'https://www.instagram.com/niana.bags/'

// Every piece here is already made and one of one, sold as seen, not to
// order, and not configurable (no strap/lining choices). That's why the
// product record carries only a description and care notes, no variant
// options.
//
// description/care are {en, sk} objects, not plain strings — this is
// user-facing copy (the actual paragraph shown on the product page and
// in the care dialog), so it has to follow the language switch same as
// everything else. Read via getProductText() below rather than indexing
// the object directly, so a missing `sk` value falls back to `en`
// instead of rendering undefined, matching how t() falls back elsewhere.
//
// images is an ordered array of {src, label}. The first entry is always
// the cutout shot on a transparent background — that's what the product
// page's gallery opens on, and what the collection grid tile shows —
// followed by real on-body/detail photos.
const CROCHET_DESCRIPTION = {
  en: 'Worked by hand, stitch by stitch, this exact piece is the only one there is.',
  sk: 'Ručne vyrobené, steh po stehu, tento presný kúsok je jediný, aký existuje.',
}
const CROCHET_CARE = {
  en: 'Spot clean only. Reshape by hand and dry flat, away from direct sun.',
  sk: 'Iba lokálne čistenie. Ručne pretvarujte a sušte naplocho, mimo priameho slnka.',
}

export const PRODUCTS = [
  {
    slug: 'bordova',
    name: 'Bordová',
    material: 'Crochet',
    images: [
      { src: '/images/collection/bordova/cover.png', label: 'bordová, crochet, cutout' },
      { src: '/images/collection/bordova/1.jpg', label: 'bordová, crochet, on body' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'rubinova',
    name: 'Rubínová',
    material: 'Crochet',
    images: [
      { src: '/images/collection/rubinova/cover.png', label: 'rubínová, crochet, cutout' },
      { src: '/images/collection/rubinova/1.jpg', label: 'rubínová, crochet, beaded trim detail' },
      { src: '/images/collection/rubinova/2.jpg', label: 'rubínová, crochet, on body' },
      { src: '/images/collection/rubinova/3.jpg', label: 'rubínová, crochet, strap detail' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'ruzova',
    name: 'Ružová',
    material: 'Crochet',
    images: [
      { src: '/images/collection/ruzova/cover.png', label: 'ružová, crochet, cutout' },
      { src: '/images/collection/ruzova/1.jpg', label: 'ružová, crochet, on body' },
      { src: '/images/collection/ruzova/2.jpg', label: 'ružová, crochet, detail' },
      { src: '/images/collection/ruzova/3.jpg', label: 'ružová, crochet, front' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'biela',
    name: 'Biela',
    material: 'Crochet',
    images: [
      { src: '/images/collection/biela/cover.png', label: 'biela, crochet, cutout' },
      { src: '/images/collection/biela/1.jpg', label: 'biela, crochet, on body' },
      { src: '/images/collection/biela/2.jpg', label: 'biela, crochet, detail' },
      { src: '/images/collection/biela/3.jpg', label: 'biela, crochet, front' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'fialova',
    name: 'Fialová',
    material: 'Crochet',
    images: [
      { src: '/images/collection/fialova/cover.png', label: 'fialová, crochet, cutout' },
      { src: '/images/collection/fialova/1.jpg', label: 'fialová, crochet, on body' },
      { src: '/images/collection/fialova/2.jpg', label: 'fialová, crochet, detail' },
      { src: '/images/collection/fialova/3.jpg', label: 'fialová, crochet, front' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'zasnezena',
    name: 'Zasnežená',
    material: 'Crochet',
    images: [
      { src: '/images/collection/zasnezena/cover.png', label: 'zasnežená, crochet, cutout' },
      { src: '/images/collection/zasnezena/1.jpg', label: 'zasnežená, crochet, on body' },
      { src: '/images/collection/zasnezena/2.jpg', label: 'zasnežená, crochet, detail' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'hneda',
    name: 'Hnedá',
    material: 'Crochet',
    images: [
      { src: '/images/collection/hneda/cover.png', label: 'hnedá, crochet, cutout' },
      { src: '/images/collection/hneda/1.jpg', label: 'hnedá, crochet, on body' },
      { src: '/images/collection/hneda/2.jpg', label: 'hnedá, crochet, detail' },
      { src: '/images/collection/hneda/3.jpg', label: 'hnedá, crochet, front' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'machova',
    name: 'Machová',
    material: 'Crochet',
    images: [
      { src: '/images/collection/machova/cover.png', label: 'machová, crochet, cutout' },
      { src: '/images/collection/machova/1.jpg', label: 'machová, crochet, on body' },
      { src: '/images/collection/machova/2.jpg', label: 'machová, crochet, detail' },
      { src: '/images/collection/machova/3.jpg', label: 'machová, crochet, front' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'tmavomodra',
    name: 'Tmavomodrá',
    material: 'Crochet',
    images: [
      { src: '/images/collection/tmavomodra/cover.png', label: 'tmavomodrá, crochet, cutout' },
      { src: '/images/collection/tmavomodra/1.jpg', label: 'tmavomodrá, crochet, on body' },
      { src: '/images/collection/tmavomodra/2.jpg', label: 'tmavomodrá, crochet, detail' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'zelena',
    name: 'Zelená',
    material: 'Crochet',
    images: [
      { src: '/images/collection/zelena/cover.png', label: 'zelená, crochet, cutout' },
      { src: '/images/collection/zelena/1.jpg', label: 'zelená, crochet, on body' },
      { src: '/images/collection/zelena/2.jpg', label: 'zelená, crochet, detail' },
      { src: '/images/collection/zelena/3.jpg', label: 'zelená, crochet, front' },
    ],
    description: CROCHET_DESCRIPTION,
    care: CROCHET_CARE,
  },
  {
    slug: 'vlajkova',
    name: 'Vlajková',
    material: 'Custom',
    images: [
      { src: '/images/collection/vlajkova/cover.png', label: 'vlajková, custom, cutout' },
      { src: '/images/collection/vlajkova/1.jpg', label: 'vlajková, custom, on body' },
      { src: '/images/collection/vlajkova/2.jpg', label: 'vlajková, custom, detail' },
    ],
    description: {
      en: 'Made to order and finished with a hand-embroidered flag motif, this exact piece is the only one there is.',
      sk: 'Vyrobené na želanie a dokončené ručne vyšívaným motívom vlajky, tento presný kúsok je jediný, aký existuje.',
    },
    care: CROCHET_CARE,
  },
  {
    slug: 'denim',
    name: 'Denim tote',
    material: 'Denim',
    images: [
      { src: '/images/collection/denim/cover.png', label: 'denim tote, cutout' },
      { src: '/images/collection/denim/1.jpg', label: 'denim tote, on body' },
      { src: '/images/collection/denim/2.jpg', label: 'denim tote, detail' },
      { src: '/images/collection/denim/3.jpg', label: 'denim tote, pocket detail' },
    ],
    description: {
      en: 'Reclaimed denim, cut and resewn by hand, the wear already on the fabric is part of the piece.',
      sk: 'Recyklovaný denim, ručne prestrihaný a prešitý, opotrebovanie látky je súčasťou kúska.',
    },
    care: {
      en: 'Cold hand wash only, reshape and dry flat. Do not tumble dry.',
      sk: 'Perte iba ručne v studenej vode, tvarujte a sušte naplocho. Nesušte v sušičke.',
    },
  },
  {
    slug: 'petrolejova',
    name: 'Petrolejová',
    material: 'Leather',
    images: [
      { src: '/images/collection/petrolejova/cover.png', label: 'petrolejová, leather, cutout' },
      { src: '/images/collection/petrolejova/1.jpg', label: 'petrolejová, leather, detail' },
      { src: '/images/collection/petrolejova/2.jpg', label: 'petrolejová, leather, on body' },
    ],
    description: {
      en: 'Cut and finished by hand from a single hide, this exact piece is the only one there is.',
      sk: 'Vystrihnuté a ručne dokončené z jednej kože, tento presný kúsok je jediný, aký existuje.',
    },
    care: {
      en: 'Spot clean only. Leather takes a clear balm twice a year. Keep away from direct sun and standing water.',
      sk: 'Iba lokálne čistenie. Koža potrebuje bezfarebný balzam dvakrát ročne. Chráňte pred priamym slnkom a stojatou vodou.',
    },
  },
]

export const MATERIALS = ['All', 'Crochet', 'Leather', 'Denim', 'Custom']

export const INSTAGRAM_URL = ORDER_HREF

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}

/** Reads a {en, sk} product text field for the given language, falling
 * back to English — same degrade-to-English behavior as useLanguage's
 * t(), for the one piece of product copy that lives outside
 * translations.js (it's per-product, not per-key). */
export function getProductText(field, lang) {
  return field?.[lang] ?? field?.en ?? ''
}

export function filterProducts(list, { material = 'All' } = {}) {
  return list.filter((p) => material === 'All' || p.material === material)
}

export function sortProducts(list, sortBy = 'name-asc') {
  const copy = [...list]
  copy.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy === 'name-desc') copy.reverse()
  return copy
}
