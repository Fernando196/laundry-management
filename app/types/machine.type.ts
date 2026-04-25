import type { MACHINE_STATUS, MACHINE_TYPES } from '~/const/machine.const'

export type IMachineType = (typeof MACHINE_TYPES)[keyof typeof MACHINE_TYPES]
export type IMachineStatusType = (typeof MACHINE_STATUS)[keyof typeof MACHINE_STATUS]
export type IMachineFilterTab = 'all' | IMachineStatusType

export interface IMachine {
  id: number
  name: string
  type: IMachineType
  status: IMachineStatusType
  brand: string
  model?: string
  serialNumber?: string
  location?: string
  capacityKg?: number
  timeCycle?: number

  buyDate?: string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  description?: string
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
  image?: string

  Status: IMachineStatus
  Brand: IMachineBrand
}

export interface IMachineBrand {
  id: number
  name: string
}

export type IMachineStatus = { id: number; label: string; description: string }
export type IMachineStatusClass = Record<
  IMachineStatusType,
  { class: string; dot: string; messageIconCard: string }
>
export type IMachineEstatusCatalog = Record<IMachineStatusType, IMachineStatus>
