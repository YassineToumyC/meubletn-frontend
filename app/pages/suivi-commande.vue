<template>
  <div class="track-page">
    <div class="wrap">
      <h1 class="page-title">Suivi de commande</h1>

      <div v-if="!searched" class="track-form-card">
        <p class="form-desc">Entrez votre numéro de commande et votre adresse e-mail pour suivre votre livraison.</p>
        <form @submit.prevent="doSearch" class="track-form">
          <div class="form-group">
            <label class="form-label">Numéro de commande</label>
            <input v-model="orderRef" type="text" class="form-input" placeholder="MTN-20250115-001" />
          </div>
          <div class="form-group">
            <label class="form-label">Adresse e-mail</label>
            <input v-model="email" type="email" class="form-input" placeholder="votre@email.com" />
          </div>
          <button type="submit" class="track-btn">Suivre ma commande</button>
        </form>
      </div>

      <div v-else class="track-result">
        <div class="result-header">
          <div>
            <h2 class="result-title">Commande #{{ orderRef }}</h2>
            <p class="result-sub">Livraison prévue le 15 mars 2025</p>
          </div>
          <span class="result-status status--shipping">En livraison</span>
        </div>

        <div class="track-steps">
          <div v-for="(step, i) in trackingSteps" :key="i" class="track-step" :class="{ 'step--done': step.done, 'step--active': step.active }">
            <div class="step-icon">
              <svg v-if="step.done" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              <div v-else class="step-dot"></div>
            </div>
            <div class="step-info">
              <p class="step-label">{{ step.label }}</p>
              <p class="step-date">{{ step.date }}</p>
            </div>
          </div>
        </div>

        <button class="back-btn" @click="searched = false">← Nouvelle recherche</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Suivi de commande | meubletn' })

const route = useRoute()
const orderRef = ref((route.query.ref as string) ?? '')
const email = ref('')
const searched = ref(!!route.query.ref)

function doSearch() {
  if (orderRef.value.trim()) searched.value = true
}

const trackingSteps = [
  { label: 'Commande confirmée', date: '1 mars 2025 — 10:23', done: true, active: false },
  { label: 'En cours de préparation', date: '2 mars 2025 — 14:05', done: true, active: false },
  { label: 'Expédié', date: '4 mars 2025 — 09:18', done: true, active: false },
  { label: 'En livraison', date: '5 mars 2025 — En cours', done: false, active: true },
  { label: 'Livré', date: 'Prévu le 15 mars 2025', done: false, active: false },
]
</script>

<style scoped>
.track-page { background: #eeeeef; min-height: 100vh; padding: 40px 0 64px; }
.wrap { max-width: 720px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
.page-title { font-size: 28px; font-weight: 700; color: #2f3133; margin-bottom: 28px; }
.track-form-card { background: #fff; border-radius: 10px; padding: 32px; }
.form-desc { font-size: 15px; color: #5b5e61; margin-bottom: 24px; }
.track-form { display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 13px; font-weight: 600; color: #2f3133; }
.form-input { border: 1px solid #d9dadb; border-radius: 6px; padding: 11px 14px; font-size: 14px; color: #2f3133; outline: none; transition: border-color 0.15s; }
.form-input:focus { border-color: #2f3133; }
.track-btn { background: #db3a1b; color: #fff; border: none; border-radius: 6px; padding: 13px 24px; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.track-btn:hover { background: #ab331a; }

.track-result { background: #fff; border-radius: 10px; padding: 32px; }
.result-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
.result-title { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0 0 4px; }
.result-sub { font-size: 14px; color: #5b5e61; margin: 0; }
.result-status { font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 20px; }
.status--shipping { background: #dbeafe; color: #1e40af; }

.track-steps { display: flex; flex-direction: column; gap: 0; margin-bottom: 24px; }
.track-step { display: flex; gap: 16px; padding-bottom: 24px; position: relative; }
.track-step:not(:last-child)::before { content: ''; position: absolute; left: 15px; top: 32px; bottom: 0; width: 2px; background: #eeeeef; }
.step--done.track-step::before, .step--active.track-step::before { background: #276749; }
.step-icon { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #d9dadb; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #fff; z-index: 1; }
.step--done .step-icon { background: #276749; border-color: #276749; color: #fff; }
.step--active .step-icon { border-color: #db3a1b; }
.step-dot { width: 8px; height: 8px; border-radius: 50%; background: #d9dadb; }
.step--active .step-dot { background: #db3a1b; }
.step-info { padding-top: 4px; }
.step-label { font-size: 14px; font-weight: 600; color: #2f3133; margin: 0 0 3px; }
.step--active .step-label { color: #db3a1b; }
.step-date { font-size: 12px; color: #717678; margin: 0; }
.back-btn { background: none; border: 1px solid #d9dadb; color: #47494c; border-radius: 6px; padding: 9px 16px; font-size: 13px; cursor: pointer; transition: background 0.15s; }
.back-btn:hover { background: #eeeeef; }
</style>
