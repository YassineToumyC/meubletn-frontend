<template>
  <div class="form-page">
    <div class="form-header">
      <NuxtLink to="/fournisseur/dashboard/listings" class="back-link">← Retour aux annonces</NuxtLink>
      <h1 class="form-title">Nouvelle annonce</h1>
    </div>

    <form class="form-card" @submit.prevent="submit">

      <!-- Images -->
      <section class="form-section">
        <h2 class="section-title">Photos <span class="hint">— jusqu'à 8 images (JPEG, PNG, WebP · 5 Mo max chacune)</span></h2>
        <div class="image-grid">
          <label
            v-for="(img, i) in previewImages"
            :key="i"
            class="img-slot img-slot--filled"
          >
            <img :src="img" class="img-preview" />
            <button type="button" class="img-remove" @click.prevent="removeImage(i)">✕</button>
          </label>
          <label v-if="previewImages.length < 8" class="img-slot img-slot--add">
            <input ref="fileInput" type="file" accept="image/*" multiple class="sr-only" @change="onFilesSelected" />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Ajouter</span>
          </label>
        </div>
      </section>

      <!-- Basic info -->
      <section class="form-section">
        <h2 class="section-title">Informations</h2>
        <div class="field">
          <label>Titre *</label>
          <input v-model="form.title" type="text" maxlength="255" placeholder="Ex: Canapé 3 places en cuir marron" required />
        </div>
        <div class="field">
          <label>Description</label>
          <textarea v-model="form.description" rows="4" maxlength="5000" placeholder="Décrivez l'article : matière, dimensions, couleur, état…" />
        </div>
        <div class="row">
          <div class="field">
            <label>Prix (DT)</label>
            <input v-model.number="form.price" type="number" min="0" step="0.001" placeholder="Ex: 850" />
          </div>
          <div class="field">
            <label>État *</label>
            <select v-model="form.condition" required>
              <option value="">— Choisir —</option>
              <option v-for="o in CONDITION_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Marque</label>
            <input v-model="form.marque" type="text" maxlength="100" placeholder="Ex: IKEA, Conforama…" />
          </div>
          <div class="field">
            <label>Dimensions</label>
            <input v-model="form.dimensions" type="text" maxlength="150" placeholder="Ex: L120 × P60 × H75 cm" />
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>Ville</label>
            <input v-model="form.ville" type="text" maxlength="100" placeholder="Ex: Tunis, Sfax…" />
          </div>
          <div class="field toggle-field">
            <label>Livraison disponible</label>
            <button
              type="button"
              class="toggle-btn"
              :class="form.livraison ? 'toggle-btn--on' : 'toggle-btn--off'"
              @click="form.livraison = !form.livraison"
            >{{ form.livraison ? 'Oui' : 'Non' }}</button>
          </div>
        </div>
      </section>

      <!-- Category -->
      <section class="form-section">
        <h2 class="section-title">Catégorie <span class="hint">(optionnel)</span></h2>
        <div class="row">
          <div class="field">
            <label>Catégorie</label>
            <select v-model="form.category_id" @change="form.subcategory_id = null">
              <option :value="null">— Aucune —</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="field">
            <label>Sous-catégorie</label>
            <select v-model="form.subcategory_id" :disabled="!form.category_id">
              <option :value="null">— Aucune —</option>
              <option v-for="sub in currentSubs" :key="sub.id" :value="sub.id">{{ sub.name }}</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Publication -->
      <section class="form-section">
        <h2 class="section-title">Publication</h2>
        <div class="toggle-row">
          <span class="toggle-label">Publier immédiatement</span>
          <button
            type="button"
            class="toggle-btn"
            :class="form.is_active ? 'toggle-btn--on' : 'toggle-btn--off'"
            @click="form.is_active = !form.is_active"
          >{{ form.is_active ? 'Oui' : 'Non' }}</button>
        </div>
      </section>

      <div v-if="errors.length" class="error-box">
        <div v-for="err in errors" :key="err">{{ err }}</div>
      </div>

      <div class="form-actions">
        <NuxtLink to="/fournisseur/dashboard/listings" class="cancel-btn">Annuler</NuxtLink>
        <button type="submit" class="save-btn" :disabled="saving">
          {{ saving ? 'Publication…' : 'Publier l\'annonce' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { CONDITION_OPTIONS } from '~/composables/useDashboardAnnouncements'

definePageMeta({ layout: 'fournisseur', middleware: 'fournisseur-auth' })

const { categories: navCats } = useCategories()
const { create } = useDashboardAnnouncements()

const categories = computed(() => navCats.value)
const currentSubs = computed(() => {
  if (!form.category_id) return []
  return categories.value.find((c: any) => c.id === form.category_id)?.subcategories ?? []
})

const form = reactive({
  title:          '',
  description:    '',
  price:          null as number | null,
  condition:      '' as string,
  marque:         '',
  dimensions:     '',
  ville:          '',
  livraison:      false,
  is_active:      true,
  category_id:    null as number | null,
  subcategory_id: null as number | null,
})

const imageFiles    = ref<File[]>([])
const previewImages = ref<string[]>([])
const errors        = ref<string[]>([])
const saving        = ref(false)
const fileInput     = ref<HTMLInputElement | null>(null)

function onFilesSelected(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  const remaining = 8 - imageFiles.value.length
  const selected  = Array.from(input.files).slice(0, remaining)
  selected.forEach(file => {
    imageFiles.value.push(file)
    previewImages.value.push(URL.createObjectURL(file))
  })
  if (fileInput.value) fileInput.value.value = ''
}

function removeImage(index: number) {
  URL.revokeObjectURL(previewImages.value[index] ?? '')
  imageFiles.value.splice(index, 1)
  previewImages.value.splice(index, 1)
}

async function submit() {
  errors.value = []
  if (!form.condition) { errors.value = ['Veuillez choisir un état.']; return }
  saving.value = true
  try {
    await create({
      ...form,
      price:      form.price ?? undefined,
      imageFiles: imageFiles.value,
    })
    await navigateTo('/fournisseur/dashboard/listings')
  } catch (e: any) {
    const data = e?.data
    if (data?.errors) {
      errors.value = Object.values(data.errors).flat() as string[]
    } else {
      errors.value = [data?.message || 'Erreur lors de la création.']
    }
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.form-page { display: flex; flex-direction: column; gap: 24px; max-width: 860px; }
.form-header { display: flex; flex-direction: column; gap: 8px; }
.back-link { font-size: 13px; color: #6b7280; text-decoration: none; }
.back-link:hover { color: #111827; }
.form-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0; }

.form-card { display: flex; flex-direction: column; gap: 0; background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); overflow: hidden; }
.form-section { padding: 24px 28px; border-bottom: 1px solid #f3f4f6; }
.section-title { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 16px; }
.hint { font-size: 11px; font-weight: 400; color: #9ca3af; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 13px; font-weight: 600; color: #374151; }
.field input, .field select, .field textarea {
  border: 1.5px solid #d1d5db; border-radius: 8px;
  padding: 10px 14px; font-size: 14px; color: #111827;
  outline: none; background: #fff; transition: border-color 0.15s; font-family: inherit;
}
.field input:focus, .field select:focus, .field textarea:focus { border-color: #db3a1b; }
.field textarea { resize: vertical; }
.field select:disabled { background: #f9fafb; color: #9ca3af; cursor: not-allowed; }
.row { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 16px; }

/* Image uploader */
.image-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.img-slot {
  width: 96px; height: 96px; border-radius: 8px; overflow: hidden;
  cursor: pointer; position: relative; flex-shrink: 0;
}
.img-slot--filled { border: none; }
.img-slot--add {
  border: 2px dashed #d1d5db; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 4px;
  font-size: 11px; color: #9ca3af; transition: border-color 0.15s;
}
.img-slot--add:hover { border-color: #db3a1b; color: #db3a1b; }
.img-preview { width: 100%; height: 100%; object-fit: cover; }
.img-remove {
  position: absolute; top: 4px; right: 4px;
  background: rgba(0,0,0,0.6); color: #fff; border: none;
  width: 20px; height: 20px; border-radius: 50%; font-size: 10px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

/* Toggle */
.toggle-row { display: flex; align-items: center; gap: 12px; }
.toggle-label { font-size: 13px; font-weight: 600; color: #374151; }
.toggle-field { justify-content: flex-start; flex-direction: column; gap: 8px; }
.toggle-btn { padding: 6px 18px; border-radius: 20px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; align-self: flex-start; }
.toggle-btn--on  { background: #dcfce7; color: #16a34a; }
.toggle-btn--off { background: #f3f4f6; color: #6b7280; }

.error-box { margin: 0 28px; background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; font-size: 13px; padding: 12px 16px; border-radius: 8px; display: flex; flex-direction: column; gap: 4px; }

.form-actions { padding: 20px 28px; display: flex; justify-content: flex-end; gap: 12px; }
.cancel-btn { padding: 10px 22px; border: 1.5px solid #d1d5db; border-radius: 8px; background: #fff; font-size: 14px; font-weight: 600; color: #374151; text-decoration: none; transition: background 0.15s; }
.cancel-btn:hover { background: #f9fafb; }
.save-btn { padding: 10px 24px; background: #db3a1b; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.save-btn:hover:not(:disabled) { background: #ab331a; }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>