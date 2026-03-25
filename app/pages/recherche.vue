<template>
  <div class="search-page">
    <div class="wrap">
      <div class="search-header">
        <h1 class="search-title">
          <span v-if="query">Résultats pour « {{ query }} »</span>
          <span v-else>Recherche</span>
        </h1>
        <span v-if="results.length > 0" class="search-count">{{ results.length }} résultat{{ results.length > 1 ? 's' : '' }}</span>
      </div>

      <!-- Search bar -->
      <form class="search-form" @submit.prevent="doSearch">
        <div class="search-box">
          <input v-model="localQuery" type="search" class="search-input" placeholder="Que recherchez-vous ?" />
          <button type="submit" class="search-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Rechercher
          </button>
        </div>
      </form>

      <!-- Results -->
      <div v-if="results.length > 0" class="results-grid">
        <template v-for="(item, i) in gridItems" :key="i">
          <ProductCard v-if="item.type === 'product'" :product="item.data" />
          <AnnonceCard v-else :annonce="item.data" class="ann-full" />
        </template>
      </div>

      <div v-else-if="query" class="no-results">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d9dadb" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
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

const route = useRoute()
const router = useRouter()
const allProducts: any[] = []

const query = computed(() => (route.query.q as string) ?? '')
const localQuery = ref(query.value)

watch(query, (q) => { localQuery.value = q })

const results = computed(() => {
  if (!query.value.trim()) return []
  const q = query.value.toLowerCase()
  return allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  )
})

const gridItems = computed(() =>
  results.value.map((p: any) => ({ type: 'product' as const, data: p }))
)

function doSearch() {
  if (localQuery.value.trim()) {
    router.push(`/recherche?q=${encodeURIComponent(localQuery.value.trim())}`)
  }
}

function searchTerm(term: string) {
  localQuery.value = term
  router.push(`/recherche?q=${encodeURIComponent(term)}`)
}

const popularTerms = ['Canapé', 'Lit', 'Bureau', 'Table', 'Chaise', 'Armoire', 'Tapis', 'Lampe']
</script>

<style scoped>
.search-page { background: #fff; min-height: 100vh; padding: 32px 0 64px; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.search-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.search-title { font-size: 26px; font-weight: 700; color: #2f3133; margin: 0; }
.search-count { font-size: 15px; color: #717678; }
.search-form { margin-bottom: 28px; }
.search-box { display: flex; gap: 0; max-width: 600px; }
.search-input {
  flex: 1;
  border: 1px solid #d9dadb;
  border-right: none;
  border-radius: 6px 0 0 6px;
  padding: 12px 16px;
  font-size: 15px;
  outline: none;
  background: #fff;
}
.search-input:focus { border-color: #2f3133; }
.search-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #db3a1b;
  color: #fff;
  border: none;
  border-radius: 0 6px 6px 0;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.search-btn:hover { background: #ab331a; }
.results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px; }
@media (min-width: 632px) { .results-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .results-grid { grid-template-columns: repeat(4, 1fr); } }
.ann-full { grid-column: 1 / -1; }
.no-results { background: #fff; border-radius: 10px; padding: 64px 32px; text-align: center; margin-bottom: 40px; }
.no-results h2 { font-size: 20px; font-weight: 700; color: #2f3133; margin: 16px 0 10px; }
.no-results p { font-size: 14px; color: #5b5e61; margin-bottom: 24px; }
.cta-btn { display: inline-flex; align-items: center; background: #db3a1b; color: #fff; text-decoration: none; border-radius: 6px; padding: 10px 24px; font-size: 14px; font-weight: 600; }
.cta-btn:hover { background: #ab331a; }
.popular-section { background: #fff; border-radius: 10px; padding: 24px; }
.popular-title { font-size: 16px; font-weight: 600; color: #2f3133; margin: 0 0 14px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { border: 1px solid #d9dadb; background: #fff; border-radius: 20px; padding: 6px 14px; font-size: 13px; color: #47494c; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
.chip:hover { background: #eeeeef; border-color: #2f3133; }
</style>
