<template>
  <div class="static-page">
    <div class="hero hero--blue">
      <div class="wrap">
        <h1 class="hero-title">Partenaires & Marques</h1>
        <p class="hero-sub">Ensemble, nous construisons la meilleure expérience meuble de Tunisie</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="brands-section">
        <h2>Nos marques partenaires</h2>
        <div class="brands-grid">
          <div v-for="brand in brands" :key="brand.name" class="brand-card">
            <img :src="`https://picsum.photos/seed/brand${brand.id}/200/100`" :alt="brand.name" class="brand-logo" />
            <span class="brand-name">{{ brand.name }}</span>
          </div>
        </div>
      </div>

      <div class="become-partner">
        <div class="partner-text">
          <h2>Devenez partenaire</h2>
          <p>Vous êtes fabricant ou distributeur de meubles et souhaitez rejoindre notre marketplace ? Nous sélectionnons chaque année de nouveaux partenaires partageant nos valeurs de qualité et de service.</p>
          <ul class="partner-benefits">
            <li>Accès à plus de 150 000 clients actifs</li>
            <li>Accompagnement commercial et marketing</li>
            <li>Tableau de bord vendeur dédié</li>
            <li>Paiement sécurisé sous 30 jours</li>
          </ul>
          <NuxtLink to="/contact" class="cta-btn">Nous contacter</NuxtLink>
        </div>
        <img src="https://picsum.photos/seed/partner-join/500/350" alt="Partenaires" class="partner-img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Partenaires | meubletn' })
const brands = [
  { id: 1, name: 'Comfort Home' }, { id: 2, name: 'Scandinavian' }, { id: 3, name: 'ModernLiv' },
  { id: 4, name: 'SleepWell' }, { id: 5, name: 'DesignHouse' }, { id: 6, name: 'OfficeStyle' },
  { id: 7, name: 'Lumina' }, { id: 8, name: 'AsiaHome' },
]
</script>

<style scoped>
.static-page { background: #eeeeef; min-height: 100vh; }
.hero { padding: 48px 0; }
.hero--blue { background: linear-gradient(135deg, #1a56a0 0%, #0a2d60 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.hero-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.hero-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding: 36px 0 64px; }
.brands-section { background: #fff; border-radius: 10px; padding: 32px; margin-bottom: 28px; }
.brands-section h2 { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0 0 24px; }
.brands-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
@media (min-width: 632px) { .brands-grid { grid-template-columns: repeat(4, 1fr); } }
.brand-card { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #eeeeef; border-radius: 8px; }
.brand-logo { width: 100%; height: 60px; object-fit: cover; border-radius: 4px; }
.brand-name { font-size: 13px; font-weight: 600; color: #2f3133; }
.become-partner { background: #fff; border-radius: 10px; padding: 32px; display: grid; grid-template-columns: 1fr; gap: 28px; }
@media (min-width: 984px) { .become-partner { grid-template-columns: 1fr 400px; align-items: center; } }
.become-partner h2 { font-size: 22px; font-weight: 700; color: #2f3133; margin: 0 0 14px; }
.become-partner p { font-size: 15px; color: #5b5e61; line-height: 1.7; margin-bottom: 16px; }
.partner-benefits { list-style: none; padding: 0; margin: 0 0 20px; }
.partner-benefits li { font-size: 14px; color: #5b5e61; padding: 6px 0; border-bottom: 1px solid #eeeeef; }
.partner-benefits li::before { content: '✓ '; color: #276749; font-weight: 700; }
.cta-btn { display: inline-flex; align-items: center; background: #db3a1b; color: #fff; text-decoration: none; border-radius: 6px; padding: 12px 24px; font-size: 14px; font-weight: 600; }
.cta-btn:hover { background: #ab331a; }
.partner-img { width: 100%; border-radius: 8px; object-fit: cover; height: 260px; }
</style>