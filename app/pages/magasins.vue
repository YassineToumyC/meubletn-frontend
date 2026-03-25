<template>
  <div class="info-page">
    <div class="info-hero info-hero--warm">
      <div class="wrap">
        <h1 class="info-title">Nos magasins</h1>
        <p class="info-sub">Découvrez nos produits en vrai dans l'un de nos showrooms</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="stores-grid">
        <div v-for="store in stores" :key="store.name" class="store-card">
          <img :src="store.img" :alt="store.name" class="store-img" />
          <div class="store-info">
            <div class="store-badge">Showroom</div>
            <h3 class="store-name">{{ store.name }}</h3>
            <p class="store-address">{{ store.address }}</p>
            <div class="store-hours">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{{ store.hours }}</span>
            </div>
            <div class="store-phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.15.73.37 1.45.67 2.14a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 7 7l1-1.27a2 2 0 0 1 2.11-.45c.69.3 1.41.52 2.14.67A2 2 0 0 1 22 16.92z"/></svg>
              <span>{{ store.phone }}</span>
            </div>
            <a :href="`https://maps.google.com/?q=${encodeURIComponent(store.address)}`" target="_blank" rel="noopener" class="map-btn">
              Voir sur la carte →
            </a>
          </div>
        </div>
      </div>

      <div class="info-banner">
        <h3>Venez nous rendre visite !</h3>
        <p>Nos conseillers déco sont disponibles pour vous accompagner et vous aider à choisir les meubles qui correspondent parfaitement à votre intérieur. Apportez vos photos et mesures, nous ferons le reste.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Nos magasins | meubletn' })
const stores = [
  {
    name: 'meubletn Tunis — Les Berges du Lac',
    address: 'Avenue Mohamed Bouazizi, Les Berges du Lac II, Tunis 1053',
    hours: 'Lun–Sam 9h–19h  |  Dim 10h–17h',
    phone: '+216 71 100 200',
    img: 'https://picsum.photos/seed/store1/600/300',
  },
  {
    name: 'meubletn Sfax — Centre Commercial Saphir',
    address: 'Route de Soukra Km 4, Centre Commercial Saphir, Sfax 3000',
    hours: 'Lun–Sam 9h–19h  |  Dim 10h–16h',
    phone: '+216 74 200 300',
    img: 'https://picsum.photos/seed/store2/600/300',
  },
  {
    name: 'meubletn Sousse — La Médina',
    address: 'Avenue 7 Novembre, Zone Commerciale, Sousse 4000',
    hours: 'Lun–Sam 9h–18h30',
    phone: '+216 73 300 400',
    img: 'https://picsum.photos/seed/store3/600/300',
  },
]
</script>

<style scoped>
.info-page { background: #eeeeef; min-height: 100vh; }
.info-hero { padding: 48px 0; }
.info-hero--warm { background: linear-gradient(135deg, #92400e 0%, #5a2808 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.info-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.info-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding: 36px 0 64px; }
.stores-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-bottom: 32px; }
@media (min-width: 632px) { .stores-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 984px) { .stores-grid { grid-template-columns: repeat(3, 1fr); } }
.store-card { background: #fff; border-radius: 10px; overflow: hidden; }
.store-img { width: 100%; height: 180px; object-fit: cover; }
.store-info { padding: 20px; }
.store-badge { display: inline-block; background: #fff0ed; color: #db3a1b; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
.store-name { font-size: 16px; font-weight: 700; color: #2f3133; margin: 0 0 8px; }
.store-address { font-size: 13px; color: #5b5e61; margin-bottom: 10px; line-height: 1.4; }
.store-hours, .store-phone { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #47494c; margin-bottom: 6px; }
.map-btn { display: inline-block; margin-top: 12px; color: #db3a1b; font-size: 13px; font-weight: 600; text-decoration: none; }
.map-btn:hover { text-decoration: underline; }
.info-banner { background: #fff; border-radius: 10px; padding: 28px 32px; }
.info-banner h3 { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0 0 10px; }
.info-banner p { font-size: 15px; color: #5b5e61; line-height: 1.7; margin: 0; }
</style>