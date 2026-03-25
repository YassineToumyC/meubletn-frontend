<template>
  <div class="list-page">
    <div class="list-hero list-hero--red">
      <div class="wrap">
        <nav class="breadcrumb"><NuxtLink to="/">Accueil</NuxtLink><span>/</span><span>Soldes</span></nav>
        <h1 class="list-hero-title">Soldes — Jusqu'à -50%</h1>
        <p class="list-hero-sub">{{ products.length }} offres à saisir dès maintenant</p>
      </div>
    </div>

    <div class="sort-bar">
      <div class="wrap sort-inner">
        <span class="sort-count">{{ products.length }} résultats</span>
        <select class="sort-select">
          <option>Meilleure réduction</option>
          <option>Prix croissant</option>
          <option>Prix décroissant</option>
        </select>
      </div>
    </div>

    <div class="wrap grid-wrap">
      <div class="plist-grid">
        <template v-for="(item, i) in gridItems" :key="i">
          <ProductCard v-if="item.type === 'product'" :product="item.data" />
          <AnnonceCard v-else :annonce="item.data" class="ann-full" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: "Soldes — Jusqu'à -50% | meubletn" })
const { announcements } = useAnnouncements()
const products: any[] = []
const gridItems = computed(() => {
  const items: Array<{ type: 'product' | 'annonce'; data: any }> = []
  let annIdx = 0
  products.forEach((p, i) => {
    if (i > 0 && i % 6 === 0 && annIdx < announcements.value.length) {
      items.push({ type: 'annonce', data: announcements.value[annIdx++] })
    }
    items.push({ type: 'product', data: p })
  })
  if (items.length === 0 && announcements.value.length > 0) {
    announcements.value.forEach(a => items.push({ type: 'annonce', data: a }))
  }
  return items
})
</script>

<style scoped>
.list-page { background: #fff; min-height: 100vh; }
.list-hero { padding: 48px 0; }
.list-hero--red { background: linear-gradient(135deg, #db3a1b 0%, #8b1a07 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.75); margin-bottom: 12px; }
.breadcrumb a { color: rgba(255,255,255,0.75); text-decoration: none; }
.list-hero-title { font-size: 32px; font-weight: 700; color: #fff; margin: 0 0 8px; }
@media (min-width: 984px) { .list-hero-title { font-size: 44px; } }
.list-hero-sub { font-size: 15px; color: rgba(255,255,255,0.85); margin: 0; }
.sort-bar { background: #fff; border-bottom: 1px solid #e2e4e4; }
.sort-inner { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; padding-bottom: 12px; }
.sort-count { font-size: 13px; color: #717678; }
.sort-select { border: 1px solid #d9dadb; border-radius: 5px; padding: 7px 12px; font-size: 13px; color: #2f3133; background: #fff; cursor: pointer; outline: none; }
.grid-wrap { padding-top: 28px; padding-bottom: 60px; }
.plist-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (min-width: 632px) { .plist-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .plist-grid { grid-template-columns: repeat(4, 1fr); } }
.ann-full { grid-column: 1 / -1; }
</style>
