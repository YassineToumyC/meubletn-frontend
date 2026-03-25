<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div v-if="isOpen" class="sidebar-backdrop" @click="close" />
  </Transition>

  <!-- Drawer: expands horizontally when a sub-panel opens -->
  <Transition name="slide">
    <div v-if="isOpen" class="sidebar" :class="{ 'sidebar--expanded': activeCategory !== null }" role="dialog" aria-modal="true" aria-label="Navigation">

      <!-- ── Left column: always visible ── -->
      <div class="col col-main">
        <div class="col-head">
          <span class="col-title">Nos catégories</span>
          <button class="close-btn" @click="close" aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <ul class="cat-list">
          <li v-for="cat in categories" :key="cat.slug">
            <button
              class="cat-item"
              :class="{ 'cat-item--active': activeCategory?.slug === cat.slug }"
              @click="selectCategory(cat)"
            >
              <span class="cat-item-icon">
                <img :src="getCategoryImage(cat.slug)" :alt="cat.name" class="cat-icon-img" />
              </span>
              <span class="cat-item-label">{{ cat.name }}</span>
              <svg class="cat-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </li>
        </ul>

        <div class="col-footer">
          <NuxtLink to="/soldes" class="footer-link footer-link--red" @click="close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            Soldes
          </NuxtLink>
          <NuxtLink to="/nouveautes" class="footer-link" @click="close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Nouveautés
          </NuxtLink>
        </div>
      </div>

      <!-- ── Right column: sub-categories, slides in alongside ── -->
      <Transition name="sub-slide">
        <div v-if="activeCategory !== null" class="col col-sub">
          <div class="col-head col-head--sub">
            <div class="sub-title-row">
              <span class="sub-cat-icon">
                <img :src="getCategoryImage(activeCategory.slug)" :alt="activeCategory.name" class="cat-icon-img" />
              </span>
              <span class="col-title">{{ activeCategory.name }}</span>
            </div>
          </div>

          <NuxtLink
            :to="`/categorie/${activeCategory.slug}`"
            class="see-all-link"
            @click="close"
          >
            Voir tout
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </NuxtLink>

          <ul class="sub-list">
            <li v-for="sub in activeCategory.subcategories" :key="sub.slug">
              <NuxtLink
                :to="`/categorie/${activeCategory.slug}/${sub.slug}`"
                class="sub-item"
                @click="close"
              >
                <img
                  :src="getSubcategoryImage(sub.slug, activeCategory.slug)"
                  :alt="sub.name"
                  class="sub-item-img"
                />
                {{ sub.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </Transition>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { NavCategory } from '~/composables/useCategories'
import { getCategoryImage, getSubcategoryImage } from '~/composables/useCategoryIcons'

const { isOpen, close } = useSidebar()
const { categories } = useCategories()
const activeCategory = ref<NavCategory | null>(null)

function selectCategory(cat: NavCategory) {
  activeCategory.value = activeCategory.value?.slug === cat.slug ? null : cat
}

watch(isOpen, (val) => {
  if (!val) setTimeout(() => { activeCategory.value = null }, 300)
})

const route = useRoute()
watch(() => route.path, () => close())
</script>

<style scoped>
/* ── Backdrop ── */
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2000;
}

/* ── Drawer ── */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  /* default width: just the main column */
  width: 272px;
  background: #ffffff;
  z-index: 2001;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  transition: width 0.26s cubic-bezier(0.4, 0, 0.2, 1);
}
/* expand when sub-panel is open */
.sidebar--expanded {
  width: 520px;
  max-width: 95vw;
}

/* ── Column base ── */
.col {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
}

/* ── Left column ── */
.col-main {
  width: 272px;
  border-right: 1px solid #e2e4e4;
}

.col-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px 0 18px;
  height: 56px;
  border-bottom: 1px solid #e2e4e4;
  flex-shrink: 0;
}
.col-title {
  font-size: 15px;
  font-weight: bold;
  color: #2f3133;
}
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #717678;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}
.close-btn:hover { background-color: #eeeeef; color: #2f3133; }

/* Category list */
.cat-list {
  list-style: none;
  margin: 0;
  padding: 6px 0;
  overflow-y: auto;
  flex: 1;
}
.cat-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px 10px 18px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  color: #2f3133;
  cursor: pointer;
  transition: background-color 0.12s;
  border-left: 3px solid transparent;
}
.cat-item:hover {
  background-color: #fafafa;
  border-left-color: #e2e4e4;
}
.cat-item--active {
  background-color: #fef0ec;
  border-left-color: #db3a1b;
  color: #db3a1b;
}
.cat-item--active .cat-item-icon { background-color: #ffffff; color: #db3a1b; }
.cat-item--active .cat-chevron { color: #db3a1b; }
.cat-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #f5f5f6;
  flex-shrink: 0;
  overflow: hidden;
  transition: opacity 0.12s;
}
.cat-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cat-item-label { flex: 1; font-weight: 500; line-height: 1.3; }
.cat-chevron {
  color: #d9dadb;
  flex-shrink: 0;
  transition: color 0.12s;
}
.cat-item:hover .cat-chevron { color: #a0a4a8; }

/* Footer */
.col-footer {
  border-top: 1px solid #e2e4e4;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
}
.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 6px;
  background-color: #f5f5f6;
  color: #2f3133;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.15s;
}
.footer-link:hover { background-color: #eeeeef; }
.footer-link--red { color: #db3a1b; }

/* ── Right column: sub-categories ── */
.col-sub {
  width: 248px;
  background: #fafafa;
  overflow: hidden;
}
.col-head--sub {
  border-bottom-color: #e2e4e4;
  padding: 0 16px;
}
.sub-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sub-cat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #fef0ec;
  flex-shrink: 0;
  overflow: hidden;
}

.see-all-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 12px 4px;
  padding: 9px 12px;
  background-color: #ffffff;
  border: 1px solid #e2e4e4;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
  color: #db3a1b;
  text-decoration: none;
  transition: background-color 0.15s, border-color 0.15s;
  flex-shrink: 0;
}
.see-all-link:hover { background-color: #fef0ec; border-color: #f8c9c2; }

.sub-list {
  list-style: none;
  margin: 4px 0 0;
  padding: 0 12px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.sub-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #47494c;
  text-decoration: none;
  transition: background-color 0.12s, color 0.12s;
}
.sub-item:hover { background-color: #ffffff; color: #2f3133; }
.sub-item-img {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: #f5f5f6;
}

/* ── Transitions ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.22s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.26s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }

.sub-slide-enter-active { transition: opacity 0.2s 0.05s, transform 0.22s 0.05s cubic-bezier(0.4, 0, 0.2, 1); }
.sub-slide-leave-active { transition: opacity 0.15s, transform 0.18s cubic-bezier(0.4, 0, 0.2, 1); }
.sub-slide-enter-from { opacity: 0; transform: translateX(20px); }
.sub-slide-leave-to { opacity: 0; transform: translateX(20px); }
</style>
