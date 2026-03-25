<script setup lang="ts">
// Redirect /checkout/cart → /panier
await navigateTo('/panier', { redirectCode: 301 })
</script>
