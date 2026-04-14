export type OrderStatus = 'pending' | 'in-process' | 'ready' | 'cancelled'
export type ServiceType = 'wash' | 'dry' | 'wash-dry' | 'ironing' | 'express'

export interface IOrder {
  id: number
  status: OrderStatus
  service: ServiceType
  customerName: string
  amount: number // MXN
  createdAt: string // ISO date string
  completedAt?: string
}
