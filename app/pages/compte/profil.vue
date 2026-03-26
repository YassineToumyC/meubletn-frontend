<template>
  <div class="account-page">
    <div class="wrap">
      <div class="account-layout">

        <!-- Sidebar nav -->
        <aside class="account-nav">
          <div class="account-user">
            <div class="user-avatar">{{ userInitials }}</div>
            <div>
              <div class="user-name">{{ user?.prenom }} {{ user?.nom }}</div>
              <div class="user-email">{{ user?.email }}</div>
            </div>
          </div>
          <nav class="nav-links">
            <NuxtLink to="/compte/commandes" class="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Mes commandes
            </NuxtLink>
            <NuxtLink to="/wishlist" class="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Mes favoris
            </NuxtLink>
            <NuxtLink to="/compte/profil" class="nav-link nav-link--active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Mon profil
            </NuxtLink>
            <a href="#" class="nav-link nav-link--logout" @click.prevent="logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Déconnexion
            </a>
          </nav>
        </aside>

        <!-- Main content -->
        <main class="account-main">
          <h1 class="page-title">Mon profil</h1>

          <!-- Global feedback -->
          <div v-if="globalSuccess" class="alert alert--success">{{ globalSuccess }}</div>
          <div v-if="globalError"   class="alert alert--error">{{ globalError }}</div>

          <!-- ── Informations personnelles ── -->
          <section class="profile-card">
            <h2 class="card-title">Informations personnelles</h2>
            <form @submit.prevent="saveInfo" class="profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Prénom</label>
                  <input v-model="info.prenom" type="text" class="form-input" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Nom</label>
                  <input v-model="info.nom" type="text" class="form-input" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Adresse e-mail</label>
                <input v-model="info.email" type="email" class="form-input" required />
              </div>
              <div class="form-group">
                <label class="form-label">Téléphone</label>
                <input v-model="info.telephone" type="tel" class="form-input" placeholder="+216 XX XXX XXX" />
              </div>
              <div class="form-footer">
                <button type="submit" class="btn-save" :disabled="infoLoading">
                  {{ infoLoading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </section>

          <!-- ── Adresse ── -->
          <section class="profile-card">
            <h2 class="card-title">Adresse de livraison</h2>
            <form @submit.prevent="saveAddress" class="profile-form">
              <div class="form-group">
                <label class="form-label">Adresse</label>
                <input v-model="addr.adresse" type="text" class="form-input" placeholder="Rue, numéro, appartement…" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Ville</label>
                  <input v-model="addr.ville" type="text" class="form-input" placeholder="Tunis, Sfax…" />
                </div>
                <div class="form-group">
                  <label class="form-label">Code postal</label>
                  <input v-model="addr.code_postal" type="text" class="form-input" placeholder="1000" />
                </div>
              </div>
              <div class="form-footer">
                <button type="submit" class="btn-save" :disabled="addrLoading">
                  {{ addrLoading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </section>

          <!-- ── Centres d'intérêt ── -->
          <section class="profile-card">
            <h2 class="card-title">Centres d'intérêt</h2>
            <p class="card-sub">Sélectionnez vos catégories préférées pour personnaliser vos recommandations.</p>
            <div class="interests-grid">
              <button
                v-for="item in ALL_INTERESTS"
                :key="item.value"
                type="button"
                class="interest-tag"
                :class="{ 'interest-tag--active': selectedInterests.includes(item.value) }"
                @click="toggleInterest(item.value)"
              >
                <span class="interest-icon">{{ item.icon }}</span>
                {{ item.label }}
              </button>
            </div>
            <div class="form-footer">
              <button class="btn-save" :disabled="interestsLoading" @click="saveInterests">
                {{ interestsLoading ? 'Enregistrement...' : 'Enregistrer' }}
              </button>
            </div>
          </section>

          <!-- ── Sécurité ── -->
          <section class="profile-card">
            <h2 class="card-title">Sécurité</h2>
            <form @submit.prevent="savePassword" class="profile-form">
              <div class="form-group">
                <label class="form-label">Mot de passe actuel</label>
                <input v-model="pwd.current" type="password" class="form-input" required autocomplete="current-password" />
              </div>
              <div class="form-group">
                <label class="form-label">Nouveau mot de passe</label>
                <input v-model="pwd.next" type="password" class="form-input" required autocomplete="new-password" minlength="8" />
              </div>
              <div class="form-group">
                <label class="form-label">Confirmer le nouveau mot de passe</label>
                <input v-model="pwd.confirm" type="password" class="form-input" required autocomplete="new-password" />
                <p v-if="pwd.next && pwd.confirm && pwd.next !== pwd.confirm" class="field-error">
                  Les mots de passe ne correspondent pas.
                </p>
              </div>
              <div class="form-footer">
                <button type="submit" class="btn-save" :disabled="pwdLoading || (!!pwd.next && !!pwd.confirm && pwd.next !== pwd.confirm)">
                  {{ pwdLoading ? 'Modification...' : 'Modifier le mot de passe' }}
                </button>
              </div>
            </form>
          </section>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Mon profil | meubletn' })

const { user, updateProfile, changePassword, logout: authLogout } = useAuth()

const userInitials = computed(() => {
  if (!user.value) return '?'
  return `${user.value.prenom[0] ?? ''}${user.value.nom[0] ?? ''}`.toUpperCase()
})

async function logout() {
  await authLogout()
  await navigateTo('/auth/login')
}

// ── Feedback global ──
const globalSuccess = ref('')
const globalError   = ref('')
function showSuccess(msg: string) {
  globalSuccess.value = msg
  globalError.value   = ''
  setTimeout(() => { globalSuccess.value = '' }, 3500)
}
function showError(msg: string) {
  globalError.value   = msg
  globalSuccess.value = ''
  setTimeout(() => { globalError.value = '' }, 4000)
}

// ── Informations personnelles ──
const info = reactive({
  prenom:    user.value?.prenom    ?? '',
  nom:       user.value?.nom       ?? '',
  email:     user.value?.email     ?? '',
  telephone: user.value?.telephone ?? '',
})
watch(user, (u) => {
  if (!u) return
  info.prenom    = u.prenom    ?? ''
  info.nom       = u.nom       ?? ''
  info.email     = u.email     ?? ''
  info.telephone = u.telephone ?? ''
})
const infoLoading = ref(false)
async function saveInfo() {
  infoLoading.value = true
  try {
    await updateProfile({ prenom: info.prenom, nom: info.nom, email: info.email, telephone: info.telephone })
    showSuccess('Informations mises à jour.')
  } catch (e: any) {
    showError(e?.data?.message ?? 'Une erreur est survenue.')
  } finally {
    infoLoading.value = false
  }
}

// ── Adresse ──
const addr = reactive({
  adresse:     user.value?.adresse     ?? '',
  ville:       user.value?.ville       ?? '',
  code_postal: user.value?.code_postal ?? '',
})
watch(user, (u) => {
  if (!u) return
  addr.adresse     = u.adresse     ?? ''
  addr.ville       = u.ville       ?? ''
  addr.code_postal = u.code_postal ?? ''
})
const addrLoading = ref(false)
async function saveAddress() {
  addrLoading.value = true
  try {
    await updateProfile({ adresse: addr.adresse, ville: addr.ville, code_postal: addr.code_postal })
    showSuccess('Adresse mise à jour.')
  } catch (e: any) {
    showError(e?.data?.message ?? 'Une erreur est survenue.')
  } finally {
    addrLoading.value = false
  }
}

// ── Centres d'intérêt ──
const ALL_INTERESTS = [
  { value: 'salon',         label: 'Salon',          icon: '🛋️' },
  { value: 'chambre',       label: 'Chambre',         icon: '🛏️' },
  { value: 'salle_manger',  label: 'Salle à manger',  icon: '🍽️' },
  { value: 'cuisine',       label: 'Cuisine',          icon: '🍳' },
  { value: 'bureau',        label: 'Bureau',           icon: '💼' },
  { value: 'jardin',        label: 'Jardin',           icon: '🌿' },
  { value: 'luminaires',    label: 'Luminaires',       icon: '💡' },
  { value: 'decoration',    label: 'Décoration',       icon: '🪴' },
  { value: 'rangement',     label: 'Rangement',        icon: '📦' },
  { value: 'textiles',      label: 'Textiles',         icon: '🧵' },
  { value: 'enfants',       label: 'Chambre enfants',  icon: '🧸' },
  { value: 'salle_de_bain', label: 'Salle de bain',    icon: '🚿' },
]
const selectedInterests = ref<string[]>([...(user.value?.interests ?? [])])
watch(user, (u) => { if (u) selectedInterests.value = [...(u.interests ?? [])] })
function toggleInterest(value: string) {
  const idx = selectedInterests.value.indexOf(value)
  if (idx === -1) selectedInterests.value.push(value)
  else selectedInterests.value.splice(idx, 1)
}
const interestsLoading = ref(false)
async function saveInterests() {
  interestsLoading.value = true
  try {
    await updateProfile({ interests: selectedInterests.value })
    showSuccess('Centres d\'intérêt mis à jour.')
  } catch (e: any) {
    showError(e?.data?.message ?? 'Une erreur est survenue.')
  } finally {
    interestsLoading.value = false
  }
}

// ── Sécurité ──
const pwd = reactive({ current: '', next: '', confirm: '' })
const pwdLoading = ref(false)
async function savePassword() {
  if (pwd.next !== pwd.confirm) return
  pwdLoading.value = true
  try {
    await changePassword(pwd.current, pwd.next, pwd.confirm)
    pwd.current = pwd.next = pwd.confirm = ''
    showSuccess('Mot de passe modifié.')
  } catch (e: any) {
    showError(e?.data?.message ?? 'Mot de passe actuel incorrect.')
  } finally {
    pwdLoading.value = false
  }
}
</script>

<style scoped>
.account-page { background: #f7f7f8; min-height: 100vh; padding: 32px 0 64px; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }

.account-layout { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 984px) { .account-layout { grid-template-columns: 260px 1fr; align-items: start; } }

/* ── Sidebar ── */
.account-nav { background: #fff; border-radius: 10px; padding: 24px; align-self: start; }
.account-user { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eeeeef; }
.user-avatar { width: 44px; height: 44px; border-radius: 50%; background: #E1004E; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; flex-shrink: 0; }
.user-name { font-size: 14px; font-weight: 600; color: #2f3133; }
.user-email { font-size: 12px; color: #717678; }
.nav-links { display: flex; flex-direction: column; gap: 2px; }
.nav-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; font-size: 14px; color: #47494c; text-decoration: none; border-radius: 6px; transition: background 0.15s; }
.nav-link:hover { background: #eeeeef; }
.nav-link--active { background: #fff0ed; color: #E1004E; font-weight: 600; }
.nav-link--logout { color: #717678; margin-top: 12px; }

/* ── Main ── */
.account-main { display: flex; flex-direction: column; gap: 20px; }
.page-title { font-size: 24px; font-weight: 700; color: #2f3133; margin-bottom: 4px; }

/* ── Alerts ── */
.alert { padding: 12px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; }
.alert--success { background: #d1fae5; color: #065f46; }
.alert--error   { background: #fee2e2; color: #b91c1c; }

/* ── Cards ── */
.profile-card { background: #fff; border-radius: 12px; padding: 28px; }
.card-title { font-size: 16px; font-weight: 700; color: #2f3133; margin: 0 0 4px; }
.card-sub { font-size: 13px; color: #717678; margin: 0 0 20px; }

/* ── Form ── */
.profile-form { margin-top: 20px; display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 520px) { .form-row { grid-template-columns: 1fr; } }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 13px; font-weight: 600; color: #47494c; }
.form-input {
  height: 42px;
  border: 1px solid #d9dadb;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: #2f3133;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}
.form-input:focus { border-color: #E1004E; }
.form-footer { display: flex; justify-content: flex-end; padding-top: 4px; }
.btn-save {
  background: #E1004E;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-save:hover:not(:disabled) { background: #c5003f; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
.field-error { font-size: 12px; color: #b91c1c; margin: 0; }

/* ── Interests ── */
.interests-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
.interest-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 24px;
  border: 1.5px solid #d9dadb;
  background: #fff;
  font-size: 13px;
  font-weight: 500;
  color: #47494c;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.interest-tag:hover { border-color: #E1004E; color: #E1004E; }
.interest-tag--active { border-color: #E1004E; background: #fff0ed; color: #E1004E; font-weight: 700; }
.interest-icon { font-size: 16px; line-height: 1; }
</style>
