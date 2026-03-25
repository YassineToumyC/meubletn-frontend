<template>
  <div class="homepage">

    <!-- Search bar -->
    <div class="search-section">
      <div class="container">
        <div class="search-wrap">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Rechercher un meuble, canapé, table…"
            class="search-input"
            @input="onSearch"
          />
          <select v-model="conditionFilter" class="condition-select" @change="() => applyFilters()">
            <option value="">Tous les états</option>
            <option value="new">Neuf</option>
            <option value="like_new">Comme neuf</option>
            <option value="used">Occasion</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ── When searching: full-page results ───────────────── -->
    <div v-if="isFiltering" class="container section-gap">
      <div class="section-header">
        <h2 class="section-title">Résultats de recherche</h2>
        <span class="section-count">{{ pagination.total }} annonce{{ pagination.total !== 1 ? 's' : '' }}</span>
      </div>

      <div v-if="pending" class="skeleton-grid">
        <div v-for="n in 10" :key="n" class="skeleton-card" />
      </div>
      <div v-else-if="announcements.length === 0" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <p>Aucun résultat pour « {{ searchQuery }} »</p>
      </div>
      <div v-else class="product-grid">
        <AnnonceCard v-for="a in announcements" :key="a.id" :announcement="a" />
      </div>

      <div v-if="pagination.lastPage > 1" class="pagination">
        <button class="page-btn" :disabled="pagination.currentPage === 1" @click="goToPage(pagination.currentPage - 1)">← Précédent</button>
        <span class="page-info">Page {{ pagination.currentPage }} / {{ pagination.lastPage }}</span>
        <button class="page-btn" :disabled="pagination.currentPage === pagination.lastPage" @click="goToPage(pagination.currentPage + 1)">Suivant →</button>
      </div>
    </div>

    <!-- ── Normal homepage sections ────────────────────────── -->
    <template v-else>

      <!-- Nouveautés -->
      <section v-if="homeData?.nouveautes?.length" class="section container section-gap">
        <div class="section-header">
          <h2 class="section-title">Nouveautés</h2>
          <button class="see-all" @click="scrollToAll">Voir tout →</button>
        </div>
        <div class="scroll-row">
          <AnnonceCard
            v-for="a in homeData.nouveautes"
            :key="a.id"
            :announcement="a"
            class="scroll-card"
          />
        </div>
      </section>

      <!-- Sélectionné pour vous -->
      <section v-if="homeData?.populaires?.length" class="section container section-gap">
        <div class="section-header">
          <h2 class="section-title">Sélectionné pour vous</h2>
          <button class="see-all" @click="scrollToAll">Voir tout →</button>
        </div>
        <div class="scroll-row">
          <AnnonceCard
            v-for="a in homeData.populaires"
            :key="a.id"
            :announcement="a"
            class="scroll-card"
          />
        </div>
      </section>

      <!-- Par catégorie -->
      <template v-if="homeData?.par_categorie?.length">
        <section
          v-for="bloc in homeData.par_categorie"
          :key="bloc.category.id"
          class="section container section-gap"
        >
          <div class="section-header">
            <h2 class="section-title">{{ bloc.category.name }}</h2>
            <button class="see-all" @click="filterByCategory(bloc.category.id)">Voir tout →</button>
          </div>
          <div class="product-grid product-grid--sm">
            <AnnonceCard
              v-for="a in bloc.products"
              :key="a.id"
              :announcement="a"
            />
          </div>
        </section>
      </template>

      <!-- Loading skeleton for home sections -->
      <div v-if="homePending" class="container section-gap">
        <div class="skeleton-section-title" />
        <div class="skeleton-grid">
          <div v-for="n in 8" :key="n" class="skeleton-card" />
        </div>
        <div class="skeleton-section-title mt-32" />
        <div class="skeleton-grid">
          <div v-for="n in 8" :key="n" class="skeleton-card" />
        </div>
      </div>

      <!-- Tous les articles -->
      <section id="tous-les-articles" class="section container section-gap">
        <div class="section-header">
          <h2 class="section-title">Tous les articles</h2>
          <span class="section-count">{{ pagination.total }} annonce{{ pagination.total !== 1 ? 's' : '' }}</span>
        </div>

        <div v-if="pending" class="skeleton-grid">
          <div v-for="n in 10" :key="n" class="skeleton-card" />
        </div>
        <div v-else-if="announcements.length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <p>Aucune annonce pour le moment.</p>
        </div>
        <div v-else class="product-grid">
          <AnnonceCard v-for="a in announcements" :key="a.id" :announcement="a" />
        </div>

        <div v-if="pagination.lastPage > 1" class="pagination">
          <button class="page-btn" :disabled="pagination.currentPage === 1" @click="goToPage(pagination.currentPage - 1)">← Précédent</button>
          <span class="page-info">Page {{ pagination.currentPage }} / {{ pagination.lastPage }}</span>
          <button class="page-btn" :disabled="pagination.currentPage === pagination.lastPage" @click="goToPage(pagination.currentPage + 1)">Suivant →</button>
        </div>
      </section>

    </template>
  </div>
</template>

<script setup lang="ts">
import type { Announcement } from '~/composables/useAnnouncements'

useHead({
  title: 'Annonces meubles & déco en Tunisie | meubletn',
  meta: [
    { name: 'description', content: 'Parcourez des milliers d\'annonces de meubles et articles de décoration en Tunisie.' },
  ],
})

const config = useRuntimeConfig()
const { announcements, pagination, pending, fetchAnnouncements } = useAnnouncements()

// ── Home sections data ───────────────────────────────────────
const homeData    = ref<{
  nouveautes:    Announcement[]
  populaires:    Announcement[]
  par_categorie: { category: { id: number; name: string; slug: string }; products: Announcement[] }[]
} | null>(null)
const homePending = ref(true)

// ── Filters ──────────────────────────────────────────────────
const searchQuery     = ref('')
const conditionFilter = ref('')
const activeCategoryId = ref<number | null>(null)
let   searchTimer: ReturnType<typeof setTimeout> | null = null

const isFiltering = computed(() =>
  !!searchQuery.value.trim() || !!conditionFilter.value || !!activeCategoryId.value
)

onMounted(async () => {
  // Load home sections and all articles in parallel
  const [homeRes] = await Promise.all([
    $fetch<typeof homeData.value>(`${config.public.apiBase}/home`).catch(() => null),
    fetchAnnouncements(),
  ])
  homeData.value   = homeRes
  homePending.value = false
})

async function applyFilters(page = 1) {
  await fetchAnnouncements({
    force:     true,
    page,
    category:  activeCategoryId.value,
    search:    searchQuery.value || undefined,
    condition: conditionFilter.value || undefined,
  })
}

function onSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => applyFilters(), 350)
}

function goToPage(page: number) {
  applyFilters(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToAll() {
  const el = document.getElementById('tous-les-articles')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function filterByCategory(id: number) {
  activeCategoryId.value = id
  applyFilters()
  scrollToAll()
}
</script>

<style scoped>
.homepage { padding-bottom: 80px; background: #f9fafb; }

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 640px)  { .container { padding: 0 24px; } }
@media (min-width: 1024px) { .container { padding: 0 48px; } }

.section-gap { padding-top: 40px; }
@media (min-width: 768px) { .section-gap { padding-top: 56px; } }

/* Search bar */
.search-section {
  background: #fff;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
}
.search-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 720px;
  flex-wrap: wrap;
}
@media (max-width: 480px) {
  .search-input  { min-width: 0; }
  .condition-select { width: 100%; flex-shrink: 1; }
}
.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
/* search-wrap relative */
.search-wrap { position: relative; }
.search-input {
  flex: 1;
  height: 46px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 0 16px 0 42px;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s;
  background: #fff;
  min-width: 0;
}
.search-input:focus { border-color: #db3a1b; }
.condition-select {
  flex-shrink: 0;
  height: 46px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 13px;
  background: #fff;
  color: #374151;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
}
.condition-select:focus { border-color: #db3a1b; }

/* Section header */
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
}
.section-title {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}
@media (min-width: 768px) { .section-title { font-size: 24px; } }
.section-count { font-size: 13px; color: #9ca3af; font-weight: 500; }
.see-all {
  background: none;
  border: none;
  color: #db3a1b;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
}
.see-all:hover { text-decoration: underline; }

/* Horizontal scroll row */
.scroll-row {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}
.scroll-row::-webkit-scrollbar { height: 4px; }
.scroll-row::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
.scroll-card {
  flex: 0 0 220px;
}
@media (min-width: 640px) { .scroll-card { flex: 0 0 240px; } }
@media (min-width: 1024px) { .scroll-card { flex: 0 0 260px; } }

/* Product grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 640px)  { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
@media (min-width: 1280px) { .product-grid { grid-template-columns: repeat(5, 1fr); } }

.product-grid--sm {
  grid-template-columns: repeat(2, 1fr);
}
@media (min-width: 640px)  { .product-grid--sm { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .product-grid--sm { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1280px) { .product-grid--sm { grid-template-columns: repeat(6, 1fr); } }

/* Skeleton */
.skeleton-section-title {
  width: 180px; height: 28px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
  margin-bottom: 20px;
}
.mt-32 { margin-top: 32px; }
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 640px)  { .skeleton-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .skeleton-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
.skeleton-card {
  border-radius: 12px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  aspect-ratio: 3/4;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Empty state */
.empty-state {
  text-align: center;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #9ca3af;
  font-size: 14px;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 0 0;
}
.page-btn {
  padding: 9px 20px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) { border-color: #db3a1b; color: #db3a1b; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-info { font-size: 14px; color: #6b7280; }
</style>
