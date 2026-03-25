<template>
  <div class="listings-page">

    <!-- Header -->
    <div class="page-head">
      <div>
        <h1 class="page-title">Mes annonces</h1>
        <p class="page-sub">
          <span v-if="!pending">
            <strong>{{ filtered.length }}</strong> résultat{{ filtered.length !== 1 ? 's' : '' }}
            <span v-if="annonces.length !== filtered.length"> sur {{ annonces.length }}</span>
          </span>
          <span v-else>Chargement…</span>
        </p>
      </div>
      <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nouvelle annonce
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="filters-bar">
      <div class="search-wrap">
        <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="search" type="search" placeholder="Rechercher par titre…" class="search-input" />
      </div>
      <select v-model="filterCondition" class="filter-select">
        <option value="">Tous les états</option>
        <option v-for="o in CONDITION_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
      <select v-model="filterStatus" class="filter-select">
        <option value="">Tous les statuts</option>
        <option value="1">Actif</option>
        <option value="0">Inactif</option>
      </select>
      <button v-if="isFiltering" class="reset-btn" @click="resetFilters">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Réinitialiser
      </button>
    </div>

    <!-- Skeleton -->
    <div v-if="pending" class="skeleton-table">
      <div v-for="n in 6" :key="n" class="skeleton-row" :style="`--i:${n}`" />
    </div>

    <!-- Empty state -->
    <div v-else-if="filtered.length === 0" class="empty-state">
      <div class="empty-icon-wrap">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <h3>{{ isFiltering ? 'Aucun résultat' : 'Pas encore d\'annonces' }}</h3>
      <p>{{ isFiltering ? 'Essayez de modifier vos filtres.' : 'Publiez votre première annonce dès maintenant.' }}</p>
      <button v-if="isFiltering" class="btn-secondary" @click="resetFilters">Effacer les filtres</button>
      <NuxtLink v-else to="/fournisseur/dashboard/listings/create" class="new-btn new-btn--sm">Créer une annonce</NuxtLink>
    </div>

    <!-- Table -->
    <div v-else class="table-card">
      <div class="table-scroll">
        <table class="table">
          <thead>
            <tr>
              <th style="width:56px" />
              <th>Titre</th>
              <th>Prix</th>
              <th>État</th>
              <th>Catégorie</th>
              <th>
                <span class="th-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </span>
                Vues
              </th>
              <th>Statut</th>
              <th style="width:120px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(a, idx) in filtered"
              :key="a.id"
              class="table-row"
              :style="`--i:${idx}`"
            >
              <td>
                <div class="thumb-cell">
                  <img v-if="a.images[0]" :src="storageUrl(a.images[0])" :alt="a.title" class="thumb-img" />
                  <div v-else class="thumb-empty">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                </div>
              </td>
              <td>
                <span class="td-title">{{ a.title }}</span>
                <span v-if="a.ville" class="td-sub">{{ a.ville }}</span>
              </td>
              <td class="td-price">{{ a.price !== null ? formatPrice(a.price) : '—' }}</td>
              <td>
                <span class="condition-tag" :class="`condition--${a.condition}`">
                  {{ labelCondition(a.condition) }}
                </span>
              </td>
              <td class="td-muted">{{ a.subcategory?.name || a.category?.name || '—' }}</td>
              <td class="td-muted td-views">{{ a.views }}</td>
              <td>
                <button
                  class="toggle-status"
                  :class="a.is_active ? 'toggle--on' : 'toggle--off'"
                  :title="a.is_active ? 'Désactiver' : 'Activer'"
                  @click="toggleActive(a.id)"
                >
                  <span class="toggle-dot" />
                  {{ a.is_active ? 'Actif' : 'Inactif' }}
                </button>
              </td>
              <td>
                <div class="row-actions">
                  <NuxtLink :to="`/fournisseur/dashboard/listings/${a.id}/edit`" class="action-edit">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Modifier
                  </NuxtLink>
                  <button class="action-del" @click="confirmDelete(a)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="deleteTarget" class="modal-backdrop" @click.self="deleteTarget = null">
          <div class="modal">
            <div class="modal-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </div>
            <h3 class="modal-title">Supprimer cette annonce ?</h3>
            <p class="modal-text">« <strong>{{ deleteTarget.title }}</strong> » sera définitivement supprimée avec toutes ses photos. Cette action est irréversible.</p>
            <div class="modal-actions">
              <button class="btn-cancel" @click="deleteTarget = null">Annuler</button>
              <button class="btn-delete" :disabled="deleting" @click="doDelete">
                <span v-if="deleting" class="btn-spinner" />
                {{ deleting ? 'Suppression…' : 'Supprimer définitivement' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { DashAnnouncement } from '~/composables/useDashboardAnnouncements'
import { CONDITION_OPTIONS } from '~/composables/useDashboardAnnouncements'

definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-auth' })

const { annonces, pending, fetchAll, toggleActive, remove, storageUrl } = useDashboardAnnouncements()
onMounted(() => fetchAll())

const search          = ref('')
const filterCondition = ref('')
const filterStatus    = ref('')
const deleteTarget    = ref<DashAnnouncement | null>(null)
const deleting        = ref(false)

const isFiltering = computed(() =>
  !!search.value.trim() || !!filterCondition.value || filterStatus.value !== '',
)

const filtered = computed(() => {
  let arr = annonces.value
  const q = search.value.trim().toLowerCase()
  if (q) arr = arr.filter(a => a.title.toLowerCase().includes(q))
  if (filterCondition.value) arr = arr.filter(a => a.condition === filterCondition.value)
  if (filterStatus.value !== '') arr = arr.filter(a => Number(a.is_active) === Number(filterStatus.value))
  return arr
})

function resetFilters() {
  search.value = ''
  filterCondition.value = ''
  filterStatus.value = ''
}

const labelCondition = (v: string) => CONDITION_OPTIONS.find(o => o.value === v)?.label ?? v

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 0 }).format(price)
}

function confirmDelete(a: DashAnnouncement) { deleteTarget.value = a }

async function doDelete() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await remove(deleteTarget.value.id)
    deleteTarget.value = null
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.listings-page { display: flex; flex-direction: column; gap: 20px; animation: fadeUp 0.35s ease both; }

/* Head */
.page-head { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: #6b7280; margin: 0; }
.page-sub strong { color: #111827; }
.new-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: #db3a1b; color: #fff; padding: 9px 18px;
  border-radius: 9px; font-size: 13px; font-weight: 600;
  text-decoration: none; white-space: nowrap;
  transition: background 0.15s, transform 0.15s;
}
.new-btn:hover { background: #b83217; transform: translateY(-1px); }
.new-btn--sm { padding: 8px 14px; }

/* Filters */
.filters-bar {
  display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
  background: #fff; border-radius: 12px; padding: 14px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #f3f4f6;
}
.search-wrap { position: relative; flex: 1; min-width: 180px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.search-input {
  width: 100%; height: 38px;
  border: 1.5px solid #e5e7eb; border-radius: 8px;
  padding: 0 12px 0 34px; font-size: 13px; color: #111827;
  outline: none; transition: border-color 0.15s;
}
.search-input:focus { border-color: #db3a1b; }
.filter-select {
  height: 38px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  padding: 0 10px; font-size: 13px; background: #fff;
  color: #374151; outline: none; cursor: pointer; transition: border-color 0.15s;
}
.filter-select:focus { border-color: #db3a1b; }
.reset-btn {
  display: flex; align-items: center; gap: 5px;
  height: 38px; padding: 0 14px;
  background: #fef2f2; color: #db3a1b;
  border: 1.5px solid #fecaca; border-radius: 8px;
  font-size: 12px; font-weight: 600; cursor: pointer;
  white-space: nowrap; transition: background 0.15s;
}
.reset-btn:hover { background: #fee2e2; }

/* Skeleton */
.skeleton-table { display: flex; flex-direction: column; gap: 8px; }
.skeleton-row {
  height: 56px; border-radius: 10px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite calc(var(--i,0) * 80ms);
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Empty */
.empty-state {
  background: #fff; border-radius: 16px; padding: 56px 24px;
  text-align: center; display: flex; flex-direction: column; align-items: center;
  gap: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #f3f4f6;
}
.empty-icon-wrap {
  width: 64px; height: 64px; border-radius: 16px;
  background: #fef2f2; display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
}
.empty-state h3 { font-size: 16px; font-weight: 700; color: #111827; margin: 0; }
.empty-state p  { font-size: 13px; color: #6b7280; margin: 0; max-width: 280px; }
.btn-secondary {
  padding: 8px 18px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; font-size: 13px; font-weight: 600; color: #374151;
  cursor: pointer; transition: background 0.15s;
}
.btn-secondary:hover { background: #f9fafb; }

/* Table */
.table-card {
  background: #fff; border-radius: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #f3f4f6;
  overflow: hidden;
}
.table-scroll { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.table thead tr { background: #fafafa; }
.table th {
  text-align: left; padding: 12px 14px;
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.6px; color: #9ca3af;
  border-bottom: 1px solid #f3f4f6; white-space: nowrap;
}
.th-icon { display: inline-flex; align-items: center; gap: 4px; vertical-align: middle; }
.table td { padding: 13px 14px; border-bottom: 1px solid #f9fafb; vertical-align: middle; }
.table-row { transition: background 0.12s; animation: fadeIn 0.3s ease calc(var(--i,0) * 30ms) both; }
.table-row:hover { background: #fafafa; }
.table-row:last-child td { border-bottom: none; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.thumb-cell {
  width: 52px; height: 40px; border-radius: 8px;
  overflow: hidden; background: #f3f4f6;
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.thumb-img { width: 100%; height: 100%; object-fit: cover; }
.thumb-empty { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }

.td-title { display: block; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.td-sub   { display: block; font-size: 11px; color: #9ca3af; margin-top: 2px; }
.td-price { font-weight: 700; color: #db3a1b; white-space: nowrap; }
.td-muted { color: #9ca3af; }
.td-views { font-variant-numeric: tabular-nums; }

.condition-tag {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 700;
}
.condition--new      { background: #dcfce7; color: #15803d; }
.condition--like_new { background: #dbeafe; color: #1d4ed8; }
.condition--used     { background: #fef9c3; color: #a16207; }

.toggle-status {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
  border: none; cursor: pointer; transition: opacity 0.15s;
}
.toggle-status:hover { opacity: 0.8; }
.toggle--on  { background: #dcfce7; color: #16a34a; }
.toggle--off { background: #f3f4f6; color: #6b7280; }
.toggle-dot {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
}
.toggle--on  .toggle-dot { background: #22c55e; }
.toggle--off .toggle-dot { background: #9ca3af; }

.row-actions { display: flex; align-items: center; gap: 4px; }
.action-edit {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 10px; border-radius: 7px; font-size: 12px; font-weight: 600;
  background: #eff6ff; color: #2563eb; text-decoration: none;
  transition: background 0.15s;
}
.action-edit:hover { background: #dbeafe; }
.action-del {
  width: 30px; height: 30px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; color: #9ca3af; cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.action-del:hover { background: #fff1f2; color: #e11d48; }

/* Modal */
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px); z-index: 1000;
  display: flex; align-items: center; justify-content: center; padding: 16px;
}
.modal {
  background: #fff; border-radius: 18px; padding: 32px;
  max-width: 440px; width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px;
}
.modal-icon-wrap {
  width: 56px; height: 56px; border-radius: 14px;
  background: #fff1f2; display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
}
.modal-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0; }
.modal-text  { font-size: 14px; color: #6b7280; margin: 0; line-height: 1.6; }
.modal-actions { display: flex; gap: 10px; width: 100%; margin-top: 8px; }
.btn-cancel {
  flex: 1; padding: 11px;
  border: 1.5px solid #e5e7eb; border-radius: 10px;
  background: #fff; font-size: 14px; font-weight: 600; color: #374151;
  cursor: pointer; transition: background 0.15s;
}
.btn-cancel:hover { background: #f9fafb; }
.btn-delete {
  flex: 1; padding: 11px;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  background: #dc2626; color: #fff;
  border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: background 0.15s;
}
.btn-delete:hover:not(:disabled) { background: #b91c1c; }
.btn-delete:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Modal transition */
.modal-enter-active { animation: modalIn 0.22s ease; }
.modal-leave-active { animation: modalIn 0.18s ease reverse; }
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
