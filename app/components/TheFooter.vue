<template>
  <footer class="site-footer">
    <!-- Trust badges -->
    <div class="footer-trust">
      <div class="trust-inner">
        <div v-for="badge in trustBadges" :key="badge.title" class="trust-item">
          <div class="trust-icon" v-html="badge.icon"></div>
          <div>
            <p class="trust-title">{{ badge.title }}</p>
            <p class="trust-desc">{{ badge.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main footer links -->
    <div class="footer-main">
      <div class="footer-grid">
        <div v-for="col in footerCols" :key="col.title" class="footer-col">
          <h3 class="footer-col-title">{{ col.title }}</h3>
          <ul class="footer-links">
            <li v-for="link in col.links" :key="link.label">
              <NuxtLink :to="link.href" class="footer-link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Payment & social -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <div class="footer-social">
          <a href="#" aria-label="Facebook" class="social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" aria-label="Pinterest" class="social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
          </a>
          <a href="#" aria-label="YouTube" class="social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg>
          </a>
        </div>
        <div class="footer-payment">
          <span class="payment-label">Paiement sécurisé :</span>
          <div class="payment-icons">
            <span class="payment-chip">VISA</span>
            <span class="payment-chip">Mastercard</span>
            <span class="payment-chip">PayPal</span>
            <span class="payment-chip">CB</span>
          </div>
        </div>
      </div>
      <div class="footer-legal">
        <p>© {{ new Date().getFullYear() }} meubletn. Tous droits réservés.</p>
        <div class="legal-links">
          <NuxtLink to="/mentions-legales" class="legal-link">Mentions légales</NuxtLink>
          <NuxtLink to="/confidentialite" class="legal-link">Politique de confidentialité</NuxtLink>
          <NuxtLink to="/cgv" class="legal-link">CGV</NuxtLink>
          <NuxtLink to="/cookies" class="legal-link">Cookies</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { categories } = useCategories()

const trustBadges = [
  {
    title: 'Livraison gratuite dès 99€',
    desc: 'Livraison à domicile sur toute la Tunisie',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E1004E" stroke-width="1.5"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>',
  },
  {
    title: 'Retour sous 30 jours',
    desc: 'Satisfait ou remboursé, sans question',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E1004E" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.33"/></svg>',
  },
  {
    title: 'Paiement 100% sécurisé',
    desc: 'Toutes les transactions sont protégées',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E1004E" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  },
  {
    title: 'Plus de 50 000 produits',
    desc: 'Un large choix pour aménager votre intérieur',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E1004E" stroke-width="1.5"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/></svg>',
  },
]

const footerCols = [
  {
    title: 'Service client',
    links: [
      { label: 'Aide & FAQ', href: '/aide' },
      { label: 'Suivi de commande', href: '/suivi-commande' },
      { label: 'Livraison & retours', href: '/livraison' },
      { label: 'Contactez-nous', href: '/contact' },
      { label: 'Nos magasins', href: '/magasins' },
    ],
  },
  {
    title: 'À propos',
    links: [
      { label: 'Qui sommes-nous', href: '/a-propos' },
      { label: 'Presse', href: '/presse' },
      { label: 'Carrières', href: '/carrieres' },
      { label: 'Blog déco', href: '/blog' },
      { label: 'Partenaires', href: '/partenaires' },
    ],
  },
  {
    title: 'Catégories',
    links: categories.value.map(c => ({ label: c.name, href: `/categorie/${c.slug}` })),
  },
  {
    title: 'Explorer',
    links: [
      { label: 'Nouveautés',           href: '/nouveautes' },
      { label: 'Sélectionné pour vous', href: '/#tous-les-articles' },
      { label: 'Tous les articles',    href: '/#tous-les-articles' },
      { label: 'Meilleures ventes',    href: '/meilleures-ventes' },
      { label: 'Soldes',               href: '/soldes' },
    ],
  },
  {
    title: 'Mon compte',
    links: [
      { label: 'Se connecter', href: '/auth/login' },
      { label: 'Créer un compte', href: '/auth/register' },
      { label: 'Mes commandes', href: '/compte/commandes' },
      { label: 'Mes favoris', href: '/wishlist' },
      { label: 'Mon panier', href: '/panier' },
    ],
  },
]
</script>

<style scoped>
.site-footer {
  background-color: #2f3133;
  color: #d9dadb;
  margin-top: 48px;
}

/* Trust badges */
.footer-trust {
  background-color: #ffffff;
  border-top: 1px solid #e2e4e4;
  padding: 32px 16px;
}
.trust-inner {
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (min-width: 984px) {
  .trust-inner { grid-template-columns: repeat(4, 1fr); padding: 0 48px; }
  .footer-trust { padding: 40px 0; }
}
.trust-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.trust-icon { flex-shrink: 0; margin-top: 2px; }
.trust-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: bold;
  color: #2f3133;
}
.trust-desc {
  margin: 0;
  font-size: 12px;
  color: #5b5e61;
}

/* Main footer */
.footer-main {
  padding: 40px 16px 32px;
}
.footer-grid {
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 24px;
}
@media (min-width: 984px) {
  .footer-grid { grid-template-columns: repeat(4, 1fr); padding: 0 48px; }
}
@media (min-width: 1392px) {
  .footer-grid { padding: 0 64px; }
}
.footer-col-title {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.footer-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer-link {
  font-size: 13px;
  color: #a0a4a8;
  text-decoration: none;
  transition: color 0.15s;
}
.footer-link:hover { color: #ffffff; }

/* Bottom */
.footer-bottom {
  border-top: 1px solid #47494c;
  padding: 24px 16px;
}
@media (min-width: 984px) {
  .footer-bottom { padding: 24px 64px; }
}
.footer-bottom-inner {
  max-width: 1600px;
  margin: 0 auto 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
@media (min-width: 632px) {
  .footer-bottom-inner { flex-direction: row; align-items: center; justify-content: space-between; }
}
.footer-social {
  display: flex;
  gap: 12px;
}
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #47494c;
  color: #ffffff;
  transition: background-color 0.15s;
}
.social-link:hover { background-color: #E1004E; }
.footer-payment {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.payment-label { font-size: 12px; color: #a0a4a8; }
.payment-icons { display: flex; gap: 6px; flex-wrap: wrap; }
.payment-chip {
  background-color: #ffffff;
  color: #2f3133;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 4px;
}
.footer-legal {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
@media (min-width: 632px) {
  .footer-legal { flex-direction: row; align-items: center; justify-content: space-between; }
}
.footer-legal p {
  margin: 0;
  font-size: 12px;
  color: #717678;
}
.legal-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.legal-link {
  font-size: 12px;
  color: #717678;
  text-decoration: none;
  transition: color 0.15s;
}
.legal-link:hover { color: #a0a4a8; }
</style>
