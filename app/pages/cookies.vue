<template>
  <div class="legal-page">
    <div class="legal-hero">
      <div class="wrap"><h1>Politique de cookies</h1></div>
    </div>
    <div class="wrap legal-content">
      <p class="legal-updated">Dernière mise à jour : 1er janvier 2025</p>
      <section>
        <h2>Qu'est-ce qu'un cookie ?</h2>
        <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet au site de mémoriser des informations sur votre visite pour améliorer votre expérience.</p>
      </section>
      <section>
        <h2>Les cookies que nous utilisons</h2>
        <div class="cookie-table-wrap">
          <table class="cookie-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Finalité</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cookie in cookies" :key="cookie.type">
                <td><strong>{{ cookie.type }}</strong></td>
                <td>{{ cookie.purpose }}</td>
                <td>{{ cookie.duration }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2>Gérer vos préférences</h2>
        <p>Vous pouvez accepter ou refuser les cookies non essentiels via la bannière de cookies affichée lors de votre première visite. Vous pouvez modifier vos préférences à tout moment depuis les paramètres de votre navigateur.</p>
        <p>Notez que le refus de certains cookies peut affecter votre expérience de navigation sur notre site.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Pour toute question relative à notre politique de cookies, contactez-nous à : <a href="mailto:privacy@meubletn.tn">privacy@meubletn.tn</a></p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Politique de cookies | meubletn' })

const cookies = [
  { type: 'Essentiels', purpose: 'Fonctionnement du site (panier, session, authentification)', duration: 'Session / 1 an' },
  { type: 'Performance', purpose: 'Analyse du trafic et des performances (Google Analytics)', duration: '2 ans' },
  { type: 'Fonctionnels', purpose: 'Mémoriser vos préférences (langue, devise, wishlist)', duration: '1 an' },
  { type: 'Marketing', purpose: 'Personnalisation des publicités et reciblage', duration: '90 jours' },
]
</script>

<style scoped>
.legal-page { background: #fff; min-height: 100vh; }
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
.legal-content a { color: #db3a1b; }
.cookie-table-wrap { overflow-x: auto; }
.cookie-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.cookie-table th { background: #f8f8f8; padding: 10px 14px; font-size: 12px; font-weight: 700; color: #2f3133; text-align: left; border-bottom: 2px solid #e2e4e4; }
.cookie-table td { padding: 12px 14px; color: #5b5e61; border-bottom: 1px solid #eeeeef; vertical-align: top; }
.cookie-table tr:last-child td { border-bottom: none; }
</style>