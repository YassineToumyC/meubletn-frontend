<template>
  <nav class="category-nav" aria-label="Navigation categories">
    <div class="nav-inner">
      <ul class="nav-list">
        <li v-for="cat in categories" :key="cat.slug" class="nav-item">
          <NuxtLink :to="`/categorie/${cat.slug}`" class="nav-link">
            {{ cat.name }}
          </NuxtLink>
        </li>
        <li class="nav-item nav-item--sale">
          <NuxtLink to="/soldes" class="nav-link nav-link--sale">Soldes</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { categories } = useCategories()
</script>

<style scoped>
.category-nav {
  background-color: #ffffff;
  border-bottom: 1px solid #e2e4e4;
  display: none;
}
@media (min-width: 984px) {
  .category-nav { display: block; }
}
.nav-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 48px;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav-inner::-webkit-scrollbar { display: none; }
@media (min-width: 1392px) {
  .nav-inner { padding: 0 64px; }
}
.nav-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
  white-space: nowrap;
}
.nav-item { display: flex; }
.nav-link {
  display: block;
  padding: 12px 14px;
  font-size: 14px;
  color: #47494c;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}
.nav-link:hover {
  color: #2f3133;
  border-bottom-color: #db3a1b;
}
.nav-link.router-link-active {
  color: #db3a1b;
  font-weight: bold;
  border-bottom-color: #db3a1b;
}
.nav-link--sale { color: #db3a1b; font-weight: bold; }
.nav-link--sale:hover { color: #ab331a; border-bottom-color: #ab331a; }
</style>