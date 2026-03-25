export default defineNuxtPlugin(async () => {
  const { token, fetchUser } = useFournisseurAuth()
  if (token.value) {
    await fetchUser()
  }
})
