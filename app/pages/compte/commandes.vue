<template>
  <div class="account-page">
    <div class="wrap">
      <div class="account-layout">
        <!-- Sidebar nav -->
        <aside class="account-nav">
          <div class="account-user">
            <div class="user-avatar">{{ userInitials }}</div>
            <div>
              <div class="user-name">{{ user?.prenom }} {{ user?.nom }}</div>
              <div class="user-email">{{ user?.email }}</div>
            </div>
          </div>
          <nav class="nav-links">
            <NuxtLink to="/compte/commandes" class="nav-link nav-link--active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Mes commandes
            </NuxtLink>
            <NuxtLink to="/wishlist" class="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Mes favoris
            </NuxtLink>
            <a href="#" class="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Mon profil
            </a>
            <a href="#" class="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Mes adresses
            </a>
            <a href="#" class="nav-link nav-link--logout" @click.prevent="logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Déconnexion
            </a>
          </nav>
        </aside>

        <!-- Main content -->
        <main class="account-main">
          <h1 class="page-title">Mes commandes</h1>

          <div class="orders-list">
            <div v-for="order in orders" :key="order.id" class="order-card">
              <div class="order-header">
                <div class="order-meta">
                  <span class="order-ref">Commande #{{ order.ref }}</span>
                  <span class="order-date">{{ order.date }}</span>
                </div>
                <span class="order-status" :class="`status--${order.statusKey}`">{{ order.status }}</span>
              </div>
              <div class="order-items">
                <div v-for="item in order.items" :key="item.name" class="order-item">
                  <img :src="`https://picsum.photos/seed/meub${item.productId}/80/80`" :alt="item.name" class="order-item-img" />
                  <div class="order-item-info">
                    <p class="order-item-name">{{ item.name }}</p>
                    <p class="order-item-meta">Qté : {{ item.qty }} · {{ formatPrice(item.price) }}</p>
                  </div>
                </div>
              </div>
              <div class="order-footer">
                <span class="order-total">Total : <strong>{{ formatPrice(order.total) }}</strong></span>
                <div class="order-actions">
                  <NuxtLink :to="`/suivi-commande?ref=${order.ref}`" class="order-btn order-btn--outline">Suivre</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Mes commandes | meubletn' })
const formatPrice = (n: number) =>
  n.toLocaleString('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 0 })
const { user, logout: authLogout } = useAuth()
async function logout() {
  await authLogout()
  await navigateTo('/auth/login')
}
const userInitials = computed(() => {
  if (!user.value) return '?'
  return `${user.value.prenom[0] ?? ''}${user.value.nom[0] ?? ''}`.toUpperCase()
})

const orders = [
  {
    id: 1, ref: 'MTN-20250115-001', date: '15 janvier 2025', status: 'Livré', statusKey: 'delivered',
    total: 2439,
    items: [
      { productId: 1, name: 'Canapé 3 places NORDIC', qty: 1, price: 1299 },
      { productId: 8, name: 'Table à manger OSLO 6 pers.', qty: 1, price: 890 },
      { productId: 9, name: 'Chaise OSLO velours', qty: 1, price: 249 },
    ],
  },
  {
    id: 2, ref: 'MTN-20250208-002', date: '8 février 2025', status: 'En livraison', statusKey: 'shipping',
    total: 1590,
    items: [
      { productId: 6, name: 'Lit coffre STOCKHOLM 140×200', qty: 1, price: 1590 },
    ],
  },
  {
    id: 3, ref: 'MTN-20250301-003', date: '1 mars 2025', status: 'En préparation', statusKey: 'processing',
    total: 678,
    items: [
      { productId: 12, name: 'Chaise de bureau ERGO PRO', qty: 1, price: 389 },
      { productId: 18, name: 'Table basse TOKYO', qty: 1, price: 299 },
    ],
  },
]
</script>

<style scoped>
.account-page { background: #fff; min-height: 100vh; padding: 32px 0 64px; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }

.account-layout { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 984px) { .account-layout { grid-template-columns: 260px 1fr; } }

.account-nav { background: #fff; border-radius: 10px; padding: 24px; align-self: start; }
.account-user { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eeeeef; }
.user-avatar { width: 44px; height: 44px; border-radius: 50%; background: #E1004E; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; flex-shrink: 0; }
.user-name { font-size: 14px; font-weight: 600; color: #2f3133; }
.user-email { font-size: 12px; color: #717678; }
.nav-links { display: flex; flex-direction: column; gap: 2px; }
.nav-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; font-size: 14px; color: #47494c; text-decoration: none; border-radius: 6px; transition: background 0.15s; }
.nav-link:hover { background: #eeeeef; }
.nav-link--active { background: #fff0ed; color: #E1004E; font-weight: 600; }
.nav-link--logout { color: #717678; margin-top: 12px; }

.page-title { font-size: 24px; font-weight: 700; color: #2f3133; margin-bottom: 24px; }
.orders-list { display: flex; flex-direction: column; gap: 16px; }

.order-card { background: #fff; border-radius: 10px; overflow: hidden; }
.order-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #eeeeef; flex-wrap: wrap; gap: 8px; }
.order-meta { display: flex; flex-direction: column; gap: 2px; }
.order-ref { font-size: 14px; font-weight: 600; color: #2f3133; }
.order-date { font-size: 12px; color: #717678; }
.order-status { font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
.status--delivered { background: #d1fae5; color: #065f46; }
.status--shipping { background: #dbeafe; color: #1e40af; }
.status--processing { background: #fff0f6; color: #E1004E; }

.order-items { padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }
.order-item { display: flex; align-items: center; gap: 12px; }
.order-item-img { width: 60px; height: 60px; border-radius: 6px; object-fit: cover; background: #eeeeef; flex-shrink: 0; }
.order-item-name { font-size: 14px; font-weight: 500; color: #2f3133; margin: 0 0 4px; }
.order-item-meta { font-size: 12px; color: #717678; margin: 0; }

.order-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-top: 1px solid #eeeeef; background: #f8f8f8; }
.order-total { font-size: 14px; color: #2f3133; }
.order-total strong { font-size: 16px; }
.order-actions { display: flex; gap: 8px; }
.order-btn { padding: 8px 16px; border-radius: 5px; font-size: 13px; font-weight: 600; text-decoration: none; cursor: pointer; transition: background 0.15s; }
.order-btn--outline { border: 1px solid #d9dadb; color: #47494c; background: #fff; }
.order-btn--outline:hover { background: #eeeeef; }
</style>
