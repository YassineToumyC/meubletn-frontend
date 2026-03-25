<template>
  <div class="listings-page">
    <div class="page-head">
      <div>
        <h1 class="page-title">Mes annonces</h1>
        <p class="page-sub">{{ annonces.length }} annonce{{ annonces.length !== 1 ? 's' : '' }}</p>
      </div>
      <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-btn">+ Nouvelle annonce</NuxtLink>
    </div>

    <!-- Filters -->
    <div class="filters">
      <input v-model="search" type="search" placeholder="Rechercher par titre…" class="search-input" />
      <select v-model="filterCondition" class="filter-select">
        <option value="">Tous les états</option>
        <option v-for="o in CONDITION_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
      <select v-model="filterStatus" class="filter-select">
        <option value="">Tous les statuts</option>
        <option value="1">Actif</option>
        <option value="0">Inactif</option>
      </select>
    </div>

    <div v-if="pending" class="state-msg">Chargement…</div>

    <div v-else-if="filtered.length === 0" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
      <p>Aucune annonce trouvée</p>
      <NuxtLink to="/fournisseur/dashboard/listings/create" class="new-btn">Créer une annonce</NuxtLink>
    </div>

    <div v-else class="table-card">
      <table class="table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Titre</th>
            <th>Prix</th>
            <th>État</th>
            <th>Catégorie</th>
            <th>Vues</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in filtered" :key="a.id">
            <td>
              <div class="thumb-wrap">
                <img v-if="a.images[0]" :src="storageUrl(a.images[0])" class="thumb" :alt="a.title" />
                <div v-else class="thumb thumb--empty">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
              </div>
            </td>
            <td class="td-title">{{ a.title }}</td>
            <td class="td-price">
              {{ a.price !== null ? formatPrice(a.price) : '—' }}
            </td>
            <td>
              <span class="condition-badge" :class="`condition--${a.condition}`">
                {{ labelCondition(a.condition) }}
              </span>
            </td>
            <td class="text-muted">{{ a.subcategory?.name || a.category?.name || '—' }}</td>
            <td class="text-muted">{{ a.views }}</td>
            <td>
              <button
                class="toggle-btn"
                :class="a.is_active ? 'toggle-btn--on' : 'toggle-btn--off'"
                @click="toggleActive(a.id)"
              >{{ a.is_active ? 'Actif' : 'Inactif' }}</button>
            </td>
            <td class="td-actions">
              <NuxtLink :to="`/fournisseur/dashboard/listings/${a.id}/edit`" class="action-btn action-btn--edit">Modifier</NuxtLink>
              <button class="action-btn action-btn--del" @click="confirmDelete(a)">Suppr.</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
        <div class="modal">
          <h3 class="modal-title">Supprimer cette annonce ?</h3>
          <p class="modal-text">« {{ deleteTarget.title }} » sera définitivement supprimée, ainsi que toutes ses photos.</p>
          <div class="modal-actions">
            <button class="modal-cancel" @click="deleteTarget = null">Annuler</button>
            <button class="modal-confirm" :disabled="deleting" @click="doDelete">
              {{ deleting ? 'Suppression…' : 'Supprimer' }}
            </button>
          </div>
        </div>
      </div>
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

const filtered = computed(() => {
  let arr = annonces.value
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    arr = arr.filter(a => a.title.toLowerCase().includes(q))
  }
  if (filterCondition.value) arr = arr.filter(a => a.condition === filterCondition.value)
  if (filterStatus.value !== '') arr = arr.filter(a => Number(a.is_active) === Number(filterStatus.value))
  return arr
})

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
.listings-page { display: flex; flex-direction: column; gap: 24px; }
.page-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 14px; color: #6b7280; margin: 0; }
.new-btn { background: #db3a1b; color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; white-space: nowrap; transition: background 0.15s; }
.new-btn:hover { background: #ab331a; }

.filters { display: flex; gap: 12px; flex-wrap: wrap; }
.search-input { flex: 1; min-width: 200px; height: 40px; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 0 14px; font-size: 14px; outline: none; }
.search-input:focus { border-color: #db3a1b; }
.filter-select { height: 40px; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 0 12px; font-size: 14px; background: #fff; outline: none; }

.state-msg { color: #6b7280; font-size: 14px; padding: 40px 0; text-align: center; }
.empty-state { text-align: center; padding: 60px 0; display: flex; flex-direction: column; align-items: center; gap: 12px; color: #6b7280; }

.table-card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.table th { text-align: left; padding: 12px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af; border-bottom: 1px solid #f3f4f6; white-space: nowrap; }
.table td { padding: 12px 14px; border-bottom: 1px solid #f9fafb; color: #374151; vertical-align: middle; }
.table tr:last-child td { border-bottom: none; }

.thumb-wrap { width: 56px; height: 42px; border-radius: 6px; overflow: hidden; background: #f3f4f6; flex-shrink: 0; }
.thumb { width: 100%; height: 100%; object-fit: cover; }
.thumb--empty { display: flex; align-items: center; justify-content: center; }

.td-title { font-weight: 600; color: #111827; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.td-price { font-weight: 700; color: #db3a1b; white-space: nowrap; }
.text-muted { color: #9ca3af; }

.condition-badge { display: inline-block; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.condition--new      { background: #dcfce7; color: #15803d; }
.condition--like_new { background: #dbeafe; color: #1d4ed8; }
.condition--used     { background: #fef9c3; color: #a16207; }

.toggle-btn { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; }
.toggle-btn--on  { background: #dcfce7; color: #16a34a; }
.toggle-btn--off { background: #f3f4f6; color: #6b7280; }

.td-actions { display: flex; gap: 6px; white-space: nowrap; }
.action-btn { padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; text-decoration: none; transition: background 0.15s; }
.action-btn--edit { background: #eff6ff; color: #2563eb; }
.action-btn--edit:hover { background: #dbeafe; }
.action-btn--del  { background: #fff1f2; color: #e11d48; }
.action-btn--del:hover { background: #fecdd3; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; }
.modal { background: #fff; border-radius: 14px; padding: 28px 32px; max-width: 420px; width: 100%; }
.modal-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 8px; }
.modal-text { font-size: 14px; color: #6b7280; margin: 0 0 24px; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }
.modal-cancel { padding: 9px 20px; border: 1.5px solid #d1d5db; border-radius: 8px; background: #fff; font-size: 14px; font-weight: 600; color: #374151; cursor: pointer; }
.modal-confirm { padding: 9px 20px; background: #dc2626; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
.modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
</style>