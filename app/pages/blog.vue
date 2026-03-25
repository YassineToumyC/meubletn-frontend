<template>
  <div class="blog-page">
    <div class="blog-hero">
      <div class="wrap">
        <h1 class="blog-title">Le Blog meubletn</h1>
        <p class="blog-sub">Inspirations déco, conseils d'aménagement et tendances du moment</p>
      </div>
    </div>
    <div class="wrap content-wrap">
      <!-- Featured article -->
      <div class="featured-article">
        <NuxtLink to="#" class="feat-img-wrap">
          <img src="https://picsum.photos/seed/blog-feat/1200/500" alt="Article vedette" class="feat-img" />
        </NuxtLink>
        <div class="feat-body">
          <span class="feat-tag">Tendance</span>
          <h2 class="feat-title"><NuxtLink to="#">10 idées pour un salon scandinave réussi en 2025</NuxtLink></h2>
          <p class="feat-excerpt">Découvrez comment intégrer l'esthétique nordique dans votre salon avec des meubles épurés, des matières naturelles et une palette de couleurs douces qui invitent à la détente.</p>
          <div class="feat-meta">
            <span>Par Sarra Bchiri</span>
            <span>·</span>
            <span>12 mars 2025</span>
            <span>·</span>
            <span>5 min de lecture</span>
          </div>
        </div>
      </div>

      <!-- Article grid -->
      <div class="articles-grid">
        <article v-for="article in articles" :key="article.id" class="article-card">
          <NuxtLink to="#" class="article-img-wrap">
            <img :src="`https://picsum.photos/seed/blog${article.id}/600/350`" :alt="article.title" class="article-img" />
            <span class="article-tag">{{ article.tag }}</span>
          </NuxtLink>
          <div class="article-body">
            <h3 class="article-title"><NuxtLink to="#">{{ article.title }}</NuxtLink></h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <span>{{ article.author }}</span>
              <span>·</span>
              <span>{{ article.date }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Blog — Inspirations déco | meubletn' })

const articles = [
  { id: 2, tag: 'Déco', title: 'Comment choisir son canapé pour un petit salon ?', excerpt: 'Surface réduite ne rime pas avec compromis sur le confort. Voici nos astuces pour trouver le canapé idéal.', author: 'Ines Hamdi', date: '5 mars 2025' },
  { id: 3, tag: 'Conseils', title: '5 erreurs à éviter lors de l\'achat d\'un matelas', excerpt: 'Fermeté, taille, matériaux... Nos experts décodent tout pour vous aider à choisir le matelas parfait.', author: 'Karim Jrad', date: '28 févr. 2025' },
  { id: 4, tag: 'Tendance', title: 'Le bureau à domicile : les essentiels de 2025', excerpt: 'Télétravail ou passion, votre espace bureau mérite une attention particulière. Découvrez les indispensables.', author: 'Sarra Bchiri', date: '20 févr. 2025' },
  { id: 5, tag: 'DIY', title: 'Relooker son salon en un week-end sans se ruiner', excerpt: 'Quelques accessoires bien choisis peuvent transformer complètement l\'ambiance d\'une pièce.', author: 'Ines Hamdi', date: '14 févr. 2025' },
  { id: 6, tag: 'Conseils', title: 'Chambre d\'enfant : sécurité et créativité réunies', excerpt: 'Créer un espace ludique, sécurisé et évolutif pour votre enfant, étape par étape.', author: 'Karim Jrad', date: '8 févr. 2025' },
]
</script>

<style scoped>
.blog-page { background: #eeeeef; min-height: 100vh; }
.blog-hero { background: linear-gradient(135deg, #2f3133 0%, #5a6a8e 100%); padding: 48px 0; }
.wrap { max-width: 1600px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 632px) { .wrap { padding: 0 24px; } }
@media (min-width: 984px) { .wrap { padding: 0 48px; } }
.blog-title { font-size: 36px; font-weight: 700; color: #fff; margin: 0 0 10px; }
.blog-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin: 0; }
.content-wrap { padding: 36px 0 64px; }
.featured-article { background: #fff; border-radius: 10px; overflow: hidden; display: grid; grid-template-columns: 1fr; margin-bottom: 32px; }
@media (min-width: 984px) { .featured-article { grid-template-columns: 3fr 2fr; } }
.feat-img-wrap { display: block; overflow: hidden; }
.feat-img { width: 100%; height: 100%; min-height: 240px; object-fit: cover; transition: transform 0.4s; }
.feat-img-wrap:hover .feat-img { transform: scale(1.03); }
.feat-body { padding: 28px; display: flex; flex-direction: column; justify-content: center; }
.feat-tag { display: inline-block; background: #fff0ed; color: #db3a1b; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin-bottom: 12px; text-transform: uppercase; }
.feat-title { font-size: 22px; font-weight: 700; margin: 0 0 14px; }
.feat-title a { color: #2f3133; text-decoration: none; }
.feat-title a:hover { color: #db3a1b; }
.feat-excerpt { font-size: 14px; color: #5b5e61; line-height: 1.7; margin-bottom: 16px; }
.feat-meta { font-size: 12px; color: #717678; display: flex; gap: 6px; flex-wrap: wrap; }
.articles-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 632px) { .articles-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 984px) { .articles-grid { grid-template-columns: repeat(3, 1fr); } }
.article-card { background: #fff; border-radius: 10px; overflow: hidden; transition: box-shadow 0.2s; }
.article-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.1); }
.article-img-wrap { display: block; position: relative; aspect-ratio: 16/9; overflow: hidden; }
.article-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s; }
.article-img-wrap:hover .article-img { transform: scale(1.05); }
.article-tag { position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); color: #fff; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; }
.article-body { padding: 18px; }
.article-title { font-size: 15px; font-weight: 700; margin: 0 0 8px; line-height: 1.3; }
.article-title a { color: #2f3133; text-decoration: none; }
.article-title a:hover { color: #db3a1b; }
.article-excerpt { font-size: 13px; color: #5b5e61; line-height: 1.6; margin-bottom: 12px; }
.article-meta { font-size: 12px; color: #717678; display: flex; gap: 6px; }
</style>