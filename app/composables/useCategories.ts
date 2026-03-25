export interface Subcategory {
  id: number
  name: string
  slug: string
  position: number
}

export interface NavCategory {
  id: number
  name: string
  slug: string
  icon: string
  position: number
  subcategories: Subcategory[]
}

export const useCategories = () => {
  const config = useRuntimeConfig()
  const categories = useState<NavCategory[]>('categories', () => [])
  const pending = useState<boolean>('categories-pending', () => false)
  const error = useState<string | null>('categories-error', () => null)

  async function fetchCategories() {
    if (categories.value.length > 0) return
    pending.value = true
    error.value = null
    try {
      const data = await $fetch<NavCategory[]>(`${config.public.apiBase}/categories`)
      categories.value = data
    } catch {
      error.value = 'Erreur lors du chargement des catégories.'
    } finally {
      pending.value = false
    }
  }

  return { categories, pending, error, fetchCategories }
}