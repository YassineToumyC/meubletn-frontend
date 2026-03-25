<template>
  <div class="auth-page">
    <div class="auth-container">
      <NuxtLink to="/" class="auth-logo">meubletn</NuxtLink>

      <div class="auth-card">
        <h1 class="auth-title">Connexion</h1>

        <!-- Role tabs -->
        <div class="role-tabs">
          <button
            class="role-tab"
            :class="{ 'role-tab--active': activeRole === 'client' }"
            @click="activeRole = 'client'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Client
          </button>
          <button
            class="role-tab"
            :class="{ 'role-tab--active': activeRole === 'pro' }"
            @click="activeRole = 'pro'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
            Fournisseur / Agent
          </button>
        </div>

        <!-- Client info box -->
        <div v-if="activeRole === 'client'" class="info-box info-box--blue">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Connectez-vous pour suivre vos commandes et accéder à votre espace personnel.
        </div>

        <!-- Pro info box -->
        <div v-else class="info-box info-box--orange">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Fournisseurs et agents : utilisez vos identifiants professionnels pour accéder à votre tableau de bord.
        </div>

        <form class="auth-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">Adresse e-mail</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="votre@email.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <div class="password-wrap">
              <input
                v-model="form.password"
                :type="showPwd ? 'text' : 'password'"
                class="form-input"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button type="button" class="pwd-toggle" @click="showPwd = !showPwd">
                <svg v-if="!showPwd" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <div class="form-group form-group--remember">
            <label class="remember-label">
              <input v-model="form.remember" type="checkbox" class="remember-checkbox" />
              <span>Se souvenir de moi</span>
            </label>
          </div>

          <div v-if="loginError" class="login-error">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ loginError }}
          </div>

          <button type="submit" class="btn-submit" :class="activeRole === 'pro' ? 'btn-submit--pro' : ''" :disabled="loading">
            <svg v-if="loading" class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <span>{{ loading ? 'Connexion…' : 'Se connecter' }}</span>
          </button>
        </form>

        <!-- Agent hint -->
        <div v-if="activeRole === 'pro'" class="agent-hint">
          <div class="agent-hint-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <span>Agent ? Votre fournisseur vous a fourni vos identifiants de connexion.</span>
          </div>
        </div>

        <p v-if="activeRole === 'client'" class="auth-register">
          Pas encore de compte ?
          <NuxtLink to="/auth/register" class="link">Créer un compte</NuxtLink>
        </p>
        <p v-else class="auth-register">
          Nouveau fournisseur ?
          <NuxtLink to="/fournisseur/register" class="link">Créer un espace pro</NuxtLink>
        </p>
      </div>

      <NuxtLink to="/" class="back-link">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        Retour à la boutique
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Connexion | meubletn' })

const config = useRuntimeConfig()
const route  = useRoute()

const { token: clientToken, user: clientUser } = useAuth()
const { token: fToken,      user: fUser }      = useFournisseurAuth()
const { isLoggedIn: clientLoggedIn }           = useAuth()
const { isLoggedIn: fLoggedIn }                = useFournisseurAuth()

if (clientLoggedIn.value) await navigateTo('/compte/commandes')
if (fLoggedIn.value)      await navigateTo('/fournisseur/dashboard')

const form       = reactive({ email: '', password: '', remember: false })
const loginError = ref('')
const loading    = ref(false)
const showPwd    = ref(false)
const activeRole = ref<'client' | 'pro'>('client')

async function handleLogin() {
  loginError.value = ''
  loading.value    = true

  try {
    const data = await $fetch<{
      type:  'client' | 'fournisseur' | 'agent'
      token: string
      user:  any
    }>(`${config.public.apiBase}/login`, {
      method:  'POST',
      body:    { email: form.email, password: form.password, remember: form.remember },
      headers: { Accept: 'application/json' },
    })

    if (data.type === 'client') {
      clientToken.value = data.token
      clientUser.value  = data.user
      const redirect = route.query.redirect as string | undefined
      await navigateTo(redirect || '/compte/commandes')
    } else {
      fToken.value = data.token
      fUser.value  = data.user
      await navigateTo('/fournisseur/dashboard')
    }
  } catch (err: any) {
    const msg = err?.data?.errors?.email?.[0] || err?.data?.message
    loginError.value = msg || 'Email ou mot de passe incorrect.'
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
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.auth-logo {
  font-size: 32px;
  font-weight: 800;
  color: #E1004E;
  text-decoration: none;
  letter-spacing: -0.5px;
}
.auth-card {
  width: 100%;
  background: #fff;
  border: 1px solid #e2e4e4;
  border-radius: 8px;
  padding: 28px 32px 32px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
}
.auth-title { font-size: 22px; font-weight: 700; color: #2f3133; margin: 0 0 16px; text-align: center; }

/* Role tabs */
.role-tabs {
  display: flex;
  gap: 0;
  border: 1.5px solid #e2e4e4;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}
.role-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px 12px;
  background: #fff;
  border: none;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.role-tab:not(:last-child) { border-right: 1.5px solid #e2e4e4; }
.role-tab:hover { background: #f9fafb; color: #374151; }
.role-tab--active { background: #E1004E; color: #fff; }
.role-tab--active svg { stroke: #fff; }

/* Info box */
.info-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 18px;
}
.info-box svg { flex-shrink: 0; margin-top: 1px; }
.info-box--blue { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
.info-box--blue svg { stroke: #1e40af; }
.info-box--orange { background: #fff0f6; color: #c5003f; border: 1px solid #fecdd3; }
.info-box--orange svg { stroke: #c5003f; }

/* Form */
.auth-form { display: flex; flex-direction: column; gap: 18px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group--remember { flex-direction: row; align-items: center; margin-top: -4px; }
.remember-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #47494c; cursor: pointer; user-select: none; }
.remember-checkbox { width: 15px; height: 15px; accent-color: #E1004E; cursor: pointer; flex-shrink: 0; }
.form-label { font-size: 14px; font-weight: 600; color: #2f3133; }
.form-input {
  width: 100%; height: 46px; padding: 0 14px;
  border: 1.5px solid #d9dadb; border-radius: 6px;
  font-size: 15px; color: #2f3133; background: #fff; outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.form-input:focus { border-color: #E1004E; }

.password-wrap { position: relative; }
.password-wrap .form-input { padding-right: 46px; }
.pwd-toggle {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #9ca3af; cursor: pointer; display: flex; align-items: center; padding: 4px;
}
.pwd-toggle:hover { color: #374151; }

.login-error {
  display: flex; align-items: center; gap: 8px;
  background: #fef2f0; border: 1px solid #f8c9c2;
  border-radius: 6px; padding: 10px 14px;
  font-size: 13px; color: #E1004E;
}

.btn-submit {
  width: 100%; height: 48px;
  background: #E1004E; color: #fff;
  border: none; border-radius: 6px;
  font-size: 15px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: background 0.15s;
  margin-top: 4px;
}
.btn-submit:hover:not(:disabled) { background: #c5003f; }
.btn-submit--pro { background: #1d4ed8; }
.btn-submit--pro:hover:not(:disabled) { background: #1e3a8a; }
.btn-submit:disabled { opacity: 0.65; cursor: not-allowed; }

.spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Agent hint */
.agent-hint {
  margin-top: 14px;
  padding: 10px 14px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px dashed #d1d5db;
}
.agent-hint-row {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
}
.agent-hint-row svg { flex-shrink: 0; margin-top: 2px; }

.auth-register { text-align: center; font-size: 13px; color: #6b7280; margin: 16px 0 0; }
.link { color: #E1004E; font-weight: 600; text-decoration: none; }
.link:hover { text-decoration: underline; }

.back-link { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #9ca3af; text-decoration: none; }
.back-link:hover { color: #374151; }
</style>
