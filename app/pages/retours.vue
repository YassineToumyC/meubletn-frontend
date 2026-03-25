<template>
  <div class="info-page">
    <div class="info-hero info-hero--green">
      <div class="wrap">
        <h1 class="info-title">Retours & Remboursements</h1>
        <p class="info-sub">Satisfait ou remboursé sous 30 jours — sans questions</p>
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
          <h3>Conditions de retour</h3>
          <ul class="info-list">
            <li>✅ Retour gratuit sous 30 jours après réception</li>
            <li>✅ Produit dans son emballage d'origine (non ouvert)</li>
            <li>✅ Non assemblé et non utilisé</li>
            <li>❌ Les matelas et oreillers ouverts ne sont pas échangeables pour des raisons d'hygiène</li>
            <li>❌ Les produits personnalisés sont non retournables</li>
          </ul>
        </div>
        <div class="icard">
          <h3>Délai de remboursement</h3>
          <p style="font-size:14px;color:#5b5e61;line-height:1.7">Une fois votre retour reçu et inspecté, le remboursement est traité sous <strong>5 à 10 jours ouvrés</strong>. Vous recevrez un e-mail de confirmation.</p>
          <p style="font-size:14px;color:#5b5e61;line-height:1.7">Le remboursement est effectué sur le même moyen de paiement utilisé lors de la commande.</p>
        </div>
        <div class="icard">
          <h3>Produit endommagé ?</h3>
          <p style="font-size:14px;color:#5b5e61;line-height:1.7">Si vous avez reçu un produit endommagé ou défectueux, contactez-nous dans les <strong>48h suivant la livraison</strong> avec des photos.</p>
          <NuxtLink to="/contact" class="cta-btn">Nous contacter →</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Retours & Remboursements | meubletn' })
const steps = [
  { num: '01', title: 'Initiez votre retour', desc: 'Connectez-vous à votre compte et sélectionnez la commande et les articles à retourner.' },
  { num: '02', title: 'Préparez le colis', desc: 'Emballez soigneusement le produit dans son emballage d\'origine avec toutes ses pièces.' },
  { num: '03', title: 'Déposez le colis', desc: 'Déposez votre colis au point de collecte indiqué ou attendez le passage du transporteur.' },
  { num: '04', title: 'Remboursement', desc: 'Dès réception et vérification, votre remboursement est traité sous 5 à 10 jours.' },
]
</script>

<style scoped>
.info-page { background: #eeeeef; min-height: 100vh; }
.info-hero { padding: 48px 0; }
.info-hero--green { background: linear-gradient(135deg, #276749 0%, #134030 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.info-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.info-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding: 40px 0 64px; }
.steps-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px; }
@media (min-width: 984px) { .steps-grid { grid-template-columns: repeat(4, 1fr); } }
.step-card { background: #fff; border-radius: 10px; padding: 24px; }
.step-num { font-size: 36px; font-weight: 700; color: #276749; opacity: 0.3; margin-bottom: 8px; }
.step-title { font-size: 15px; font-weight: 700; color: #2f3133; margin: 0 0 8px; }
.step-desc { font-size: 13px; color: #5b5e61; line-height: 1.5; margin: 0; }
.info-cards { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 984px) { .info-cards { grid-template-columns: repeat(3, 1fr); } }
.icard { background: #fff; border-radius: 10px; padding: 24px; }
.icard h3 { font-size: 17px; font-weight: 700; color: #2f3133; margin: 0 0 14px; }
.info-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.info-list li { font-size: 14px; color: #5b5e61; line-height: 1.5; }
.cta-btn { display: inline-block; margin-top: 12px; color: #db3a1b; font-size: 14px; font-weight: 600; text-decoration: none; }
</style>