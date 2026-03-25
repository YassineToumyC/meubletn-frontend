<template>
  <div class="articles-page">

    <!-- ── Sticky filter bar ── -->
    <div class="filter-bar">
      <div class="container">
        <div class="filters">

          <!-- Search -->
          <div class="filter-search">
            <svg class="filter-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Rechercher…"
              class="filter-input"
              @input="onSearch"
            />
          </div>

          <!-- Category -->
          <select v-model="categoryFilter" class="filter-select" @change="applyFilters()">
            <option value="">Toutes les catégories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>

          <!-- Condition -->
          <select v-model="conditionFilter" class="filter-select" @change="applyFilters()">
            <option value="">Tous les états</option>
            <option value="new">Neuf</option>
            <option value="like_new">Comme neuf</option>
            <option value="used">Occasion</option>
          </select>

          <!-- Sort -->
          <select v-model="sortFilter" class="filter-select" @change="applyFilters()">
            <option value="">Plus récents</option>
            <option value="popular">Plus vus</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>

          <!-- Reset -->
          <button v-if="isFiltering" class="filter-reset" @click="resetFilters">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Réinitialiser
          </button>
        </div>

        <!-- Result count -->
        <p class="result-count" v-if="!pending">
          <strong>{{ pagination.total }}</strong> annonce{{ pagination.total !== 1 ? 's' : '' }}
          <span v-if="isFiltering"> trouvée{{ pagination.total !== 1 ? 's' : '' }}</span>
        </p>
      </div>
    </div>

    <!-- ── Content ── -->
    <div class="container content-area">

      <!-- Skeleton -->
      <div v-if="pending" class="product-grid">
        <div v-for="n in 20" :key="n" class="skeleton-card" />
      </div>

      <!-- Empty -->
      <div v-else-if="announcements.length === 0" class="empty-state">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h2>Aucune annonce trouvée</h2>
        <p>Modifiez vos filtres ou revenez plus tard.</p>
        <button class="btn-reset-empty" @click="resetFilters">Réinitialiser les filtres</button>
      </div>

      <!-- Grid -->
      <div v-else class="product-grid">
        <AnnonceCard v-for="a in announcements" :key="a.id" :announcement="a" />
      </div>

      <!-- Pagination -->
      <div v-if="pagination.lastPage > 1" class="pagination">
        <button class="page-btn" :disabled="pagination.currentPage === 1" @click="goToPage(1)">«</button>
        <button class="page-btn" :disabled="pagination.currentPage === 1" @click="goToPage(pagination.currentPage - 1)">‹ Précédent</button>
        <div class="page-numbers">
          <button
            v-for="p in visiblePages"
            :key="p"
            class="page-btn"
            :class="{ 'page-btn--active': p === pagination.currentPage }"
            @click="goToPage(p)"
          >{{ p }}</button>
        </div>
        <button class="page-btn" :disabled="pagination.currentPage === pagination.lastPage" @click="goToPage(pagination.currentPage + 1)">Suivant ›</button>
        <button class="page-btn" :disabled="pagination.currentPage === pagination.lastPage" @click="goToPage(pagination.lastPage)">»</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Tous les articles | meubletn',
  meta: [{ name: 'description', content: 'Parcourez toutes les annonces de meubles et décoration en Tunisie.' }],
})

const config = useRuntimeConfig()
const { announcements, pagination, pending, fetchAnnouncements } = useAnnouncements()
const { categories } = useCategories()

const searchQuery    = ref('')
const categoryFilter = ref<number | ''>('')
const conditionFilter = ref('')
const sortFilter     = ref('')
let   searchTimer: ReturnType<typeof setTimeout> | null = null

const isFiltering = computed(() =>
  !!searchQuery.value.trim() || !!categoryFilter.value || !!conditionFilter.value || !!sortFilter.value
)

const visiblePages = computed(() => {
  const cur   = pagination.value.currentPage
  const last  = pagination.value.lastPage
  const pages: number[] = []
  for (let i = Math.max(1, cur - 2); i <= Math.min(last, cur + 2); i++) pages.push(i)
  return pages
})

onMounted(() => applyFilters())

async function applyFilters(page = 1) {
  await fetchAnnouncements({
    force:     true,
    page,
    per_page:  20,
    search:    searchQuery.value.trim() || undefined,
    category:  categoryFilter.value   || undefined,
    condition: conditionFilter.value  || undefined,
    sort:      sortFilter.value === 'popular' ? 'popular' : undefined,
    price_asc: sortFilter.value === 'price_asc'  || undefined,
    price_desc: sortFilter.value === 'price_desc' || undefined,
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

function resetFilters() {
  searchQuery.value    = ''
  categoryFilter.value = ''
  conditionFilter.value = ''
  sortFilter.value     = ''
  applyFilters()
}
</script>

<style scoped>
.articles-page {
  background: #f9fafb;
  min-height: 100vh;
  padding-bottom: 80px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 640px)  { .container { padding: 0 24px; } }
@media (min-width: 1024px) { .container { padding: 0 48px; } }

/* ── Filter bar ── */
.filter-bar {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 14px 0;
  position: sticky;
  top: 0;
  z-index: 20;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.filter-search {
  position: relative;
  flex: 1;
  min-width: 180px;
}
.filter-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.filter-input {
  width: 100%;
  height: 42px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px 0 36px;
  font-size: 14px;
  color: #111827;
  outline: none;
  background: #fff;
  transition: border-color 0.15s;
}
.filter-input:focus { border-color: #db3a1b; }
.filter-select {
  height: 42px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 13px;
  background: #fff;
  color: #374151;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
  max-width: 180px;
}
@media (max-width: 480px) { .filter-select { max-width: 100%; width: 100%; } }
.filter-select:focus { border-color: #db3a1b; }
.filter-reset {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px;
  background: #fef2f2;
  color: #db3a1b;
  border: 1.5px solid #fecaca;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}
.filter-reset:hover { background: #fee2e2; }

.result-count {
  margin: 8px 0 0;
  font-size: 13px;
  color: #6b7280;
}
.result-count strong { color: #111827; }

/* ── Content ── */
.content-area { padding-top: 24px; }

/* Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 480px)  { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 640px)  { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
@media (min-width: 1280px) { .product-grid { grid-template-columns: repeat(5, 1fr); } }

/* Skeleton */
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
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.empty-state h2 { font-size: 20px; font-weight: 700; color: #111827; margin: 0; }
.empty-state p  { font-size: 14px; color: #6b7280; margin: 0; }
.btn-reset-empty {
  margin-top: 8px;
  padding: 10px 24px;
  background: #db3a1b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.btn-reset-empty:hover { background: #b83217; }

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 48px 0 0;
}
.page-numbers { display: flex; gap: 6px; }
.page-btn {
  padding: 8px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.page-btn:hover:not(:disabled) { border-color: #db3a1b; color: #db3a1b; }
.page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.page-btn--active {
  background: #db3a1b;
  border-color: #db3a1b;
  color: #fff;
}
.page-btn--active:hover { background: #db3a1b; color: #fff; }
</style>
