import type { OrderCatalog, ServiceTypeCatalog } from '~/types/order.type'

export const ORDER_ESTATUS_TYPE = {
  PEDING: 'pending',
  'IN-PROCESS': 'in-process',
  READY: 'ready',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const
export const SERVICE_TYPE = {
  WASH: 'wash',
  DRY: 'dry',
  'WASH-DRY': 'wash-dry',
  IRONING: 'ironing',
  EXPRESS: 'express',
} as const

export const ORDER_ESTATUS_CATALOG: OrderCatalog = {
  pending: {
    label: 'Pendiente',
    classChip: 'text-status-pending bg-status-pending-bg',
    dot: 'bg-status-pending',
  },
  'in-process': {
    label: 'En proceso',
    classChip: 'text-status-in-process bg-status-in-process-bg',
    dot: 'bg-status-in-process',
  },
  ready: {
    label: 'Listo',
    classChip: 'text-status-ready bg-status-ready-bg',
    dot: 'bg-status-ready',
  },
  cancelled: {
    label: 'Cancelado',
    classChip: 'text-status-cancelled bg-status-cancelled-bg',
    dot: 'bg-status-cancelled',
  },
  completed: {
    label: 'Completado',
    classChip: 'text-status-ready bg-status-ready-bg',
    dot: 'bg-status-ready',
  },
}
export const SERVICE_TYPE_CATALOG: ServiceTypeCatalog = {
  wash: {
    label: 'Lavar',
  },
  dry: {
    label: 'Secar',
  },
  'wash-dry': {
    label: 'Secar y Lavar',
  },
  ironing: {
    label: 'Planchar',
  },
  express: {
    label: 'Express',
  },
}
