<template>
  <div class="static-page">
    <div class="hero hero--dark">
      <div class="wrap">
        <h1 class="hero-title">Espace presse</h1>
        <p class="hero-sub">Retrouvez ici nos communiqués, visuels et contacts presse</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="press-grid">
        <div class="press-main">
          <h2>Revue de presse</h2>
          <div class="press-items">
            <a v-for="item in pressItems" :key="item.id" href="#" class="press-item">
              <img :src="`https://picsum.photos/seed/press${item.id}/120/60`" :alt="item.media" class="press-logo" />
              <div class="press-info">
                <p class="press-headline">{{ item.headline }}</p>
                <span class="press-date">{{ item.media }} — {{ item.date }}</span>
              </div>
            </a>
          </div>
        </div>
        <aside class="press-side">
          <div class="side-card">
            <h3>Contact presse</h3>
            <p><strong>Ines Chaibi</strong><br />Directrice de communication<br /><a href="mailto:presse@meubletn.tn">presse@meubletn.tn</a><br />+216 71 123 457</p>
          </div>
          <div class="side-card">
            <h3>Kit presse</h3>
            <p>Téléchargez notre kit presse contenant logos, visuels et fiche corporate.</p>
            <a href="#" class="dl-btn">Télécharger le kit</a>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Espace presse | meubletn' })
const pressItems = [
  { id: 1, media: 'La Presse', date: 'Mars 2025', headline: 'meubletn lève 3 millions de dinars pour accélérer son expansion' },
  { id: 2, media: 'Business News', date: 'Janv. 2025', headline: 'E-commerce meuble : meubletn double ses ventes en 2024' },
  { id: 3, media: 'Webmanagercenter', date: 'Nov. 2024', headline: 'meubletn inaugure son troisième showroom à Sousse' },
  { id: 4, media: 'Kapitalis', date: 'Sept. 2024', headline: 'Le mobilier en ligne séduit de plus en plus les Tunisiens' },
]
</script>

<style scoped>
.static-page { background: #eeeeef; min-height: 100vh; }
.hero { padding: 48px 0; }
.hero--dark { background: linear-gradient(135deg, #2f3133 0%, #111 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.hero-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.hero-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding: 36px 0 64px; }
.press-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 984px) { .press-grid { grid-template-columns: 1fr 300px; } }
.press-main h2 { font-size: 20px; font-weight: 700; color: #2f3133; margin-bottom: 16px; }
.press-items { display: flex; flex-direction: column; gap: 12px; }
.press-item { display: flex; align-items: center; gap: 16px; background: #fff; border-radius: 10px; padding: 16px; text-decoration: none; transition: box-shadow 0.15s; }
.press-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.press-logo { width: 100px; height: 50px; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
.press-headline { font-size: 15px; font-weight: 500; color: #2f3133; margin: 0 0 5px; }
.press-date { font-size: 12px; color: #717678; }
.press-side { display: flex; flex-direction: column; gap: 16px; align-self: start; }
.side-card { background: #fff; border-radius: 10px; padding: 22px; }
.side-card h3 { font-size: 16px; font-weight: 700; color: #2f3133; margin: 0 0 10px; }
.side-card p { font-size: 14px; color: #5b5e61; line-height: 1.6; margin-bottom: 12px; }
.side-card a { color: #db3a1b; }
.dl-btn { display: block; background: #2f3133; color: #fff; text-decoration: none; border-radius: 6px; padding: 10px 16px; font-size: 13px; font-weight: 600; text-align: center; }
.dl-btn:hover { background: #1a1c1e; }
</style>