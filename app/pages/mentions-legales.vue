<template>
  <div class="legal-page">
    <div class="legal-hero">
      <div class="wrap"><h1>Mentions légales</h1></div>
    </div>
    <div class="wrap legal-content">
      <section>
        <h2>Éditeur du site</h2>
        <p><strong>meubletn SARL</strong><br />Capital social : 500 000 DT<br />Siège social : Avenue Mohamed Bouazizi, Les Berges du Lac II, Tunis 1053, Tunisie<br />Matricule fiscale : 123456789<br />Registre de commerce : B654321<br />E-mail : contact@meubletn.tn<br />Téléphone : +216 71 123 456</p>
      </section>
      <section>
        <h2>Directeur de la publication</h2>
        <p>M. Youssef Hamdi, Directeur Général de meubletn SARL.</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Le site meubletn.tn est hébergé par :<br /><strong>OVHcloud</strong> — 2 rue Kellermann, 59100 Roubaix, France.</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, etc.) sont la propriété exclusive de meubletn SARL et sont protégés par les lois tunisiennes et internationales relatives à la propriété intellectuelle.</p>
        <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de meubletn SARL.</p>
      </section>
      <section>
        <h2>Limitation de responsabilité</h2>
        <p>meubletn SARL s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, meubletn SARL ne garantit pas l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Mentions légales | meubletn' })
</script>

<style scoped>
.legal-page { background: #eeeeef; min-height: 100vh; }
.legal-hero { background: #2f3133; padding: 40px 0; }
.legal-hero h1 { font-size: 30px; font-weight: 700; color: #fff; margin: 0; }
.wrap { max-width: 900px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
.legal-content { background: #fff; border-radius: 10px; padding: 36px; margin: 32px auto 64px; }
.legal-content section { margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #eeeeef; }
.legal-content section:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
.legal-content h2 { font-size: 18px; font-weight: 700; color: #2f3133; margin: 0 0 12px; }
.legal-content p { font-size: 14px; color: #5b5e61; line-height: 1.8; margin-bottom: 10px; }
</style>