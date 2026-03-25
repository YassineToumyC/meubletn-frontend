export default defineNuxtRouteMiddleware(async () => {
  const { token, user, fetchUser } = useFournisseurAuth()

  if (!token.value) {
    return navigateTo('/fournisseur/login')
  }

  // If token exists but user not loaded yet (e.g. first load), fetch it
  if (!user.value) {
    await fetchUser()
  }

  if (!user.value) {
    return navigateTo('/fournisseur/login')
  }
})