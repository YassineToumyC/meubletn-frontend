<template>
  <div class="tutorial-page">
    <div class="page-head">
      <h1 class="page-title">Guide d'utilisation du dashboard</h1>
      <p class="page-sub">Apprenez à utiliser toutes les fonctionnalités disponibles pour vous et vos agents.</p>
    </div>

    <!-- Role notice -->
    <div class="role-notice" :class="isFournisseur ? 'role-notice--owner' : 'role-notice--agent'">
      <svg v-if="isFournisseur" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>
        <strong>{{ isFournisseur ? 'Compte Fournisseur' : 'Compte Agent' }}</strong>
        — {{ isFournisseur
          ? 'Vous avez accès à toutes les fonctionnalités : annonces, agents et profil.'
          : 'Vous pouvez gérer les annonces uniquement. La gestion des agents et du profil est réservée au fournisseur.' }}
      </span>
    </div>

    <!-- Steps -->
    <div class="steps">

      <!-- Step 1 -->
      <div class="step-card">
        <div class="step-number">1</div>
        <div class="step-content">
          <h2 class="step-title">Créer une annonce</h2>
          <p class="step-desc">Publiez vos articles de mobilier et de décoration pour qu'ils apparaissent sur le site.</p>
          <ol class="step-list">
            <li>Cliquez sur <strong>« + Nouvelle annonce »</strong> en haut à droite ou dans le menu <em>Mes annonces</em>.</li>
            <li>Ajoutez jusqu'à <strong>8 photos</strong> de l'article (JPEG, PNG ou WebP, 5 Mo max par photo).</li>
            <li>Renseignez le <strong>titre</strong>, la <strong>description</strong>, le <strong>prix</strong> en Dinars Tunisiens et l'<strong>état</strong> de l'article.</li>
            <li>Choisissez une <strong>catégorie</strong> pour aider les visiteurs à trouver votre annonce.</li>
            <li>Activez le bouton <strong>« Publier immédiatement »</strong> pour que l'annonce soit visible sur le site dès la création.</li>
            <li>Cliquez sur <strong>« Publier l'annonce »</strong>.</li>
          </ol>
          <div class="tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003888" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span><strong>Conseil :</strong> Des photos de bonne qualité, bien éclairées et sous plusieurs angles augmentent significativement les vues.</span>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step-card">
        <div class="step-number">2</div>
        <div class="step-content">
          <h2 class="step-title">Gérer vos annonces</h2>
          <p class="step-desc">Dans <em>Mes annonces</em>, vous pouvez voir, modifier, activer/désactiver et supprimer vos publications.</p>
          <ol class="step-list">
            <li>Le tableau affiche toutes vos annonces avec leur <strong>photo</strong>, <strong>prix</strong>, <strong>état</strong> et nombre de <strong>vues</strong>.</li>
            <li>Utilisez les <strong>filtres</strong> (état, statut, recherche par titre) pour trouver rapidement une annonce.</li>
            <li>Cliquez sur <strong>« Actif / Inactif »</strong> pour afficher ou masquer une annonce sans la supprimer.</li>
            <li>Cliquez sur <strong>« Modifier »</strong> pour mettre à jour les informations ou remplacer les photos.</li>
            <li>Cliquez sur <strong>« Suppr. »</strong> pour supprimer définitivement l'annonce et ses photos.</li>
          </ol>
          <div class="tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003888" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span><strong>Conseil :</strong> Désactivez une annonce si l'article est temporairement indisponible, plutôt que de la supprimer.</span>
          </div>
        </div>
      </div>

      <!-- Step 3 — fournisseur only -->
      <div class="step-card" :class="{ 'step-card--locked': !isFournisseur }">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-title-row">
            <h2 class="step-title">Gérer vos agents</h2>
            <span v-if="!isFournisseur" class="locked-badge">Fournisseur uniquement</span>
          </div>
          <p class="step-desc">Ajoutez des membres de votre équipe pour qu'ils puissent gérer les annonces en votre nom.</p>
          <ol class="step-list">
            <li>Allez dans <strong>Mes agents</strong> depuis le menu latéral.</li>
            <li>Cliquez sur <strong>« + Ajouter un agent »</strong> et renseignez son prénom, nom, email et mot de passe.</li>
            <li>L'agent peut alors se connecter via la <strong>même page de connexion</strong> que vous avec ses propres identifiants.</li>
            <li>Un agent peut <strong>créer, modifier et supprimer des annonces</strong>, mais ne peut pas gérer le profil ni les autres agents.</li>
            <li>Vous pouvez <strong>désactiver</strong> un agent pour lui retirer l'accès sans supprimer son compte.</li>
          </ol>
          <div class="tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003888" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span><strong>Conseil :</strong> Chaque annonce créée par un agent reste liée à votre compte fournisseur et apparaît dans votre liste.</span>
          </div>
        </div>
      </div>

      <!-- Step 4 — fournisseur only -->
      <div class="step-card" :class="{ 'step-card--locked': !isFournisseur }">
        <div class="step-number">4</div>
        <div class="step-content">
          <div class="step-title-row">
            <h2 class="step-title">Gérer votre profil</h2>
            <span v-if="!isFournisseur" class="locked-badge">Fournisseur uniquement</span>
          </div>
          <p class="step-desc">Mettez à jour les informations de votre entreprise et sécurisez votre compte.</p>
          <ol class="step-list">
            <li>Allez dans <strong>Mon profil</strong> depuis le menu latéral.</li>
            <li>Modifiez le <strong>nom de l'entreprise</strong>, votre <strong>email</strong>, votre <strong>téléphone</strong>, votre <strong>adresse</strong> et votre <strong>ville</strong>.</li>
            <li>Dans la section <em>Sécurité</em>, changez votre <strong>mot de passe</strong> en saisissant l'ancien puis le nouveau.</li>
          </ol>
        </div>
      </div>

      <!-- Step 5 -->
      <div class="step-card">
        <div class="step-number">5</div>
        <div class="step-content">
          <h2 class="step-title">Bonnes pratiques pour vos annonces</h2>
          <p class="step-desc">Pour maximiser la visibilité et la qualité de vos annonces :</p>
          <ul class="best-practices">
            <li>
              <div class="bp-icon bp-icon--green">✓</div>
              <div><strong>Photos nettes et variées</strong> — prenez plusieurs angles, montrez les détails et éventuels défauts.</div>
            </li>
            <li>
              <div class="bp-icon bp-icon--green">✓</div>
              <div><strong>Titre précis</strong> — incluez le type de meuble, la matière et la couleur (ex : « Table basse en bois clair 120cm »).</div>
            </li>
            <li>
              <div class="bp-icon bp-icon--green">✓</div>
              <div><strong>Description complète</strong> — dimensions, matériaux, marque, raison de la vente, état exact.</div>
            </li>
            <li>
              <div class="bp-icon bp-icon--green">✓</div>
              <div><strong>Prix juste</strong> — comparez avec des annonces similaires pour fixer un prix attractif.</div>
            </li>
            <li>
              <div class="bp-icon bp-icon--green">✓</div>
              <div><strong>Catégorie correcte</strong> — choisissez la catégorie qui correspond le mieux à l'article.</div>
            </li>
            <li>
              <div class="bp-icon bp-icon--red">✗</div>
              <div><strong>Évitez</strong> les photos floues, les titres vagues comme « meuble » ou les descriptions vides.</div>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <!-- CTA -->
    <div class="cta-card">
      <h3>Prêt à publier votre première annonce ?</h3>
      <NuxtLink to="/fournisseur/dashboard/listings/create" class="cta-btn">
        + Créer une annonce maintenant
      </NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-auth' })

const { isFournisseur } = useFournisseurAuth()
</script>

<style scoped>
.tutorial-page { display: flex; flex-direction: column; gap: 28px; max-width: 820px; }

.page-head { display: flex; flex-direction: column; gap: 6px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0; }
.page-sub { font-size: 14px; color: #6b7280; margin: 0; }

/* Role notice */
.role-notice {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 14px 18px; border-radius: 10px; font-size: 14px; line-height: 1.5;
}
.role-notice--owner { background: #eff6ff; color: #003888; border: 1px solid #bfdbfe; }
.role-notice--agent { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
.role-notice svg { flex-shrink: 0; margin-top: 2px; }

/* Steps */
.steps { display: flex; flex-direction: column; gap: 16px; }
.step-card {
  display: flex; gap: 20px;
  background: #fff; border-radius: 12px; padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.step-card--locked { opacity: 0.55; }
.step-number {
  width: 36px; height: 36px; border-radius: 50%;
  background: #003888; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 800; flex-shrink: 0;
}
.step-content { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.step-title-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.step-title { font-size: 17px; font-weight: 700; color: #111827; margin: 0; }
.step-desc { font-size: 14px; color: #6b7280; margin: 0; }
.step-list { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
.step-list li { font-size: 14px; color: #374151; line-height: 1.55; }

.locked-badge {
  padding: 2px 10px; border-radius: 20px;
  background: #f3f4f6; color: #6b7280;
  font-size: 11px; font-weight: 600; white-space: nowrap;
}

/* Tip box */
.tip {
  display: flex; align-items: flex-start; gap: 8px;
  background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 8px; padding: 10px 14px; margin-top: 4px;
}
.tip span { font-size: 13px; color: #003888; line-height: 1.5; }
.tip svg { flex-shrink: 0; margin-top: 2px; }

/* Best practices */
.best-practices { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.best-practices li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #374151; }
.bp-icon {
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; flex-shrink: 0; margin-top: 1px;
}
.bp-icon--green { background: #dcfce7; color: #16a34a; }
.bp-icon--red   { background: #cdd9f0; color: #dc2626; }

/* CTA */
.cta-card {
  background: linear-gradient(135deg, #003888 0%, #002d6e 100%);
  border-radius: 14px; padding: 28px 32px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 20px; flex-wrap: wrap;
}
.cta-card h3 { color: #fff; font-size: 18px; font-weight: 700; margin: 0; }
.cta-btn {
  background: #fff; color: #003888;
  padding: 11px 24px; border-radius: 8px;
  font-size: 14px; font-weight: 700; text-decoration: none;
  white-space: nowrap; transition: opacity 0.15s;
}
.cta-btn:hover { opacity: 0.9; }
</style>