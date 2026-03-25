/** Main category slug → local image path */
export const CATEGORY_IMAGES: Record<string, string> = {
  'meubles':           '/images/categories/meubles.jpg',
  'jardin-loisirs':    '/images/categories/jardin-loisirs.jpg',
  'accessoires':       '/images/categories/accessoires.jpg',
  'luminaires':        '/images/categories/luminaires.jpg',
  'textiles':          '/images/categories/textiles.jpg',
  'enfant':            '/images/categories/enfant.jpg',
  'cuisine':           '/images/categories/cuisine.jpg',
  'salle-de-bain':     '/images/categories/salle-de-bain.jpg',
  'animalerie':        '/images/categories/animalerie.jpg',
  'bricolage':         '/images/categories/bricolage.jpg',
  'electro-entretien': '/images/categories/electro-entretien.jpg',
}

export function getCategoryImage(slug: string): string {
  return CATEGORY_IMAGES[slug] ?? '/images/categories/meubles.jpg'
}

/** Tries a local subcategory image; falls back to parent category image */
export function getSubcategoryImage(slug: string, parentSlug?: string): string {
  return `/images/subcategories/${slug}.jpg`
}

/** Letter-avatar SVG data URI — used via @error when an image file is missing */
export function catAvatarSvg(name: string): string {
  const letter = (name[0] ?? '?').toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><rect width="56" height="56" rx="10" fill="#fff0f6"/><text x="28" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#E1004E">${letter}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
