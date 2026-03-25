<template>
  <div class="pcard">
    <NuxtLink :to="`/produit/${product.slug}`" class="pcard-img-wrap">
      <img
        :src="`https://picsum.photos/seed/meub${product.id}/400/400`"
        :alt="product.name"
        class="pcard-img"
        loading="lazy"
      />
      <span v-if="product.badge" class="pcard-badge" :class="badgeClass">{{ product.badge }}</span>
      <button class="pcard-wish" @click.prevent aria-label="Favoris">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </NuxtLink>
    <div class="pcard-body">
      <p class="pcard-brand">{{ product.brand }}</p>
      <h3 class="pcard-name">
        <NuxtLink :to="`/produit/${product.slug}`">{{ product.name }}</NuxtLink>
      </h3>
      <div class="pcard-stars">
        <span v-for="i in 5" :key="i" class="star" :class="{ 'star--on': i <= product.rating }">★</span>
        <span class="pcard-rc">({{ product.reviewCount }})</span>
      </div>
      <div class="pcard-pricing">
        <span class="pcard-price">{{ formatPrice(product.price) }}</span>
        <span v-if="product.oldPrice" class="pcard-old">{{ formatPrice(product.oldPrice) }}</span>
      </div>
      <button class="pcard-add" @click.stop="handleAdd">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const props = defineProps<{ product: Product }>()
const formatPrice = (n: number) =>
  n.toLocaleString('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 0 })

const badgeClass = computed(() =>
  props.product.badgeType === 'sale' ? 'pcard-badge--sale' : 'pcard-badge--new'
)

function handleAdd() { /* legacy mock product — no cart integration */ }
</script>

<style scoped>
.pcard {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}
.pcard:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); }

.pcard-img-wrap {
  position: relative;
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
  background: #eeeeef;
}
.pcard-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s;
}
.pcard-img-wrap:hover .pcard-img { transform: scale(1.05); }

.pcard-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  color: #fff;
}
.pcard-badge--sale { background: #db3a1b; }
.pcard-badge--new { background: #276749; }

.pcard-wish {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #717678;
  opacity: 0;
  transition: opacity 0.15s, color 0.15s;
}
.pcard-img-wrap:hover .pcard-wish { opacity: 1; }
.pcard-wish:hover { color: #db3a1b; }

.pcard-body {
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.pcard-brand { font-size: 11px; color: #717678; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; }
.pcard-name { font-size: 14px; font-weight: 600; margin: 0; line-height: 1.3; }
.pcard-name a { color: #2f3133; text-decoration: none; }
.pcard-name a:hover { color: #db3a1b; }

.pcard-stars { display: flex; align-items: center; gap: 1px; }
.star { color: #d9dadb; font-size: 13px; }
.star--on { color: #f5a623; }
.pcard-rc { font-size: 11px; color: #717678; margin-left: 3px; }

.pcard-pricing { display: flex; align-items: center; gap: 8px; margin-top: auto; padding-top: 4px; }
.pcard-price { font-size: 16px; font-weight: 700; color: #2f3133; }
.pcard-old { font-size: 12px; color: #717678; text-decoration: line-through; }

.pcard-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #db3a1b;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 9px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 6px;
}
.pcard-add:hover { background: #ab331a; }
</style>
