import type { OrderCatalog, ServiceTypeCatalog } from '~/types/order.type'

export const ORDER_STATUS_TYPE = {
  PEDING: 'pending',
  'IN-PROCESS': 'in-process',
  READY: 'ready',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const
export const ORDER_SERVICE_TYPE = {
  WASH: 'wash',
  DRY: 'dry',
  'WASH-DRY': 'wash-dry',
  IRONING: 'ironing',
  EXPRESS: 'express',
} as const

export const ORDER_STATUS_CATALOG: OrderCatalog = {
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
    classChip: 'text-status-completed bg-status-completed-bg',
    dot: 'bg-status-completed',
  },
}
export const ORDER_SERVICE_TYPE_CATALOG: ServiceTypeCatalog = {
  wash: {
    label: 'Lavar',
    serviceCost: 100,
    description:
      'Servicio de lavado para prendas de ropa. Incluye el uso de detergentes y suavizantes adecuados para cada tipo de tela, garantizando una limpieza efectiva y cuidado de las prendas.',
  },
  dry: {
    label: 'Secar',
    serviceCost: 150,
    description:
      'Servicio de secado para prendas de ropa. Utiliza técnicas y equipos adecuados para asegurar un secado uniforme y cuidado de las prendas.',
  },
  'wash-dry': {
    label: 'Secar y Lavar',
    serviceCost: 250,
    description:
      'Servicio combinado de lavado y secado para prendas de ropa. Garantiza una limpieza completa y un secado adecuado, cuidando cada tipo de tela.',
  },
  ironing: {
    label: 'Planchar',
    serviceCost: 50,
    description:
      'Servicio de planchado para prendas de ropa. Utiliza técnicas y equipos adecuados para asegurar un planchado uniforme y cuidado de las prendas.',
  },
  express: {
    label: 'Express',
    serviceCost: 300,
    description:
      'Servicio express para prendas de ropa. Garantiza una limpieza y entrega rápida, ideal para situaciones de urgencia.',
  },
}
