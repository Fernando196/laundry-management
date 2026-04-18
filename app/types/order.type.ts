import type { ORDER_ESTATUS_TYPE, SERVICE_TYPE } from '~/const/orders.const'

export type OrderStatus = (typeof ORDER_ESTATUS_TYPE)[keyof typeof ORDER_ESTATUS_TYPE]
export type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE]
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

export type OrderCatalog = Record<
  OrderStatus,
  {
    label: string
    classChip: string
    dot: string
  }
>
export type ServiceTypeCatalog = Record<ServiceType, { label: string }>
