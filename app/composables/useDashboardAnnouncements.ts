export interface DashAnnouncement {
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
  is_active: boolean
  views: number
  category_id: number | null
  subcategory_id: number | null
  category: { id: number; name: string } | null
  subcategory: { id: number; name: string } | null
  fournisseur_id: number
  agent_id: number | null
  created_at: string
}

export const CONDITION_OPTIONS = [
  { value: 'new',      label: 'Neuf' },
  { value: 'like_new', label: 'Comme neuf' },
  { value: 'used',     label: 'Occasion' },
]

export const useDashboardAnnouncements = () => {
  const { apiFetch } = useFournisseurAuth()
  const config       = useRuntimeConfig()
  const annonces     = useState<DashAnnouncement[]>('dash_annonces', () => [])
  const pending      = useState<boolean>('dash_annonces_pending', () => false)

  function storageUrl(path: string): string {
    return `${config.public.storageBase}/${path}`
  }

  async function fetchAll(force = false) {
    if (!force && annonces.value.length > 0) return
    pending.value = true
    try {
      annonces.value = await apiFetch<DashAnnouncement[]>('/dashboard/announcements')
    } finally {
      pending.value = false
    }
  }

  /**
   * Create with image upload — uses FormData so images are sent as files
   */
  async function create(payload: {
    title: string
    description?: string
    price?: number | null
    condition: string
    marque?: string | null
    dimensions?: string | null
    ville?: string | null
    livraison?: boolean
    category_id?: number | null
    subcategory_id?: number | null
    is_active?: boolean
    imageFiles?: File[]
  }): Promise<DashAnnouncement> {
    const fd = buildFormData(payload)
    const data = await apiFetch<DashAnnouncement>('/dashboard/announcements', {
      method: 'POST',
      body:   fd,
    })
    annonces.value.unshift(data)
    return data
  }

  /**
   * Update with optional new image files and list of paths to keep
   */
  async function update(id: number, payload: {
    title?: string
    description?: string
    price?: number | null
    condition?: string
    marque?: string | null
    dimensions?: string | null
    ville?: string | null
    livraison?: boolean
    category_id?: number | null
    subcategory_id?: number | null
    is_active?: boolean
    imageFiles?: File[]
    keepImages?: string[]
  }): Promise<DashAnnouncement> {
    const fd = buildFormData(payload)
    if (payload.keepImages) {
      payload.keepImages.forEach(p => fd.append('keep_images[]', p))
    }
    // Laravel doesn't support PUT with multipart; use POST + _method override
    fd.append('_method', 'PUT')
    const data = await apiFetch<DashAnnouncement>(`/dashboard/announcements/${id}`, {
      method: 'POST',
      body:   fd,
    })
    const idx = annonces.value.findIndex(a => a.id === id)
    if (idx !== -1) annonces.value[idx] = data
    return data
  }

  async function toggleActive(id: number): Promise<void> {
    const a = annonces.value.find(x => x.id === id)
    if (!a) return
    await update(id, { is_active: !a.is_active, keepImages: a.images })
  }

  async function remove(id: number): Promise<void> {
    await apiFetch(`/dashboard/announcements/${id}`, { method: 'DELETE' })
    annonces.value = annonces.value.filter(a => a.id !== id)
  }

  async function getOne(id: number): Promise<DashAnnouncement> {
    return apiFetch<DashAnnouncement>(`/dashboard/announcements/${id}`)
  }

  return {
    annonces, pending, storageUrl,
    fetchAll, create, update, toggleActive, remove, getOne,
  }
}

// ─────────────────────────────────────────────────────────────
function buildFormData(payload: Record<string, any>): FormData {
  const fd = new FormData()
  const { imageFiles, keepImages, ...rest } = payload

  for (const [key, val] of Object.entries(rest)) {
    if (val === null || val === undefined) continue
    // Laravel boolean validation accepts 1/0, not "true"/"false"
    if (typeof val === 'boolean') {
      fd.append(key, val ? '1' : '0')
    } else {
      fd.append(key, String(val))
    }
  }
  if (imageFiles) {
    imageFiles.forEach((f: File) => fd.append('images[]', f))
  }
  return fd
}