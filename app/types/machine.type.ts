import type { MACHINE_STATUS, MACHINE_TYPES } from '~/const/machine.const'

export type IMachineType = (typeof MACHINE_TYPES)[keyof typeof MACHINE_TYPES]
export type IMachineStatusType = (typeof MACHINE_STATUS)[keyof typeof MACHINE_STATUS]
export type IMachineFilterTab = 'all' | IMachineStatusType

export interface IMachine {
  id: number
  name: string
  type: IMachineType
  brand: string
  model?: string
  color?: string
  serialNumber?: string
  capacityKg?: number
  location?: string
  status: IMachineStatusType
  timeCycle: number // duración estándar del ciclo en minutos
  buyDate?: string // ISO date string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  description?: string
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  image?: string
}

export type IMachineEstatusCatalog = Record<
  IMachineStatusType,
  {
    label: string
    classChip?: string
    class: string
  }
>
