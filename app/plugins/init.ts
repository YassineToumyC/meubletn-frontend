export default defineNuxtPlugin(async () => {
  const { fetchCategories } = useCategories()
  const { token, user, fetchUser } = useFournisseurAuth()

  const tasks: Promise<any>[] = [fetchCategories()]

  // If a fournisseur/agent token exists but state was lost (e.g. new tab),
  // re-fetch user so the dashboard layout works immediately.
  if (token.value && !user.value) {
    tasks.push(fetchUser())
  }

  await Promise.all(tasks)
})