<template>
  <div class="cart-container">
      <!-- Page title -->
      <h1 class="cart-title">Mon panier <span class="cart-count">({{ cartItems.length }} article{{ cartItems.length !== 1 ? 's' : '' }})</span></h1>

      <div v-if="cartItems.length > 0" class="cart-layout">
        <!-- Left: Items list -->
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <!-- Product image -->
            <div class="item-img" :style="{ backgroundColor: item.product.imgColor }">
              <div v-html="item.product.icon" class="item-icon"></div>
            </div>

            <!-- Product info -->
            <div class="item-details">
              <div class="item-brand">{{ item.product.brand }}</div>
              <NuxtLink :to="`/produit/${item.product.slug}`" class="item-name">{{ item.product.name }}</NuxtLink>
              <div class="item-meta">
                <span v-if="item.product.badge && item.product.badgeType === 'sale'" class="item-badge-sale">{{ item.product.badge }}</span>
              </div>
              <div class="item-price-row">
                <span class="item-price">{{ formatPrice(item.product.price) }}</span>
                <span v-if="item.product.oldPrice" class="item-old-price">{{ formatPrice(item.product.oldPrice) }}</span>
              </div>
            </div>

            <!-- Quantity + remove -->
            <div class="item-actions">
              <div class="qty-control">
                <button class="qty-btn" @click="updateQty(item.id, item.qty - 1)" :disabled="item.qty <= 1" aria-label="Diminuer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <span class="qty-value">{{ item.qty }}</span>
                <button class="qty-btn" @click="updateQty(item.id, item.qty + 1)" aria-label="Augmenter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
              <div class="item-subtotal">{{ formatPrice(item.product.price * item.qty) }}</div>
              <button class="remove-btn" @click="removeItem(item.id)" aria-label="Supprimer">
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
                <div class="free-delivery-fill" :style="{ width: Math.min(100, (subtotal / 990) * 100) + '%' }"></div>
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

            <!-- Trust badges -->
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

            <!-- Payment logos -->
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

      <!-- Suggested products -->
      <div class="suggestions">
        <h2 class="suggestions-title">Vous aimerez aussi</h2>
        <div class="suggestions-grid">
          <NuxtLink
            v-for="product in suggested"
            :key="product.id"
            :to="`/produit/${product.slug}`"
            class="suggestion-card"
          >
            <div class="suggestion-img" :style="{ backgroundColor: product.imgColor }">
              <div v-html="product.icon" class="suggestion-icon"></div>
              <span v-if="product.badge" class="suggestion-badge" :class="product.badgeType === 'sale' ? 'badge--sale' : 'badge--new'">{{ product.badge }}</span>
            </div>
            <div class="suggestion-info">
              <div class="suggestion-brand">{{ product.brand }}</div>
              <div class="suggestion-name">{{ product.name }}</div>
              <div class="suggestion-pricing">
                <span class="suggestion-price">{{ formatPrice(product.price) }}</span>
                <span v-if="product.oldPrice" class="suggestion-old">{{ formatPrice(product.oldPrice) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })

const formatPrice = (n: number) =>
  n.toLocaleString('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 0 })
const allProducts: any[] = []
const { cartProducts, updateQty, remove: removeItem, subtotal: cartSubtotal } = useCart()

// Map cart products to a flat list for template
const cartItems = computed(() =>
  cartProducts.value.map(x => ({ id: x.item.productId, product: x.product!, qty: x.item.qty }))
)

// ── Promo code ──
const promoCode = ref('')
const promoMsg = ref('')
const promoSuccess = ref(false)
const discount = ref(0)

function applyPromo() {
  if (promoCode.value.toUpperCase() === 'MEUBLETN10') {
    discount.value = Math.round(subtotal.value * 0.10)
    promoMsg.value = 'Code promo appliqué ! -10%'
    promoSuccess.value = true
  } else {
    discount.value = 0
    promoMsg.value = 'Code promo invalide ou expiré.'
    promoSuccess.value = false
  }
}

// ── Totals ──
const deliveryFee = 29
const subtotal = cartSubtotal
const total = computed(() => subtotal.value - discount.value + (subtotal.value >= 990 ? 0 : deliveryFee))

// ── Suggested products ──
const suggested = computed(() => allProducts.filter(p => !cartItems.value.some(i => i.product.id === p.id)).slice(0, 4))
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

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
}
@media (min-width: 984px) {
  .cart-layout { grid-template-columns: 1fr 360px; }
}

/* Cart items */
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
  padding: 20px;
  align-items: center;
}

/* Item image */
.item-img {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.item-icon { display: flex; align-items: center; justify-content: center; }

/* Item details */
.item-details { flex: 1; min-width: 0; }
.item-brand { font-size: 12px; color: #717678; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.item-name {
  font-size: 15px;
  font-weight: 600;
  color: #2f3133;
  text-decoration: none;
  display: block;
  margin-bottom: 8px;
}
.item-name:hover { color: #db3a1b; }
.item-badge-sale {
  display: inline-block;
  background: #db3a1b;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  margin-bottom: 6px;
}
.item-price-row { display: flex; align-items: center; gap: 8px; }
.item-price { font-size: 17px; font-weight: 700; color: #2f3133; }
.item-old-price { font-size: 13px; color: #717678; text-decoration: line-through; }

/* Item actions */
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
.remove-btn:hover { color: #db3a1b; background: #fef2f0; }

/* Promo code */
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
.promo-msg--ok { color: #2d6a4f; }
.promo-msg--err { color: #db3a1b; }

/* Summary */
.cart-summary { position: sticky; top: 100px; }
.summary-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}
.summary-title { font-size: 18px; font-weight: 700; color: #2f3133; margin-bottom: 20px; }
.summary-lines { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #47494c;
}
.summary-line--discount { color: #db3a1b; font-weight: 600; }
.delivery-free { color: #2d6a4f; font-weight: 600; }

/* Free delivery bar */
.free-delivery-bar {
  background: #f5f5f5;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}
.free-delivery-text { font-size: 12px; color: #5b5e61; margin-bottom: 8px; }
.free-delivery-text strong { color: #2f3133; }
.free-delivery-progress {
  height: 6px;
  background: #d9dadb;
  border-radius: 3px;
  overflow: hidden;
}
.free-delivery-fill {
  height: 100%;
  background: #2d6a4f;
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* Total */
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

/* Checkout button */
.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  background: #db3a1b;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 700;
  transition: background 0.15s;
  margin-bottom: 16px;
}
.checkout-btn:hover { background: #ab331a; }

/* Trust */
.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #5b5e61;
}
.payment-logos { display: flex; gap: 6px; flex-wrap: wrap; }
.payment-chip {
  border: 1px solid #d9dadb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #47494c;
}

/* Empty cart */
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
  background: #db3a1b;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.15s;
}
.empty-cta:hover { background: #ab331a; }

/* Suggestions */
.suggestions { margin-top: 48px; }
.suggestions-title { font-size: 22px; font-weight: 700; color: #2f3133; margin-bottom: 20px; }
.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 632px) { .suggestions-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 984px) { .suggestions-grid { grid-template-columns: repeat(4, 1fr); } }

.suggestion-card { text-decoration: none; background: #fff; border-radius: 8px; overflow: hidden; transition: box-shadow 0.15s; }
.suggestion-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.suggestion-img {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.suggestion-icon { display: flex; align-items: center; justify-content: center; }
.suggestion-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  color: #fff;
}
.badge--sale { background: #db3a1b; }
.badge--new { background: #2d6a4f; }
.suggestion-info { padding: 12px; }
.suggestion-brand { font-size: 11px; color: #717678; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.suggestion-name { font-size: 13px; font-weight: 600; color: #2f3133; margin-bottom: 8px; line-height: 1.3; }
.suggestion-pricing { display: flex; align-items: center; gap: 6px; }
.suggestion-price { font-size: 14px; font-weight: 700; color: #2f3133; }
.suggestion-old { font-size: 12px; color: #717678; text-decoration: line-through; }
</style>
