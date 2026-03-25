<template>
  <div class="info-page">
    <div class="info-hero info-hero--blue">
      <div class="wrap">
        <h1 class="info-title">Paiement sécurisé</h1>
        <p class="info-sub">Toutes vos transactions sont protégées et cryptées</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="content-grid">
        <div class="content-main">
          <section class="content-section">
            <h2>Modes de paiement acceptés</h2>
            <div class="payment-methods">
              <div v-for="method in paymentMethods" :key="method.name" class="method-card">
                <div class="method-icon">{{ method.icon }}</div>
                <div>
                  <h3 class="method-name">{{ method.name }}</h3>
                  <p class="method-desc">{{ method.desc }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h2>Sécurité des paiements</h2>
            <p>Toutes les transactions effectuées sur meubletn.tn sont sécurisées par le protocole SSL (Secure Socket Layer) avec un cryptage 256 bits. Vos informations bancaires ne sont jamais stockées sur nos serveurs.</p>
            <p>Nous sommes certifiés PCI DSS niveau 1, le niveau de sécurité le plus élevé pour le traitement des paiements par carte bancaire.</p>
          </section>

          <section class="content-section">
            <h2>Paiement en plusieurs fois</h2>
            <p>Pour les commandes supérieures à 500 DT, vous pouvez bénéficier du paiement en 3 fois sans frais avec les banques partenaires.</p>
            <ul>
              <li>STB — Société Tunisienne de Banque</li>
              <li>BNA — Banque Nationale Agricole</li>
              <li>BH Bank — Banque de l'Habitat</li>
            </ul>
          </section>
        </div>

        <aside class="content-side">
          <div class="side-card">
            <h3>Besoin d'aide ?</h3>
            <p>Notre équipe est disponible pour vous aider avec votre paiement.</p>
            <NuxtLink to="/contact" class="side-cta">Nous contacter</NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Paiement sécurisé | meubletn' })

const paymentMethods = [
  { name: 'Carte bancaire', icon: '💳', desc: 'Visa, Mastercard, CB — paiement immédiat et sécurisé' },
  { name: 'Virement bancaire', icon: '🏦', desc: 'Paiement sous 3 jours ouvrés après confirmation' },
  { name: 'Espèces à la livraison', icon: '💵', desc: 'Disponible pour certaines zones géographiques' },
  { name: 'Chèque', icon: '📄', desc: 'À l\'ordre de meubletn SARL — envoi postal' },
]
</script>

<style scoped>
.info-page { background: #eeeeef; min-height: 100vh; }
.info-hero { padding: 48px 0; }
.info-hero--blue { background: linear-gradient(135deg, #1a56a0 0%, #0a2d60 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.info-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.info-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding: 32px 0 64px; }
.content-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 984px) { .content-grid { grid-template-columns: 1fr 300px; } }
.content-main { display: flex; flex-direction: column; gap: 20px; }
.content-section { background: #fff; border-radius: 10px; padding: 28px; }
.content-section h2 { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0 0 16px; }
.content-section p { font-size: 15px; color: #5b5e61; line-height: 1.7; margin-bottom: 12px; }
.content-section ul { padding-left: 20px; color: #5b5e61; font-size: 15px; line-height: 1.8; }
.payment-methods { display: flex; flex-direction: column; gap: 16px; }
.method-card { display: flex; align-items: flex-start; gap: 14px; padding: 14px; border: 1px solid #eeeeef; border-radius: 8px; }
.method-icon { font-size: 28px; flex-shrink: 0; }
.method-name { font-size: 15px; font-weight: 600; color: #2f3133; margin: 0 0 4px; }
.method-desc { font-size: 13px; color: #717678; margin: 0; }
.content-side { align-self: start; }
.side-card { background: #fff; border-radius: 10px; padding: 24px; }
.side-card h3 { font-size: 17px; font-weight: 700; color: #2f3133; margin: 0 0 10px; }
.side-card p { font-size: 14px; color: #5b5e61; margin-bottom: 16px; }
.side-cta { display: block; background: #db3a1b; color: #fff; text-decoration: none; border-radius: 6px; padding: 11px 20px; font-size: 14px; font-weight: 600; text-align: center; transition: background 0.15s; }
.side-cta:hover { background: #ab331a; }
</style>
