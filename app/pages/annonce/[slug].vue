<template>
  <!-- ── Loading skeleton ── -->
  <div v-if="loading" class="ap-page">
    <div class="ap-wrap">
      <div class="ap-skeleton-bc skeleton" />
      <div class="ap-grid">
        <div class="ap-skeleton-gal skeleton" />
        <div class="ap-skeleton-info">
          <div class="skeleton" style="height:20px;width:120px" />
          <div class="skeleton" style="height:36px;border-radius:6px" />
          <div class="skeleton" style="height:48px;width:180px" />
          <div class="skeleton" style="height:100px;border-radius:8px" />
          <div class="skeleton" style="height:52px;border-radius:8px" />
        </div>
      </div>
    </div>
  </div>

  <!-- ── Not found ── -->
  <div v-else-if="!announcement" class="ap-notfound">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <h1>Annonce introuvable</h1>
    <p>Cette annonce n'existe pas ou a été retirée.</p>
    <NuxtLink to="/" class="ap-btn-back">Retour à l'accueil</NuxtLink>
  </div>

  <!-- ── Main page ── -->
  <div v-else class="ap-page">
    <div class="ap-wrap">

      <!-- Breadcrumb -->
      <nav class="ap-bc" aria-label="Fil d'Ariane">
        <NuxtLink to="/" class="ap-bc-link">Accueil</NuxtLink>
        <span class="ap-bc-sep">›</span>
        <NuxtLink v-if="announcement.category" :to="`/categorie/${announcement.category.slug}`" class="ap-bc-link">
          {{ announcement.category.name }}
        </NuxtLink>
        <span v-if="announcement.category" class="ap-bc-sep">›</span>
        <span class="ap-bc-cur">{{ announcement.title }}</span>
      </nav>

      <div class="ap-grid">

        <!-- ══ Gallery ══ -->
        <div class="ap-gallery">
          <!-- Thumbnails (vertical on desktop, below on mobile) -->
          <div v-if="images.length > 1" class="ap-thumbs">
            <button
              v-for="(img, i) in images"
              :key="i"
              class="ap-thumb"
              :class="{ 'ap-thumb--active': activeImg === img }"
              @click="activeImg = img"
            >
              <img :src="img" :alt="`Photo ${i + 1}`" class="ap-thumb-img" loading="lazy" />
            </button>
          </div>

          <!-- Main image -->
          <div class="ap-main-img-wrap">
            <img v-if="activeImg" :src="activeImg" :alt="announcement.title" class="ap-main-img" />
            <div v-else class="ap-img-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <!-- Condition badge -->
            <span class="ap-condition" :class="`cond--${announcement.condition}`">
              {{ CONDITION_LABELS[announcement.condition] }}
            </span>
            <!-- Wishlist on image -->
            <button
              class="ap-img-wish"
              :class="{ 'ap-img-wish--active': isWishlisted(announcement.id) }"
              :aria-label="isWishlisted(announcement.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
              @click="toggleWish"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" :fill="isWishlisted(announcement.id) ? 'currentColor' : 'none'">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- ══ Info panel ══ -->
        <div class="ap-panel">

          <!-- Brand / category -->
          <div class="ap-panel-top">
            <p v-if="announcement.category" class="ap-category">{{ announcement.category.name }}</p>
            <p v-if="announcement.marque" class="ap-brand">{{ announcement.marque }}</p>
          </div>

          <!-- Title -->
          <h1 class="ap-title">{{ announcement.title }}</h1>

          <!-- Price -->
          <div class="ap-price-block">
            <span class="ap-price">
              {{ announcement.price !== null ? formatPrice(announcement.price) : 'Prix à négocier' }}
            </span>
            <span v-if="announcement.price !== null" class="ap-price-tax">TTC</span>
          </div>

          <!-- Delivery + location -->
          <div class="ap-delivery-row">
            <div class="ap-delivery-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>
              <span>{{ announcement.livraison ? 'Livraison disponible' : 'Pas de livraison' }}</span>
            </div>
            <div v-if="announcement.ville" class="ap-delivery-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{{ announcement.ville }}</span>
            </div>
          </div>

          <!-- Add to cart -->
          <div class="ap-cart-block">
            <div class="ap-qty">
              <button class="ap-qty-btn" aria-label="Moins" @click="qty = Math.max(1, qty - 1)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="ap-qty-val">{{ qty }}</span>
              <button class="ap-qty-btn" aria-label="Plus" @click="qty++">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <button class="ap-btn-cart" @click="handleAddToCart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Ajouter au panier
            </button>
          </div>

          <!-- Added feedback -->
          <div v-if="addedMsg" class="ap-added-msg">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Ajouté au panier !
          </div>

          <!-- Seller card -->
          <div class="ap-seller">
            <div class="ap-seller-avatar">{{ sellerInitial }}</div>
            <div class="ap-seller-info">
              <p class="ap-seller-name">{{ announcement.fournisseur.nom_entreprise }}</p>
              <p class="ap-seller-sub">Vendeur professionnel · {{ announcement.views }} vues</p>
            </div>
          </div>

          <!-- Accordions -->
          <div class="ap-accordions">

            <!-- Dimensions -->
            <div v-if="announcement.dimensions || announcement.marque" class="ap-accordion">
              <button class="ap-accordion-btn" @click="openSpecs = !openSpecs">
                <span>Caractéristiques</span>
                <svg class="ap-chevron" :class="{ 'ap-chevron--open': openSpecs }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="ap-accordion-body" :class="{ 'ap-accordion-body--open': openSpecs }">
                <div class="ap-specs-table">
                  <div v-if="announcement.marque" class="ap-spec-row">
                    <span class="ap-spec-key">Marque</span>
                    <span class="ap-spec-val">{{ announcement.marque }}</span>
                  </div>
                  <div v-if="announcement.dimensions" class="ap-spec-row">
                    <span class="ap-spec-key">Dimensions</span>
                    <span class="ap-spec-val">{{ announcement.dimensions }}</span>
                  </div>
                  <div class="ap-spec-row">
                    <span class="ap-spec-key">État</span>
                    <span class="ap-spec-val">{{ CONDITION_LABELS[announcement.condition] }}</span>
                  </div>
                  <div class="ap-spec-row">
                    <span class="ap-spec-key">Livraison</span>
                    <span class="ap-spec-val">{{ announcement.livraison ? 'Disponible' : 'Non disponible' }}</span>
                  </div>
                  <div v-if="announcement.ville" class="ap-spec-row">
                    <span class="ap-spec-key">Localisation</span>
                    <span class="ap-spec-val">{{ announcement.ville }}</span>
                  </div>
                  <div class="ap-spec-row">
                    <span class="ap-spec-key">Publié le</span>
                    <span class="ap-spec-val">{{ formatDate(announcement.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div v-if="announcement.description" class="ap-accordion">
              <button class="ap-accordion-btn" @click="openDesc = !openDesc">
                <span>Description</span>
                <svg class="ap-chevron" :class="{ 'ap-chevron--open': openDesc }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="ap-accordion-body" :class="{ 'ap-accordion-body--open': openDesc }">
                <p class="ap-desc-text">{{ announcement.description }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Announcement } from '~/composables/useAnnouncements'
import { CONDITION_LABELS } from '~/composables/useAnnouncements'

const route  = useRoute()
const config = useRuntimeConfig()
const slug   = computed(() => route.params.slug as string)
const { add } = useCart()
const { toggle, isWishlisted } = useWishlist()

const qty        = ref(1)
const addedMsg   = ref(false)
const openSpecs  = ref(true)
const openDesc   = ref(true)

const announcement = ref<Announcement | null>(null)
const loading      = ref(true)

const images = computed(() =>
  (announcement.value?.images ?? []).map(p =>
    p.startsWith('http') ? p : `${config.public.storageBase}/${p}`,
  ),
)

const activeImg = ref<string | null>(null)

watch(images, (imgs) => {
  if (imgs.length && !activeImg.value) activeImg.value = imgs[0] ?? null
}, { immediate: true })

const sellerInitial = computed(() =>
  (announcement.value?.fournisseur.nom_entreprise ?? 'V').charAt(0).toUpperCase(),
)

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency', currency: 'TND', minimumFractionDigits: 0,
  }).format(price)
}

function formatDate(raw: string) {
  return new Date(raw).toLocaleDateString('fr-TN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function handleAddToCart() {
  if (!announcement.value) return
  add(announcement.value, qty.value)
  addedMsg.value = true
  setTimeout(() => { addedMsg.value = false }, 2500)
}

function toggleWish() {
  if (announcement.value) toggle(announcement.value)
}

async function load() {
  loading.value = true
  const { fetchOne } = useAnnouncements()
  announcement.value = await fetchOne(slug.value)
  const first = announcement.value?.images?.[0]
  if (first) {
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
/* ── Base ── */
.ap-page { background: #f3f4f6; min-height: 100vh; padding-bottom: 64px; }
.ap-wrap { max-width: 1280px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 640px)  { .ap-wrap { padding: 0 24px; } }
@media (min-width: 1024px) { .ap-wrap { padding: 0 48px; } }

/* ── Breadcrumb ── */
.ap-bc { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; padding: 16px 0 20px; flex-wrap: wrap; }
.ap-bc-link { color: #6b7280; text-decoration: none; transition: color 0.15s; }
.ap-bc-link:hover { color: #E1004E; }
.ap-bc-sep { color: #d1d5db; }
.ap-bc-cur { color: #374151; font-weight: 500; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ── Grid ── */
.ap-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: start;
}
@media (min-width: 768px) {
  .ap-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .ap-grid { grid-template-columns: 1fr 420px; }
}

/* ── Gallery ── */
.ap-gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
@media (min-width: 640px) {
  .ap-gallery { flex-direction: row; gap: 12px; }
}

/* Thumbnails */
.ap-thumbs {
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  order: 1;
}
.ap-thumbs::-webkit-scrollbar { display: none; }
@media (min-width: 640px) {
  .ap-thumbs {
    flex-direction: column;
    order: 0;
    overflow-x: unset;
    overflow-y: auto;
    max-height: 520px;
    flex-shrink: 0;
  }
}
.ap-thumb {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: border-color 0.15s;
}
.ap-thumb--active { border-color: #E1004E; }
.ap-thumb-img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Main image */
.ap-main-img-wrap {
  position: relative;
  flex: 1;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 1px 6px rgba(0,0,0,0.07);
}
.ap-main-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ap-img-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: #f9fafb;
}

/* Condition badge */
.ap-condition {
  position: absolute;
  top: 14px; left: 14px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.cond--new      { background: #dcfce7; color: #15803d; }
.cond--like_new { background: #dbeafe; color: #1d4ed8; }
.cond--used     { background: #fff0f6; color: #E1004E; }

/* Wishlist on image */
.ap-img-wish {
  position: absolute;
  top: 12px; right: 12px;
  width: 38px; height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.92);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  backdrop-filter: blur(4px);
  transition: color 0.15s, background 0.15s;
}
.ap-img-wish:hover { color: #E1004E; background: #fff; }
.ap-img-wish--active { color: #E1004E; }

/* ── Info panel ── */
.ap-panel {
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: sticky;
  top: 80px;
}

.ap-panel-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ap-category {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #E1004E;
  margin: 0;
}
.ap-brand {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.ap-title {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}
@media (min-width: 1024px) { .ap-title { font-size: 26px; } }

/* Price */
.ap-price-block { display: flex; align-items: baseline; gap: 8px; }
.ap-price {
  font-size: 32px;
  font-weight: 800;
  color: #E1004E;
  line-height: 1;
}
.ap-price-tax {
  font-size: 13px;
  color: #9ca3af;
  font-weight: 500;
}

/* Delivery row */
.ap-delivery-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 10px;
  padding: 14px;
}
.ap-delivery-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #374151;
}
.ap-delivery-item svg { color: #6b7280; flex-shrink: 0; }

/* Cart */
.ap-cart-block {
  display: flex;
  gap: 10px;
  align-items: center;
}
.ap-qty {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 0 12px;
  height: 50px;
  background: #f9fafb;
  flex-shrink: 0;
}
.ap-qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
  display: flex;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}
.ap-qty-btn:hover { color: #E1004E; background: #fff0f6; }
.ap-qty-val {
  font-size: 16px;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
  color: #111827;
}
.ap-btn-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  height: 50px;
  background: #E1004E;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
  white-space: nowrap;
}
.ap-btn-cart:hover { background: #c5003f; transform: translateY(-1px); }

.ap-added-msg {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #15803d;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 10px 14px;
}

/* Seller */
.ap-seller {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #f3f4f6;
  border-radius: 10px;
  background: #fafafa;
}
.ap-seller-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E1004E, #ff4d85);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(225,0,78,0.25);
}
.ap-seller-name { font-size: 14px; font-weight: 700; color: #111827; margin: 0 0 2px; }
.ap-seller-sub  { font-size: 12px; color: #9ca3af; margin: 0; }

/* Accordions */
.ap-accordions { display: flex; flex-direction: column; gap: 1px; border-top: 1px solid #f3f4f6; padding-top: 4px; }
.ap-accordion { border-bottom: 1px solid #f3f4f6; }
.ap-accordion-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  text-align: left;
}
.ap-accordion-btn:hover { color: #E1004E; }
.ap-chevron {
  color: #9ca3af;
  flex-shrink: 0;
  transition: transform 0.25s;
}
.ap-chevron--open { transform: rotate(180deg); }
.ap-accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
  overflow: hidden;
}
.ap-accordion-body--open { grid-template-rows: 1fr; }
.ap-accordion-body > * { min-height: 0; }

.ap-specs-table { padding-bottom: 16px; display: flex; flex-direction: column; gap: 0; }
.ap-spec-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 9px 0;
  border-bottom: 1px solid #f9fafb;
  gap: 12px;
}
.ap-spec-row:last-child { border-bottom: none; }
.ap-spec-key { font-size: 13px; color: #9ca3af; font-weight: 500; flex-shrink: 0; }
.ap-spec-val { font-size: 13px; color: #111827; font-weight: 600; text-align: right; }

.ap-desc-text {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.8;
  margin: 0 0 16px;
  white-space: pre-line;
}

/* ── Skeleton ── */
.skeleton {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 8px;
}
@keyframes shimmer { to { background-position: -200% 0; } }
.ap-skeleton-bc { height: 16px; width: 260px; margin: 16px 0 20px; }
.ap-skeleton-gal { aspect-ratio: 4/3; border-radius: 16px; }
.ap-skeleton-info { display: flex; flex-direction: column; gap: 14px; padding-top: 8px; }

/* ── Not found ── */
.ap-notfound {
  text-align: center;
  padding: 80px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.ap-notfound h1 { font-size: 22px; font-weight: 700; color: #111827; margin: 0; }
.ap-notfound p  { font-size: 14px; color: #6b7280; margin: 0; }
.ap-btn-back {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 8px; padding: 10px 20px;
  background: #E1004E; color: #fff;
  border-radius: 8px; text-decoration: none;
  font-size: 14px; font-weight: 600;
  transition: background 0.15s;
}
.ap-btn-back:hover { background: #c5003f; }
</style>
