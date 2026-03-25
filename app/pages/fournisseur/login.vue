<script setup lang="ts">
definePageMeta({ layout: false })
await navigateTo('/auth/login', { redirectCode: 301 })
</script>