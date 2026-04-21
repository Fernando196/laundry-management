import type { MACHINE_STATUS, MACHINE_TYPES } from '~/const/machine.const'

export type IMachineType = (typeof MACHINE_TYPES)[keyof typeof MACHINE_TYPES]
export type MachineStatusType = (typeof MACHINE_STATUS)[keyof typeof MACHINE_STATUS]

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
  status: MachineStatusType
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
  MachineStatusType,
  {
    label: string
    classChip?: string
    class: string
  }
>
