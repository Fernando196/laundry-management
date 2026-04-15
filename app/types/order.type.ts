import type { ORDER_ESTATUS_TYPE, SERVICE_TYPE } from '~/const/orders.const'

export type OrderStatus = (typeof ORDER_ESTATUS_TYPE)[number]
export type ServiceType = (typeof SERVICE_TYPE)[number]
export type OrderFilterTab = 'all' | OrderStatus

export interface IOrder {
  id: number
  status: OrderStatus
  service: ServiceType
  customerName: string
  amount: number // MXN
  createdAt: string // ISO date string
  completedAt?: string
}
