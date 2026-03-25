<template>
  <div class="legal-page">
    <div class="legal-hero">
      <div class="wrap"><h1>Conditions Générales de Vente</h1></div>
    </div>
    <div class="wrap legal-content">
      <p class="legal-updated">Dernière mise à jour : 1er janvier 2025</p>
      <section>
        <h2>1. Objet</h2>
        <p>Les présentes conditions générales de vente (CGV) régissent toutes les transactions effectuées sur le site meubletn.tn entre meubletn SARL et tout consommateur (ci-après "le Client").</p>
      </section>
      <section>
        <h2>2. Commandes</h2>
        <p>Toute commande passée sur le site implique l'acceptation pleine et entière des présentes CGV. La commande est définitive après confirmation par e-mail et paiement. meubletn se réserve le droit de refuser ou d'annuler toute commande en cas de problème de stock ou de paiement.</p>
      </section>
      <section>
        <h2>3. Prix</h2>
        <p>Les prix sont indiqués en Dinars Tunisiens (DT), toutes taxes comprises. meubletn se réserve le droit de modifier ses prix à tout moment, les prix affichés au moment de la commande restant applicables.</p>
      </section>
      <section>
        <h2>4. Paiement</h2>
        <p>Le paiement est exigible immédiatement à la commande. Les modes de paiement acceptés sont : carte bancaire, virement, espèces à la livraison (selon zone). En cas de paiement par virement, la commande est traitée à réception du virement.</p>
      </section>
      <section>
        <h2>5. Livraison</h2>
        <p>Les délais indicatifs de livraison sont de 2 à 7 jours ouvrés selon la région. meubletn ne saurait être tenu responsable des retards de livraison dus à des circonstances exceptionnelles (grèves, intempéries, etc.).</p>
      </section>
      <section>
        <h2>6. Droit de rétractation</h2>
        <p>Conformément à la législation tunisienne, le Client dispose d'un délai de 30 jours à compter de la réception du produit pour exercer son droit de rétractation, sous réserve que le produit soit retourné dans son emballage d'origine, non assemblé et non utilisé.</p>
      </section>
      <section>
        <h2>7. Garanties</h2>
        <p>Tous les produits vendus sur meubletn.tn bénéficient de la garantie légale de conformité (2 ans) et de la garantie contre les vices cachés prévues par la loi tunisienne.</p>
      </section>
      <section>
        <h2>8. Litiges</h2>
        <p>En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux de Tunis seront seuls compétents. La loi tunisienne est applicable.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'CGV — Conditions Générales de Vente | meubletn' })
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
.legal-content p { font-size: 14px; color: #5b5e61; line-height: 1.8; margin-bottom: 0; }
</style>