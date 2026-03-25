<template>
  <div class="auth-page">
    <div class="auth-container">
      <NuxtLink to="/" class="auth-logo">meubletn</NuxtLink>

      <div class="auth-card">
        <h1 class="auth-title">Créer un compte</h1>
        <p class="auth-subtitle">Rejoignez la communauté meubletn</p>

        <!-- ── Role selector ── -->
        <div class="role-selector">
          <button
            class="role-btn"
            :class="{ 'role-btn--active': role === 'client' }"
            type="button"
            @click="role = 'client'"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Client</span>
            <small>Acheteur particulier</small>
          </button>
          <button
            class="role-btn"
            :class="{ 'role-btn--active': role === 'fournisseur' }"
            type="button"
            @click="role = 'fournisseur'"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
            <span>Fournisseur</span>
            <small>Professionnel / entreprise</small>
          </button>
        </div>

        <!-- ── Client form ── -->
        <form v-if="role === 'client'" class="auth-form" @submit.prevent="submitClient">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prénom *</label>
              <input v-model="clientForm.prenom" type="text" class="form-input" :class="{ 'form-input--error': errors.prenom }" placeholder="Prénom" required />
              <span v-if="errors.prenom" class="form-error">{{ errors.prenom }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Nom *</label>
              <input v-model="clientForm.nom" type="text" class="form-input" :class="{ 'form-input--error': errors.nom }" placeholder="Nom" required />
              <span v-if="errors.nom" class="form-error">{{ errors.nom }}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Adresse e-mail *</label>
            <input v-model="clientForm.email" type="email" class="form-input" :class="{ 'form-input--error': errors.email }" placeholder="votre@email.com" required autocomplete="email" />
            <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Téléphone <span class="opt">(optionnel)</span></label>
              <input v-model="clientForm.telephone" type="tel" class="form-input" placeholder="+216 XX XXX XXX" />
            </div>
            <div class="form-group">
              <label class="form-label">Ville <span class="opt">(optionnel)</span></label>
              <input v-model="clientForm.ville" type="text" class="form-input" placeholder="Tunis, Sfax…" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Mot de passe *</label>
            <input v-model="clientForm.password" type="password" class="form-input" :class="{ 'form-input--error': errors.password }" placeholder="Min. 8 caractères" required autocomplete="new-password" />
            <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
          </div>
          <div class="form-group">
            <label class="form-label">Confirmer le mot de passe *</label>
            <input v-model="clientForm.password_confirmation" type="password" class="form-input" placeholder="Répétez le mot de passe" required />
          </div>

          <!-- ── Interests ── -->
          <div class="interests-section">
            <p class="interests-label">Vos centres d'intérêt <span class="opt">(optionnel)</span></p>
            <p class="interests-hint">Sélectionnez les univers qui vous intéressent</p>
            <div class="interests-grid">
              <button
                v-for="cat in categories"
                :key="cat.slug"
                type="button"
                class="interest-chip"
                :class="{ 'interest-chip--active': clientForm.interests.includes(cat.slug) }"
                @click="toggleInterest(cat.slug)"
              >
                {{ cat.name }}
              </button>
            </div>
          </div>

          <div v-if="globalError" class="form-global-error">{{ globalError }}</div>

          <button type="submit" class="btn-submit" :disabled="loading">
            <svg v-if="loading" class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {{ loading ? 'Création en cours…' : 'Créer mon compte' }}
          </button>
        </form>

        <!-- ── Fournisseur form ── -->
        <form v-else class="auth-form" @submit.prevent="submitFournisseur">
          <div class="form-group">
            <label class="form-label">Nom de l'entreprise *</label>
            <input v-model="fournisseurForm.nom_entreprise" type="text" class="form-input" :class="{ 'form-input--error': errors.nom_entreprise }" placeholder="MaMaison SARL" required />
            <span v-if="errors.nom_entreprise" class="form-error">{{ errors.nom_entreprise }}</span>
          </div>

          <div class="form-group">
            <label class="form-label">Adresse e-mail professionnelle *</label>
            <input v-model="fournisseurForm.email" type="email" class="form-input" :class="{ 'form-input--error': errors.email }" placeholder="contact@entreprise.com" required autocomplete="email" />
            <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Téléphone <span class="opt">(optionnel)</span></label>
              <input v-model="fournisseurForm.telephone" type="tel" class="form-input" placeholder="+216 XX XXX XXX" />
            </div>
            <div class="form-group">
              <label class="form-label">Ville <span class="opt">(optionnel)</span></label>
              <input v-model="fournisseurForm.ville" type="text" class="form-input" placeholder="Tunis, Sfax…" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Adresse <span class="opt">(optionnel)</span></label>
            <input v-model="fournisseurForm.adresse" type="text" class="form-input" placeholder="Rue, N°…" />
          </div>

          <div class="form-group">
            <label class="form-label">Mot de passe *</label>
            <input v-model="fournisseurForm.password" type="password" class="form-input" :class="{ 'form-input--error': errors.password }" placeholder="Min. 8 caractères" required autocomplete="new-password" />
            <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
          </div>
          <div class="form-group">
            <label class="form-label">Confirmer le mot de passe *</label>
            <input v-model="fournisseurForm.password_confirmation" type="password" class="form-input" placeholder="Répétez le mot de passe" required />
          </div>

          <div v-if="globalError" class="form-global-error">{{ globalError }}</div>

          <button type="submit" class="btn-submit" :disabled="loading">
            <svg v-if="loading" class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {{ loading ? 'Création en cours…' : 'Créer mon compte professionnel' }}
          </button>
        </form>

        <div class="auth-divider"><span>ou</span></div>
        <p class="auth-link">
          Déjà un compte ?
          <NuxtLink :to="role === 'fournisseur' ? '/fournisseur/login' : '/auth/login'" class="auth-link-a">Se connecter</NuxtLink>
        </p>
      </div>

      <NuxtLink to="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        Retourner à la boutique
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Créer un compte | meubletn' })

const { register } = useAuth()
const { register: registerFournisseur } = useFournisseurAuth()
const { categories: navCats } = useCategories()

const categories = computed(() => navCats.value)

const role    = ref<'client' | 'fournisseur'>('client')
const loading = ref(false)
const errors  = reactive<Record<string, string>>({})
const globalError = ref('')

const clientForm = reactive({
  prenom: '', nom: '', email: '', telephone: '', ville: '',
  password: '', password_confirmation: '',
  interests: [] as string[],
})

const fournisseurForm = reactive({
  nom_entreprise: '', email: '', telephone: '', ville: '', adresse: '',
  password: '', password_confirmation: '',
})

function toggleInterest(slug: string) {
  const idx = clientForm.interests.indexOf(slug)
  if (idx === -1) clientForm.interests.push(slug)
  else clientForm.interests.splice(idx, 1)
}

function clearErrors() {
  Object.keys(errors).forEach(k => delete errors[k])
  globalError.value = ''
}

function handleApiError(e: any) {
  const data = e?.data
  if (data?.errors) {
    Object.entries(data.errors as Record<string, string[]>).forEach(([field, msgs]) => {
      errors[field] = msgs[0] ?? ''
    })
  } else {
    globalError.value = data?.message || 'Une erreur est survenue.'
  }
}

async function submitClient() {
  clearErrors()
  loading.value = true
  try {
    await register({
      prenom:                clientForm.prenom,
      nom:                   clientForm.nom,
      email:                 clientForm.email,
      telephone:             clientForm.telephone || undefined,
      ville:                 clientForm.ville || undefined,
      password:              clientForm.password,
      password_confirmation: clientForm.password_confirmation,
      interests:             clientForm.interests,
    })
    await navigateTo('/compte/commandes')
  } catch (e: any) {
    handleApiError(e)
  } finally {
    loading.value = false
  }
}

async function submitFournisseur() {
  clearErrors()
  loading.value = true
  try {
    await registerFournisseur({
      nom_entreprise:        fournisseurForm.nom_entreprise,
      email:                 fournisseurForm.email,
      telephone:             fournisseurForm.telephone || undefined,
      ville:                 fournisseurForm.ville || undefined,
      adresse:               fournisseurForm.adresse || undefined,
      password:              fournisseurForm.password,
      password_confirmation: fournisseurForm.password_confirmation,
    })
    await navigateTo('/fournisseur/dashboard')
  } catch (e: any) {
    handleApiError(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}
.auth-container {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.auth-logo { font-size: 32px; font-weight: bold; color: #E1004E; text-decoration: none; }
.auth-card {
  width: 100%;
  background: #fff;
  border: 1px solid #e2e4e4;
  border-radius: 10px;
  padding: 32px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
}
.auth-title { font-size: 24px; font-weight: bold; color: #2f3133; margin: 0 0 4px; text-align: center; }
.auth-subtitle { font-size: 14px; color: #717678; margin: 0 0 24px; text-align: center; }

/* Role selector */
.role-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 28px;
}
.role-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 12px;
  border: 2px solid #e2e4e4;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  color: #47494c;
}
.role-btn:hover { border-color: #E1004E33; background: #fff8f7; }
.role-btn--active { border-color: #E1004E; background: #fff5f3; color: #E1004E; }
.role-btn span { font-size: 15px; font-weight: 700; }
.role-btn small { font-size: 11px; color: #717678; font-weight: normal; }
.role-btn--active small { color: #E1004Eaa; }

/* Form */
.auth-form { display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-label { font-size: 14px; font-weight: bold; color: #2f3133; }
.opt { font-weight: normal; color: #717678; font-size: 12px; }
.form-input {
  width: 100%; height: 46px; padding: 0 14px;
  border: 1px solid #d9dadb; border-radius: 6px;
  font-size: 15px; color: #2f3133; outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.form-input:focus { border-color: #E1004E; box-shadow: 0 0 0 3px rgba(225,0,78,0.12); }
.form-input--error { border-color: #E1004E !important; }
.form-error { font-size: 12px; color: #E1004E; }

/* Interests */
.interests-section { display: flex; flex-direction: column; gap: 8px; }
.interests-label { font-size: 14px; font-weight: bold; color: #2f3133; margin: 0; }
.interests-hint { font-size: 12px; color: #717678; margin: 0; }
.interests-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.interest-chip {
  padding: 6px 14px;
  border: 1.5px solid #e2e4e4;
  border-radius: 20px;
  background: #fff;
  font-size: 13px;
  color: #47494c;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.interest-chip:hover { border-color: #E1004E55; color: #E1004E; }
.interest-chip--active { border-color: #E1004E; background: #fff0f6; color: #E1004E; font-weight: 600; }

.form-global-error {
  background: #fef2f0;
  border: 1px solid #f8c9c2;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #E1004E;
}

.btn-submit {
  width: 100%; height: 50px;
  background: #E1004E; color: #fff;
  border: none; border-radius: 6px;
  font-size: 16px; font-weight: bold;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: background 0.15s;
  margin-top: 4px;
}
.btn-submit:hover:not(:disabled) { background: #c5003f; }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
.spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.auth-divider { position: relative; text-align: center; margin: 20px 0 0; }
.auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; border-top: 1px solid #e2e4e4; }
.auth-divider span { position: relative; background: #fff; padding: 0 12px; font-size: 13px; color: #717678; }
.auth-link { text-align: center; font-size: 14px; color: #47494c; margin: 14px 0 0; }
.auth-link-a { color: #E1004E; font-weight: bold; text-decoration: none; }
.auth-link-a:hover { text-decoration: underline; }

.back-link { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #717678; text-decoration: none; }
.back-link:hover { color: #2f3133; }
</style>