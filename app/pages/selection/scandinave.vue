<template>
  <div class="list-page">
    <div class="list-hero list-hero--scandi">
      <div class="wrap">
        <nav class="breadcrumb">
          <NuxtLink to="/">Accueil</NuxtLink><span>/</span>
          <NuxtLink to="/selection">Sélection</NuxtLink><span>/</span>
          <span>Style scandinave</span>
        </nav>
        <h1 class="list-hero-title">Le Style Scandinave</h1>
        <p class="list-hero-sub">Lignes épurées, bois naturel et couleurs douces pour un intérieur apaisant</p>
      </div>
    </div>

    <div class="sort-bar">
      <div class="wrap sort-inner">
        <span class="sort-count">{{ products.length }} produits dans cette sélection</span>
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
useHead({ title: 'Style Scandinave | meubletn' })
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
.list-page { background: #eeeeef; min-height: 100vh; }
.list-hero { padding: 48px 0; }
.list-hero--scandi { background: linear-gradient(135deg, #5a6a8e 0%, #2f3133 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 12px; flex-wrap: wrap; }
.breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
.list-hero-title { font-size: 32px; font-weight: 700; color: #fff; margin: 0 0 8px; }
@media (min-width: 984px) { .list-hero-title { font-size: 44px; } }
.list-hero-sub { font-size: 15px; color: rgba(255,255,255,0.8); margin: 0; max-width: 500px; }
.sort-bar { background: #fff; border-bottom: 1px solid #e2e4e4; }
.sort-inner { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; padding-bottom: 12px; }
.sort-count { font-size: 13px; color: #717678; }
.grid-wrap { padding-top: 28px; padding-bottom: 60px; }
.plist-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (min-width: 632px) { .plist-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .plist-grid { grid-template-columns: repeat(4, 1fr); } }
.ann-full { grid-column: 1 / -1; }
</style>
