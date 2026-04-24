import type { IOrder } from '~/types/order.type'

export const orderService = {
  async getOrders(): Promise<IOrder[]> {
    const { $api } = useNuxtApp()
    const response = await $api<IOrder[]>('/orders', {
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
}
