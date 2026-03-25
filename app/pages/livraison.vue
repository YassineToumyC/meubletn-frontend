<template>
  <div class="info-page">
    <div class="info-hero info-hero--dark">
      <div class="wrap">
        <h1 class="info-title">Livraison</h1>
        <p class="info-sub">Rapide, soignée et suivie — votre commande entre de bonnes mains</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="steps-grid">
        <div v-for="step in steps" :key="step.title" class="step-card">
          <div class="step-num">{{ step.num }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
        </div>
      </div>

      <div class="info-cards">
        <div class="icard">
          <h3>Délais de livraison</h3>
          <table class="info-table">
            <tr><td>Grand Tunis</td><td><strong>2–3 jours ouvrés</strong></td></tr>
            <tr><td>Nord et Cap Bon</td><td><strong>3–5 jours ouvrés</strong></td></tr>
            <tr><td>Centre Tunisie</td><td><strong>4–6 jours ouvrés</strong></td></tr>
            <tr><td>Sud Tunisie</td><td><strong>5–7 jours ouvrés</strong></td></tr>
          </table>
        </div>
        <div class="icard">
          <h3>Tarifs de livraison</h3>
          <ul class="info-list">
            <li>✅ <strong>Livraison gratuite</strong> pour toute commande ≥ 990 DT</li>
            <li>📦 <strong>29 DT</strong> pour les commandes inférieures à 990 DT</li>
            <li>🚛 <strong>Service premium</strong> avec mise en place disponible (+49 DT)</li>
          </ul>
        </div>
        <div class="icard">
          <h3>Comment ça marche ?</h3>
          <ul class="info-list">
            <li>Commande passée avant 14h = expédition le jour même</li>
            <li>SMS + e-mail de confirmation à chaque étape</li>
            <li>Lien de suivi en temps réel</li>
            <li>Livraison sur rendez-vous possible</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Livraison | meubletn' })
const steps = [
  { num: '01', title: 'Commande confirmée', desc: 'Vous recevez un e-mail de confirmation immédiatement après votre commande.' },
  { num: '02', title: 'Préparation', desc: 'Votre colis est préparé avec soin dans notre entrepôt sous 24h.' },
  { num: '03', title: 'Expédition', desc: 'Votre colis est pris en charge par notre transporteur partenaire.' },
  { num: '04', title: 'Livraison', desc: 'Réception à l\'adresse de votre choix avec confirmation de livraison.' },
]
</script>

<style scoped>
.info-page { background: #fff; min-height: 100vh; }
.info-hero { padding: 48px 0; }
.info-hero--dark { background: linear-gradient(135deg, #2f3133 0%, #111 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.info-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.info-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding: 40px 0 64px; }
.steps-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px; }
@media (min-width: 984px) { .steps-grid { grid-template-columns: repeat(4, 1fr); } }
.step-card { background: #fff; border-radius: 10px; padding: 24px; }
.step-num { font-size: 36px; font-weight: 700; color: #db3a1b; opacity: 0.3; margin-bottom: 8px; }
.step-title { font-size: 15px; font-weight: 700; color: #2f3133; margin: 0 0 8px; }
.step-desc { font-size: 13px; color: #5b5e61; line-height: 1.5; margin: 0; }
.info-cards { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 984px) { .info-cards { grid-template-columns: repeat(3, 1fr); } }
.icard { background: #fff; border-radius: 10px; padding: 24px; }
.icard h3 { font-size: 17px; font-weight: 700; color: #2f3133; margin: 0 0 16px; }
.info-table { width: 100%; border-collapse: collapse; }
.info-table tr { border-bottom: 1px solid #eeeeef; }
.info-table td { padding: 10px 0; font-size: 14px; color: #47494c; }
.info-table td:last-child { text-align: right; }
.info-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.info-list li { font-size: 14px; color: #5b5e61; line-height: 1.5; }
</style>
