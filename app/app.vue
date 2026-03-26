<template>
  <!-- Site toujours flou en arrière-plan -->
  <div class="site-dimmed">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <!-- ── Coming Soon card — apparaît après 0.3s ── -->
  <Transition name="cs">
    <div v-if="showCard" class="cs-overlay">
      <div class="cs-card">

        <img src="/images/logo/Foire du11_page-0001.jpg" class="cs-logo" alt="meubletn" />

        <span class="cs-badge">Bientôt disponible</span>

        <h1 class="cs-title">La première foire digitale<br>du meuble en Tunisie</h1>
        <p class="cs-sub">
          Une plateforme pour exposer, gagner en visibilité<br>et générer de nouvelles opportunités commerciales.
        </p>

        <!-- Countdown -->
        <div class="cs-countdown">
          <span class="cs-days-num">{{ daysLeft }}</span>
          <span class="cs-days-label">jours restants</span>
        </div>

        <NuxtLink to="/deposer" class="cs-deposit-btn">
          En savoir plus
        </NuxtLink>

        <p class="cs-hint">Une nouvelle façon de participer à une foire… sans limites.</p>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const showCard = ref(false)

const LAUNCH_DATE = new Date('2026-05-01T00:00:00')

const daysLeft = computed(() => {
  const now = new Date()
  const diff = LAUNCH_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
})

onMounted(() => {
  setTimeout(() => {
    showCard.value = true
    document.body.style.overflow = 'hidden'
  }, 200)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');

/* ── Site : flou réduit ── */
.site-dimmed {
  filter: blur(2px) brightness(0.55);
  pointer-events: none;
  user-select: none;
}

/* ── Overlay ── */
.cs-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.035);
}

/* ── Card ── */
.cs-card {
  background: #fff;
  border-radius: 24px;
  padding: 34px 28px 30px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
@media (max-width: 520px) {
  .cs-card { padding: 30px 16px 26px; }
}

.cs-logo {
  height: 90px;
  width: auto;
  margin-bottom: 4px;
}

.cs-badge {
  display: inline-block;
  background: #fff0f6;
  color: #E1004E;
  border: 1px solid #fecdd3;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
}

.cs-title {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
  margin: 0;
}
@media (max-width: 520px) { .cs-title { font-size: 17px; } }

.cs-sub {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.65;
  margin: 0;
  max-width: 400px;
}

/* ── Countdown ── */
.cs-countdown {
  margin: 4px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.cs-days-num {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: #E1004E;
  letter-spacing: 0;
  line-height: 1;
}
.cs-days-label {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 9px;
  font-weight: 400;
  color: #9ca3af;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.cs-deposit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #E1004E;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 28px;
  text-decoration: none;
  transition: background-color 0.15s, transform 0.15s;
  margin-top: 4px;
}
.cs-deposit-btn:hover {
  background: #c5003f;
  transform: translateY(-2px);
}

.cs-hint {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

/* ── Transition card (montée douce) ── */
.cs-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.cs-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>
