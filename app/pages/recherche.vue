<template>
  <div class="search-page">
    <div class="wrap">

      <!-- Search bar -->
      <form class="search-form" @submit.prevent="doSearch">
        <div class="search-box">
          <input
            v-model="localQuery"
            type="search"
            class="search-input"
            placeholder="Que recherchez-vous ?"
            autocomplete="off"
          />
          <button type="submit" class="search-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Rechercher
          </button>
        </div>
      </form>

      <!-- Header -->
      <div v-if="query" class="search-header">
        <h1 class="search-title">Résultats pour « {{ query }} »</h1>
        <span v-if="!pending && announcements.length > 0" class="search-count">
          {{ pagination.total }} résultat{{ pagination.total > 1 ? 's' : '' }}
        </span>
      </div>
      <h1 v-else class="search-title" style="margin-bottom:24px">Recherche</h1>

      <!-- Loading -->
      <div v-if="pending" class="results-grid">
        <div v-for="n in 8" :key="n" class="skeleton-card skeleton" />
      </div>

      <!-- Results -->
      <div v-else-if="announcements.length > 0" class="results-grid">
        <AnnonceCard
          v-for="ann in announcements"
          :key="ann.id"
          :announcement="ann"
        />
      </div>

      <!-- No results -->
      <div v-else-if="query && !pending" class="no-results">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d9dadb" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h2>Aucun résultat pour « {{ query }} »</h2>
        <p>Vérifiez l'orthographe ou essayez avec un terme plus général.</p>
        <NuxtLink to="/" class="cta-btn">Retour à l'accueil</NuxtLink>
      </div>

      <!-- Popular searches -->
      <div class="popular-section">
        <h3 class="popular-title">Recherches populaires</h3>
        <div class="chips">
          <button v-for="term in popularTerms" :key="term" class="chip" @click="searchTerm(term)">{{ term }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Recherche | meubletn' })

const route  = useRoute()
const router = useRouter()
const { announcements, pagination, pending, fetchAnnouncements } = useAnnouncements()

const query      = computed(() => (route.query.q as string) ?? '')
const localQuery = ref(query.value)

watch(query, (q) => {
  localQuery.value = q
  if (q.trim()) {
    fetchAnnouncements({ search: q.trim(), force: true })
  } else {
    announcements.value = []
  }
}, { immediate: true })

function doSearch() {
  const q = localQuery.value.trim()
  if (q) router.push(`/recherche?q=${encodeURIComponent(q)}`)
}

function searchTerm(term: string) {
  localQuery.value = term
  router.push(`/recherche?q=${encodeURIComponent(term)}`)
}

const popularTerms = ['Canapé', 'Lit', 'Bureau', 'Table', 'Chaise', 'Armoire', 'Tapis', 'Lampe']
</script>

<style scoped>
.search-page { background: #f3f4f6; min-height: 100vh; padding: 32px 0 64px; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }

/* Search bar */
.search-form { margin-bottom: 28px; }
.search-box { display: flex; max-width: 640px; }
.search-input {
  flex: 1;
  border: 1px solid #d9dadb;
  border-right: none;
  border-radius: 8px 0 0 8px;
  padding: 12px 16px;
  font-size: 15px;
  outline: none;
  background: #fff;
  color: #2f3133;
}
.search-input:focus { border-color: #2f3133; }
.search-input[type='search']::-webkit-search-cancel-button { -webkit-appearance: none; }
.search-btn {
  display: flex; align-items: center; gap: 8px;
  background: #E1004E; color: #fff;
  border: none; border-radius: 0 8px 8px 0;
  padding: 12px 20px; font-size: 14px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  transition: background 0.15s;
}
.search-btn:hover { background: #c5003f; }

/* Header */
.search-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.search-title { font-size: 22px; font-weight: 700; color: #2f3133; margin: 0; }
.search-count { font-size: 14px; color: #717678; }

/* Results grid */
.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}
@media (min-width: 632px) { .results-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .results-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1392px) { .results-grid { grid-template-columns: repeat(5, 1fr); } }

/* Skeleton */
.skeleton {
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 12px;
}
@keyframes shimmer { to { background-position: -200% 0; } }
.skeleton-card { aspect-ratio: 3/4; }

/* No results */
.no-results {
  background: #fff; border-radius: 12px; padding: 56px 32px;
  text-align: center; margin-bottom: 40px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.no-results h2 { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0; }
.no-results p  { font-size: 14px; color: #5b5e61; margin: 0; }
.cta-btn {
  display: inline-flex; align-items: center;
  background: #E1004E; color: #fff; text-decoration: none;
  border-radius: 8px; padding: 10px 24px;
  font-size: 14px; font-weight: 600; margin-top: 8px;
  transition: background 0.15s;
}
.cta-btn:hover { background: #c5003f; }

/* Popular */
.popular-section { background: #fff; border-radius: 12px; padding: 24px; }
.popular-title { font-size: 15px; font-weight: 600; color: #2f3133; margin: 0 0 14px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  border: 1px solid #d9dadb; background: #fff; border-radius: 20px;
  padding: 7px 16px; font-size: 13px; color: #47494c; cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.chip:hover { background: #eeeeef; border-color: #2f3133; }
</style>
