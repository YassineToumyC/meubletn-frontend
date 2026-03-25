<template>
  <div class="site-wrapper">
    <TheHeader />
    <TheSidebar />
    <main class="site-main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style>
.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.site-main {
  flex: 1;
}
</style>
