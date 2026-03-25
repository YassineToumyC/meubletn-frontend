<template>
  <div class="wishlist-page">
    <div class="wrap">
      <h1 class="page-title">Mes favoris</h1>

      <!-- Mock: empty state with suggested products -->
      <div class="wishlist-empty">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#d9dadb" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <h2>Votre liste de favoris est vide</h2>
        <p>Ajoutez des produits à vos favoris en cliquant sur le cœur sur chaque fiche produit.</p>
        <NuxtLink to="/" class="cta-btn">Découvrir nos produits</NuxtLink>
      </div>

      <div class="suggest-section">
        <h2 class="suggest-title">Vous pourriez aimer</h2>
        <div class="suggest-grid">
          <ProductCard v-for="p in suggested" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Mes favoris | meubletn' })
const suggested: any[] = []
</script>

<style scoped>
.wishlist-page { background: #eeeeef; min-height: 100vh; padding: 32px 0 64px; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.page-title { font-size: 28px; font-weight: 700; color: #2f3133; margin-bottom: 32px; }
.wishlist-empty { background: #fff; border-radius: 10px; padding: 64px 32px; text-align: center; margin-bottom: 48px; }
.wishlist-empty h2 { font-size: 22px; font-weight: 700; color: #2f3133; margin: 16px 0 10px; }
.wishlist-empty p { font-size: 15px; color: #5b5e61; max-width: 380px; margin: 0 auto 24px; }
.cta-btn { display: inline-flex; align-items: center; background: #db3a1b; color: #fff; text-decoration: none; border-radius: 6px; padding: 12px 28px; font-size: 15px; font-weight: 600; transition: background 0.15s; }
.cta-btn:hover { background: #ab331a; }
.suggest-title { font-size: 22px; font-weight: 700; color: #2f3133; margin-bottom: 20px; }
.suggest-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (min-width: 632px) { .suggest-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .suggest-grid { grid-template-columns: repeat(4, 1fr); } }
</style>
