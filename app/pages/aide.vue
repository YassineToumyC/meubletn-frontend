<template>
  <div class="info-page">
    <div class="info-hero info-hero--blue">
      <div class="wrap">
        <h1 class="info-title">Centre d'aide</h1>
        <form @submit.prevent="doSearch" class="help-search">
          <input v-model="searchQ" type="search" class="help-input" placeholder="Rechercher dans l'aide..." />
          <button type="submit" class="help-btn">Rechercher</button>
        </form>
      </div>
    </div>
    <div class="wrap content-wrap">
      <!-- Quick links -->
      <div class="quick-grid">
        <NuxtLink v-for="link in quickLinks" :key="link.label" :to="link.href" class="quick-card">
          <div class="quick-icon" v-html="link.icon"></div>
          <span class="quick-label">{{ link.label }}</span>
        </NuxtLink>
      </div>

      <!-- FAQ -->
      <h2 class="faq-title">Questions fréquentes</h2>
      <div class="faq-list">
        <div v-for="(item, i) in faq" :key="i" class="faq-item">
          <button class="faq-q" @click="openIdx = openIdx === i ? -1 : i">
            <span>{{ item.q }}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" :style="{ transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div v-if="openIdx === i" class="faq-a">{{ item.a }}</div>
        </div>
      </div>

      <div class="still-help">
        <h3>Vous n'avez pas trouvé votre réponse ?</h3>
        <p>Notre équipe est disponible pour vous aider du lundi au vendredi de 8h à 18h.</p>
        <NuxtLink to="/contact" class="cta-btn">Nous contacter</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Centre d\'aide | meubletn' })

const searchQ = ref('')
const openIdx = ref(-1)
const router = useRouter()

function doSearch() {
  if (searchQ.value.trim()) router.push(`/recherche?q=${encodeURIComponent(searchQ.value)}`)
}

const quickLinks = [
  { label: 'Suivi de commande', href: '/suivi-commande', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>' },
  { label: 'Retours', href: '/retours', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.33"/></svg>' },
  { label: 'Livraison', href: '/livraison', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
  { label: 'Paiement', href: '/paiement', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
  { label: 'Mon compte', href: '/compte/commandes', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  { label: 'Nous contacter', href: '/contact', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
]

const faq = [
  { q: 'Comment puis-je suivre ma commande ?', a: 'Rendez-vous sur la page "Suivi de commande" et entrez votre numéro de commande ainsi que votre adresse e-mail. Vous pouvez aussi retrouver le lien de suivi dans l\'e-mail de confirmation.' },
  { q: 'Quel est le délai de livraison ?', a: 'Les délais varient entre 2 et 7 jours ouvrés selon votre région. Grand Tunis : 2–3 jours. Nord et Cap Bon : 3–5 jours. Centre et Sud : 4–7 jours.' },
  { q: 'Comment effectuer un retour ?', a: 'Vous disposez de 30 jours après réception pour retourner un article. Connectez-vous à votre compte, sélectionnez la commande et initiez le retour. Le produit doit être dans son emballage d\'origine.' },
  { q: 'La livraison est-elle vraiment gratuite ?', a: 'Oui ! La livraison est offerte pour toute commande d\'un montant supérieur ou égal à 990 DT. En dessous de ce seuil, les frais de livraison sont de 29 DT.' },
  { q: 'Puis-je modifier ma commande après validation ?', a: 'Vous pouvez modifier votre commande dans les 2h suivant la validation, avant qu\'elle soit prise en charge par notre entrepôt. Contactez-nous par téléphone ou chat pour toute modification urgente.' },
  { q: 'Les produits sont-ils garantis ?', a: 'Tous nos produits bénéficient d\'une garantie constructeur de 2 ans. En cas de défaut de fabrication, nous prenons en charge le remplacement ou la réparation à nos frais.' },
]
</script>

<style scoped>
.info-page { background: #eeeeef; min-height: 100vh; }
.info-hero { padding: 48px 0; }
.info-hero--blue { background: linear-gradient(135deg, #1a56a0 0%, #0a2d60 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.info-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 20px; }
.help-search { display: flex; gap: 0; max-width: 520px; }
.help-input { flex: 1; border: none; border-radius: 6px 0 0 6px; padding: 13px 16px; font-size: 15px; outline: none; }
.help-btn { background: #db3a1b; color: #fff; border: none; border-radius: 0 6px 6px 0; padding: 13px 20px; font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; }
.content-wrap { padding: 36px 0 64px; }
.quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; }
@media (min-width: 984px) { .quick-grid { grid-template-columns: repeat(6, 1fr); } }
.quick-card { background: #fff; border-radius: 10px; padding: 20px 16px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-decoration: none; transition: box-shadow 0.15s; }
.quick-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.quick-icon { display: flex; }
.quick-label { font-size: 13px; font-weight: 500; color: #2f3133; text-align: center; }
.faq-title { font-size: 22px; font-weight: 700; color: #2f3133; margin-bottom: 16px; }
.faq-list { background: #fff; border-radius: 10px; overflow: hidden; margin-bottom: 32px; }
.faq-item { border-bottom: 1px solid #eeeeef; }
.faq-item:last-child { border-bottom: none; }
.faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 18px 24px; font-size: 15px; font-weight: 500; color: #2f3133; background: none; border: none; cursor: pointer; text-align: left; }
.faq-q:hover { background: #fafafa; }
.faq-a { padding: 0 24px 18px; font-size: 14px; color: #5b5e61; line-height: 1.7; }
.still-help { background: #fff; border-radius: 10px; padding: 28px; text-align: center; }
.still-help h3 { font-size: 18px; font-weight: 700; color: #2f3133; margin: 0 0 10px; }
.still-help p { font-size: 14px; color: #5b5e61; margin-bottom: 16px; }
.cta-btn { display: inline-flex; align-items: center; background: #db3a1b; color: #fff; text-decoration: none; border-radius: 6px; padding: 11px 24px; font-size: 14px; font-weight: 600; transition: background 0.15s; }
.cta-btn:hover { background: #ab331a; }
</style>