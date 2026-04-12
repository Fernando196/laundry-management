export type MachineType = 'washer' | 'dryer'

export type MachineStatus = 'idle' | 'running' | 'maintenance' | 'out-of-service'

export interface Machine {
  id: number
  name: string
  type: MachineType
  brand: string
  model?: string
  color?: string
  status: MachineStatus
  timeCycle: number        // duración estándar del ciclo en minutos
  buyDate?: string         // ISO date string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  description?: string
  createdAt?: string
  createdBy?: string
  updatedAt?: string
  updatedBy?: string
}
