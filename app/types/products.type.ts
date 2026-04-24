export interface IProduct {
  id: number
  name: string
  type?: string
  stock: number
  price: number
  description: string
}

export interface IProductOrder {
  productId: number
  quantity: number
  totalPrice?: number
}
