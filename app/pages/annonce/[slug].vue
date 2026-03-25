<template>
  <div v-if="announcement" class="annonce-page">
    <div class="wrap">

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Accueil</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink v-if="announcement.category" :to="`/categorie/${announcement.category.slug}`">
          {{ announcement.category.name }}
        </NuxtLink>
        <span v-if="announcement.category" class="sep">/</span>
        <span class="breadcrumb-current">{{ announcement.title }}</span>
      </nav>

      <div class="annonce-grid">

        <!-- ── Gallery ── -->
        <div class="gallery">
          <div class="gallery-main">
            <img
              v-if="activeImg"
              :src="activeImg"
              :alt="announcement.title"
              class="gallery-main-img"
            />
            <div v-else class="gallery-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <span class="condition-badge" :class="`condition--${announcement.condition}`">
              {{ CONDITION_LABELS[announcement.condition] }}
            </span>
          </div>

          <div v-if="images.length > 1" class="gallery-thumbs">
            <button
              v-for="(img, i) in images"
              :key="i"
              class="thumb-btn"
              :class="{ 'thumb-btn--active': activeImg === img }"
              @click="activeImg = img"
            >
              <img :src="img" :alt="`Photo ${i + 1}`" class="thumb-img" />
            </button>
          </div>
        </div>

        <!-- ── Info ── -->
        <div class="annonce-info">

          <!-- Category label -->
          <p v-if="announcement.category" class="info-category">
            {{ announcement.category.name }}
            <span v-if="announcement.subcategory"> · {{ announcement.subcategory.name }}</span>
          </p>

          <h1 class="info-title">{{ announcement.title }}</h1>

          <!-- Price -->
          <div class="info-price-row">
            <span class="info-price">
              {{ announcement.price !== null ? formatPrice(announcement.price) : 'Prix à négocier' }}
            </span>
          </div>

          <!-- Specs grid -->
          <div class="specs-grid">
            <div v-if="announcement.marque" class="spec-item">
              <span class="spec-label">Marque</span>
              <span class="spec-val">{{ announcement.marque }}</span>
            </div>
            <div v-if="announcement.dimensions" class="spec-item">
              <span class="spec-label">Dimensions</span>
              <span class="spec-val">{{ announcement.dimensions }}</span>
            </div>
            <div v-if="announcement.ville" class="spec-item">
              <span class="spec-label">Ville</span>
              <span class="spec-val">{{ announcement.ville }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Livraison</span>
              <span class="spec-val" :class="announcement.livraison ? 'spec-val--yes' : 'spec-val--no'">
                {{ announcement.livraison ? 'Disponible' : 'Non disponible' }}
              </span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Vues</span>
              <span class="spec-val">{{ announcement.views }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Publié</span>
              <span class="spec-val">{{ announcement.created_at }}</span>
            </div>
          </div>

          <!-- Seller card -->
          <div class="seller-card">
            <div class="seller-avatar">
              {{ sellerInitial }}
            </div>
            <div class="seller-info">
              <p class="seller-name">{{ announcement.fournisseur.nom_entreprise }}</p>
              <p class="seller-sub">Vendeur professionnel</p>
            </div>
          </div>

          <!-- Add to cart -->
          <div class="qty-row">
            <div class="qty-control">
              <button class="qty-btn" @click="qty = Math.max(1, qty - 1)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="qty-val">{{ qty }}</span>
              <button class="qty-btn" @click="qty++">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <button class="btn-cart" @click="handleAddToCart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Ajouter au panier
            </button>
          </div>
          <div v-if="addedMsg" class="added-msg">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Ajouté au panier !
          </div>
        </div>

      </div>

      <!-- ── Description ── -->
      <div id="description" class="description-block">
        <h2 class="desc-title">Description</h2>
        <p class="desc-text">{{ announcement.description }}</p>
      </div>

    </div>
  </div>

  <!-- Loading skeleton -->
  <div v-else-if="loading" class="annonce-page">
    <div class="wrap">
      <div class="skeleton-breadcrumb skeleton" />
      <div class="annonce-grid">
        <div class="skeleton-gallery skeleton" />
        <div class="skeleton-info">
          <div class="skeleton skeleton-title" />
          <div class="skeleton skeleton-price" />
          <div class="skeleton skeleton-specs" />
        </div>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="not-found">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <h1>Annonce introuvable</h1>
    <p>Cette annonce n'existe pas ou a été retirée.</p>
    <NuxtLink to="/" class="btn-back">Retour à l'accueil</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Announcement } from '~/composables/useAnnouncements'
import { CONDITION_LABELS } from '~/composables/useAnnouncements'

const route  = useRoute()
const config = useRuntimeConfig()
const slug   = computed(() => route.params.slug as string)
const { add } = useCart()

const qty      = ref(1)
const addedMsg = ref(false)

function handleAddToCart() {
  if (!announcement.value) return
  for (let i = 0; i < qty.value; i++) add(announcement.value.id)
  addedMsg.value = true
  setTimeout(() => { addedMsg.value = false }, 2500)
}

const announcement = ref<Announcement | null>(null)
const loading      = ref(true)

const images = computed(() => {
  return (announcement.value?.images ?? []).map(p =>
    p.startsWith('http') ? p : `${config.public.storageBase}/${p}`,
  )
})

const activeImg = ref<string | null>(null)

watch(images, (imgs) => {
  if (imgs.length && !activeImg.value) activeImg.value = imgs[0]
}, { immediate: true })

const sellerInitial = computed(() =>
  (announcement.value?.fournisseur.nom_entreprise ?? 'V').charAt(0).toUpperCase(),
)

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency', currency: 'TND', minimumFractionDigits: 0,
  }).format(price)
}

async function load() {
  loading.value = true
  const { fetchOne } = useAnnouncements()
  announcement.value = await fetchOne(slug.value)
  if (announcement.value?.images?.length) {
    const first = announcement.value.images[0]
    activeImg.value = first.startsWith('http') ? first : `${config.public.storageBase}/${first}`
  }
  loading.value = false
}

onMounted(load)
watch(slug, load)

useHead(() => ({
  title: announcement.value ? `${announcement.value.title} | meubletn` : 'Annonce | meubletn',
}))
</script>

<style scoped>
.annonce-page {
  background: #f3f4f6;
  min-height: 100vh;
  padding-bottom: 64px;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 640px)  { .wrap { padding: 0 24px; } }
@media (min-width: 1024px) { .wrap { padding: 0 48px; } }

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #9ca3af;
  padding: 16px 0 20px;
  flex-wrap: wrap;
}
.breadcrumb a { color: #6b7280; text-decoration: none; }
.breadcrumb a:hover { color: #db3a1b; }
.sep { color: #d1d5db; }
.breadcrumb-current { color: #374151; font-weight: 500; }

/* Grid */
.annonce-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .annonce-grid { grid-template-columns: 1fr 1fr; align-items: start; }
}
@media (min-width: 1024px) {
  .annonce-grid { grid-template-columns: 3fr 2fr; }
}

/* Gallery */
.gallery {}
.gallery-main {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: #f9fafb;
}
.condition-badge {
  position: absolute;
  top: 12px; left: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}
.condition--new      { background: #dcfce7; color: #15803d; }
.condition--like_new { background: #dbeafe; color: #1d4ed8; }
.condition--used     { background: #fef9c3; color: #a16207; }

.gallery-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.thumb-btn {
  width: 72px; height: 72px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: border-color 0.15s;
  flex-shrink: 0;
}
.thumb-btn--active { border-color: #db3a1b; }
.thumb-img { width: 100%; height: 100%; object-fit: cover; }

/* Info panel */
.annonce-info {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-category {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #db3a1b;
  margin: 0;
}
.info-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}
@media (min-width: 1024px) { .info-title { font-size: 24px; } }

.info-price-row { display: flex; align-items: center; gap: 12px; }
.info-price {
  font-size: 28px;
  font-weight: 800;
  color: #db3a1b;
}

/* Specs */
.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #f9fafb;
  border-radius: 8px;
  padding: 14px;
}
.spec-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.spec-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #9ca3af;
}
.spec-val {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}
.spec-val--yes { color: #15803d; }
.spec-val--no  { color: #9ca3af; }

/* Seller */
.seller-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.seller-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fef0ec;
  color: #db3a1b;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.seller-name { font-size: 14px; font-weight: 700; color: #111827; margin: 0; }
.seller-sub  { font-size: 12px; color: #9ca3af; margin: 0; }

/* Cart row */
.qty-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
@media (max-width: 400px) {
  .qty-control { width: 100%; justify-content: center; }
  .btn-cart    { width: 100%; }
}
.qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  height: 48px;
  background: #f9fafb;
  flex-shrink: 0;
}
.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
  display: flex;
  padding: 4px;
}
.qty-btn:hover { color: #db3a1b; }
.qty-val {
  font-size: 16px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
  color: #111827;
}
.btn-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  height: 48px;
  background: #db3a1b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}
.btn-cart:hover { background: #b83217; }
.added-msg {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  color: #15803d;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 10px 14px;
}

/* Description */
.description-block {
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.desc-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 14px;
}
.desc-text {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.75;
  margin: 0;
  white-space: pre-line;
}

/* Skeleton */
.skeleton {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 8px;
}
@keyframes shimmer { to { background-position: -200% 0; } }
.skeleton-breadcrumb { height: 16px; width: 260px; margin: 16px 0 20px; }
.skeleton-gallery { aspect-ratio: 4/3; border-radius: 12px; }
.skeleton-info { display: flex; flex-direction: column; gap: 14px; padding-top: 8px; }
.skeleton-title { height: 32px; border-radius: 6px; }
.skeleton-price { height: 40px; width: 160px; border-radius: 6px; }
.skeleton-specs { height: 120px; border-radius: 8px; }

/* Not found */
.not-found {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.not-found h1 { font-size: 22px; font-weight: 700; color: #111827; margin: 0; }
.not-found p  { font-size: 14px; color: #6b7280; margin: 0; }
.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 10px 20px;
  background: #db3a1b;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}
.btn-back:hover { background: #b83217; }
</style>
