<template>
  <div class="cat-page">

    <!-- Breadcrumb + title -->
    <div class="cat-header">
      <div class="wrap">
        <nav class="breadcrumb">
          <NuxtLink to="/">Accueil</NuxtLink>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          <span>{{ category?.name || slug }}</span>
        </nav>
        <h1 class="cat-title">{{ category?.name || slug }}</h1>
        <p class="cat-count">{{ pagination.total }} annonce{{ pagination.total !== 1 ? 's' : '' }}</p>
      </div>
    </div>

    <!-- Subcategory tabs -->
    <div v-if="category?.subcategories?.length" class="sub-tabs-bar">
      <div class="wrap">
        <div class="sub-tabs">
          <NuxtLink
            :to="`/categorie/${slug}`"
            class="sub-tab"
            :class="{ 'sub-tab--active': !activeSub }"
          >Tout</NuxtLink>
          <NuxtLink
            v-for="sub in category.subcategories"
            :key="sub.slug"
            :to="`/categorie/${slug}/${sub.slug}`"
            class="sub-tab"
            :class="{ 'sub-tab--active': activeSub === sub.slug }"
          >{{ sub.name }}</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="wrap toolbar-inner">
        <div class="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="searchQ" type="search" placeholder="Rechercher…" class="search-input" @input="onSearch" />
        </div>
        <div class="filters">
          <select v-model="conditionF" class="filter-select" @change="() => load(1)">
            <option value="">Tous les états</option>
            <option value="new">Neuf</option>
            <option value="like_new">Comme neuf</option>
            <option value="used">Occasion</option>
          </select>
          <select v-model="sortF" class="filter-select" @change="() => load(1)">
            <option value="latest">Plus récents</option>
            <option value="popular">Plus vus</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="wrap grid-section">
      <div v-if="pending" class="skeleton-grid">
        <div v-for="n in 12" :key="n" class="skeleton-card" />
      </div>

      <div v-else-if="announcements.length === 0" class="empty-state">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <p>Aucune annonce dans cette catégorie pour le moment.</p>
        <NuxtLink to="/" class="back-home">← Retour à l'accueil</NuxtLink>
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

  </div>
</template>

<script setup lang="ts">
import type { Announcement } from '~/composables/useAnnouncements'

const route  = useRoute()
const config = useRuntimeConfig()
const slug   = computed(() => route.params.slug as string)
const activeSub = computed(() => null)   // no sub selected on this page

const { categories } = useCategories()
const category = computed(() => categories.value.find(c => c.slug === slug.value) ?? null)

useHead(() => ({ title: `${category.value?.name || slug.value} | meubletn` }))

// ── State ────────────────────────────────────────────────────
const announcements = ref<Announcement[]>([])
const pagination    = ref({ currentPage: 1, lastPage: 1, total: 0 })
const pending       = ref(true)
const searchQ       = ref('')
const conditionF    = ref('')
const sortF         = ref('latest')
let   searchTimer:  ReturnType<typeof setTimeout> | null = null

// ── Fetch ─────────────────────────────────────────────────────
async function load(page = 1) {
  pending.value = true
  try {
    const q: Record<string, any> = { page }
    if (category.value) q.category = category.value.id
    if (searchQ.value)  q.search   = searchQ.value
    if (conditionF.value) q.condition = conditionF.value
    if (sortF.value)    q.sort     = sortF.value

    const data = await $fetch<{
      data: Announcement[]
      current_page: number
      last_page: number
      total: number
    }>(`${config.public.apiBase}/announcements`, { params: q })

    announcements.value = data.data
    pagination.value = { currentPage: data.current_page, lastPage: data.last_page, total: data.total }
  } catch {
    // silent
  } finally {
    pending.value = false
  }
}

function onSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => load(1), 350)
}

function goToPage(page: number) {
  load(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => load())

// Reload when slug changes (navigating between categories)
watch(slug, () => {
  searchQ.value   = ''
  conditionF.value = ''
  load(1)
})
</script>

<style scoped>
.cat-page { background: #f9fafb; min-height: 100vh; padding-bottom: 64px; }

.wrap {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 640px)  { .wrap { padding: 0 24px; } }
@media (min-width: 1024px) { .wrap { padding: 0 48px; } }

/* Header */
.cat-header {
  background: #fff;
  border-bottom: 1px solid #f3f4f6;
  padding: 24px 0 20px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 10px;
}
.breadcrumb a { color: #9ca3af; text-decoration: none; }
.breadcrumb a:hover { color: #db3a1b; }
.cat-title { font-size: 26px; font-weight: 800; color: #111827; margin: 0 0 4px; }
@media (min-width: 768px) { .cat-title { font-size: 32px; } }
.cat-count { font-size: 13px; color: #9ca3af; margin: 0; }

/* Sub tabs */
.sub-tabs-bar {
  background: #fff;
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 10;
}
.sub-tabs {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 10px 0;
}
.sub-tabs::-webkit-scrollbar { display: none; }
.sub-tab {
  white-space: nowrap;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  transition: all 0.15s;
  flex-shrink: 0;
}
.sub-tab:hover { border-color: #db3a1b; color: #db3a1b; }
.sub-tab--active { background: #db3a1b; border-color: #db3a1b; color: #fff; }

/* Toolbar */
.toolbar {
  background: #fff;
  border-bottom: 1px solid #f3f4f6;
  padding: 10px 0;
}
.toolbar-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.search-wrap {
  position: relative;
  flex: 1;
  min-width: 180px;
}
.search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.search-input {
  width: 100%;
  height: 38px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px 0 36px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.search-input:focus { border-color: #db3a1b; }
.filters { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-select {
  height: 38px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 13px;
  background: #fff;
  color: #374151;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
}
.filter-select:focus { border-color: #db3a1b; }

/* Grid */
.grid-section { padding-top: 32px; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 640px)  { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
@media (min-width: 1280px) { .product-grid { grid-template-columns: repeat(5, 1fr); } }

/* Skeleton */
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

/* Empty */
.empty-state {
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #9ca3af;
  font-size: 14px;
}
.back-home {
  margin-top: 8px;
  color: #db3a1b;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
}
.back-home:hover { text-decoration: underline; }

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
