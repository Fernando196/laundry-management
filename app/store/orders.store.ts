import { ordersData } from '~/data/orders.data'
import type { IOrder } from '~/types/order.type'

export const useOrderStore = defineStore('orders', () => {
  const orders = useState<IOrder[]>('orders', () => ordersData.slice(0, 10))

  const addOrder = (order: IOrder) => {
    if (!order.id) {
      order.id = orders.value.length ? Math.max(...orders.value.map((o) => o.id!)) + 1 : 1
    }

    orders.value.push(order)
  }

  const deleteOrder = (orderId: number) => {
    orders.value = orders.value.filter((order) => order.id !== orderId)
  }

  const updateOrder = (updatedOrder: IOrder) => {
    const index = orders.value.findIndex((order) => order.id === updatedOrder.id)
    if (index !== -1) {
      orders.value[index] = updatedOrder
    }
  }

  return {
    // State
    orders,

    // Actions
    addOrder,
    deleteOrder,
    updateOrder,
  }
})
