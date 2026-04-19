import type { IMachineEstatusCatalog } from '~/types/machine.type'
import { ORDER_STATUS_TYPE } from './orders.const'

export const MACHINE_TYPES = {
  WASHER: 'washer',
  DRYER: 'dryer',
} as const
export const MACHINE_STATUS = {
  ACTIVE: 'active',
  RUNNING: 'running',
  MAINTENANCE: 'maintenance',
  'OUT-OF-SERVICE': 'out-of-service',
} as const
export const MACHINE_STATUS_CATALOG: IMachineEstatusCatalog = {
  active: {
    label: 'Activo',
    classChip: `text-white bg-status-${ORDER_STATUS_TYPE.READY}`,
    class: `bg-status-${ORDER_STATUS_TYPE.READY}-bg text-status-${ORDER_STATUS_TYPE.READY}`,
  },
  running: {
    label: 'En ciclo',
    classChip: `text-white bg-status-${ORDER_STATUS_TYPE['IN-PROCESS']}`,
    class: `bg-status-${ORDER_STATUS_TYPE['IN-PROCESS']}-bg text-status-${ORDER_STATUS_TYPE['IN-PROCESS']}`,
  },
  maintenance: {
    label: 'Mantenimiento',
    classChip: `text-white bg-status-${ORDER_STATUS_TYPE.PENDING}`,
    class: `bg-status-${ORDER_STATUS_TYPE.PENDING}-bg text-status-${ORDER_STATUS_TYPE.PENDING}`,
  },
  'out-of-service': {
    label: 'Fuera de servicio',
    classChip: `text-white bg-status-${ORDER_STATUS_TYPE.CANCELED}`,
    class: `bg-status-${ORDER_STATUS_TYPE.CANCELED}-bg text-status-${ORDER_STATUS_TYPE.CANCELED}`,
  },
} as const
