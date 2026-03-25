<template>
  <div class="cart-container">
    <h1 class="cart-title">Mon panier <span class="cart-count">({{ items.length }} article{{ items.length !== 1 ? 's' : '' }})</span></h1>

    <div v-if="items.length > 0" class="cart-layout">
      <!-- Left: Items list -->
      <div class="cart-items">
        <div v-for="item in items" :key="item.announcement.id" class="cart-item">
          <!-- Image -->
          <div class="item-img">
            <img
              v-if="imgUrl(item.announcement)"
              :src="imgUrl(item.announcement)"
              :alt="item.announcement.title"
              class="item-img-actual"
            />
            <svg v-else width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>

          <!-- Info -->
          <div class="item-details">
            <div v-if="item.announcement.marque" class="item-brand">{{ item.announcement.marque }}</div>
            <NuxtLink :to="`/annonce/${item.announcement.slug}`" class="item-name">{{ item.announcement.title }}</NuxtLink>
            <div v-if="item.announcement.ville" class="item-meta">{{ item.announcement.ville }}</div>
            <div class="item-price-row">
              <span class="item-price">
                {{ item.announcement.price !== null ? formatPrice(item.announcement.price) : 'Prix à négocier' }}
              </span>
            </div>
          </div>

          <!-- Qty + remove -->
          <div class="item-actions">
            <div class="qty-control">
              <button class="qty-btn" :disabled="item.qty <= 1" @click="updateQty(item.announcement.id, item.qty - 1)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="qty-value">{{ item.qty }}</span>
              <button class="qty-btn" @click="updateQty(item.announcement.id, item.qty + 1)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <div v-if="item.announcement.price !== null" class="item-subtotal">
              {{ formatPrice(item.announcement.price * item.qty) }}
            </div>
            <button class="remove-btn" aria-label="Supprimer" @click="remove(item.announcement.id)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>

        <!-- Promo code -->
        <div class="promo-section">
          <h3 class="promo-title">Code promo</h3>
          <div class="promo-form">
            <input v-model="promoCode" type="text" class="promo-input" placeholder="Entrez votre code promo" />
            <button class="promo-btn" @click="applyPromo">Appliquer</button>
          </div>
          <p v-if="promoMsg" class="promo-msg" :class="promoSuccess ? 'promo-msg--ok' : 'promo-msg--err'">{{ promoMsg }}</p>
        </div>
      </div>

      <!-- Right: Order summary -->
      <div class="cart-summary">
        <div class="summary-card">
          <h2 class="summary-title">Récapitulatif</h2>

          <div class="summary-lines">
            <div class="summary-line">
              <span>Sous-total</span>
              <span>{{ formatPrice(subtotal) }}</span>
            </div>
            <div v-if="discount > 0" class="summary-line summary-line--discount">
              <span>Réduction</span>
              <span>-{{ formatPrice(discount) }}</span>
            </div>
            <div class="summary-line">
              <span>Livraison</span>
              <span v-if="subtotal >= 990" class="delivery-free">Gratuite</span>
              <span v-else>{{ formatPrice(deliveryFee) }}</span>
            </div>
          </div>

          <div v-if="subtotal < 990" class="free-delivery-bar">
            <div class="free-delivery-text">
              Plus que <strong>{{ formatPrice(990 - subtotal) }}</strong> pour la livraison gratuite
            </div>
            <div class="free-delivery-progress">
              <div class="free-delivery-fill" :style="{ width: Math.min(100, (subtotal / 990) * 100) + '%' }" />
            </div>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <span>{{ formatPrice(total) }}</span>
          </div>

          <p class="summary-tax">TVA incluse</p>

          <NuxtLink to="/checkout/livraison" class="checkout-btn">
            Commander
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </NuxtLink>

          <div class="trust-badges">
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Paiement sécurisé
            </div>
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.33"/></svg>
              Retour sous 30 jours
            </div>
          </div>

          <div class="payment-logos">
            <span class="payment-chip">VISA</span>
            <span class="payment-chip">Mastercard</span>
            <span class="payment-chip">CB</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty cart -->
    <div v-else class="cart-empty">
      <div class="empty-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d9dadb" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <h2 class="empty-title">Votre panier est vide</h2>
      <p class="empty-desc">Découvrez notre sélection de meubles et trouvez la pièce idéale pour votre intérieur.</p>
      <NuxtLink to="/" class="empty-cta">Continuer mes achats</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })

const config = useRuntimeConfig()
const { items, remove, updateQty, subtotal } = useCart()

function imgUrl(announcement: any): string | null {
  const path = announcement.images?.[0]
  if (!path) return null
  return path.startsWith('http') ? path : `${config.public.storageBase}/${path}`
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 0 }).format(n)

// Promo code
const promoCode   = ref('')
const promoMsg    = ref('')
const promoSuccess = ref(false)
const discount    = ref(0)

function applyPromo() {
  if (promoCode.value.toUpperCase() === 'MEUBLETN10') {
    discount.value   = Math.round(subtotal.value * 0.10)
    promoMsg.value   = 'Code promo appliqué ! -10%'
    promoSuccess.value = true
  } else {
    discount.value   = 0
    promoMsg.value   = 'Code promo invalide ou expiré.'
    promoSuccess.value = false
  }
}

const deliveryFee = 29
const total = computed(() => subtotal.value - discount.value + (subtotal.value >= 990 ? 0 : deliveryFee))
</script>

<style scoped>
.cart-container {
  max-width: 1280px;
  margin: 0 auto;
}
.cart-title {
  font-size: 26px;
  font-weight: 700;
  color: #2f3133;
  margin-bottom: 28px;
}
.cart-count {
  font-size: 18px;
  font-weight: 400;
  color: #717678;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
}
@media (min-width: 984px) {
  .cart-layout { grid-template-columns: 1fr 360px; }
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cart-item {
  display: flex;
  gap: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
}
@media (max-width: 480px) {
  .cart-item { flex-wrap: wrap; }
  .item-actions { width: 100%; flex-direction: row; justify-content: space-between; align-items: center; }
}

.item-img {
  width: 90px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.item-img-actual { width: 100%; height: 100%; object-fit: cover; }

.item-details { flex: 1; min-width: 0; }
.item-brand { font-size: 11px; color: #717678; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.item-name {
  font-size: 15px;
  font-weight: 600;
  color: #2f3133;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-name:hover { color: #E1004E; }
.item-meta { font-size: 12px; color: #9ca3af; margin-bottom: 6px; }
.item-price-row { display: flex; align-items: center; gap: 8px; }
.item-price { font-size: 16px; font-weight: 700; color: #2f3133; }

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
}
.qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d9dadb;
  border-radius: 6px;
  padding: 4px 8px;
  background: #f8f8f8;
}
.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #47494c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 3px;
  transition: background 0.15s;
}
.qty-btn:hover:not(:disabled) { background: #eeeeef; }
.qty-btn:disabled { color: #d9dadb; cursor: not-allowed; }
.qty-value { font-size: 15px; font-weight: 600; min-width: 24px; text-align: center; color: #2f3133; }
.item-subtotal { font-size: 15px; font-weight: 700; color: #2f3133; }
.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #717678;
  display: flex;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}
.remove-btn:hover { color: #E1004E; background: #fef2f0; }

.promo-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}
.promo-title { font-size: 15px; font-weight: 600; color: #2f3133; margin-bottom: 12px; }
.promo-form { display: flex; gap: 8px; }
.promo-input {
  flex: 1;
  border: 1px solid #d9dadb;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 14px;
  color: #2f3133;
  outline: none;
  transition: border-color 0.15s;
}
.promo-input:focus { border-color: #2f3133; }
.promo-btn {
  background: #2f3133;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}
.promo-btn:hover { background: #1a1c1e; }
.promo-msg { margin-top: 8px; font-size: 13px; }
.promo-msg--ok  { color: #2d6a4f; }
.promo-msg--err { color: #E1004E; }

.cart-summary { position: sticky; top: 100px; }
.summary-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}
.summary-title { font-size: 18px; font-weight: 700; color: #2f3133; margin-bottom: 20px; }
.summary-lines { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.summary-line { display: flex; justify-content: space-between; font-size: 14px; color: #47494c; }
.summary-line--discount { color: #E1004E; font-weight: 600; }
.delivery-free { color: #2d6a4f; font-weight: 600; }

.free-delivery-bar {
  background: #f5f5f5;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}
.free-delivery-text { font-size: 12px; color: #5b5e61; margin-bottom: 8px; }
.free-delivery-text strong { color: #2f3133; }
.free-delivery-progress { height: 6px; background: #d9dadb; border-radius: 3px; overflow: hidden; }
.free-delivery-fill {
  height: 100%;
  background: #2d6a4f;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: #2f3133;
  padding-top: 16px;
  border-top: 1px solid #eeeeef;
  margin-bottom: 4px;
}
.summary-tax { font-size: 11px; color: #717678; margin-bottom: 20px; }

.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  background: #E1004E;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 700;
  transition: background 0.15s;
  margin-bottom: 16px;
}
.checkout-btn:hover { background: #c5003f; }

.trust-badges { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.trust-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #5b5e61; }
.payment-logos { display: flex; gap: 6px; flex-wrap: wrap; }
.payment-chip {
  border: 1px solid #d9dadb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #47494c;
}

.cart-empty {
  background: #fff;
  border-radius: 8px;
  padding: 64px 32px;
  text-align: center;
  margin-bottom: 48px;
}
.empty-icon { margin-bottom: 20px; }
.empty-title { font-size: 22px; font-weight: 700; color: #2f3133; margin-bottom: 10px; }
.empty-desc { font-size: 15px; color: #5b5e61; max-width: 400px; margin: 0 auto 24px; }
.empty-cta {
  display: inline-flex;
  align-items: center;
  background: #E1004E;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.15s;
}
.empty-cta:hover { background: #c5003f; }
</style>
