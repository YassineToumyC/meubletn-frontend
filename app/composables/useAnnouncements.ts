export interface AnnouncementCategory {
  id: number
  name: string
  slug: string
}

export interface Announcement {
  id: number
  slug: string
  title: string
  description: string | null
  price: number | null
  images: string[]
  condition: 'new' | 'like_new' | 'used'
  marque: string | null
  dimensions: string | null
  ville: string | null
  livraison: boolean
  views: number
  category: AnnouncementCategory | null
  subcategory: { id: number; name: string } | null
  fournisseur: { id: number; nom_entreprise: string }
  created_at: string
}

export interface AnnouncementsPage {
  data: Announcement[]
  current_page: number
  last_page: number
  total: number
}

export const CONDITION_LABELS: Record<string, string> = {
  new:       'Neuf',
  like_new:  'Comme neuf',
  used:      'Occasion',
}

export const useAnnouncements = () => {
  const config      = useRuntimeConfig()
  const announcements = useState<Announcement[]>('announcements', () => [])
  const pagination  = useState<{ currentPage: number; lastPage: number; total: number }>(
    'announcements_pagination',
    () => ({ currentPage: 1, lastPage: 1, total: 0 }),
  )
  const pending     = useState<boolean>('announcements-pending', () => false)

  function storageUrl(path: string): string {
    return `${config.public.storageBase}/${path}`
  }

  async function fetchAnnouncements(params: {
    page?: number
    per_page?: number
    category?: number | null
    subcategory?: number | null
    search?: string
    condition?: string
    sort?: string
    price_asc?: boolean
    price_desc?: boolean
    force?: boolean
  } = {}) {
    if (!params.force && !params.page && !params.category && !params.search && announcements.value.length > 0) return

    pending.value = true
    try {
      const query: Record<string, any> = {}
      if (params.page)       query.page        = params.page
      if (params.per_page)   query.per_page    = params.per_page
      if (params.category)   query.category    = params.category
      if (params.subcategory) query.subcategory = params.subcategory
      if (params.search)     query.search      = params.search
      if (params.condition)  query.condition   = params.condition
      if (params.sort)       query.sort        = params.sort
      if (params.price_asc)  query.sort        = 'price_asc'
      if (params.price_desc) query.sort        = 'price_desc'

      const data = await $fetch<AnnouncementsPage>(
        `${config.public.apiBase}/announcements`,
        { params: query },
      )
      announcements.value = data.data
      pagination.value = {
        currentPage: data.current_page,
        lastPage:    data.last_page,
        total:       data.total,
      }
    } catch {
      // silently fail
    } finally {
      pending.value = false
    }
  }

  async function fetchOne(slug: string): Promise<Announcement | null> {
    try {
      return await $fetch<Announcement>(`${config.public.apiBase}/announcements/${slug}`)
    } catch {
      return null
    }
  }

  return {
    announcements,
    pagination,
    pending,
    storageUrl,
    fetchAnnouncements,
    fetchOne,
  }
}