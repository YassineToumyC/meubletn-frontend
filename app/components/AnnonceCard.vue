<template>
  <NuxtLink :to="`/annonce/${announcement.slug}`" class="product-card">
    <!-- Image -->
    <div class="card-img-wrap">
      <img
        v-if="firstImage"
        :src="firstImage"
        :alt="announcement.title"
        class="card-img"
        loading="lazy"
      />
      <div v-else class="card-img-placeholder">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <span class="card-condition" :class="`condition--${announcement.condition}`">
        {{ CONDITION_LABELS[announcement.condition] }}
      </span>
      <button class="wish-btn" :class="{ 'wish-btn--active': wishlisted }" aria-label="Favoris" @click.prevent.stop="toggleWish">
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" :fill="wishlisted ? 'currentColor' : 'none'">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="card-body">
      <p v-if="announcement.category" class="card-category">{{ announcement.category.name }}</p>
      <h3 class="card-title">{{ announcement.title }}</h3>
      <p v-if="announcement.description" class="card-desc">{{ announcement.description }}</p>

      <div class="card-footer">
        <span class="card-price">
          {{ announcement.price !== null ? formatPrice(announcement.price) : 'Prix à négocier' }}
        </span>
        <span class="card-seller">{{ announcement.fournisseur.nom_entreprise }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Announcement } from '~/composables/useAnnouncements'
import { CONDITION_LABELS } from '~/composables/useAnnouncements'

const props = defineProps<{ announcement: Announcement }>()
const config = useRuntimeConfig()
const { toggle, isWishlisted } = useWishlist()

const wishlisted = computed(() => isWishlisted(props.announcement.id))
function toggleWish() { toggle(props.announcement) }

const firstImage = computed(() => {
  const path = props.announcement.images?.[0]
  if (!path) return null
  return path.startsWith('http') ? path : `${config.public.storageBase}/${path}`
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 0 }).format(price)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;
}
.product-card:hover {
  box-shadow: 0 8px 28px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

/* Image */
.card-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f3f4f6;
}
.card-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.product-card:hover .card-img { transform: scale(1.04); }
.card-img-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}

/* Wishlist button */
.wish-btn {
  position: absolute;
  top: 8px; right: 8px;
  width: 30px; height: 30px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  transition: color 0.15s, background 0.15s;
  backdrop-filter: blur(4px);
  z-index: 1;
}
.wish-btn:hover { color: #db3a1b; background: #fff; }
.wish-btn--active { color: #db3a1b; }

/* Condition badge */
.card-condition {
  position: absolute;
  top: 10px; left: 10px;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.condition--new      { background: #dcfce7; color: #15803d; }
.condition--like_new { background: #dbeafe; color: #1d4ed8; }
.condition--used     { background: #fef9c3; color: #a16207; }

/* Body */
.card-body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.card-category {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #db3a1b;
  margin: 0;
}
.card-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
  display: none;
}
@media (min-width: 480px) {
  .card-desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #f3f4f6;
  gap: 8px;
}
.card-price {
  font-size: 16px;
  font-weight: 800;
  color: #db3a1b;
  white-space: nowrap;
}
.card-seller {
  font-size: 11px;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>