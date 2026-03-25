<template>
  <div class="dash-home">
    <!-- Welcome -->
    <div class="welcome">
      <div>
        <h1 class="welcome-title">Bonjour, {{ displayName }} 👋</h1>
        <p class="welcome-sub">Voici un aperçu de votre activité</p>
      </div>
      <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-btn">
        + Nouvelle annonce
      </NuxtLink>
    </div>

    <!-- Stats grid -->
    <div class="stats-grid">
      <div class="stat-card stat-card--blue">
        <div class="stat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-value">{{ stats?.total_listings ?? '—' }}</span>
          <span class="stat-label">Total annonces</span>
        </div>
      </div>

      <div class="stat-card stat-card--green">
        <div class="stat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-value">{{ stats?.actif_listings ?? '—' }}</span>
          <span class="stat-label">Annonces actives</span>
        </div>
      </div>

      <div class="stat-card stat-card--yellow">
        <div class="stat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-value">{{ stats?.brouillon_listings ?? '—' }}</span>
          <span class="stat-label">Brouillons</span>
        </div>
      </div>

      <div class="stat-card stat-card--red">
        <div class="stat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-value">{{ stats?.total_vues ?? '—' }}</span>
          <span class="stat-label">Vues totales</span>
        </div>
      </div>

      <div v-if="isFournisseur" class="stat-card stat-card--purple">
        <div class="stat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-value">{{ stats?.total_agents ?? '—' }}</span>
          <span class="stat-label">Agents</span>
        </div>
      </div>
    </div>

    <!-- Recent listings -->
    <div class="section">
      <div class="section-head">
        <h2 class="section-title">Dernières annonces</h2>
        <NuxtLink to="/fournisseur/dashboard/listings" class="see-all">Voir tout →</NuxtLink>
      </div>

      <div v-if="pending" class="loading">Chargement…</div>
      <div v-else-if="annonces.length === 0" class="empty">
        <p>Aucune annonce pour le moment.</p>
        <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-btn">Créer ma première annonce</NuxtLink>
      </div>
      <div v-else class="listing-table-wrap">
        <table class="listing-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Type</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in annonces.slice(0, 5)" :key="a.id">
              <td class="td-title">{{ a.title }}</td>
              <td class="td-cat">{{ a.type }}</td>
              <td class="td-cat">{{ a.subcategory?.name || a.category?.name || '—' }}</td>
              <td><span class="badge" :class="a.is_active ? 'badge--actif' : 'badge--inactif'">{{ a.is_active ? 'Actif' : 'Inactif' }}</span></td>
              <td>
                <NuxtLink :to="`/fournisseur/dashboard/listings/${a.id}/edit`" class="edit-link">Modifier</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-auth' })

const { user, isFournisseur, apiFetch } = useFournisseurAuth()
const { annonces, pending, fetchAll } = useDashboardAnnouncements()

const stats = ref<any>(null)

const displayName = computed(() => {
  if (!user.value) return ''
  return user.value.nom_entreprise || `${user.value.prenom} ${user.value.nom}`
})

await Promise.all([
  isFournisseur.value
    ? apiFetch('/dashboard/stats').then(d => { stats.value = d }).catch(() => null)
    : Promise.resolve(),
  fetchAll(),
])
</script>

<style scoped>
.dash-home { display: flex; flex-direction: column; gap: 32px; }

.welcome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.welcome-title { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.welcome-sub { font-size: 14px; color: #6b7280; margin: 0; }

.new-btn {
  background: #db3a1b;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
  white-space: nowrap;
}
.new-btn:hover { background: #ab331a; }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-card--blue  .stat-icon { background: #eff6ff; color: #2563eb; }
.stat-card--green .stat-icon { background: #f0fdf4; color: #16a34a; }
.stat-card--yellow .stat-icon { background: #fefce8; color: #ca8a04; }
.stat-card--red   .stat-icon { background: #fff1f2; color: #e11d48; }
.stat-card--purple .stat-icon { background: #faf5ff; color: #9333ea; }
.stat-body { display: flex; flex-direction: column; gap: 2px; }
.stat-value { font-size: 26px; font-weight: 700; color: #111827; line-height: 1; }
.stat-label { font-size: 12px; color: #6b7280; }

/* Section */
.section { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.section-title { font-size: 16px; font-weight: 700; color: #111827; margin: 0; }
.see-all { font-size: 13px; color: #db3a1b; text-decoration: none; font-weight: 600; }

.loading { color: #6b7280; font-size: 14px; }
.empty { text-align: center; padding: 32px 0; color: #6b7280; }
.empty p { margin: 0 0 16px; }

/* Table */
.listing-table-wrap { overflow-x: auto; }
.listing-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.listing-table th {
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
  border-bottom: 1px solid #f3f4f6;
}
.listing-table td { padding: 12px 12px; border-bottom: 1px solid #f9fafb; color: #374151; }
.td-title { font-weight: 600; color: #111827; max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.td-cat { color: #6b7280; }
.td-prix { font-weight: 600; }
.td-vues { color: #6b7280; }

.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}
.badge--actif    { background: #dcfce7; color: #16a34a; }
.badge--brouillon { background: #fef9c3; color: #ca8a04; }
.badge--inactif  { background: #f3f4f6; color: #6b7280; }

.edit-link { color: #db3a1b; font-size: 13px; font-weight: 600; text-decoration: none; }
.edit-link:hover { text-decoration: underline; }
</style>
