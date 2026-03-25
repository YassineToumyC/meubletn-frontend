<template>
  <div class="dash-root">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar--open': sidebarOpen }">
      <div class="sidebar-inner">
        <!-- Brand -->
        <div class="brand">
          <NuxtLink to="/" class="brand-logo">meubletn</NuxtLink>
          <span class="brand-tag">Espace Pro</span>
        </div>

        <!-- Company info -->
        <div class="company-info">
          <div class="company-avatar">
            {{ initials }}
          </div>
          <div class="company-text">
            <span class="company-name">{{ user?.nom_entreprise || (user?.prenom + ' ' + user?.nom) }}</span>
            <span class="company-role">{{ user?.type === 'fournisseur' ? 'Fournisseur' : 'Agent' }}</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="nav">
          <NuxtLink to="/fournisseur/dashboard" class="nav-link" exact>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Tableau de bord
          </NuxtLink>
          <NuxtLink to="/fournisseur/dashboard/listings" class="nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
            Mes annonces
          </NuxtLink>
          <NuxtLink v-if="isFournisseur" to="/fournisseur/dashboard/agents" class="nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Mes agents
          </NuxtLink>
          <NuxtLink v-if="isFournisseur" to="/fournisseur/dashboard/profile" class="nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Mon profil
          </NuxtLink>
          <NuxtLink to="/fournisseur/dashboard/tutorial" class="nav-link nav-link--tutorial">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Guide d'utilisation
          </NuxtLink>
        </nav>

        <!-- Logout -->
        <button class="logout-btn" @click="doLogout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Déconnexion
        </button>
      </div>
    </aside>

    <!-- Overlay mobile -->
    <div v-if="sidebarOpen" class="overlay" @click="sidebarOpen = false" />

    <!-- Main content -->
    <div class="main">
      <!-- Top bar mobile -->
      <header class="topbar">
        <button class="menu-btn" @click="sidebarOpen = !sidebarOpen">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <span class="topbar-title">{{ pageTitle }}</span>
        <NuxtLink to="/fournisseur/dashboard/listings/create" class="topbar-btn">
          + Nouvelle annonce
        </NuxtLink>
      </header>

      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, isFournisseur, logout } = useFournisseurAuth()
const route = useRoute()
const sidebarOpen = ref(false)

watch(() => route.path, () => { sidebarOpen.value = false })

const initials = computed(() => {
  if (!user.value) return '?'
  const name = user.value.nom_entreprise || `${user.value.prenom} ${user.value.nom}`
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
})

const pageTitle = computed(() => {
  const path = route.path
  if (path.includes('/listings/create')) return 'Nouvelle annonce'
  if (path.includes('/listings/') && path.includes('/edit')) return 'Modifier l\'annonce'
  if (path.includes('/listings')) return 'Mes annonces'
  if (path.includes('/agents')) return 'Mes agents'
  if (path.includes('/profile')) return 'Mon profil'
  return 'Tableau de bord'
})

async function doLogout() {
  await logout()
}
</script>

<style scoped>
.dash-root {
  display: flex;
  min-height: 100vh;
  background: #f4f5f7;
  font-family: system-ui, sans-serif;
}

/* ── Sidebar ── */
.sidebar {
  width: 256px;
  flex-shrink: 0;
  background: #1a1d21;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
}
@media (min-width: 900px) {
  .sidebar { transform: translateX(0); position: sticky; }
}
.sidebar--open { transform: translateX(0); }
.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 0 24px;
  overflow-y: auto;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #2a2d31;
}
.brand-logo {
  font-size: 22px;
  font-weight: 800;
  color: #db3a1b;
  text-decoration: none;
}
.brand-tag {
  font-size: 10px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #22262b;
  margin: 16px 12px;
  border-radius: 10px;
}
.company-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #db3a1b;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.company-text { min-width: 0; }
.company-name {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #f3f4f6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.company-role {
  display: block;
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 12px;
  flex: 1;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.nav-link:hover { background: #22262b; color: #f3f4f6; }
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  background: #db3a1b22;
  color: #db3a1b;
}
.nav-link svg { flex-shrink: 0; }
.nav-link--tutorial { margin-top: 8px; border-top: 1px solid #2a2f34; padding-top: 16px; }

.logout-btn {
  margin: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  width: calc(100% - 24px);
  transition: background 0.15s, color 0.15s;
}
.logout-btn:hover { background: #22262b; color: #f87171; }

/* ── Overlay ── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 150;
}
@media (min-width: 900px) { .overlay { display: none; } }

/* ── Main ── */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
@media (min-width: 900px) {
  .main { margin-left: 0; }
}

.topbar {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.menu-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
}
.menu-btn:hover { background: #f3f4f6; color: #111; }
@media (min-width: 900px) { .menu-btn { display: none; } }

.topbar-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}
.topbar-btn {
  background: #db3a1b;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s;
}
.topbar-btn:hover { background: #ab331a; }

.content {
  padding: 28px 24px;
  flex: 1;
}
@media (min-width: 1200px) { .content { padding: 32px 40px; } }
</style>
