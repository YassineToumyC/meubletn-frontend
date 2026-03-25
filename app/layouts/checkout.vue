<template>
  <div class="checkout-wrapper">
    <!-- Simplified checkout header -->
    <header class="checkout-header">
      <div class="checkout-header-inner">
        <NuxtLink to="/" class="checkout-logo">meubletn</NuxtLink>
        <div class="checkout-steps">
          <span
            v-for="(step, i) in steps"
            :key="step.key"
            class="step"
            :class="{
              'step--active': currentStep === step.key,
              'step--done': stepIndex > i,
            }"
          >
            <span class="step-num">{{ i + 1 }}</span>
            <span class="step-label">{{ step.label }}</span>
            <svg v-if="i < steps.length - 1" class="step-sep" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
        <div class="checkout-secure">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Paiement sécurisé
        </div>
      </div>
    </header>

    <main class="checkout-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const steps = [
  { key: 'cart', label: 'Panier' },
  { key: 'delivery', label: 'Livraison' },
  { key: 'payment', label: 'Paiement' },
]

const stepIndex = computed(() => {
  if (route.path.includes('payment')) return 2
  if (route.path.includes('delivery')) return 1
  return 0
})
const currentStep = computed(() => steps[stepIndex.value]?.key ?? 'cart')
</script>

<style>
.checkout-wrapper {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.checkout-header {
  background-color: #ffffff;
  box-shadow: inset 0 -1px 0 #e2e4e4;
  position: sticky;
  top: 0;
  z-index: 100;
}
.checkout-header-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
@media (min-width: 632px) { .checkout-header-inner { padding: 0 24px; } }
@media (min-width: 984px) { .checkout-header-inner { padding: 0 48px; } }
@media (min-width: 1392px) { .checkout-header-inner { padding: 0 64px; } }

.checkout-logo {
  font-size: 22px;
  font-weight: bold;
  color: #E1004E;
  text-decoration: none;
  flex-shrink: 0;
}
@media (min-width: 632px) { .checkout-logo { font-size: 26px; } }

.checkout-steps {
  display: none;
  align-items: center;
  gap: 4px;
}
@media (min-width: 632px) { .checkout-steps { display: flex; } }

.step {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #a0a4a8;
}
.step--active { color: #2f3133; }
.step--active .step-num { background-color: #E1004E; color: #ffffff; }
.step--done { color: #717678; }
.step--done .step-num { background-color: #2f3133; color: #ffffff; }
.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #d9dadb;
  color: #717678;
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.step-label { font-weight: 500; white-space: nowrap; }
.step-sep { color: #d9dadb; flex-shrink: 0; }

.checkout-secure {
  display: none;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #717678;
  flex-shrink: 0;
}
@media (min-width: 984px) { .checkout-secure { display: flex; } }

/* ── Main ── */
.checkout-main {
  flex: 1;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px 48px;
}
@media (min-width: 632px) { .checkout-main { padding: 32px 24px 48px; } }
@media (min-width: 984px) { .checkout-main { padding: 32px 48px 48px; } }
@media (min-width: 1392px) { .checkout-main { padding: 32px 64px 48px; } }
</style>
