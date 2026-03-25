<template>
  <div class="homepage">

    <!-- ── Loading skeleton ── -->
    <div v-if="homePending" class="container section-gap">
      <div class="skeleton-row">
        <div class="skeleton-title" />
        <div class="scroll-row">
          <div v-for="n in 6" :key="n" class="skeleton-card scroll-card" />
        </div>
      </div>
      <div class="skeleton-row mt-48">
        <div class="skeleton-title" />
        <div class="scroll-row">
          <div v-for="n in 6" :key="n" class="skeleton-card scroll-card" />
        </div>
      </div>
    </div>

    <template v-else>

      <!-- ── Nouveautés ── -->
      <section v-if="homeData?.nouveautes?.length" class="section container section-gap">
        <div class="section-header">
          <h2 class="section-title">Nouveautés</h2>
          <NuxtLink to="/articles" class="see-all">Voir tout →</NuxtLink>
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

      <!-- ── Sélectionné pour vous ── -->
      <section v-if="homeData?.populaires?.length" class="section container section-gap">
        <div class="section-header">
          <h2 class="section-title">Sélectionné pour vous</h2>
          <NuxtLink to="/articles?sort=popular" class="see-all">Voir tout →</NuxtLink>
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

      <!-- ── Par catégorie ── -->
      <template v-if="homeData?.par_categorie?.length">
        <section
          v-for="bloc in homeData.par_categorie"
          :key="bloc.category.id"
          class="section container section-gap"
        >
          <div class="section-header">
            <h2 class="section-title">{{ bloc.category.name }}</h2>
            <NuxtLink :to="`/articles?category=${bloc.category.id}`" class="see-all">Voir tout →</NuxtLink>
          </div>
          <div class="product-grid">
            <AnnonceCard v-for="a in bloc.products" :key="a.id" :announcement="a" />
          </div>
        </section>
      </template>

      <!-- ── CTA — Tous les articles ── -->
      <div class="container section-gap">
        <div class="cta-block">
          <div class="cta-text">
            <h2 class="cta-title">Découvrez tous nos articles</h2>
            <p class="cta-sub">Filtrez, triez et trouvez exactement ce que vous cherchez.</p>
          </div>
          <NuxtLink to="/articles" class="cta-btn">
            Voir tous les articles
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </NuxtLink>
        </div>
      </div>

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

const homeData    = ref<{
  nouveautes:    Announcement[]
  populaires:    Announcement[]
  par_categorie: { category: { id: number; name: string; slug: string }; products: Announcement[] }[]
} | null>(null)
const homePending = ref(true)

onMounted(async () => {
  const res = await $fetch<typeof homeData.value>(`${config.public.apiBase}/home`).catch(() => null)
  homeData.value    = res
  homePending.value = false
})
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
.see-all {
  color: #db3a1b;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
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
.scroll-card { flex: 0 0 200px; }
@media (min-width: 640px)  { .scroll-card { flex: 0 0 230px; } }
@media (min-width: 1024px) { .scroll-card { flex: 0 0 260px; } }

/* Category grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 640px)  { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
@media (min-width: 1280px) { .product-grid { grid-template-columns: repeat(6, 1fr); } }

/* ── CTA block ── */
.cta-block {
  background: linear-gradient(135deg, #db3a1b 0%, #b83217 100%);
  border-radius: 16px;
  padding: 40px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
@media (max-width: 640px) {
  .cta-block { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
}
.cta-title {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 6px;
}
@media (min-width: 768px) { .cta-title { font-size: 26px; } }
.cta-sub { font-size: 14px; color: rgba(255,255,255,0.8); margin: 0; }
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: #fff;
  color: #db3a1b;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s, transform 0.15s;
  flex-shrink: 0;
}
.cta-btn:hover { background: #fef2f2; transform: translateY(-1px); }

/* Skeleton */
.skeleton-title {
  width: 200px; height: 28px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
  margin-bottom: 20px;
}
.skeleton-card {
  border-radius: 12px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  aspect-ratio: 3/4;
}
.mt-48 { margin-top: 48px; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
