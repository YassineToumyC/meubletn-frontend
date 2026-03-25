<template>
  <div class="info-page">
    <div class="info-hero info-hero--brand">
      <div class="wrap">
        <h1 class="info-title">Contactez-nous</h1>
        <p class="info-sub">Notre équipe vous répond dans les 24h ouvrées</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <div class="contact-grid">
        <!-- Form -->
        <div class="form-card">
          <h2 class="form-title">Envoyer un message</h2>
          <form @submit.prevent="submit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Prénom</label>
                <input v-model="form.firstName" type="text" class="form-input" placeholder="Mohamed" required />
              </div>
              <div class="form-group">
                <label class="form-label">Nom</label>
                <input v-model="form.lastName" type="text" class="form-input" placeholder="Ben Ali" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input v-model="form.email" type="email" class="form-input" placeholder="votre@email.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Sujet</label>
              <select v-model="form.subject" class="form-input">
                <option value="">Choisissez un sujet</option>
                <option>Suivi de commande</option>
                <option>Retour / Remboursement</option>
                <option>Question produit</option>
                <option>Problème de livraison</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea v-model="form.message" class="form-textarea" rows="5" placeholder="Décrivez votre demande..." required></textarea>
            </div>
            <div v-if="submitted" class="success-msg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Votre message a été envoyé. Nous vous répondrons sous 24h.
            </div>
            <button v-else type="submit" class="submit-btn">Envoyer le message</button>
          </form>
        </div>

        <!-- Info -->
        <aside class="contact-side">
          <div v-for="ch in channels" :key="ch.title" class="channel-card">
            <div class="channel-icon" v-html="ch.icon"></div>
            <div>
              <h3 class="channel-title">{{ ch.title }}</h3>
              <p class="channel-info">{{ ch.info }}</p>
              <p class="channel-hours">{{ ch.hours }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact | meubletn' })

const form = reactive({ firstName: '', lastName: '', email: '', subject: '', message: '' })
const submitted = ref(false)

function submit() { submitted.value = true }

const channels = [
  {
    title: 'Par téléphone',
    info: '+216 71 123 456',
    hours: 'Lun–Ven : 8h–18h  |  Sam : 9h–13h',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 7 7l1-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  },
  {
    title: 'Par e-mail',
    info: 'contact@meubletn.tn',
    hours: 'Réponse sous 24h ouvrées',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  },
  {
    title: 'Chat en ligne',
    info: 'Disponible sur le site',
    hours: 'Lun–Ven : 9h–17h',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#db3a1b" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  },
]
</script>

<style scoped>
.info-page { background: #eeeeef; min-height: 100vh; }
.info-hero { padding: 48px 0; }
.info-hero--brand { background: linear-gradient(135deg, #db3a1b 0%, #8b1a07 100%); }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.info-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.info-sub { font-size: 16px; color: rgba(255,255,255,0.85); margin: 0; }
.content-wrap { padding: 36px 0 64px; }
.contact-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 984px) { .contact-grid { grid-template-columns: 1fr 320px; } }
.form-card { background: #fff; border-radius: 10px; padding: 32px; }
.form-title { font-size: 20px; font-weight: 700; color: #2f3133; margin: 0 0 24px; }
.contact-form { display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 13px; font-weight: 600; color: #2f3133; }
.form-input, .form-textarea { border: 1px solid #d9dadb; border-radius: 6px; padding: 11px 14px; font-size: 14px; color: #2f3133; outline: none; font-family: inherit; transition: border-color 0.15s; width: 100%; box-sizing: border-box; }
.form-input:focus, .form-textarea:focus { border-color: #2f3133; }
.form-textarea { resize: vertical; }
.submit-btn { background: #db3a1b; color: #fff; border: none; border-radius: 6px; padding: 13px 24px; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.submit-btn:hover { background: #ab331a; }
.success-msg { display: flex; align-items: center; gap: 10px; background: #d1fae5; color: #065f46; padding: 14px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; }
.contact-side { display: flex; flex-direction: column; gap: 16px; align-self: start; }
.channel-card { background: #fff; border-radius: 10px; padding: 20px; display: flex; gap: 14px; align-items: flex-start; }
.channel-icon { flex-shrink: 0; padding-top: 2px; }
.channel-title { font-size: 15px; font-weight: 700; color: #2f3133; margin: 0 0 4px; }
.channel-info { font-size: 14px; color: #2f3133; font-weight: 500; margin: 0 0 4px; }
.channel-hours { font-size: 12px; color: #717678; margin: 0; }
</style>