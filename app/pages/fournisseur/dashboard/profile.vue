<template>
  <div class="profile-page">
    <h1 class="page-title">Mon profil</h1>

    <!-- Profile form -->
    <div class="card">
      <h2 class="card-title">Informations de l'entreprise</h2>
      <form @submit.prevent="saveProfile">
        <div class="fields">
          <div class="field full">
            <label>Nom de l'entreprise *</label>
            <input v-model="profileForm.nom_entreprise" type="text" required />
          </div>
          <div class="field">
            <label>Email *</label>
            <input v-model="profileForm.email" type="email" required />
          </div>
          <div class="field">
            <label>Téléphone</label>
            <input v-model="profileForm.telephone" type="tel" />
          </div>
          <div class="field">
            <label>Adresse</label>
            <input v-model="profileForm.adresse" type="text" />
          </div>
          <div class="field">
            <label>Ville</label>
            <input v-model="profileForm.ville" type="text" />
          </div>
        </div>

        <div v-if="profileSuccess" class="success-box">{{ profileSuccess }}</div>
        <div v-if="profileErrors.length" class="error-box">
          <div v-for="err in profileErrors" :key="err">{{ err }}</div>
        </div>

        <div class="form-footer">
          <button type="submit" class="save-btn" :disabled="profileSaving">
            {{ profileSaving ? 'Enregistrement…' : 'Sauvegarder' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Password form -->
    <div class="card">
      <h2 class="card-title">Changer le mot de passe</h2>
      <form @submit.prevent="savePassword">
        <div class="fields">
          <div class="field full">
            <label>Mot de passe actuel</label>
            <input v-model="passForm.current_password" type="password" required autocomplete="current-password" />
          </div>
          <div class="field">
            <label>Nouveau mot de passe</label>
            <input v-model="passForm.password" type="password" required autocomplete="new-password" />
          </div>
          <div class="field">
            <label>Confirmer le mot de passe</label>
            <input v-model="passForm.password_confirmation" type="password" required autocomplete="new-password" />
          </div>
        </div>

        <div v-if="passSuccess" class="success-box">{{ passSuccess }}</div>
        <div v-if="passErrors.length" class="error-box">
          <div v-for="err in passErrors" :key="err">{{ err }}</div>
        </div>

        <div class="form-footer">
          <button type="submit" class="save-btn" :disabled="passSaving">
            {{ passSaving ? 'Modification…' : 'Modifier le mot de passe' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Stats quick view -->
    <div class="card">
      <h2 class="card-title">Statistiques</h2>
      <div class="stats-row">
        <div class="stat">
          <span class="stat-val">{{ profileData?.listings_count ?? '—' }}</span>
          <span class="stat-lbl">Annonces totales</span>
        </div>
        <div class="stat">
          <span class="stat-val">{{ profileData?.agents_count ?? '—' }}</span>
          <span class="stat-lbl">Agents actifs</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-only' })

const { apiFetch, updateProfile, changePassword } = useFournisseurAuth()

const profileData    = ref<any>(null)
const profileLoading = ref(true)

const profileForm = reactive({
  nom_entreprise: '',
  email:          '',
  telephone:      '',
  adresse:        '',
  ville:          '',
})

onMounted(async () => {
  try {
    profileData.value = await apiFetch<any>('/dashboard/profile')
    profileForm.nom_entreprise = profileData.value?.nom_entreprise ?? ''
    profileForm.email          = profileData.value?.email ?? ''
    profileForm.telephone      = profileData.value?.telephone ?? ''
    profileForm.adresse        = profileData.value?.adresse ?? ''
    profileForm.ville          = profileData.value?.ville ?? ''
  } catch {
    // silent fail
  } finally {
    profileLoading.value = false
  }
})

const passForm = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const profileSaving  = ref(false)
const profileErrors  = ref<string[]>([])
const profileSuccess = ref('')

const passSaving  = ref(false)
const passErrors  = ref<string[]>([])
const passSuccess = ref('')

async function saveProfile() {
  profileErrors.value  = []
  profileSuccess.value = ''
  profileSaving.value  = true
  try {
    await updateProfile(profileForm)
    profileSuccess.value = 'Profil mis à jour avec succès.'
  } catch (e: any) {
    const data = e?.data
    if (data?.errors) profileErrors.value = Object.values(data.errors).flat() as string[]
    else profileErrors.value = [data?.message || 'Erreur.']
  } finally {
    profileSaving.value = false
  }
}

async function savePassword() {
  passErrors.value  = []
  passSuccess.value = ''
  passSaving.value  = true
  try {
    await changePassword(passForm)
    passSuccess.value = 'Mot de passe modifié.'
    passForm.current_password = ''
    passForm.password = ''
    passForm.password_confirmation = ''
  } catch (e: any) {
    const data = e?.data
    if (data?.errors) passErrors.value = Object.values(data.errors).flat() as string[]
    else passErrors.value = [data?.message || 'Erreur.']
  } finally {
    passSaving.value = false
  }
}
</script>

<style scoped>
.profile-page { display: flex; flex-direction: column; gap: 24px; max-width: 700px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0; }
.card { background: #fff; border-radius: 12px; padding: 24px 28px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
.card-title { font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 20px; }
.fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field.full { grid-column: span 2; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
.field input {
  height: 42px; border: 1.5px solid #d1d5db; border-radius: 8px;
  padding: 0 14px; font-size: 14px; color: #111827; outline: none;
  transition: border-color 0.15s;
}
.field input:focus { border-color: #db3a1b; }
.success-box { margin-top: 14px; background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; font-size: 13px; padding: 10px 14px; border-radius: 8px; }
.error-box { margin-top: 14px; background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; font-size: 13px; padding: 10px 14px; border-radius: 8px; }
.form-footer { margin-top: 20px; display: flex; justify-content: flex-end; }
.save-btn { padding: 10px 24px; background: #db3a1b; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.save-btn:hover:not(:disabled) { background: #ab331a; }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.stats-row { display: flex; gap: 32px; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; gap: 4px; }
.stat-val { font-size: 32px; font-weight: 700; color: #111827; line-height: 1; }
.stat-lbl { font-size: 13px; color: #6b7280; }
</style>
