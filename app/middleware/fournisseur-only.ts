export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn, isFournisseur } = useFournisseurAuth()
  if (!isLoggedIn.value) return navigateTo('/fournisseur/login')
  if (!isFournisseur.value) return navigateTo('/fournisseur/dashboard')
})
