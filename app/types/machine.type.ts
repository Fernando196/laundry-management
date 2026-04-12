export const machineTypes = ['washer', 'dryer'] as const
export const machineStatus = [
  'idle',
  'running',
  'maintenance',
  'out-of-service',
] as const

export type MachineType = (typeof machineTypes)[number]

export type MachineStatus = (typeof machineStatus)[number]

export interface Machine {
  id: number
  name: string
  type: MachineType
  brand: string
  model?: string
  color?: string
  status: MachineStatus
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
