export interface Listing {
  id: number
  fournisseur_id: number
  agent_id: number | null
  category_id: number | null
  subcategory_id: number | null
  titre: string
  description: string | null
  prix: number | null
  prix_barre: number | null
  ville: string | null
  images: string[] | null
  statut: 'brouillon' | 'actif' | 'inactif'
  vues: number
  created_at: string
  updated_at: string
  category?: { id: number; name: string }
  subcategory?: { id: number; name: string }
  agent?: { id: number; nom: string; prenom: string }
}

export type ListingPayload = Omit<Listing,
  'id' | 'fournisseur_id' | 'agent_id' | 'vues' | 'created_at' | 'updated_at' | 'category' | 'subcategory' | 'agent'
>

export const useListings = () => {
  const { apiFetch } = useFournisseurAuth()
  const listings = useState<Listing[]>('f_listings', () => [])
  const pending  = useState<boolean>('f_listings_pending', () => false)

  async function fetchAll() {
    pending.value = true
    try {
      listings.value = await apiFetch<Listing[]>('/dashboard/listings')
    } finally {
      pending.value = false
    }
  }

  async function create(payload: Partial<ListingPayload>): Promise<Listing> {
    const data = await apiFetch<Listing>('/dashboard/listings', {
      method: 'POST',
      body: payload,
    })
    listings.value.unshift(data)
    return data
  }

  async function update(id: number, payload: Partial<ListingPayload>): Promise<Listing> {
    const data = await apiFetch<Listing>(`/dashboard/listings/${id}`, {
      method: 'PUT',
      body: payload,
    })
    const idx = listings.value.findIndex(l => l.id === id)
    if (idx !== -1) listings.value[idx] = data
    return data
  }

  async function remove(id: number): Promise<void> {
    await apiFetch(`/dashboard/listings/${id}`, { method: 'DELETE' })
    listings.value = listings.value.filter(l => l.id !== id)
  }

  async function getOne(id: number): Promise<Listing> {
    return apiFetch<Listing>(`/dashboard/listings/${id}`)
  }

  return { listings, pending, fetchAll, create, update, remove, getOne }
}
