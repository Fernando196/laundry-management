import { ORDER_SERVICE_TYPE_CATALOG, ORDER_STATUS_CATALOG } from '~/const/orders.const'
import { orderService } from '~/services/orders'
import type { IOrder } from '~/types/order.type'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref<IOrder[]>([])
  const pending = ref<boolean>(false)

  async function fetchOrders() {
    pending.value = true
    try {
      const data: IOrder[] = <IOrder[]>await orderService.getOrders()
      orders.value = data.map((order: IOrder) => ({
        ...order,
        Service: ORDER_SERVICE_TYPE_CATALOG[order.service] || null,
        Status: ORDER_STATUS_CATALOG[order.status] || null,
      }))
      return data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    } finally {
      pending.value = false
    }
  }

  const addOrder = async (order: IOrder) => {
    const newOrder = await orderService.postOrder(order)
    orders.value.push(newOrder)
  }

  const deleteOrder = async (orderId: number) => {
    await orderService.deleteOrder(orderId)
    orders.value = orders.value.filter((order) => order.id !== orderId)
  }

  const updatedOrder = async (id: number, updated: IOrder) => {
    const updatedOrder = await orderService.putOrder(id, updated)
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
    updatedOrder,
    fetchOrders,
  }
})
