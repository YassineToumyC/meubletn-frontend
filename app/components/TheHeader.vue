<template>
  <header class="site-header">
    <!-- Top promo bar -->
    <div class="promo-bar">
      <div class="promo-inner">
        <div class="promo-left">
          <a href="/livraison" class="promo-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>
            Livraison gratuite dès 99€
          </a>
          <a href="/retours" class="promo-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.33"/></svg>
            Retour sous 30 jours
          </a>
          <a href="/paiement" class="promo-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Paiement sécurisé
          </a>
        </div>
        <div class="promo-right">
          <a href="/contact" class="promo-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.37 2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Contactez-nous
          </a>
          <a href="/magasins" class="promo-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Nos magasins
          </a>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div class="main-header">
      <div class="header-inner">
        <!-- Hamburger (always visible) -->
        <button class="hamburger-btn" @click="toggleSidebar" aria-label="Menu catégories" :aria-expanded="isSidebarOpen">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        <!-- Logo -->
        <NuxtLink to="/" class="logo-link">
          <span class="logo-text">meubletn</span>
        </NuxtLink>

        <!-- Search -->
        <div class="search-wrap">
          <form class="search-form" @submit.prevent="doSearch">
            <div class="search-box">
              <input
                v-model="searchQuery"
                type="search"
                class="search-input"
                placeholder="Que recherchez-vous ?"
                autocomplete="off"
              />
              <button type="submit" class="search-btn" aria-label="Rechercher">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </div>
          </form>
        </div>

        <!-- Right actions -->
        <div class="header-actions">
          <NuxtLink to="/wishlist" class="action-btn" aria-label="Favoris">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="action-label">Favoris</span>
          </NuxtLink>

          <!-- Account btn — client, fournisseur, or guest -->
          <NuxtLink :to="accountLink" class="action-btn account-action" :aria-label="accountLabel">
            <!-- Logged in: colored avatar with initials -->
            <div v-if="isLoggedIn || fLoggedIn" class="user-avatar-chip" :class="fLoggedIn && !isLoggedIn ? 'user-avatar-chip--pro' : ''">
              {{ accountInitials }}
            </div>
            <!-- Guest: person icon -->
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="action-label">{{ accountLabel }}</span>
          </NuxtLink>

          <NuxtLink to="/panier" class="action-btn cart-btn" aria-label="Panier">
            <div class="cart-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span class="cart-badge" v-show="cartCount > 0">{{ cartCount }}</span>
            </div>
            <span class="action-label">Panier</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useSidebar()
const { count: cartCount } = useCart()
const { isLoggedIn, user } = useAuth()
const { isLoggedIn: fLoggedIn, user: fUser } = useFournisseurAuth()

// Computed account info (client takes priority over fournisseur)
const accountLink = computed(() => {
  if (isLoggedIn.value) return '/compte/commandes'
  if (fLoggedIn.value)  return '/fournisseur/dashboard'
  return '/auth/login'
})

const accountLabel = computed(() => {
  if (isLoggedIn.value) return user.value?.prenom || 'Mon compte'
  if (fLoggedIn.value)  return fUser.value?.nom_entreprise || fUser.value?.prenom || 'Dashboard'
  return 'Connexion'
})

const accountInitials = computed(() => {
  if (isLoggedIn.value && user.value) {
    return `${user.value.prenom?.[0] ?? ''}${user.value.nom?.[0] ?? ''}`.toUpperCase() || '?'
  }
  if (fLoggedIn.value && fUser.value) {
    const name = fUser.value.nom_entreprise || `${fUser.value.prenom ?? ''} ${fUser.value.nom ?? ''}`
    return name.trim().split(/\s+/).slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || '?'
  }
  return '?'
})

function doSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/recherche?q=${encodeURIComponent(searchQuery.value)}`)
  }
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1999;
  width: 100%;
}

/* ── Promo bar ── */
.promo-bar {
  background-color: #2f3133;
  width: 100%;
}
.promo-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.promo-left,
.promo-right {
  display: none;
  align-items: center;
  gap: 24px;
}
@media (min-width: 984px) {
  .promo-left { display: flex; }
  .promo-right { display: flex; }
}
.promo-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
  padding: 6px 0;
  text-decoration: none;
  white-space: nowrap;
}
.promo-link:hover {
  text-decoration: underline;
}

/* ── Main header ── */
.main-header {
  background-color: #ffffff;
  box-shadow: inset 0 -1px 0 #e2e4e4;
}
.header-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
@media (min-width: 632px) {
  .header-inner { padding: 12px 24px; gap: 16px; }
}
@media (min-width: 984px) {
  .header-inner { padding: 12px 48px; gap: 20px; }
}
@media (min-width: 1392px) {
  .header-inner { padding: 12px 64px; }
}

/* Hamburger — always visible on all screen sizes */
.hamburger-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 8px 10px;
  color: #47494c;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.15s;
}
.hamburger-btn:hover { background-color: #eeeeef; }

/* Logo */
.logo-link {
  flex-shrink: 0;
  text-decoration: none;
}
.logo-text {
  font-size: 22px;
  font-weight: bold;
  color: #db3a1b;
  letter-spacing: -0.5px;
}
@media (min-width: 632px) { .logo-text { font-size: 26px; } }
@media (min-width: 984px) { .logo-text { font-size: 30px; } }

/* Search */
.search-wrap {
  flex: 1;
  order: 1;
  width: 100%;
  margin-top: 8px;
}
@media (min-width: 632px) {
  .search-wrap { order: 0; width: auto; margin-top: 0; max-width: 600px; }
}
@media (min-width: 1392px) {
  .search-wrap { max-width: 920px; }
}
.search-form { width: 100%; }
.search-box {
  display: flex;
  align-items: center;
  background-color: #eeeeef;
  border: 1px solid #717678;
  border-radius: 24px;
  height: 44px;
  overflow: hidden;
  transition: border-color 0.15s;
}
.search-box:hover,
.search-box:focus-within {
  border-color: #2f3133;
}
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  color: #2f3133;
  padding: 0 16px;
  min-width: 0;
}
.search-input::placeholder { color: #5b5e61; }
.search-input[type='search']::-webkit-search-decoration,
.search-input[type='search']::-webkit-search-cancel-button { -webkit-appearance: none; }
.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #db3a1b;
  border: none;
  width: 44px;
  height: 44px;
  color: #ffffff;
  flex-shrink: 0;
  border-radius: 0 24px 24px 0;
  transition: background-color 0.15s;
}
.search-btn:hover { background-color: #ab331a; }

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 10px;
  color: #47494c;
  text-decoration: none;
  border-radius: 4px;
  background: none;
  border: none;
  transition: background-color 0.15s;
  cursor: pointer;
}
.action-btn:hover { background-color: #eeeeef; }
.action-label {
  font-size: 11px;
  line-height: 1;
  display: none;
}
@media (min-width: 984px) {
  .action-label { display: block; }
  .header-actions { gap: 8px; }
}

/* Account avatar chip */
.account-action { position: relative; }
.user-avatar-chip {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #db3a1b, #ff6b47);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(219,58,27,0.35);
  transition: transform 0.15s, box-shadow 0.15s;
  letter-spacing: 0.3px;
}
.account-action:hover .user-avatar-chip {
  transform: scale(1.08);
  box-shadow: 0 3px 10px rgba(219,58,27,0.45);
}
/* Pro fournisseur: blue avatar */
.user-avatar-chip--pro {
  background: linear-gradient(135deg, #2563eb, #4f8aff);
  box-shadow: 0 2px 6px rgba(37,99,235,0.35);
}
.account-action:hover .user-avatar-chip--pro {
  box-shadow: 0 3px 10px rgba(37,99,235,0.45);
}

/* Cart badge */
.cart-icon-wrap {
  position: relative;
  display: flex;
}
.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: #db3a1b;
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>
