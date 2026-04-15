import type { OrderStatus, ServiceType } from '~/types/order.type'

export const ORDER_ESTATUS_TYPE = ['pending', 'in-process', 'ready', 'cancelled'] as const
export const SERVICE_TYPE = ['wash', 'dry', 'wash-dry', 'ironing', 'express'] as const

export const CAT_ORDER_ESTATUS: {
  key: OrderStatus
  label: string
  classChip: string
}[] = [
  { key: 'pending', label: 'Pendiente', classChip: 'text-status-pending bg-status-pending-bg' },
  {
    key: 'in-process',
    label: 'En proceso',
    classChip: 'text-status-in-process bg-status-in-process-bg',
  },
  { key: 'ready', label: 'Listo', classChip: 'text-status-ready bg-status-ready-bg' },
  {
    key: 'cancelled',
    label: 'Cancelado',
    classChip: 'text-status-cancelled bg-status-cancelled-bg',
  },
]
export const CAT_SERVICE_TYPE: {
  type: ServiceType
  label: string
}[] = [
  {
    type: 'wash',
    label: 'lavar',
  },
  {
    type: 'dry',
    label: 'Secar',
  },
  {
    type: 'wash-dry',
    label: 'Secar y Lavar',
  },
  {
    type: 'ironing',
    label: 'Planchar',
  },
  {
    type: 'express',
    label: 'Express',
  },
]
