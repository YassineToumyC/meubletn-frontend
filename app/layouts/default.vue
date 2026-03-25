<template>
  <div class="site-wrapper">
    <TheHeader />
    <TheSidebar />
    <main class="site-main">
      <slot />
    </main>
    <TheFooter />

    <!-- Mobile bottom nav -->
    <nav class="mobile-bottom-nav">
      <NuxtLink to="/" class="mbn-item" exact-active-class="mbn-item--active">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Accueil</span>
      </NuxtLink>
      <button class="mbn-item" @click="toggleSidebar">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span>Catégories</span>
      </button>
      <NuxtLink to="/panier" class="mbn-item mbn-cart" active-class="mbn-item--active">
        <div class="mbn-cart-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span v-if="cartCount > 0" class="mbn-badge">{{ cartCount }}</span>
        </div>
        <span>Panier</span>
      </NuxtLink>
      <NuxtLink :to="isLoggedIn ? '/compte/commandes' : '/auth/login'" class="mbn-item" active-class="mbn-item--active">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Compte</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { toggle: toggleSidebar } = useSidebar()
const { count: cartCount } = useCart()
const { isLoggedIn } = useAuth()
</script>

<style>
.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.site-main {
  flex: 1;
  padding-bottom: 0;
}
@media (max-width: 639px) {
  .site-main { padding-bottom: 64px; }
}

/* ── Mobile bottom nav ── */
.mobile-bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  z-index: 1998;
  justify-content: space-around;
  align-items: center;
  padding: 0 4px;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
}
@media (max-width: 639px) {
  .mobile-bottom-nav { display: flex; }
}
.mbn-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex: 1;
  padding: 8px 4px 6px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 10px;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s;
  position: relative;
}
.mbn-item:hover,
.mbn-item--active { color: #db3a1b; }
.mbn-cart-wrap { position: relative; display: flex; }
.mbn-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #db3a1b;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}
</style>
