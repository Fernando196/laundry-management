import type { ORDER_STATUS_TYPE, ORDER_SERVICE_TYPE } from '~/const/orders.const'
import type { IProduct } from './products.type'
import type { IMachine } from './machine.type'

export type IOrderStatusType = (typeof ORDER_STATUS_TYPE)[keyof typeof ORDER_STATUS_TYPE]
export type IOrderServiceType = (typeof ORDER_SERVICE_TYPE)[keyof typeof ORDER_SERVICE_TYPE]
export type OrderFilterTab = 'all' | IOrderStatusType

export interface IOrder {
  id?: number
  status: IOrderStatusType
  service: IOrderServiceType
  customerName: string
  amount: number // MXN
  createdAt: string // ISO date string
  completedAt?: string
  comments?: string
  assignedMachine?: number
  weight?: number
  quantity?: number

  Status?: IOrderStatus
  Service?: IOrderService
  Products?: IProduct[]
  Machine?: IMachine
}

export type IOrderStatus = { id: number; label: string }
export type IOrderStatusCatalog = Record<IOrderStatusType, IOrderStatus>

export type IOrderService = {
  id: number
  label: string
  serviceCost: number
  description: string
}
export type IServiceTypeCatalog = Record<IOrderServiceType, IOrderService>
