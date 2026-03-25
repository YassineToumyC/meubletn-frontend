<template>
  <div class="dash-home">

    <!-- Welcome banner -->
    <div class="welcome-banner">
      <div class="welcome-left">
        <h1 class="welcome-title">Bonjour, {{ displayName }} 👋</h1>
        <p class="welcome-sub">Voici un aperçu de votre activité aujourd'hui</p>
      </div>
      <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nouvelle annonce
      </NuxtLink>
    </div>

    <!-- Stats grid -->
    <div class="stats-grid">
      <div class="stat-card" style="--delay: 0ms">
        <div class="stat-icon-wrap stat-icon--blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats?.total_listings ?? (pending ? '…' : '0') }}</span>
          <span class="stat-label">Total annonces</span>
        </div>
        <NuxtLink to="/fournisseur/dashboard/listings" class="stat-link">Voir →</NuxtLink>
      </div>

      <div class="stat-card" style="--delay: 60ms">
        <div class="stat-icon-wrap stat-icon--green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="stat-content">
          <span class="stat-value stat-value--green">{{ stats?.actif_listings ?? (pending ? '…' : '0') }}</span>
          <span class="stat-label">Actives</span>
        </div>
        <div class="stat-pill stat-pill--green">en ligne</div>
      </div>

      <div class="stat-card" style="--delay: 120ms">
        <div class="stat-icon-wrap stat-icon--amber">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>
        </div>
        <div class="stat-content">
          <span class="stat-value stat-value--amber">{{ stats?.brouillon_listings ?? (pending ? '…' : '0') }}</span>
          <span class="stat-label">Brouillons</span>
        </div>
        <div class="stat-pill stat-pill--amber">non publiés</div>
      </div>

      <div class="stat-card" style="--delay: 180ms">
        <div class="stat-icon-wrap stat-icon--purple">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div class="stat-content">
          <span class="stat-value stat-value--purple">{{ stats?.total_vues ?? (pending ? '…' : '0') }}</span>
          <span class="stat-label">Vues totales</span>
        </div>
        <div class="stat-pill stat-pill--purple">impressions</div>
      </div>

      <div v-if="isFournisseur" class="stat-card" style="--delay: 240ms">
        <div class="stat-icon-wrap stat-icon--red">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ stats?.total_agents ?? (pending ? '…' : '0') }}</span>
          <span class="stat-label">Agents</span>
        </div>
        <NuxtLink to="/fournisseur/dashboard/agents" class="stat-link">Gérer →</NuxtLink>
      </div>
    </div>

    <!-- Bottom grid -->
    <div class="bottom-grid">

      <!-- Recent listings -->
      <div class="section-card section-card--wide">
        <div class="section-head">
          <div>
            <h2 class="section-title">Dernières annonces</h2>
            <p class="section-sub">Vos 5 annonces les plus récentes</p>
          </div>
          <NuxtLink to="/fournisseur/dashboard/listings" class="see-all-btn">Voir tout</NuxtLink>
        </div>

        <div v-if="annoncePending" class="skeleton-list">
          <div v-for="n in 4" :key="n" class="skeleton-row" />
        </div>

        <div v-else-if="annonces.length === 0" class="empty-section">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <p>Aucune annonce pour le moment</p>
          <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-btn new-btn--sm">Créer ma première annonce</NuxtLink>
        </div>

        <div v-else class="listings-list">
          <div
            v-for="(a, i) in annonces.slice(0, 5)"
            :key="a.id"
            class="listing-row"
            :style="`--i: ${i}`"
          >
            <div class="listing-thumb">
              <img v-if="a.images[0]" :src="storageUrl(a.images[0])" :alt="a.title" />
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <div class="listing-info">
              <span class="listing-title">{{ a.title }}</span>
              <span class="listing-cat">{{ a.subcategory?.name || a.category?.name || '—' }}</span>
            </div>
            <div class="listing-meta">
              <span class="listing-views">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {{ a.views }}
              </span>
              <span class="status-dot" :class="a.is_active ? 'status-dot--on' : 'status-dot--off'" :title="a.is_active ? 'Actif' : 'Inactif'" />
            </div>
            <NuxtLink :to="`/fournisseur/dashboard/listings/${a.id}/edit`" class="listing-edit">Modifier</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="section-card">
        <div class="section-head">
          <div>
            <h2 class="section-title">Actions rapides</h2>
            <p class="section-sub">Raccourcis utiles</p>
          </div>
        </div>
        <div class="quick-actions">
          <NuxtLink to="/fournisseur/dashboard/listings/create" class="quick-action quick-action--primary">
            <div class="qa-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div>
              <span class="qa-title">Créer une annonce</span>
              <span class="qa-sub">Publier un nouveau produit</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/fournisseur/dashboard/listings" class="quick-action">
            <div class="qa-icon qa-icon--blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <div>
              <span class="qa-title">Gérer les annonces</span>
              <span class="qa-sub">Modifier, activer, supprimer</span>
            </div>
          </NuxtLink>
          <NuxtLink v-if="isFournisseur" to="/fournisseur/dashboard/agents" class="quick-action">
            <div class="qa-icon qa-icon--purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div>
              <span class="qa-title">Mes agents</span>
              <span class="qa-sub">Gérer l'équipe</span>
            </div>
          </NuxtLink>
          <NuxtLink v-if="isFournisseur" to="/fournisseur/dashboard/profile" class="quick-action">
            <div class="qa-icon qa-icon--amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <span class="qa-title">Mon profil</span>
              <span class="qa-sub">Modifier les informations</span>
            </div>
          </NuxtLink>
          <a href="/" target="_blank" class="quick-action">
            <div class="qa-icon qa-icon--green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div>
              <span class="qa-title">Voir le site</span>
              <span class="qa-sub">Vue client de meubletn</span>
            </div>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-auth' })

const { user, isFournisseur, apiFetch } = useFournisseurAuth()
const { annonces, pending: annoncePending, fetchAll, storageUrl } = useDashboardAnnouncements()
const stats   = ref<any>(null)
const pending = ref(false)

const displayName = computed(() =>
  user.value?.nom_entreprise || `${user.value?.prenom ?? ''} ${user.value?.nom ?? ''}`.trim(),
)

onMounted(async () => {
  pending.value = true
  try {
    await Promise.all([
      isFournisseur.value
        ? apiFetch('/dashboard/stats').then(d => { stats.value = d }).catch(() => null)
        : Promise.resolve(),
      fetchAll(),
    ])
  } finally {
    pending.value = false
  }
})
</script>

<style scoped>
.dash-home { display: flex; flex-direction: column; gap: 24px; }

/* Welcome */
.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: linear-gradient(135deg, #1a1d24 0%, #22262e 100%);
  border-radius: 16px;
  padding: 28px 32px;
  animation: fadeUp 0.4s ease both;
}
@media (max-width: 480px) { .welcome-banner { padding: 20px; } }
.welcome-title {
  font-size: 22px;
  font-weight: 700;
  color: #f3f4f6;
  margin: 0 0 6px;
}
@media (min-width: 768px) { .welcome-title { font-size: 26px; } }
.welcome-sub { font-size: 14px; color: #6b7280; margin: 0; }
.new-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #003888;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s, transform 0.15s;
  white-space: nowrap;
}
.new-btn:hover { background: #002d6e; transform: translateY(-1px); }
.new-btn--sm { font-size: 13px; padding: 8px 16px; }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 640px)  { .stats-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .stats-grid { grid-template-columns: repeat(5, 1fr); } }

.stat-card {
  background: #fff;
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  border: 1px solid #f3f4f6;
  transition: box-shadow 0.2s, transform 0.2s;
  animation: fadeUp 0.4s ease calc(var(--delay, 0ms)) both;
}
.stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }

.stat-icon-wrap {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.stat-icon--blue   { background: #eff6ff; color: #2563eb; }
.stat-icon--green  { background: #f0fdf4; color: #16a34a; }
.stat-icon--amber  { background: #fffbeb; color: #d97706; }
.stat-icon--purple { background: #faf5ff; color: #9333ea; }
.stat-icon--red    { background: #e8eef8; color: #003888; }

.stat-content { flex: 1; }
.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-value--green  { color: #16a34a; }
.stat-value--amber  { color: #d97706; }
.stat-value--purple { color: #9333ea; }
.stat-label { font-size: 12px; color: #6b7280; font-weight: 500; }

.stat-link {
  font-size: 12px;
  font-weight: 600;
  color: #003888;
  text-decoration: none;
  align-self: flex-end;
}
.stat-link:hover { text-decoration: underline; }
.stat-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  align-self: flex-start;
  letter-spacing: 0.3px;
}
.stat-pill--green  { background: #dcfce7; color: #16a34a; }
.stat-pill--amber  { background: #fef9c3; color: #a16207; }
.stat-pill--purple { background: #f3e8ff; color: #9333ea; }

/* Bottom grid */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  animation: fadeUp 0.4s ease 0.2s both;
}
@media (min-width: 900px) { .bottom-grid { grid-template-columns: 1fr 340px; } }

.section-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid #f3f4f6;
}
.section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.section-title { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 2px; }
.section-sub   { font-size: 12px; color: #9ca3af; margin: 0; }
.see-all-btn {
  font-size: 12px;
  font-weight: 600;
  color: #003888;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 6px;
  background: #e8eef8;
  white-space: nowrap;
  transition: background 0.15s;
  flex-shrink: 0;
}
.see-all-btn:hover { background: #cdd9f0; }

/* Skeleton */
.skeleton-list { display: flex; flex-direction: column; gap: 12px; }
.skeleton-row {
  height: 52px;
  border-radius: 10px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Empty */
.empty-section {
  text-align: center;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #9ca3af;
  font-size: 14px;
}

/* Listings list */
.listings-list { display: flex; flex-direction: column; }
.listing-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f9fafb;
  animation: fadeUp 0.3s ease calc(var(--i, 0) * 50ms) both;
}
.listing-row:last-child { border-bottom: none; }
.listing-row:hover { background: #fafafa; border-radius: 8px; margin: 0 -8px; padding: 10px 8px; }

.listing-thumb {
  width: 48px; height: 38px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.listing-thumb img { width: 100%; height: 100%; object-fit: cover; }

.listing-info { flex: 1; min-width: 0; }
.listing-title {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.listing-cat { font-size: 11px; color: #9ca3af; }

.listing-meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.listing-views {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #9ca3af;
}
.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot--on  { background: #22c55e; box-shadow: 0 0 0 2px rgba(34,197,94,0.2); }
.status-dot--off { background: #d1d5db; }

.listing-edit {
  font-size: 12px;
  font-weight: 600;
  color: #003888;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s;
  flex-shrink: 0;
}
.listing-edit:hover { background: #e8eef8; }

/* Quick actions */
.quick-actions { display: flex; flex-direction: column; gap: 8px; }
.quick-action {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  text-decoration: none;
  border: 1.5px solid #f3f4f6;
  transition: border-color 0.15s, background 0.15s, transform 0.15s;
  cursor: pointer;
  background: none;
}
.quick-action:hover { background: #fafafa; border-color: #e5e7eb; transform: translateX(3px); }
.quick-action--primary { background: linear-gradient(135deg, #003888, #1452a8); border-color: transparent; }
.quick-action--primary:hover { opacity: 0.92; transform: translateX(3px); background: linear-gradient(135deg, #003888, #1452a8); }
.quick-action--primary .qa-title { color: #fff; }
.quick-action--primary .qa-sub   { color: rgba(255,255,255,0.7); }
.quick-action--primary .qa-icon  { background: rgba(255,255,255,0.15); color: #fff; }

.qa-icon {
  width: 36px; height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #f3f4f6;
  color: #374151;
}
.qa-icon--blue   { background: #eff6ff; color: #2563eb; }
.qa-icon--purple { background: #faf5ff; color: #9333ea; }
.qa-icon--amber  { background: #fffbeb; color: #d97706; }
.qa-icon--green  { background: #f0fdf4; color: #16a34a; }

.qa-title { display: block; font-size: 13px; font-weight: 600; color: #111827; }
.qa-sub   { display: block; font-size: 11px; color: #9ca3af; margin-top: 1px; }

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
