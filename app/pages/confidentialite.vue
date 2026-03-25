<template>
  <div class="legal-page">
    <div class="legal-hero">
      <div class="wrap"><h1>Politique de confidentialité</h1></div>
    </div>
    <div class="wrap legal-content">
      <p class="legal-updated">Dernière mise à jour : 1er janvier 2025</p>
      <section>
        <h2>1. Responsable du traitement</h2>
        <p>meubletn SARL, ayant son siège social à Tunis, est responsable du traitement de vos données personnelles collectées via le site meubletn.tn.</p>
      </section>
      <section>
        <h2>2. Données collectées</h2>
        <p>Nous collectons les données suivantes :</p>
        <ul>
          <li>Données d'identification (nom, prénom, e-mail, téléphone)</li>
          <li>Données de livraison (adresse postale)</li>
          <li>Données de paiement (traitées par notre prestataire sécurisé — nous ne stockons aucune donnée bancaire)</li>
          <li>Données de navigation (cookies, adresse IP, pages visitées)</li>
        </ul>
      </section>
      <section>
        <h2>3. Finalités du traitement</h2>
        <p>Vos données sont utilisées pour :</p>
        <ul>
          <li>Traiter et gérer vos commandes</li>
          <li>Vous envoyer des confirmations et suivis de commande</li>
          <li>Vous envoyer notre newsletter (avec votre consentement)</li>
          <li>Améliorer nos services et personnaliser votre expérience</li>
          <li>Respecter nos obligations légales et fiscales</li>
        </ul>
      </section>
      <section>
        <h2>4. Durée de conservation</h2>
        <p>Vos données personnelles sont conservées pour la durée nécessaire à l'exécution du contrat et aux obligations légales applicables (généralement 5 ans pour les données comptables).</p>
      </section>
      <section>
        <h2>5. Vos droits</h2>
        <p>Conformément à la loi n° 2004-63 du 27 juillet 2004 portant sur la protection des données à caractère personnel, vous disposez des droits suivants : droit d'accès, de rectification, d'effacement, d'opposition et de portabilité. Pour exercer vos droits, contactez-nous à : <a href="mailto:privacy@meubletn.tn">privacy@meubletn.tn</a></p>
      </section>
      <section>
        <h2>6. Cookies</h2>
        <p>Notre site utilise des cookies pour améliorer votre expérience de navigation. Pour en savoir plus, consultez notre <NuxtLink to="/cookies">politique de cookies</NuxtLink>.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Politique de confidentialité | meubletn' })
</script>

<style scoped>
.legal-page { background: #eeeeef; min-height: 100vh; }
.legal-hero { background: #2f3133; padding: 40px 0; }
.legal-hero h1 { font-size: 30px; font-weight: 700; color: #fff; margin: 0; }
.wrap { max-width: 900px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
.legal-content { background: #fff; border-radius: 10px; padding: 36px; margin: 32px auto 64px; }
.legal-updated { font-size: 13px; color: #717678; margin-bottom: 28px; }
.legal-content section { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #eeeeef; }
.legal-content section:last-child { border-bottom: none; padding-bottom: 0; }
.legal-content h2 { font-size: 17px; font-weight: 700; color: #2f3133; margin: 0 0 12px; }
.legal-content p { font-size: 14px; color: #5b5e61; line-height: 1.8; margin-bottom: 10px; }
.legal-content ul { padding-left: 20px; color: #5b5e61; font-size: 14px; line-height: 2; }
.legal-content a { color: #db3a1b; text-decoration: none; }
.legal-content a:hover { text-decoration: underline; }
</style>