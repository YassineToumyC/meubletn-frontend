<template>
  <div class="dash-root">

    <!-- ── Sidebar ── -->
    <aside class="sidebar" :class="{ 'sidebar--open': sidebarOpen }">
      <div class="sidebar-inner">

        <!-- Brand -->
        <div class="sidebar-brand">
          <NuxtLink to="/" class="brand-logo">
            <img src="/images/logo/logo-blue.svg" class="logo-img" alt="meubletn" />
          </NuxtLink>
        </div>

        <!-- User card -->
        <div class="user-card">
          <div class="user-avatar">{{ initials }}</div>
          <div class="user-info">
            <span class="user-name">{{ displayName }}</span>
            <span class="user-role">
              <span class="role-dot" :class="user?.type === 'fournisseur' ? 'role-dot--owner' : 'role-dot--agent'" />
              {{ user?.type === 'fournisseur' ? 'Propriétaire' : 'Agent' }}
            </span>
          </div>
        </div>

        <!-- Nav -->
        <nav class="nav">
          <p class="nav-section">Navigation</p>

          <NuxtLink to="/fournisseur/dashboard" class="nav-link" exact-active-class="nav-link--active">
            <span class="nav-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            </span>
            <span>Tableau de bord</span>
          </NuxtLink>

          <NuxtLink to="/fournisseur/dashboard/listings" class="nav-link" active-class="nav-link--active">
            <span class="nav-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </span>
            <span>Mes annonces</span>
            <span v-if="annoncesCount > 0" class="nav-badge">{{ annoncesCount }}</span>
          </NuxtLink>

          <NuxtLink v-if="isFournisseur" to="/fournisseur/dashboard/agents" class="nav-link" active-class="nav-link--active">
            <span class="nav-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            <span>Mes agents</span>
          </NuxtLink>

          <NuxtLink v-if="isFournisseur" to="/fournisseur/dashboard/profile" class="nav-link" active-class="nav-link--active">
            <span class="nav-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span>Mon profil</span>
          </NuxtLink>

          <div class="nav-divider" />

          <NuxtLink to="/fournisseur/dashboard/tutorial" class="nav-link nav-link--muted" active-class="nav-link--active">
            <span class="nav-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>
            </span>
            <span>Guide d'utilisation</span>
          </NuxtLink>
        </nav>

        <!-- Spacer -->
        <div class="flex-1" />

        <!-- Visit site -->
        <a href="/" target="_blank" class="visit-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Voir le site
        </a>

        <!-- Logout -->
        <button class="logout-btn" :disabled="loggingOut" @click="doLogout">
          <span v-if="loggingOut" class="logout-spinner" />
          <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          {{ loggingOut ? 'Déconnexion…' : 'Se déconnecter' }}
        </button>

      </div>
    </aside>

    <!-- Mobile overlay -->
    <Transition name="overlay">
      <div v-if="sidebarOpen" class="overlay" @click="sidebarOpen = false" />
    </Transition>

    <!-- ── Main ── -->
    <div class="main">

      <!-- Topbar -->
      <header class="topbar">
        <button class="menu-btn" aria-label="Menu" @click="sidebarOpen = !sidebarOpen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <NuxtLink to="/fournisseur/dashboard" class="bc-home">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          </NuxtLink>
          <span v-if="pageTitle !== 'Tableau de bord'" class="bc-sep">/</span>
          <span v-if="pageTitle !== 'Tableau de bord'" class="bc-current">{{ pageTitle }}</span>
        </nav>

        <div class="topbar-right">
          <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-annonce-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nouvelle annonce
          </NuxtLink>
        </div>
      </header>

      <!-- Page content -->
      <main class="content">
        <slot />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
const { user, isFournisseur, logout } = useFournisseurAuth()
const { annonces } = useDashboardAnnouncements()
const route = useRoute()
const sidebarOpen = ref(false)
const loggingOut  = ref(false)

watch(() => route.path, () => { sidebarOpen.value = false })

const initials = computed(() => {
  if (!user.value) return '?'
  const name = user.value.nom_entreprise || `${user.value.prenom ?? ''} ${user.value.nom ?? ''}`
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
})

const displayName = computed(() => {
  if (!user.value) return ''
  return user.value.nom_entreprise || `${user.value.prenom ?? ''} ${user.value.nom ?? ''}`.trim()
})

const annoncesCount = computed(() => annonces.value.length)

const pageTitle = computed(() => {
  const p = route.path
  if (p.includes('/listings/create'))              return 'Nouvelle annonce'
  if (p.includes('/listings/') && p.includes('/edit')) return 'Modifier l\'annonce'
  if (p.includes('/listings'))                     return 'Mes annonces'
  if (p.includes('/agents'))                       return 'Mes agents'
  if (p.includes('/profile'))                      return 'Mon profil'
  if (p.includes('/tutorial'))                     return 'Guide'
  return 'Tableau de bord'
})

async function doLogout() {
  loggingOut.value = true
  try {
    await logout()
  } finally {
    loggingOut.value = false
  }
  await navigateTo('/auth/login')
}
</script>

<style scoped>
/* ── Root ── */
.dash-root {
  display: flex;
  min-height: 100vh;
  background: #fff;
}
.flex-1 { flex: 1; }

/* ── Sidebar ── */
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #111318;
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 300;
  transform: translateX(-100%);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
@media (min-width: 900px) {
  .sidebar { position: sticky; top: 0; height: 100vh; transform: translateX(0); }
}
.sidebar--open { transform: translateX(0); box-shadow: 0 0 60px rgba(0,0,0,0.4); }

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 0 20px;
  overflow-y: auto;
  scrollbar-width: none;
}
.sidebar-inner::-webkit-scrollbar { display: none; }

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 20px 18px;
  border-bottom: 1px solid #1e2128;
}
.brand-logo { text-decoration: none; display: flex; align-items: center; }
.logo-img { height: 40px; width: auto; display: block; }

/* User card */
.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 12px;
  padding: 14px;
  background: #1a1d24;
  border-radius: 12px;
  border: 1px solid #1e2128;
}
.user-avatar {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #003888, #4d88d4);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-info { min-width: 0; }
.user-name {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #f3f4f6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-role {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
}
.role-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.role-dot--owner { background: #003888; }
.role-dot--agent  { background: #3b82f6; }

/* Nav */
.nav {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 8px 12px;
}
.nav-section {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #3d4250;
  padding: 4px 8px 8px;
  margin: 0;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  position: relative;
  border-left: 2px solid transparent;
}
.nav-link:hover {
  background: #1a1d24;
  color: #d1d5db;
  border-left-color: #2a2d35;
}
.nav-link--active {
  background: rgba(0,56,136,0.1);
  color: #6b9fd4;
  border-left-color: #003888;
  font-weight: 600;
}
.nav-link--muted { color: #4b5563; }
.nav-link--muted:hover { color: #9ca3af; }
.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  flex-shrink: 0;
}
.nav-badge {
  margin-left: auto;
  background: rgba(0,56,136,0.15);
  color: #6b9fd4;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
}
.nav-divider {
  height: 1px;
  background: #1e2128;
  margin: 8px 8px;
}

/* Visit site */
.visit-link {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 12px 4px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  color: #4b5563;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}
.visit-link:hover { color: #9ca3af; background: #1a1d24; }

/* Logout */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 12px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #4b5563;
  background: none;
  border: none;
  cursor: pointer;
  width: calc(100% - 24px);
  transition: background 0.15s, color 0.15s;
}
.logout-btn:hover:not(:disabled) { background: rgba(239,68,68,0.08); color: #f87171; }
.logout-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.logout-spinner {
  width: 14px; height: 14px;
  border: 2px solid #4b5563;
  border-top-color: #f87171;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Overlay ── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(2px);
  z-index: 250;
}
@media (min-width: 900px) { .overlay { display: none; } }
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.25s; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

/* ── Main ── */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

/* Topbar */
.topbar {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 20px;
  height: 58px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 0 #f3f4f6;
}
.menu-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  transition: background 0.15s, color 0.15s;
}
.menu-btn:hover { background: #f3f4f6; color: #111; }
@media (min-width: 900px) { .menu-btn { display: none; } }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}
.bc-home {
  color: #9ca3af;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: color 0.15s;
}
.bc-home:hover { color: #003888; }
.bc-sep { color: #d1d5db; font-size: 13px; }
.bc-current {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.topbar-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
.new-annonce-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #003888;
  color: #fff;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s, transform 0.15s;
}
.new-annonce-btn:hover { background: #002d6e; transform: translateY(-1px); }

/* Content */
.content {
  padding: 28px 24px;
  flex: 1;
}
@media (min-width: 1200px) { .content { padding: 32px 40px; } }
@media (max-width: 640px)  { .content { padding: 20px 16px; } }
</style>
