<template>
  <div class="wishlist-page">
    <div class="wrap">
      <h1 class="page-title">Mes favoris <span class="count-badge" v-if="items.length">({{ items.length }})</span></h1>

      <!-- Empty state -->
      <div v-if="items.length === 0" class="wishlist-empty">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#d9dadb" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <h2>Votre liste de favoris est vide</h2>
        <p>Ajoutez des articles à vos favoris en cliquant sur le cœur sur chaque annonce.</p>
        <NuxtLink to="/" class="cta-btn">Découvrir les annonces</NuxtLink>
      </div>

      <!-- Grid of wishlisted announcements -->
      <div v-else>
        <div class="wishlist-grid">
          <div v-for="a in items" :key="a.id" class="wishlist-item">
            <AnnonceCard :announcement="a" />
            <button class="remove-wish" title="Retirer des favoris" @click="remove(a.id)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Retirer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Mes favoris | meubletn' })
const { items, remove } = useWishlist()
</script>

<style scoped>
.wishlist-page { background: #f9fafb; min-height: 100vh; padding: 32px 0 64px; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 640px) { .wrap { padding: 0 24px; } }
@media (min-width: 1024px) { .wrap { padding: 0 48px; } }

.page-title { font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 32px; }
.count-badge { font-size: 18px; font-weight: 400; color: #9ca3af; }

.wishlist-empty {
  background: #fff;
  border-radius: 12px;
  padding: 64px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.wishlist-empty h2 { font-size: 22px; font-weight: 700; color: #111827; margin: 4px 0 0; }
.wishlist-empty p  { font-size: 15px; color: #6b7280; max-width: 380px; margin: 0; }
.cta-btn {
  display: inline-flex;
  align-items: center;
  background: #db3a1b;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 8px;
  transition: background 0.15s;
}
.cta-btn:hover { background: #b83217; }

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 640px)  { .wishlist-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .wishlist-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
@media (min-width: 1280px) { .wishlist-grid { grid-template-columns: repeat(5, 1fr); } }

.wishlist-item { position: relative; display: flex; flex-direction: column; gap: 8px; }
.remove-wish {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  padding: 8px;
  background: #fef2f2;
  color: #db3a1b;
  border: 1.5px solid #fecaca;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.remove-wish:hover { background: #fee2e2; }
</style>
