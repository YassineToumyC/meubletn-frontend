<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <NuxtLink to="/" class="logo">meubletn</NuxtLink>
        <h1 class="auth-title">Créer un compte fournisseur</h1>
        <p class="auth-sub">Commencez à publier vos annonces dès aujourd'hui</p>
      </div>

      <form class="auth-form" @submit.prevent="submit">
        <div class="field">
          <label>Nom de l'entreprise *</label>
          <input v-model="form.nom_entreprise" type="text" placeholder="MaMaison SARL" required />
        </div>
        <div class="field">
          <label>Email professionnel *</label>
          <input v-model="form.email" type="email" placeholder="contact@entreprise.com" required autocomplete="email" />
        </div>
        <div class="row">
          <div class="field">
            <label>Téléphone</label>
            <input v-model="form.telephone" type="tel" placeholder="+216 XX XXX XXX" />
          </div>
          <div class="field">
            <label>Ville</label>
            <input v-model="form.ville" type="text" placeholder="Tunis" />
          </div>
        </div>
        <div class="field">
          <label>Mot de passe *</label>
          <input v-model="form.password" type="password" placeholder="Min. 8 caractères" required autocomplete="new-password" />
        </div>
        <div class="field">
          <label>Confirmer le mot de passe *</label>
          <input v-model="form.password_confirmation" type="password" placeholder="••••••••" required />
        </div>

        <div v-if="errors.length" class="error-box">
          <div v-for="err in errors" :key="err">{{ err }}</div>
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          <span v-if="loading" class="spinner" />
          <span v-else>Créer mon compte</span>
        </button>
      </form>

      <div class="auth-footer">
        Déjà un compte ?
        <NuxtLink to="/fournisseur/login">Se connecter</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { register, isLoggedIn } = useFournisseurAuth()

if (isLoggedIn.value) {
  await navigateTo('/fournisseur/dashboard')
}

const form = reactive({
  nom_entreprise: '',
  email: '',
  password: '',
  password_confirmation: '',
  telephone: '',
  ville: '',
})

const errors  = ref<string[]>([])
const loading = ref(false)

async function submit() {
  errors.value  = []
  loading.value = true
  try {
    await register(form)
    await navigateTo('/fournisseur/dashboard')
  } catch (e: any) {
    const data = e?.data
    if (data?.errors) {
      errors.value = Object.values(data.errors).flat() as string[]
    } else {
      errors.value = [data?.message || 'Erreur lors de l\'inscription.']
    }
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
.auth-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 40px 36px;
  width: 100%;
  max-width: 500px;
}
.auth-header { text-align: center; margin-bottom: 32px; }
.logo {
  font-size: 28px;
  font-weight: 800;
  color: #db3a1b;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 12px;
}
.auth-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 6px; }
.auth-sub { font-size: 14px; color: #6b7280; margin: 0; }

.auth-form { display: flex; flex-direction: column; gap: 14px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
.field input {
  height: 44px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s;
}
.field input:focus { border-color: #db3a1b; }

.error-box {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.submit-btn {
  height: 46px;
  background: #db3a1b;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
}
.submit-btn:hover:not(:disabled) { background: #ab331a; }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.auth-footer {
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  margin-top: 24px;
}
.auth-footer a { color: #db3a1b; font-weight: 600; text-decoration: none; }
</style>
