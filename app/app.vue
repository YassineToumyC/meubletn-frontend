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

        <h1 class="cs-title">La première foire digitale du meuble en Tunisie arrive bientôt</h1>
        <p class="cs-sub">
          Nous préparons une plateforme qui permettra aux marques et fournisseurs d'exposer leurs produits, gagner en visibilité et générer de nouvelles opportunités commerciales.
        </p>

        <div class="cs-dots">
          <span class="cs-dot cs-dot--1" />
          <span class="cs-dot cs-dot--2" />
          <span class="cs-dot cs-dot--3" />
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

onMounted(() => {
  setTimeout(() => {
    showCard.value = true
    document.body.style.overflow = 'hidden'
  }, 200)
})
</script>

<style>
/* ── Site : flou immédiat dès le chargement ── */
.site-dimmed {
  filter: blur(10px) brightness(0.55);
  pointer-events: none;
  user-select: none;
}

/* ── Overlay (fond semi-transparent pour renforcer le contraste) ── */
.cs-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.15);
}

/* ── Card ── */
.cs-card {
  background: #fff;
  border-radius: 24px;
  padding: 24px 28px 20px;
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
  .cs-card { padding: 20px 16px 16px; }
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
