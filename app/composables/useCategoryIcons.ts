const BASE = 'https://images.unsplash.com/photo-'
const Q    = '?w=80&h=80&q=75&fit=crop&auto=format'
const QS   = '?w=56&h=56&q=70&fit=crop&auto=format'

/** Main category slug → image URL (local when available, Unsplash fallback) */
export const CATEGORY_IMAGES: Record<string, string> = {
  'meubles':           '/images/categories/meubles.jpg',
  'jardin-loisirs':    '/images/categories/jardin-loisirs.jpg',
  'accessoires':       '/images/categories/accessoires.jpg',
  'luminaires':        '/images/categories/luminaires.jpg',
  'textiles':          `${BASE}8qNuR1lIv_k${Q}`,
  'enfant':            '/images/categories/enfant.jpg',
  'cuisine':           '/images/categories/cuisine.jpg',
  'salle-de-bain':     '/images/categories/salle-de-bain.jpg',
  'animalerie':        `${BASE}Qb7D1xw28Co${Q}`,
  'bricolage':         `${BASE}G5i9LQ7sPOw${Q}`,
  'electro-entretien': '/images/categories/electro-entretien.jpg',
}

/** Subcategory slug → Unsplash image URL */
export const SUBCATEGORY_IMAGES: Record<string, string> = {
  // Meubles
  'canapes':              `${BASE}Tk8ji91xeh0${QS}`,    // gray sectional sofa
  'fauteuils':            `${BASE}efCyfI7UGaY${QS}`,    // armchair with person reading
  'chaises':              `${BASE}idXQEOxhmvU${QS}`,    // dining table with white chairs
  'tables':               `${BASE}aXJkDfOVfyE${QS}`,    // large wooden dining table
  'lits-literie':         `${BASE}nEtpvJjnPVo${QS}`,    // white bed with gray linen
  'armoires-placards':    `${BASE}dO9rp6DxreY${QS}`,    // walk-in closet with clothes
  'meubles-tv':           `${BASE}shT_LaGUmYI${QS}`,    // living room with flat-screen TV
  'commodes':             `${BASE}o_O6lKAggww${QS}`,    // bedroom with dresser
  'etageres':             `${BASE}G-4wX5tZNuE${QS}`,    // books on shelf
  'matelas':              `${BASE}1dJfljc2tBk${QS}`,    // bed frame with white mattress
  'meubles-de-salon':     `${BASE}DY7wJD6Ly2s${QS}`,    // modern living room with plants
  'meubles-salle-manger': `${BASE}lGWmTzCyEB8${QS}`,    // rustic wooden dining table
  'meubles-chambre':      `${BASE}ZOEY7K7Wtwk${QS}`,    // bedroom with bed & TV
  'mobilier-bureau':      `${BASE}xk8dimKIAaY${QS}`,    // home office desk setup
  'bancs':                `${BASE}idXQEOxhmvU${QS}`,
  'tabourets':            `${BASE}idXQEOxhmvU${QS}`,
  'ensembles-de-meubles': `${BASE}DY7wJD6Ly2s${QS}`,

  // Luminaires
  'lustres-suspensions':  `${BASE}4kgsyPpka_Y${QS}`,   // gold chandelier
  'lampes-sol':           `${BASE}-K77iacKzBA${QS}`,    // floor lamp in living room
  'lampes-table':         `${BASE}lDlU1zbjGQA${QS}`,    // table lamp on desk
  'lampes-bureau':        `${BASE}lDlU1zbjGQA${QS}`,
  'appliques-murales':    `${BASE}hF_hN4TRGas${QS}`,

  // Accessoires
  'miroirs':              `${BASE}Bl3lSw_ajWg${QS}`,    // mirror on living room wall
  'tapis':                `${BASE}af3F3ZTaUwA${QS}`,    // fancy rug in living room
  'coussins':             `${BASE}GWFFvub7Y1U${QS}`,    // colorful throw pillows on sofa
  'vases':                `${BASE}B6uUPYt7wz4${QS}`,    // white flowers in glass vase
  'objets-decoratifs':    `${BASE}1-VoF8mT7Aw${QS}`,
  'tableaux-art-mural':   `${BASE}1-VoF8mT7Aw${QS}`,
  'rideaux-voilages':     `${BASE}8qNuR1lIv_k${QS}`,

  // Textiles
  'linge-de-lit':         `${BASE}8qNuR1lIv_k${QS}`,
  'couvertures-plaids':   `${BASE}GWFFvub7Y1U${QS}`,
  'housses-canape':       `${BASE}Tk8ji91xeh0${QS}`,

  // Jardin
  'mobilier-jardin':      `${BASE}--_tlkqnhxSc${QS}`,  // wooden table & chairs on deck
  'mobilier-balcon':      `${BASE}lbzwDclA8dk${QS}`,
  'barbecues':            `${BASE}lbzwDclA8dk${QS}`,

  // Cuisine
  'tables-cuisine':       `${BASE}urH155LONWs${QS}`,    // modern dining with kitchen
  'chaises-cuisine':      `${BASE}VYQ24LiC--I${QS}`,    // dining room white chairs
  'ilots-cuisine':        `${BASE}mhDeeOvBs9o${QS}`,

  // Salle de bain
  'meubles-sdb':          `${BASE}baaFjrEgVWs${QS}`,    // modern white bathroom vanity
  'miroirs-sdb':          `${BASE}Z9MHFepWMtc${QS}`,

  // Enfant
  'lits-enfant':          `${BASE}txRYsL9Kj2E${QS}`,    // kids room with bed & shelves
  'bureaux-enfant':       `${BASE}jfnUC7s3iuw${QS}`,    // toddler at desk

  // Bricolage
  'outils-electroportatifs': `${BASE}G5i9LQ7sPOw${QS}`,
  'outillage-main':          `${BASE}G5i9LQ7sPOw${QS}`,
  'peinture-enduit':         `${BASE}G5i9LQ7sPOw${QS}`,

  // Électro
  'lave-linge':           `${BASE}GzLxFhvgzkw${QS}`,
  'refrigerateurs':       `${BASE}GzLxFhvgzkw${QS}`,
  'aspirateurs':          `${BASE}GzLxFhvgzkw${QS}`,
  'machines-cafe':        `${BASE}mhDeeOvBs9o${QS}`,

  // Animalerie
  'chiens':               `${BASE}Qb7D1xw28Co${QS}`,
  'chats':                `${BASE}Qb7D1xw28Co${QS}`,
}

const DEFAULT_CAT = `${BASE}FI4ZN6aaWQ0${Q}`
const DEFAULT_SUB = `${BASE}DY7wJD6Ly2s${QS}`

export function getCategoryImage(slug: string): string {
  return CATEGORY_IMAGES[slug] ?? DEFAULT_CAT
}

export function getSubcategoryImage(slug: string, parentSlug?: string): string {
  return SUBCATEGORY_IMAGES[slug]
    ?? (parentSlug ? CATEGORY_IMAGES[parentSlug] : null)
    ?? DEFAULT_SUB
}
