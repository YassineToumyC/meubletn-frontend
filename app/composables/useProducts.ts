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
