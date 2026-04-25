export interface IProduct {
  id: number
  name: string
  category?: string
  brand: string
  unit: string
  stock: number
  price: number
  description: string
}

export interface IProductCatalog {
  id: number
  name: string
  price: number
}
