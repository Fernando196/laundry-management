import type { ORDER_STATUS_TYPE, ORDER_SERVICE_TYPE } from '~/const/orders.const'
import type { IProduct } from './products.type'

export type OrderStatus = (typeof ORDER_STATUS_TYPE)[keyof typeof ORDER_STATUS_TYPE]
export type ServiceType = (typeof ORDER_SERVICE_TYPE)[keyof typeof ORDER_SERVICE_TYPE]
export type OrderFilterTab = 'all' | OrderStatus

export interface IOrder {
  id?: number
  status: OrderStatus
  service?: ServiceType
  customerName: string
  amount: number // MXN
  createdAt: string // ISO date string
  completedAt?: string
  comments?: string
  Products?: IProduct[]
  assignedMachine?: number
  weight?: number
  quantity?: number
}

export type OrderCatalog = Record<
  OrderStatus,
  {
    label: string
  }
>
export type ServiceTypeCatalog = Record<
  ServiceType,
  { label: string; serviceCost: number; description?: string }
>
