<template>
  <div class="sel-page">
    <div class="sel-hero">
      <div class="wrap">
        <nav class="breadcrumb"><NuxtLink to="/">Accueil</NuxtLink><span>/</span><span>Sélection</span></nav>
        <h1 class="sel-title">Notre sélection</h1>
        <p class="sel-sub">Des univers déco soigneusement choisis pour vous inspirer</p>
      </div>
    </div>

    <div class="wrap content-wrap">
      <!-- Curated collections -->
      <div class="collections-grid">
        <NuxtLink to="/selection/scandinave" class="coll-card coll-card--scandi">
          <img src="https://picsum.photos/seed/scandi123/800/500" alt="Scandinave" class="coll-img" />
          <div class="coll-overlay">
            <span class="coll-tag">Style</span>
            <h3 class="coll-title">Le Scandinave</h3>
            <p class="coll-desc">Épuré, naturel, apaisant</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/categorie/tables" class="coll-card coll-card--home-office">
          <img src="https://picsum.photos/seed/homeoffice99/800/500" alt="Home Office" class="coll-img" />
          <div class="coll-overlay">
            <span class="coll-tag">Tendance</span>
            <h3 class="coll-title">Home Office 2025</h3>
            <p class="coll-desc">Travailler chez soi en beauté</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/categorie/luminaires" class="coll-card coll-card--warm">
          <img src="https://picsum.photos/seed/warmlight77/800/500" alt="Déco lumineuse" class="coll-img" />
          <div class="coll-overlay">
            <span class="coll-tag">Coup de cœur</span>
            <h3 class="coll-title">Luminaires & Ambiance</h3>
            <p class="coll-desc">La lumière qui transforme</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Suggested products -->
      <h2 class="section-title">Sélectionné pour vous</h2>
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
useHead({ title: 'Notre sélection | meubletn' })
const gridItems: any[] = []
</script>

<style scoped>
.sel-page { background: #eeeeef; min-height: 100vh; }
.sel-hero { background: linear-gradient(140deg, #2f3133 0%, #1a56a0 100%); padding: 48px 0; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 12px; }
.breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
.sel-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 8px; }
.sel-sub { font-size: 15px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding-top: 32px; padding-bottom: 64px; }
.collections-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 48px; }
@media (min-width: 632px) { .collections-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 984px) { .collections-grid { grid-template-columns: repeat(3, 1fr); } }
.coll-card { position: relative; border-radius: 10px; overflow: hidden; display: block; text-decoration: none; aspect-ratio: 16/9; }
.coll-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.coll-card:hover .coll-img { transform: scale(1.05); }
.coll-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }
.coll-tag { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.coll-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 4px; }
.coll-desc { font-size: 13px; color: rgba(255,255,255,0.8); margin: 0; }
.section-title { font-size: 24px; font-weight: 700; color: #2f3133; margin-bottom: 20px; }
.plist-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (min-width: 632px) { .plist-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .plist-grid { grid-template-columns: repeat(4, 1fr); } }
.ann-full { grid-column: 1 / -1; }
</style>
