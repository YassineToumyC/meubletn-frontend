<template>
  <div class="profile-page">

    <div class="page-head">
      <h1 class="page-title">Mon profil</h1>
      <p class="page-sub">Gérez les informations de votre entreprise</p>
    </div>

    <!-- Stats strip -->
    <div class="stats-strip">
      <div class="strip-stat">
        <span class="strip-val">{{ profileData?.listings_count ?? '—' }}</span>
        <span class="strip-lbl">Annonces totales</span>
      </div>
      <div class="strip-divider" />
      <div class="strip-stat">
        <span class="strip-val">{{ profileData?.agents_count ?? '—' }}</span>
        <span class="strip-lbl">Agents actifs</span>
      </div>
    </div>

    <div class="two-col">

      <!-- Company info -->
      <div class="card">
        <div class="card-head">
          <div class="card-icon card-icon--blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          </div>
          <div>
            <h2 class="card-title">Informations de l'entreprise</h2>
            <p class="card-sub">Nom, contact et localisation</p>
          </div>
        </div>

        <form @submit.prevent="saveProfile">
          <div class="fields">
            <div class="field span-2">
              <label>Nom de l'entreprise</label>
              <input v-model="profileForm.nom_entreprise" type="text" placeholder="Ex: Meubles Ben Salah" />
            </div>
            <div class="field">
              <label>Email professionnel</label>
              <input v-model="profileForm.email" type="email" placeholder="contact@entreprise.tn" />
            </div>
            <div class="field">
              <label>Téléphone</label>
              <input v-model="profileForm.telephone" type="tel" placeholder="+216 XX XXX XXX" />
            </div>
            <div class="field span-2">
              <label>Adresse</label>
              <input v-model="profileForm.adresse" type="text" placeholder="Rue, numéro…" />
            </div>
            <div class="field">
              <label>Ville</label>
              <input v-model="profileForm.ville" type="text" placeholder="Tunis, Sfax…" />
            </div>
          </div>

          <Transition name="fade">
            <div v-if="profileSuccess" class="alert alert--success">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {{ profileSuccess }}
            </div>
          </Transition>
          <Transition name="fade">
            <div v-if="profileErrors.length" class="alert alert--error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <div><div v-for="e in profileErrors" :key="e">{{ e }}</div></div>
            </div>
          </Transition>

          <div class="form-footer">
            <button type="submit" class="save-btn" :disabled="profileSaving">
              <span v-if="profileSaving" class="btn-spinner" />
              {{ profileSaving ? 'Enregistrement…' : 'Sauvegarder les modifications' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Password -->
      <div class="card">
        <div class="card-head">
          <div class="card-icon card-icon--amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <h2 class="card-title">Sécurité du compte</h2>
            <p class="card-sub">Changez votre mot de passe</p>
          </div>
        </div>

        <form @submit.prevent="savePassword">
          <div class="fields fields--single">
            <div class="field span-2">
              <label>Mot de passe actuel</label>
              <input v-model="passForm.current_password" type="password" required autocomplete="current-password" placeholder="••••••••" />
            </div>
            <div class="field">
              <label>Nouveau mot de passe</label>
              <input v-model="passForm.password" type="password" required autocomplete="new-password" placeholder="Min. 8 caractères" />
            </div>
            <div class="field">
              <label>Confirmer le mot de passe</label>
              <input v-model="passForm.password_confirmation" type="password" required autocomplete="new-password" placeholder="••••••••" />
            </div>
          </div>

          <Transition name="fade">
            <div v-if="passSuccess" class="alert alert--success">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {{ passSuccess }}
            </div>
          </Transition>
          <Transition name="fade">
            <div v-if="passErrors.length" class="alert alert--error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <div><div v-for="e in passErrors" :key="e">{{ e }}</div></div>
            </div>
          </Transition>

          <div class="form-footer">
            <button type="submit" class="save-btn save-btn--outline" :disabled="passSaving">
              <span v-if="passSaving" class="btn-spinner" />
              {{ passSaving ? 'Modification…' : 'Mettre à jour le mot de passe' }}
            </button>
          </div>
        </form>
      </div>

    </div>

    <!-- Sessions actives -->
    <div class="card card--full">
      <div class="card-head">
        <div class="card-icon card-icon--blue">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <div style="flex:1">
          <h2 class="card-title">Sessions actives</h2>
          <p class="card-sub">Appareils connectés à votre compte</p>
        </div>
        <button class="revoke-all-btn" :disabled="revokingAll || sessions.length <= 1" @click="revokeOthers">
          <span v-if="revokingAll" class="btn-spinner btn-spinner--dark" />
          {{ revokingAll ? 'Révocation…' : 'Révoquer les autres' }}
        </button>
      </div>

      <div v-if="sessionsLoading" class="sessions-loading">Chargement…</div>
      <div v-else-if="sessions.length === 0" class="sessions-empty">Aucune session active.</div>
      <ul v-else class="sessions-list">
        <li v-for="s in sessions" :key="s.id" class="session-item" :class="{ 'session-item--current': s.is_current }">
          <div class="session-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="session-info">
            <div class="session-device">
              {{ parseDevice(s.user_agent) }}
              <span v-if="s.is_current" class="session-badge">Session actuelle</span>
            </div>
            <div class="session-meta">
              <span v-if="s.ip_address">{{ s.ip_address }}</span>
              <span v-if="s.ip_address"> · </span>
              <span>Connecté {{ formatRelative(s.created_at) }}</span>
              <span v-if="s.last_used_at"> · Utilisé {{ formatRelative(s.last_used_at) }}</span>
            </div>
          </div>
          <button v-if="!s.is_current" class="session-revoke" :disabled="revoking === s.id" @click="revokeSession(s.id)" title="Révoquer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-only' })

const { apiFetch, updateProfile, changePassword } = useFournisseurAuth()

const profileData = ref<any>(null)

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
    Object.assign(profileForm, {
      nom_entreprise: profileData.value?.nom_entreprise ?? '',
      email:          profileData.value?.email ?? '',
      telephone:      profileData.value?.telephone ?? '',
      adresse:        profileData.value?.adresse ?? '',
      ville:          profileData.value?.ville ?? '',
    })
    await loadSessions()
  } catch {}
})

const passForm = reactive({ current_password: '', password: '', password_confirmation: '' })

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
    setTimeout(() => { profileSuccess.value = '' }, 4000)
  } catch (e: any) {
    const d = e?.data
    profileErrors.value = d?.errors ? Object.values(d.errors).flat() as string[] : [d?.message || 'Erreur.']
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
    passSuccess.value = 'Mot de passe modifié avec succès.'
    Object.assign(passForm, { current_password: '', password: '', password_confirmation: '' })
    setTimeout(() => { passSuccess.value = '' }, 4000)
  } catch (e: any) {
    const d = e?.data
    passErrors.value = d?.errors ? Object.values(d.errors).flat() as string[] : [d?.message || 'Erreur.']
  } finally {
    passSaving.value = false
  }
}

// ── Sessions ───────────────────────────────────────────────
const sessions        = ref<any[]>([])
const sessionsLoading = ref(false)
const revoking        = ref<number | null>(null)
const revokingAll     = ref(false)

async function loadSessions() {
  sessionsLoading.value = true
  try {
    const data = await apiFetch<{ sessions: any[] }>('/dashboard/sessions')
    sessions.value = data.sessions
  } catch {} finally {
    sessionsLoading.value = false
  }
}

async function revokeSession(id: number) {
  revoking.value = id
  try {
    await apiFetch(`/dashboard/sessions/${id}`, { method: 'DELETE' })
    sessions.value = sessions.value.filter(s => s.id !== id)
  } catch {} finally {
    revoking.value = null
  }
}

async function revokeOthers() {
  revokingAll.value = true
  try {
    await apiFetch('/dashboard/sessions', { method: 'DELETE' })
    sessions.value = sessions.value.filter(s => s.is_current)
  } catch {} finally {
    revokingAll.value = false
  }
}

function parseDevice(ua: string | null): string {
  if (!ua) return 'Appareil inconnu'
  let browser = 'Navigateur'
  if (/Edg\//.test(ua))             browser = 'Edge'
  else if (/Chrome\//.test(ua))     browser = 'Chrome'
  else if (/Firefox\//.test(ua))    browser = 'Firefox'
  else if (/Safari\//.test(ua))     browser = 'Safari'
  else if (/Opera|OPR\//.test(ua))  browser = 'Opera'
  let os = ''
  if (/Windows/.test(ua))           os = 'Windows'
  else if (/Mac OS X/.test(ua))     os = 'macOS'
  else if (/iPhone|iPad/.test(ua))  os = 'iOS'
  else if (/Android/.test(ua))      os = 'Android'
  else if (/Linux/.test(ua))        os = 'Linux'
  return os ? `${browser} sur ${os}` : browser
}

function formatRelative(date: string | null): string {
  if (!date) return '—'
  const d    = new Date(date)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60)   return "à l'instant"
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)}h`
  return `il y a ${Math.floor(diff / 86400)}j`
}
</script>

<style scoped>
.profile-page { display: flex; flex-direction: column; gap: 24px; animation: fadeUp 0.35s ease both; }

.page-head { margin-bottom: -4px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: #6b7280; margin: 0; }

/* Stats strip */
.stats-strip {
  display: flex;
  align-items: center;
  gap: 0;
  background: linear-gradient(135deg, #1a1d24, #22262e);
  border-radius: 14px;
  padding: 20px 28px;
}
.strip-stat { text-align: center; flex: 1; }
.strip-val { display: block; font-size: 32px; font-weight: 800; color: #f3f4f6; line-height: 1; margin-bottom: 4px; }
.strip-lbl { font-size: 12px; color: #6b7280; }
.strip-divider { width: 1px; height: 40px; background: #2a2d35; margin: 0 24px; }

/* Two column layout */
.two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 900px) { .two-col { grid-template-columns: 1fr 1fr; } }

/* Card */
.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid #f3f4f6;
}
.card-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
}
.card-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.card-icon--blue  { background: #eff6ff; color: #2563eb; }
.card-icon--amber { background: #eff6ff; color: #003888; }
.card-title { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 2px; }
.card-sub   { font-size: 12px; color: #9ca3af; margin: 0; }

/* Fields */
.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 16px;
}
.fields--single { grid-template-columns: 1fr 1fr; }
@media (max-width: 640px) {
  .fields, .fields--single { grid-template-columns: 1fr; }
  .span-2 { grid-column: span 1; }
}
.field { display: flex; flex-direction: column; gap: 5px; }
.span-2 { grid-column: span 2; }
.field label { font-size: 12px; font-weight: 600; color: #374151; letter-spacing: 0.1px; }
.field input {
  height: 42px;
  border: 1.5px solid #e5e7eb;
  border-radius: 9px;
  padding: 0 14px;
  font-size: 13.5px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  background: #fafafa;
}
.field input:focus {
  border-color: #003888;
  box-shadow: 0 0 0 3px rgba(0,56,136,0.08);
  background: #fff;
}
.field input::placeholder { color: #c4c9d4; }

/* Alerts */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 9px;
  font-size: 13px;
  margin-bottom: 14px;
}
.alert--success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; }
.alert--error   { background: #e8eef8; border: 1px solid #99b5d8; color: #dc2626; }

/* Form footer */
.form-footer { display: flex; justify-content: flex-end; margin-top: 20px; }
.save-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px;
  background: #003888; color: #fff;
  border: none; border-radius: 9px;
  font-size: 14px; font-weight: 600;
  cursor: pointer; transition: background 0.15s, transform 0.15s;
}
.save-btn:hover:not(:disabled) { background: #002d6e; transform: translateY(-1px); }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.save-btn--outline {
  background: transparent;
  border: 1.5px solid #003888;
  color: #003888;
}
.save-btn--outline:hover:not(:disabled) { background: #e8eef8; transform: translateY(-1px); }

.btn-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Sessions */
.card--full { grid-column: 1 / -1; }
.revoke-all-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 8px;
  border: 1.5px solid #e5e7eb; background: #fff;
  font-size: 12px; font-weight: 600; color: #374151;
  cursor: pointer; transition: background 0.15s;
}
.revoke-all-btn:hover:not(:disabled) { background: #f9fafb; border-color: #d1d5db; }
.revoke-all-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.sessions-loading, .sessions-empty { font-size: 13px; color: #9ca3af; padding: 12px 0; }
.sessions-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0; }
.session-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 0; border-bottom: 1px solid #f3f4f6;
}
.session-item:last-child { border-bottom: none; }
.session-item--current { background: transparent; }
.session-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: #eff6ff; color: #003888;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.session-item--current .session-icon { background: #eff6ff; }
.session-info { flex: 1; min-width: 0; }
.session-device { font-size: 13.5px; font-weight: 600; color: #111827; display: flex; align-items: center; gap: 8px; }
.session-badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; background: #eff6ff; color: #003888; }
.session-meta { font-size: 12px; color: #6b7280; margin-top: 2px; }
.session-revoke {
  width: 28px; height: 28px; border-radius: 7px;
  border: 1px solid #e5e7eb; background: #fff;
  display: flex; align-items: center; justify-content: center;
  color: #9ca3af; cursor: pointer; flex-shrink: 0;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.session-revoke:hover { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
.btn-spinner--dark { border: 2px solid rgba(0,0,0,0.15); border-top-color: #374151; }
</style>
