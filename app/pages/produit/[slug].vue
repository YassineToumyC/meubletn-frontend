<template>
  <div v-if="product" class="prod-page">
    <div class="wrap">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Accueil</NuxtLink>
        <span>/</span>
        <NuxtLink :to="`/categorie/${product.categorySlug}`">{{ product.category }}</NuxtLink>
        <span>/</span>
        <span>{{ product.name }}</span>
      </nav>

      <!-- Main section -->
      <div class="prod-main">
        <!-- Gallery -->
        <div class="gallery">
          <div class="gallery-main">
            <img :src="activeImg" :alt="product.name" class="gallery-main-img" />
            <span v-if="product.badge" class="gal-badge" :class="product.badgeType === 'sale' ? 'badge--sale' : 'badge--new'">{{ product.badge }}</span>
          </div>
          <div class="gallery-thumbs">
            <button
              v-for="(img, i) in thumbs"
              :key="i"
              class="thumb-btn"
              :class="{ 'thumb-btn--active': activeImg === img }"
              @click="activeImg = img"
            >
              <img :src="img" :alt="`Vue ${i + 1}`" class="thumb-img" />
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="prod-info">
          <p class="prod-brand">{{ product.brand }}</p>
          <h1 class="prod-name">{{ product.name }}</h1>

          <div class="prod-rating">
            <div class="stars">
              <span v-for="i in 5" :key="i" class="star" :class="{ 'star--on': i <= product.rating }">★</span>
            </div>
            <a href="#avis" class="rating-link">{{ product.reviewCount }} avis</a>
          </div>

          <div class="prod-price-row">
            <span class="prod-price">{{ formatPrice(product.price) }}</span>
            <span v-if="product.oldPrice" class="prod-old">{{ formatPrice(product.oldPrice) }}</span>
            <span v-if="product.oldPrice" class="prod-saving">
              Économisez {{ formatPrice(product.oldPrice - product.price) }}
            </span>
          </div>

          <p class="prod-desc">{{ content.description }}</p>

          <ul class="prod-features">
            <li v-for="feat in content.features" :key="feat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#276749" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {{ feat }}
            </li>
          </ul>

          <!-- Qty + Cart -->
          <div class="prod-actions">
            <div class="qty-control">
              <button class="qty-btn" @click="qty = Math.max(1, qty - 1)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="qty-val">{{ qty }}</span>
              <button class="qty-btn" @click="qty++">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <button class="add-cart-btn" @click="handleAdd">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Ajouter au panier
            </button>
            <button class="wish-btn" aria-label="Favoris">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>

          <!-- Trust -->
          <div class="prod-trust">
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#276749" stroke-width="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>
              Livraison gratuite dès 990 DT
            </div>
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#276749" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.33"/></svg>
              Retour sous 30 jours
            </div>
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#276749" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Garantie 2 ans
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs-section">
        <div class="tabs-nav">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-btn"
            :class="{ 'tab-btn--active': activeTab === tab.key }"
            @click="activeTab = tab.key"
          >{{ tab.label }}</button>
        </div>

        <div class="tab-content">
          <!-- Description -->
          <div v-if="activeTab === 'desc'" class="tab-desc">
            <p>{{ content.description }}</p>
            <p>Ce produit est fabriqué selon les normes de qualité les plus strictes, avec des matériaux soigneusement sélectionnés pour leur durabilité et leur esthétique. Chaque détail a été pensé pour vous offrir confort et satisfaction sur le long terme.</p>
            <p>Dimensions : à vérifier lors de la commande. Montage simple avec notice illustrée incluse. Service client disponible pour toute question d'installation.</p>
          </div>

          <!-- Caractéristiques -->
          <div v-else-if="activeTab === 'specs'" class="tab-specs">
            <table class="specs-table">
              <tbody>
                <tr v-for="feat in content.features" :key="feat">
                  <td class="spec-key">Caractéristique</td>
                  <td class="spec-val">{{ feat }}</td>
                </tr>
                <tr>
                  <td class="spec-key">Marque</td>
                  <td class="spec-val">{{ product.brand }}</td>
                </tr>
                <tr>
                  <td class="spec-key">Référence</td>
                  <td class="spec-val">MTN-{{ product.id.toString().padStart(5, '0') }}</td>
                </tr>
                <tr>
                  <td class="spec-key">Garantie</td>
                  <td class="spec-val">2 ans constructeur</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Avis -->
          <div v-else id="avis" class="tab-reviews">
            <div class="review-summary">
              <div class="review-score">{{ product.rating }}.0</div>
              <div class="review-stars">
                <span v-for="i in 5" :key="i" class="star star-lg" :class="{ 'star--on': i <= product.rating }">★</span>
              </div>
              <div class="review-total">{{ product.reviewCount }} avis vérifiés</div>
            </div>
            <div class="reviews-list">
              <div v-for="review in mockReviews" :key="review.author" class="review-item">
                <div class="review-header">
                  <div class="review-author-info">
                    <span class="review-author">{{ review.author }}</span>
                    <div class="review-stars-sm">
                      <span v-for="i in 5" :key="i" class="star" :class="{ 'star--on': i <= review.rating }">★</span>
                    </div>
                  </div>
                  <span class="review-date">{{ review.date }}</span>
                </div>
                <p class="review-text">{{ review.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div class="related-section">
        <h2 class="related-title">Produits similaires</h2>
        <div class="related-grid">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <h1>Produit introuvable</h1>
    <NuxtLink to="/">Retour à l'accueil</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { add } = useCart()

const formatPrice = (n: number) =>
  n.toLocaleString('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 0 })

const product = ref<any>(null)

if (!product.value) {
  await navigateTo('/', { redirectCode: 302 })
}

const qty = ref(1)
const activeTab = ref('desc')
const tabs = [
  { key: 'desc', label: 'Description' },
  { key: 'specs', label: 'Caractéristiques' },
  { key: 'avis', label: `Avis (${product.value?.reviewCount ?? 0})` },
]

const thumbs = computed(() => {
  const id = product.value?.id ?? 1
  return [
    `https://picsum.photos/seed/meub${id}/700/700`,
    `https://picsum.photos/seed/meub${id}b/700/700`,
    `https://picsum.photos/seed/meub${id}c/700/700`,
    `https://picsum.photos/seed/meub${id}d/700/700`,
  ]
})

const activeImg = ref(thumbs.value[0])

watch(thumbs, (t) => { activeImg.value = t[0] })

const contentByCat: Record<string, { description: string; features: string[] }> = {
  'canapes': {
    description: 'Un canapé alliant confort et raffinement pour sublimer votre salon. Sa structure robuste garantit une durabilité exceptionnelle, tandis que son revêtement premium offre un toucher doux et agréable.',
    features: ['Structure en bois massif certifié FSC', 'Revêtement tissu déhoussable et lavable', 'Pieds en métal chromé réglables', 'Mousse haute densité 35 kg/m³', 'Coussins déhoussables inclus'],
  },
  'fauteuils': {
    description: 'Un fauteuil alliant confort et élégance pour votre salon. Conçu pour s\'intégrer harmonieusement dans votre intérieur.',
    features: ['Structure en bois massif', 'Revêtement tissu ou cuir', 'Pieds en bois naturel', 'Mousse haute densité', 'Garnissage polyester'],
  },
  'lits-literie': {
    description: 'Un lit conçu pour des nuits de sommeil parfaites. Son design épuré et ses finitions soignées en font la pièce maîtresse de votre chambre.',
    features: ['Structure en MDF laqué haute résistance', 'Sommier à lattes en bois massif inclus', 'Tête de lit rembourrée ergonomique', 'Pieds réglables ± 2 cm', 'Norme CE certifiée'],
  },
  'tables': {
    description: 'Une table robuste et élégante pour votre intérieur. Conçue pour résister aux exigences du quotidien tout en apportant une touche design.',
    features: ['Plateau MDF verni haute résistance', 'Structure bois ou métal solide', 'Traitement anti-rayures', 'Quincaillerie incluse', 'Capacité jusqu\'à 6 personnes'],
  },
  'chaises': {
    description: 'Une chaise confortable et design pour accompagner votre table. Alliant esthétique et ergonomie pour votre confort au quotidien.',
    features: ['Structure en hêtre massif', 'Assise rembourrée haute densité', 'Revêtement tissu lavable', 'Pieds antidérapants', 'Capacité 120 kg'],
  },
  'armoires-placards': {
    description: 'Un meuble de rangement de qualité premium pour optimiser votre espace. Alliant fonctionnalité et esthétique.',
    features: ['Façades MDF laquées résistantes', 'Quincaillerie silencieuse de qualité', 'Intérieur modulable', 'Finition mate anti-traces', 'Notice illustrée incluse'],
  },
  'luminaires': {
    description: 'Un luminaire sélectionné pour sa qualité et son design contemporain. Il apporte une touche unique et chaleureuse à votre intérieur.',
    features: ['Matériaux premium sélectionnés', 'Design contemporain', 'Compatible ampoule LED E27', 'Câble tissu tressé 2m', 'Certifié CE'],
  },
  'decoration': {
    description: 'Un accessoire décoratif pour sublimer votre intérieur. Sélectionné pour son design et sa qualité de fabrication.',
    features: ['Matériaux premium sélectionnés', 'Design contemporain', 'Fabrication soignée', 'Dimensions adaptées', 'Livré prêt à poser'],
  },
}
const defaultContent = {
  description: 'Un produit de qualité premium sélectionné pour son design et sa durabilité. Conçu pour s\'intégrer harmonieusement dans votre intérieur.',
  features: ['Matériaux de qualité premium', 'Design contemporain', 'Montage facile inclus', 'Garantie 2 ans', 'Certification CE'],
}
const content = computed(() => contentByCat[product.value?.categorySlug ?? ''] ?? defaultContent)

const mockReviews = [
  { author: 'Marie L.', rating: 5, date: '15 janv. 2025', text: 'Très satisfaite de mon achat ! La qualité est au rendez-vous et la livraison a été rapide. Je recommande vivement.' },
  { author: 'Thomas B.', rating: 4, date: '3 févr. 2025', text: 'Bon rapport qualité-prix. Le montage était simple grâce à la notice illustrée. Quelques jours pour le rodage mais résultat impeccable.' },
  { author: 'Sophie M.', rating: 5, date: '28 janv. 2025', text: 'Conforme à la description, emballage soigné, aucun dommage à la livraison. L\'esthétique est parfaite pour mon salon.' },
]

const related: any[] = []

function handleAdd() {
  if (product.value) {
    for (let i = 0; i < qty.value; i++) add(product.value.id)
  }
}

useHead(() => ({ title: `${product.value?.name ?? 'Produit'} | meubletn` }))
</script>

<style scoped>
.prod-page { background: #fff; padding-bottom: 64px; }

.wrap {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #717678;
  padding: 16px 0;
  flex-wrap: wrap;
}
.breadcrumb a { color: #717678; text-decoration: none; }
.breadcrumb a:hover { color: #db3a1b; text-decoration: underline; }

/* Main grid */
.prod-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
}
@media (min-width: 984px) {
  .prod-main { grid-template-columns: 3fr 2fr; padding: 40px; }
}

/* Gallery */
.gallery-main {
  position: relative;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}
.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gal-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  color: #fff;
}
.badge--sale { background: #db3a1b; }
.badge--new { background: #276749; }

.gallery-thumbs { display: flex; gap: 8px; }
.thumb-btn {
  width: 72px;
  height: 72px;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: border-color 0.15s;
  flex-shrink: 0;
}
.thumb-btn--active { border-color: #db3a1b; }
.thumb-img { width: 100%; height: 100%; object-fit: cover; }

/* Info */
.prod-brand { font-size: 13px; color: #717678; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px; }
.prod-name { font-size: 22px; font-weight: 700; color: #2f3133; margin: 0 0 12px; line-height: 1.25; }
@media (min-width: 984px) { .prod-name { font-size: 28px; } }

.prod-rating { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.stars { display: flex; gap: 2px; }
.star { color: #d9dadb; font-size: 16px; }
.star--on { color: #E1004E; }
.rating-link { font-size: 13px; color: #1a56a0; text-decoration: none; }
.rating-link:hover { text-decoration: underline; }

.prod-price-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.prod-price { font-size: 26px; font-weight: 700; color: #2f3133; }
.prod-old { font-size: 16px; color: #717678; text-decoration: line-through; }
.prod-saving { font-size: 13px; font-weight: 600; color: #db3a1b; background: #fff0ed; padding: 3px 8px; border-radius: 4px; }

.prod-desc { font-size: 14px; color: #5b5e61; line-height: 1.6; margin-bottom: 16px; }

.prod-features { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 8px; }
.prod-features li { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: #2f3133; }

.prod-actions { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d9dadb;
  border-radius: 6px;
  padding: 0 12px;
  height: 48px;
  background: #f8f8f8;
}
.qty-btn { background: none; border: none; cursor: pointer; color: #47494c; display: flex; padding: 4px; }
.qty-btn:hover { color: #2f3133; }
.qty-val { font-size: 16px; font-weight: 600; min-width: 28px; text-align: center; }

.add-cart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  background: #db3a1b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0 20px;
  height: 48px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}
.add-cart-btn:hover { background: #ab331a; }

.wish-btn {
  width: 48px;
  height: 48px;
  border: 1px solid #d9dadb;
  border-radius: 6px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #717678;
  transition: color 0.15s, border-color 0.15s;
  flex-shrink: 0;
}
.wish-btn:hover { color: #db3a1b; border-color: #db3a1b; }

.prod-trust { display: flex; flex-direction: column; gap: 8px; padding: 16px; background: #f8f8f8; border-radius: 8px; }
.trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #5b5e61; }

/* Tabs */
.tabs-section {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 40px;
}
.tabs-nav {
  display: flex;
  border-bottom: 1px solid #e2e4e4;
  overflow-x: auto;
}
.tab-btn {
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #717678;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s;
}
.tab-btn--active { color: #db3a1b; border-bottom-color: #db3a1b; }
.tab-btn:hover:not(.tab-btn--active) { color: #2f3133; }

.tab-content { padding: 28px; }

.tab-desc p { font-size: 15px; color: #47494c; line-height: 1.7; margin-bottom: 16px; }
.tab-desc p:last-child { margin-bottom: 0; }

.specs-table { width: 100%; border-collapse: collapse; }
.specs-table tr { border-bottom: 1px solid #eeeeef; }
.spec-key { padding: 12px 16px; font-size: 14px; font-weight: 600; color: #2f3133; width: 40%; background: #f8f8f8; }
.spec-val { padding: 12px 16px; font-size: 14px; color: #47494c; }

.review-summary { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid #eeeeef; }
.review-score { font-size: 42px; font-weight: 700; color: #2f3133; }
.star-lg { font-size: 20px; }
.review-total { font-size: 13px; color: #717678; }
.review-stars { display: flex; gap: 2px; }

.reviews-list { display: flex; flex-direction: column; gap: 20px; }
.review-item { padding-bottom: 20px; border-bottom: 1px solid #eeeeef; }
.review-item:last-child { border-bottom: none; }
.review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.review-author-info { display: flex; align-items: center; gap: 10px; }
.review-author { font-weight: 600; font-size: 14px; color: #2f3133; }
.review-stars-sm { display: flex; gap: 1px; }
.review-date { font-size: 12px; color: #717678; }
.review-text { font-size: 14px; color: #47494c; line-height: 1.6; margin: 0; }

/* Related */
.related-section { margin-bottom: 0; }
.related-title { font-size: 22px; font-weight: 700; color: #2f3133; margin-bottom: 20px; }
.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 632px) { .related-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .related-grid { grid-template-columns: repeat(4, 1fr); } }

.not-found { text-align: center; padding: 80px 20px; }
.not-found a { color: #db3a1b; }
</style>
