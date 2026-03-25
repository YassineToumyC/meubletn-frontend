export interface AuthUser {
  id: number
  role: 'client'
  email: string
  telephone?: string
  adresse?: string
  ville?: string
  prenom: string
  nom: string
  code_postal?: string
  interests: string[]
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  const user = useState<AuthUser | null>('auth_user', () => null)
  const isLoggedIn = computed(() => !!token.value && !!user.value)

  function apiFetch<T = any>(path: string, options: Parameters<typeof $fetch>[1] = {}): Promise<T> {
    return $fetch<T>(`${config.public.apiBase}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
        ...(options.headers as Record<string, string> | undefined),
      },
    })
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const data = await apiFetch<{ user: AuthUser }>('/auth/me')
      user.value = data.user
    } catch {
      token.value = null
      user.value  = null
    }
  }

  async function login(email: string, password: string, remember = false) {
    const data = await apiFetch<{ user: AuthUser; token: string }>('/auth/login', {
      method: 'POST',
      body: { email, password, remember },
    })
    token.value = data.token
    user.value  = data.user
  }

  async function register(payload: {
    prenom: string
    nom: string
    email: string
    telephone?: string
    adresse?: string
    ville?: string
    code_postal?: string
    password: string
    password_confirmation: string
    interests?: string[]
  }) {
    const data = await apiFetch<{ user: AuthUser; token: string }>('/auth/register', {
      method: 'POST',
      body: payload,
    })
    token.value = data.token
    user.value  = data.user
  }

  async function updateProfile(payload: Partial<AuthUser>) {
    const data = await apiFetch<{ user: AuthUser }>('/auth/profile', {
      method: 'PUT',
      body: payload,
    })
    user.value = data.user
  }

  async function changePassword(current_password: string, password: string, password_confirmation: string) {
    const data = await apiFetch<{ token: string }>('/auth/password', {
      method: 'PUT',
      body: { current_password, password, password_confirmation },
    })
    token.value = data.token
  }

  async function logout() {
    try { await apiFetch('/auth/logout', { method: 'POST' }) } catch {}
    token.value = null
    user.value  = null
  }

  return { user, token, isLoggedIn, apiFetch, fetchUser, login, register, updateProfile, changePassword, logout }
}