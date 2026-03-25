import type { Announcement } from '~/composables/useAnnouncements'

export interface CartItem {
  announcement: Announcement
  qty: number
}

let cartInitialized = false

export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => [])

  if (import.meta.client && !cartInitialized) {
    cartInitialized = true
    try {
      const saved = localStorage.getItem('meubletn_cart')
      if (saved) items.value = JSON.parse(saved)
    } catch {}
    watch(items, v => localStorage.setItem('meubletn_cart', JSON.stringify(v)), { deep: true })
  }

  const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0))

  function add(announcement: Announcement, qty = 1) {
    const existing = items.value.find(i => i.announcement.id === announcement.id)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ announcement, qty })
    }
  }

  function remove(id: number) {
    items.value = items.value.filter(i => i.announcement.id !== id)
  }

  function updateQty(id: number, qty: number) {
    if (qty < 1) return remove(id)
    const item = items.value.find(i => i.announcement.id === id)
    if (item) item.qty = qty
  }

  const subtotal = computed(() =>
    items.value.reduce((s, i) => s + ((i.announcement.price ?? 0) * i.qty), 0),
  )

  return { items, count, add, remove, updateQty, subtotal }
}
