<template>
  <div class="agents-page">
    <div class="page-head">
      <div>
        <h1 class="page-title">Mes agents</h1>
        <p class="page-sub">Gérez les comptes de vos collaborateurs</p>
      </div>
      <button class="new-btn" @click="showForm = true">+ Ajouter un agent</button>
    </div>

    <!-- Agent table -->
    <div v-if="pending" class="state-msg">Chargement…</div>
    <div v-else-if="agents.length === 0" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
      <p>Aucun agent pour le moment</p>
      <button class="new-btn" @click="showForm = true">Ajouter un agent</button>
    </div>
    <div v-else class="table-card">
      <table class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Ajouté le</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agent in agents" :key="agent.id">
            <td class="td-name">{{ agent.prenom }} {{ agent.nom }}</td>
            <td class="text-muted">{{ agent.email }}</td>
            <td>
              <span class="badge" :class="agent.is_active ? 'badge--actif' : 'badge--inactif'">
                {{ agent.is_active ? 'Actif' : 'Inactif' }}
              </span>
            </td>
            <td class="text-muted">{{ formatDate(agent.created_at!) }}</td>
            <td class="td-actions">
              <button class="action-btn action-btn--edit" @click="startEdit(agent)">Modifier</button>
              <button
                class="action-btn"
                :class="agent.is_active ? 'action-btn--warn' : 'action-btn--green'"
                @click="toggleActive(agent)"
              >
                {{ agent.is_active ? 'Désactiver' : 'Activer' }}
              </button>
              <button class="action-btn action-btn--del" @click="confirmDelete(agent)">Suppr.</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create / Edit modal -->
    <Teleport to="body">
      <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
        <div class="modal">
          <h3 class="modal-title">{{ editTarget ? 'Modifier l\'agent' : 'Ajouter un agent' }}</h3>
          <form class="modal-form" @submit.prevent="submitForm">
            <div class="row">
              <div class="field">
                <label>Prénom *</label>
                <input v-model="agentForm.prenom" type="text" required />
              </div>
              <div class="field">
                <label>Nom *</label>
                <input v-model="agentForm.nom" type="text" required />
              </div>
            </div>
            <div class="field">
              <label>Email *</label>
              <input v-model="agentForm.email" type="email" required />
            </div>
            <div class="field">
              <label>{{ editTarget ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe *' }}</label>
              <input v-model="agentForm.password" type="password" :required="!editTarget" autocomplete="new-password" />
            </div>
            <div v-if="agentForm.password" class="field">
              <label>Confirmer le mot de passe</label>
              <input v-model="agentForm.password_confirmation" type="password" autocomplete="new-password" />
            </div>

            <div v-if="formErrors.length" class="error-box">
              <div v-for="err in formErrors" :key="err">{{ err }}</div>
            </div>

            <div class="modal-actions">
              <button type="button" class="modal-cancel" @click="closeForm">Annuler</button>
              <button type="submit" class="modal-confirm modal-confirm--blue" :disabled="formSaving">
                {{ formSaving ? 'Enregistrement…' : (editTarget ? 'Mettre à jour' : 'Créer l\'agent') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete confirmation -->
      <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
        <div class="modal">
          <h3 class="modal-title">Supprimer cet agent ?</h3>
          <p class="modal-text">
            « {{ deleteTarget.prenom }} {{ deleteTarget.nom }} » sera définitivement supprimé.
            Ses annonces resteront mais seront dissociées de son compte.
          </p>
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
import type { AgentRecord } from '~/composables/useAgents'

definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-only' })

const { agents, pending, fetchAll, create, update, remove } = useAgents()
onMounted(() => fetchAll())

const showForm    = ref(false)
const editTarget  = ref<AgentRecord | null>(null)
const deleteTarget = ref<AgentRecord | null>(null)
const deleting    = ref(false)
const formSaving  = ref(false)
const formErrors  = ref<string[]>([])

const agentForm = reactive({
  prenom: '',
  nom: '',
  email: '',
  password: '',
  password_confirmation: '',
})

function startEdit(agent: AgentRecord) {
  editTarget.value = agent
  agentForm.prenom = agent.prenom
  agentForm.nom    = agent.nom
  agentForm.email  = agent.email
  agentForm.password = ''
  agentForm.password_confirmation = ''
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editTarget.value = null
  formErrors.value = []
  Object.assign(agentForm, { prenom: '', nom: '', email: '', password: '', password_confirmation: '' })
}

async function submitForm() {
  formErrors.value = []
  formSaving.value = true
  try {
    if (editTarget.value) {
      await update(editTarget.value.id, agentForm)
    } else {
      await create(agentForm)
    }
    closeForm()
  } catch (e: any) {
    const data = e?.data
    if (data?.errors) {
      formErrors.value = Object.values(data.errors).flat() as string[]
    } else {
      formErrors.value = [data?.message || 'Une erreur est survenue.']
    }
  } finally {
    formSaving.value = false
  }
}

async function toggleActive(agent: AgentRecord) {
  await update(agent.id, { is_active: !agent.is_active })
}

function confirmDelete(agent: AgentRecord) {
  deleteTarget.value = agent
}

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

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-TN', { day: '2-digit', month: 'short', year: 'numeric' })
</script>

<style scoped>
.agents-page { display: flex; flex-direction: column; gap: 24px; }
.page-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 14px; color: #6b7280; margin: 0; }
.new-btn {
  background: #db3a1b; color: #fff; padding: 10px 20px;
  border-radius: 8px; font-size: 14px; font-weight: 600;
  border: none; cursor: pointer; white-space: nowrap; transition: background 0.15s;
}
.new-btn:hover { background: #ab331a; }
.state-msg { color: #6b7280; font-size: 14px; padding: 40px 0; text-align: center; }
.empty-state { text-align: center; padding: 60px 0; display: flex; flex-direction: column; align-items: center; gap: 12px; color: #6b7280; }
.table-card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.table th { text-align: left; padding: 12px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af; border-bottom: 1px solid #f3f4f6; white-space: nowrap; }
.table td { padding: 14px 14px; border-bottom: 1px solid #f9fafb; color: #374151; vertical-align: middle; }
.table tr:last-child td { border-bottom: none; }
.td-name { font-weight: 600; color: #111827; }
.text-muted { color: #9ca3af; }
.badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
.badge--actif { background: #dcfce7; color: #16a34a; }
.badge--inactif { background: #f3f4f6; color: #6b7280; }
.td-actions { display: flex; gap: 6px; flex-wrap: nowrap; }
.action-btn { padding: 5px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; transition: background 0.15s; }
.action-btn--edit  { background: #eff6ff; color: #2563eb; }
.action-btn--edit:hover { background: #dbeafe; }
.action-btn--warn  { background: #fef9c3; color: #ca8a04; }
.action-btn--warn:hover { background: #fef08a; }
.action-btn--green { background: #dcfce7; color: #16a34a; }
.action-btn--green:hover { background: #bbf7d0; }
.action-btn--del   { background: #fff1f2; color: #e11d48; }
.action-btn--del:hover { background: #fecdd3; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; }
.modal { background: #fff; border-radius: 14px; padding: 28px 32px; max-width: 500px; width: 100%; box-shadow: 0 8px 40px rgba(0,0,0,0.15); }
.modal-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 20px; }
.modal-text { font-size: 14px; color: #6b7280; margin: 0 0 24px; }
.modal-form { display: flex; flex-direction: column; gap: 14px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
.field input { height: 42px; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 0 14px; font-size: 14px; color: #111827; outline: none; transition: border-color 0.15s; }
.field input:focus { border-color: #db3a1b; }
.error-box { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; font-size: 13px; padding: 10px 14px; border-radius: 8px; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
.modal-cancel { padding: 9px 20px; border: 1.5px solid #d1d5db; border-radius: 8px; background: #fff; font-size: 14px; font-weight: 600; color: #374151; cursor: pointer; }
.modal-cancel:hover { background: #f9fafb; }
.modal-confirm { padding: 9px 20px; background: #dc2626; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.modal-confirm--blue { background: #2563eb; }
.modal-confirm--blue:hover:not(:disabled) { background: #1d4ed8; }
.modal-confirm:hover:not(:disabled) { background: #b91c1c; }
.modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
