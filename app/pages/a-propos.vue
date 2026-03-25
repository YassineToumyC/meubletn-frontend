<template>
  <div class="static-page">
    <div class="hero hero--brand">
      <div class="wrap">
        <h1 class="hero-title">À propos de meubletn</h1>
        <p class="hero-sub">La référence du meuble et de la déco en Tunisie depuis 2015</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="two-col">
        <div>
          <h2>Notre histoire</h2>
          <p>Fondée en 2015 à Tunis, meubletn est née d'une idée simple : rendre accessible à tous des meubles de qualité, beaux et durables. En 10 ans, nous sommes devenus la première marketplace de meuble en ligne en Tunisie.</p>
          <p>Aujourd'hui, nous proposons plus de 50 000 références de meubles et articles de décoration, sélectionnés auprès de plus de 200 marques partenaires nationales et internationales.</p>
          <p>Nos 3 showrooms à Tunis, Sfax et Sousse vous accueillent pour découvrir nos produits en vrai et bénéficier des conseils de notre équipe de spécialistes.</p>
        </div>
        <div>
          <img src="https://picsum.photos/seed/about-team/600/400" alt="Notre équipe" class="about-img" />
        </div>
      </div>

      <div class="values-grid">
        <div v-for="v in values" :key="v.title" class="value-card">
          <div class="value-icon" v-html="v.icon"></div>
          <h3 class="value-title">{{ v.title }}</h3>
          <p class="value-desc">{{ v.desc }}</p>
        </div>
      </div>

      <div class="stats-row">
        <div v-for="s in stats" :key="s.label" class="stat-item">
          <div class="stat-num">{{ s.num }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'À propos | meubletn' })
const values = [
  { title: 'Qualité', desc: 'Chaque produit est rigoureusement sélectionné et testé avant d\'intégrer notre catalogue.', icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
  { title: 'Accessibilité', desc: 'Des prix justes pour que chacun puisse s\'offrir un intérieur dont il est fier.', icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
  { title: 'Service', desc: 'Une équipe disponible et attentive pour vous accompagner avant, pendant et après votre achat.', icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
  { title: 'Durabilité', desc: 'Nous privilégions des fournisseurs responsables et des matériaux durables pour un futur meilleur.', icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M12 22V10"/><path d="M12 10S7 8 5 4c4 0 7 2 7 2"/><path d="M12 10s5-2 7-6c-4 0-7 2-7 2"/></svg>' },
]
const stats = [
  { num: '50 000+', label: 'Produits disponibles' },
  { num: '200+', label: 'Marques partenaires' },
  { num: '150 000+', label: 'Clients satisfaits' },
  { num: '3', label: 'Showrooms en Tunisie' },
]
</script>

<style scoped>
.static-page { background: #eeeeef; min-height: 100vh; }
.hero { padding: 48px 0; }
.hero--brand { background: linear-gradient(135deg, #db3a1b 0%, #8b1a07 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.hero-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.hero-sub { font-size: 16px; color: rgba(255,255,255,0.85); margin: 0; }
.content-wrap { padding: 40px 0 64px; }
.two-col { display: grid; grid-template-columns: 1fr; gap: 32px; background: #fff; border-radius: 10px; padding: 32px; margin-bottom: 28px; }
@media (min-width: 984px) { .two-col { grid-template-columns: 1fr 1fr; align-items: center; } }
.two-col h2 { font-size: 22px; font-weight: 700; color: #2f3133; margin: 0 0 16px; }
.two-col p { font-size: 15px; color: #5b5e61; line-height: 1.7; margin-bottom: 12px; }
.about-img { width: 100%; border-radius: 8px; object-fit: cover; height: 280px; }
.values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 28px; }
@media (min-width: 984px) { .values-grid { grid-template-columns: repeat(4, 1fr); } }
.value-card { background: #fff; border-radius: 10px; padding: 24px; }
.value-icon { margin-bottom: 12px; }
.value-title { font-size: 16px; font-weight: 700; color: #2f3133; margin: 0 0 8px; }
.value-desc { font-size: 13px; color: #5b5e61; line-height: 1.6; margin: 0; }
.stats-row { background: #2f3133; border-radius: 10px; padding: 32px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
@media (min-width: 984px) { .stats-row { grid-template-columns: repeat(4, 1fr); } }
.stat-item { text-align: center; }
.stat-num { font-size: 32px; font-weight: 700; color: #db3a1b; margin-bottom: 6px; }
.stat-label { font-size: 14px; color: rgba(255,255,255,0.75); }
</style>