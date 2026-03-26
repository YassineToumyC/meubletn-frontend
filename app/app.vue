<template>
  <!-- Contenu du site — flou seulement quand l'overlay est actif -->
  <div :class="{ 'site-dimmed': showOverlay }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <!-- ── Coming Soon overlay ── -->
  <Transition name="cs">
    <div v-if="showOverlay" class="cs-overlay">
      <div class="cs-card">

        <img src="/images/logo/Foire du11_page-0001.jpg" class="cs-logo" alt="meubletn" />

        <span class="cs-badge">Bientôt disponible</span>

        <h1 class="cs-title">Nous préparons<br>quelque chose de grand</h1>
        <p class="cs-sub">
          Notre boutique de meubles et décoration en Tunisie sera bientôt en ligne.<br>
          Revenez nous voir très vite !
        </p>

        <div class="cs-dots">
          <span class="cs-dot cs-dot--1" />
          <span class="cs-dot cs-dot--2" />
          <span class="cs-dot cs-dot--3" />
        </div>

        <p class="cs-hint">En construction — merci pour votre patience</p>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const showOverlay = ref(false)

onMounted(() => {
  setTimeout(() => {
    showOverlay.value = true
  }, 1000)
})
</script>

<style>
/* ── Site wrapper : flou + assombrissement quand overlay actif ── */
.site-dimmed {
  filter: blur(10px) brightness(0.55);
  transition: filter 0.6s ease;
  pointer-events: none;
  user-select: none;
}

/* ── Overlay (fond transparent, juste pour centrer la card) ── */
.cs-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* ── Card ── */
.cs-card {
  background: #fff;
  border-radius: 24px;
  padding: 52px 48px 44px;
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
  .cs-card { padding: 40px 24px 36px; }
}

.cs-logo {
  height: 56px;
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
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
  margin: 0;
}
@media (max-width: 520px) { .cs-title { font-size: 22px; } }

.cs-sub {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.65;
  margin: 0;
  max-width: 400px;
}

/* ── Animated dots ── */
.cs-dots {
  display: flex;
  gap: 10px;
  margin: 4px 0;
}
.cs-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #E1004E;
  animation: csBounce 1.2s ease-in-out infinite;
}
.cs-dot--1 { animation-delay: 0s; }
.cs-dot--2 { animation-delay: 0.2s; }
.cs-dot--3 { animation-delay: 0.4s; }
@keyframes csBounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
  40%            { transform: scale(1.2); opacity: 1; }
}

.cs-hint {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

/* ── Transition card (fade + légère montée) ── */
.cs-enter-active {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.cs-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}
</style>
