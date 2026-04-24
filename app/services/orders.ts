import type { IOrder, IOrderProduct, IOrderResponse } from '~/types/order.type'

export const orderService = {
  async getOrders(): Promise<IOrderResponse[]> {
    const { $api } = useNuxtApp()
    const response = await $api<IOrderResponse[]>('/orders?_embed=order_products', {
      method: 'GET',
    })
    return response
  },
  async postOrder(order: Omit<IOrder, 'id'>): Promise<IOrder> {
    const { $api } = useNuxtApp()
    const response = await $api<IOrder>('/orders', {
      method: 'POST',
      body: order,
    })
    return response
  },
  async putOrder(orderId: number, order: Partial<IOrder>): Promise<IOrder> {
    const { $api } = useNuxtApp()
    const response = await $api<IOrder>(`/orders/${orderId}`, {
      method: 'PUT',
      body: order,
    })
    return response
  },
  async deleteOrder(orderId: number): Promise<void> {
    const { $api } = useNuxtApp()
    await $api(`/orders/${orderId}`, {
      method: 'DELETE',
    })
  },
  async postOrderProduct(orderId: number, product: IOrderProduct): Promise<IOrderProduct> {
    const { $api } = useNuxtApp()
    const response = await $api<IOrderProduct>(`/order_products`, {
      method: 'POST',
      body: {
        orderId,
        ...product,
      },
    })
    return response
  },
  async deleteOrderProduct(orderProductId: number): Promise<void> {
    const { $api } = useNuxtApp()
    await $api(`/order_products/${orderProductId}`, {
      method: 'DELETE',
    })
  },
  async putOrderProduct(
    orderProductId: number,
    product: Partial<IOrderProduct>
  ): Promise<IOrderProduct> {
    const { $api } = useNuxtApp()
    const response = await $api<IOrderProduct>(`/order_products/${orderProductId}`, {
      method: 'PUT',
      body: product,
    })
    return response
  },
  async getOrderProducts(orderId: number): Promise<IOrderProduct[]> {
    const { $api } = useNuxtApp()
    const response = await $api<IOrderProduct[]>(`/order_products?orderId=${orderId}`)
    return response
  },
}
