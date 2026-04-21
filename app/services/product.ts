import type { IProduct } from '~/types/products.type'

export const productService = {
  async getProducts(): Promise<IProduct[]> {
    const { $api } = useNuxtApp()
    const response = await $api<IProduct[]>('/products', {
      method: 'GET',
    })
    return response
  },
  async postProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    const { $api } = useNuxtApp()
    const response = await $api<IProduct>('/products', {
      method: 'POST',
      body: product,
    })
    return response
  },
  async putProduct(productId: number, product: Partial<IProduct>): Promise<IProduct> {
    const { $api } = useNuxtApp()
    const response = await $api<IProduct>(`/products/${productId}`, {
      method: 'PUT',
      body: product,
    })
    return response
  },
  async deleteProduct(productId: number): Promise<void> {
    const { $api } = useNuxtApp()
    await $api(`/products/${productId}`, {
      method: 'DELETE',
    })
  },
}
