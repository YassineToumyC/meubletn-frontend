export interface FournisseurUser {
  id: number
  type: 'fournisseur' | 'agent'
  email: string
  telephone?: string
  adresse?: string
  ville?: string
  // fournisseur fields
  nom_entreprise?: string
  logo?: string
  statut?: string
  fournisseur_id?: number
  // agent fields
  nom?: string
  prenom?: string
  // permissions
  can_manage_agents: boolean
  can_edit_profile: boolean
}

export const useFournisseurAuth = () => {
  const config = useRuntimeConfig()
  const token  = useCookie<string | null>('f_token', { maxAge: 31536000, sameSite: 'lax' })
  const user   = useState<FournisseurUser | null>('f_user', () => null)

  const isLoggedIn    = computed(() => !!token.value && !!user.value)
  const isFournisseur = computed(() => user.value?.type === 'fournisseur')
  const isAgent       = computed(() => user.value?.type === 'agent')

  function apiFetch<T>(path: string, opts: any = {}): Promise<T> {
    return $fetch<T>(`${config.public.apiBase}${path}`, {
      ...opts,
      headers: {
        'Accept': 'application/json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
        ...(opts.headers ?? {}),
      },
    })
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const data = await apiFetch<{ user: FournisseurUser }>('/fournisseur/me')
      user.value = data.user
    } catch {
      token.value = null
      user.value  = null
    }
  }

  async function login(email: string, password: string) {
    const data = await apiFetch<{ user: FournisseurUser; token: string }>('/fournisseur/login', {
      method: 'POST',
      body: { email, password },
    })
    token.value = data.token
    user.value  = data.user
    return data
  }

  async function register(payload: {
    nom_entreprise: string
    email: string
    password: string
    password_confirmation: string
    telephone?: string
    adresse?: string
    ville?: string
  }) {
    const data = await apiFetch<{ user: FournisseurUser; token: string }>('/fournisseur/register', {
      method: 'POST',
      body: payload,
    })
    token.value = data.token
    user.value  = data.user
    return data
  }

  async function logout() {
    try { await apiFetch('/fournisseur/logout', { method: 'POST' }) } catch {}
    token.value = null
    user.value  = null
  }

  async function updateProfile(payload: Partial<FournisseurUser>) {
    const data = await apiFetch<{ nom_entreprise: string }>('/dashboard/profile', {
      method: 'PUT',
      body: payload,
    })
    if (user.value && data.nom_entreprise) {
      user.value = { ...user.value, nom_entreprise: data.nom_entreprise }
    }
    return data
  }

  async function changePassword(payload: {
    current_password: string
    password: string
    password_confirmation: string
  }) {
    const data = await apiFetch<{ token: string }>('/dashboard/profile/password', {
      method: 'PUT',
      body: payload,
    })
    token.value = data.token
    return data
  }

  return {
    token, user, isLoggedIn, isFournisseur, isAgent,
    apiFetch, fetchUser, login, register, logout,
    updateProfile, changePassword,
  }
}