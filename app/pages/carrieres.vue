<template>
  <div class="static-page">
    <div class="hero hero--green">
      <div class="wrap">
        <h1 class="hero-title">Rejoignez l'équipe meubletn</h1>
        <p class="hero-sub">Construisez l'avenir du meuble en ligne avec nous</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="intro-card">
        <h2>Pourquoi nous rejoindre ?</h2>
        <div class="perks-grid">
          <div v-for="perk in perks" :key="perk.title" class="perk-item">
            <div class="perk-icon" v-html="perk.icon"></div>
            <h3>{{ perk.title }}</h3>
            <p>{{ perk.desc }}</p>
          </div>
        </div>
      </div>

      <h2 class="jobs-title">Offres d'emploi ouvertes</h2>
      <div class="jobs-list">
        <div v-for="job in jobs" :key="job.id" class="job-card">
          <div class="job-info">
            <span class="job-dept">{{ job.dept }}</span>
            <h3 class="job-title">{{ job.title }}</h3>
            <div class="job-tags">
              <span class="job-tag">{{ job.location }}</span>
              <span class="job-tag">{{ job.type }}</span>
            </div>
          </div>
          <a href="#" class="apply-btn">Postuler →</a>
        </div>
      </div>

      <div class="spontaneous-card">
        <h3>Candidature spontanée</h3>
        <p>Vous ne trouvez pas le poste idéal mais vous souhaitez rejoindre l'aventure meubletn ? Envoyez-nous votre candidature spontanée.</p>
        <a href="mailto:recrutement@meubletn.tn" class="cta-btn">Envoyer ma candidature</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Carrières | meubletn' })

const perks = [
  { title: 'Environnement stimulant', desc: 'Rejoignez une startup en forte croissance avec des défis quotidiens et de l\'impact réel.', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
  { title: 'Évolution rapide', desc: 'Développez vos compétences et montez en responsabilités selon vos ambitions.', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' },
  { title: 'Équipe bienveillante', desc: 'Une culture d\'entreprise axée sur la collaboration, le respect et le bien-être au travail.', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { title: 'Avantages', desc: 'Mutuelle santé, tickets restaurant, réduction employé sur tous nos produits, télétravail partiel.', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' },
]

const jobs = [
  { id: 1, dept: 'Tech & Produit', title: 'Développeur·se Full Stack (Vue.js / Node.js)', location: 'Tunis', type: 'CDI' },
  { id: 2, dept: 'Marketing', title: 'Responsable Marketing Digital', location: 'Tunis', type: 'CDI' },
  { id: 3, dept: 'Logistique', title: 'Responsable Entrepôt & Supply Chain', location: 'Sfax', type: 'CDI' },
  { id: 4, dept: 'Service client', title: 'Conseiller·ère Service Client', location: 'Tunis (Télétravail)', type: 'CDD 6 mois' },
  { id: 5, dept: 'Déco & Contenu', title: 'Styliste & Photographe Produit', location: 'Tunis', type: 'CDI' },
]
</script>

<style scoped>
.static-page { background: #eeeeef; min-height: 100vh; }
.hero { padding: 48px 0; }
.hero--green { background: linear-gradient(135deg, #276749 0%, #134030 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.hero-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.hero-sub { font-size: 16px; color: rgba(255,255,255,0.85); margin: 0; }
.content-wrap { padding: 36px 0 64px; }
.intro-card { background: #fff; border-radius: 10px; padding: 32px; margin-bottom: 32px; }
.intro-card h2 { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0 0 24px; }
.perks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media (min-width: 984px) { .perks-grid { grid-template-columns: repeat(4, 1fr); } }
.perk-item h3 { font-size: 15px; font-weight: 700; color: #2f3133; margin: 10px 0 6px; }
.perk-item p { font-size: 13px; color: #5b5e61; line-height: 1.6; margin: 0; }
.jobs-title { font-size: 20px; font-weight: 700; color: #2f3133; margin-bottom: 16px; }
.jobs-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
.job-card { background: #fff; border-radius: 10px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.job-dept { font-size: 11px; font-weight: 700; color: #db3a1b; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
.job-title { font-size: 16px; font-weight: 600; color: #2f3133; margin: 0 0 8px; }
.job-tags { display: flex; gap: 6px; }
.job-tag { border: 1px solid #d9dadb; border-radius: 4px; padding: 3px 8px; font-size: 12px; color: #47494c; }
.apply-btn { background: #db3a1b; color: #fff; text-decoration: none; border-radius: 6px; padding: 9px 18px; font-size: 14px; font-weight: 600; white-space: nowrap; transition: background 0.15s; }
.apply-btn:hover { background: #ab331a; }
.spontaneous-card { background: #fff; border-radius: 10px; padding: 28px; text-align: center; }
.spontaneous-card h3 { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0 0 10px; }
.spontaneous-card p { font-size: 15px; color: #5b5e61; max-width: 500px; margin: 0 auto 20px; }
.cta-btn { display: inline-flex; align-items: center; background: #2f3133; color: #fff; text-decoration: none; border-radius: 6px; padding: 12px 24px; font-size: 14px; font-weight: 600; }
.cta-btn:hover { background: #1a1c1e; }
</style>