import type { IMachineEstatusCatalog } from '~/types/machine.type'

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
export const MACHINE_ESTATUS_CATALOG: IMachineEstatusCatalog = {
  active: {
    label: 'Activo',
    classChip: 'text-white bg-status-ready',
    class: 'bg-status-ready-bg text-status-ready',
  },
  running: {
    label: 'En ciclo',
    classChip: 'text-white bg-status-in-process',
    class: 'bg-status-in-process-bg text-status-in-process',
  },
  maintenance: {
    label: 'Mantenimiento',
    classChip: 'text-white bg-status-pending',
    class: 'bg-status-pending-bg text-status-pending',
  },
  'out-of-service': {
    label: 'Fuera de servicio',
    classChip: 'text-white bg-status-cancelled',
    class: 'bg-status-cancelled-bg text-status-cancelled',
  },
} as const
