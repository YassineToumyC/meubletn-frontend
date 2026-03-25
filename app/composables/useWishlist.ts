import type { Announcement } from '~/composables/useAnnouncements'

let wishlistInitialized = false

export const useWishlist = () => {
  const items = useState<Announcement[]>('wishlist-items', () => [])

  if (import.meta.client && !wishlistInitialized) {
    wishlistInitialized = true
    try {
      const saved = localStorage.getItem('meubletn_wishlist')
      if (saved) items.value = JSON.parse(saved)
    } catch {}
    watch(items, v => localStorage.setItem('meubletn_wishlist', JSON.stringify(v)), { deep: true })
  }

  function toggle(announcement: Announcement) {
    const idx = items.value.findIndex(a => a.id === announcement.id)
    if (idx >= 0) {
      items.value.splice(idx, 1)
    } else {
      items.value.push(announcement)
    }
  }

  function isWishlisted(id: number): boolean {
    return items.value.some(a => a.id === id)
  }

  function remove(id: number) {
    items.value = items.value.filter(a => a.id !== id)
  }

  return { items, toggle, isWishlisted, remove }
}
