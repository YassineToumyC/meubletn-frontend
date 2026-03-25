export interface Product {
  id: number
  name: string
  brand: string
  slug: string
  category: string
  categorySlug: string
  price: number
  oldPrice?: number | null
  badge?: string | null
  badgeType?: 'sale' | 'new' | 'promo' | ''
  rating: number
  reviewCount: number
  imgColor: string
  icon: string
  isNew?: boolean
  isBestseller?: boolean
}

interface CartItem {
  productId: number
  qty: number
}

// Will be replaced with real API products when available
const allProducts: Product[] = []

export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => [])

  const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))

  function add(productId: number, qty = 1) {
    const existing = items.value.find(i => i.productId === productId)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ productId, qty })
    }
  }

  function remove(productId: number) {
    items.value = items.value.filter(i => i.productId !== productId)
  }

  function updateQty(productId: number, qty: number) {
    if (qty < 1) return remove(productId)
    const item = items.value.find(i => i.productId === productId)
    if (item) item.qty = qty
  }

  const cartProducts = computed(() =>
    items.value
      .map(i => ({ item: i, product: allProducts.find(p => p.id === i.productId) }))
      .filter(x => x.product !== undefined)
  )

  const subtotal = computed(() =>
    cartProducts.value.reduce((sum, x) => sum + (x.product!.price * x.item.qty), 0)
  )

  return { items, count, add, remove, updateQty, cartProducts, subtotal }
}