import type { OrderCatalog, ServiceTypeCatalog } from '~/types/order.type'

export const ORDER_STATUS_TYPE = {
  PENDING: 'pending',
  'IN-PROCESS': 'in-process',
  READY: 'ready',
  CANCELED: 'canceled',
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
  [ORDER_STATUS_TYPE.PENDING]: {
    label: 'Pendiente',
    classChip: `text-status-${ORDER_STATUS_TYPE.PENDING} bg-status-${ORDER_STATUS_TYPE.PENDING}-bg`,
    dot: `bg-status-${ORDER_STATUS_TYPE.PENDING}`,
  },
  [ORDER_STATUS_TYPE['IN-PROCESS']]: {
    label: 'En proceso',
    classChip: `text-status-${ORDER_STATUS_TYPE['IN-PROCESS']} bg-status-${ORDER_STATUS_TYPE['IN-PROCESS']}-bg`,
    dot: `bg-status-${ORDER_STATUS_TYPE['IN-PROCESS']}`,
  },
  [ORDER_STATUS_TYPE.READY]: {
    label: 'Listo',
    classChip: `text-status-${ORDER_STATUS_TYPE.READY} bg-status-${ORDER_STATUS_TYPE.READY}-bg`,
    dot: `bg-status-${ORDER_STATUS_TYPE.READY}`,
  },
  [ORDER_STATUS_TYPE.CANCELED]: {
    label: 'Cancelado',
    classChip: `text-status-${ORDER_STATUS_TYPE.CANCELED} bg-status-${ORDER_STATUS_TYPE.CANCELED}-bg`,
    dot: `bg-status-${ORDER_STATUS_TYPE.CANCELED}`,
  },
  [ORDER_STATUS_TYPE.COMPLETED]: {
    label: 'Completado',
    classChip: `text-status-${ORDER_STATUS_TYPE.COMPLETED} bg-status-${ORDER_STATUS_TYPE.COMPLETED}-bg`,
    dot: `bg-status-${ORDER_STATUS_TYPE.COMPLETED}`,
  },
}
export const ORDER_SERVICE_TYPE_CATALOG: ServiceTypeCatalog = {
  [ORDER_SERVICE_TYPE.WASH]: {
    label: 'Lavar',
    serviceCost: 100,
    description:
      'Servicio de lavado para prendas de ropa. Incluye el uso de detergentes y suavizantes adecuados para cada tipo de tela, garantizando una limpieza efectiva y cuidado de las prendas.',
  },
  [ORDER_SERVICE_TYPE.DRY]: {
    label: 'Secar',
    serviceCost: 150,
    description:
      'Servicio de secado para prendas de ropa. Utiliza técnicas y equipos adecuados para asegurar un secado uniforme y cuidado de las prendas.',
  },
  [ORDER_SERVICE_TYPE['WASH-DRY']]: {
    label: 'Secar y Lavar',
    serviceCost: 250,
    description:
      'Servicio combinado de lavado y secado para prendas de ropa. Garantiza una limpieza completa y un secado adecuado, cuidando cada tipo de tela.',
  },
  [ORDER_SERVICE_TYPE.IRONING]: {
    label: 'Planchar',
    serviceCost: 50,
    description:
      'Servicio de planchado para prendas de ropa. Utiliza técnicas y equipos adecuados para asegurar un planchado uniforme y cuidado de las prendas.',
  },
  [ORDER_SERVICE_TYPE.EXPRESS]: {
    label: 'Express',
    serviceCost: 300,
    description:
      'Servicio express para prendas de ropa. Garantiza una limpieza y entrega rápida, ideal para situaciones de urgencia.',
  },
}
