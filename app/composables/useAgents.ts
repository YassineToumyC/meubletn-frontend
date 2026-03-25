export interface AgentRecord {
  id: number
  nom: string
  prenom: string
  email: string
  is_active: boolean
  listings_count?: number
  created_at?: string
}

export const useAgents = () => {
  const { apiFetch } = useFournisseurAuth()
  const agents  = useState<AgentRecord[]>('f_agents', () => [])
  const pending = useState<boolean>('f_agents_pending', () => false)

  async function fetchAll() {
    pending.value = true
    try {
      agents.value = await apiFetch<AgentRecord[]>('/dashboard/agents')
    } finally {
      pending.value = false
    }
  }

  async function create(payload: {
    nom: string
    prenom: string
    email: string
    password: string
    password_confirmation: string
  }): Promise<AgentRecord> {
    const data = await apiFetch<{ agent: AgentRecord }>('/dashboard/agents', {
      method: 'POST',
      body: payload,
    })
    agents.value.unshift(data.agent)
    return data.agent
  }

  async function update(id: number, payload: Partial<AgentRecord & { password?: string; password_confirmation?: string }>): Promise<AgentRecord> {
    const data = await apiFetch<{ agent: AgentRecord }>(`/dashboard/agents/${id}`, {
      method: 'PUT',
      body: payload,
    })
    const idx = agents.value.findIndex(a => a.id === id)
    if (idx !== -1) agents.value[idx] = data.agent
    return data.agent
  }

  async function remove(id: number): Promise<void> {
    await apiFetch(`/dashboard/agents/${id}`, { method: 'DELETE' })
    agents.value = agents.value.filter(a => a.id !== id)
  }

  return { agents, pending, fetchAll, create, update, remove }
}
