export type CycleStatus = 'running' | 'completed' | 'interrupted'

export interface Cycle {
  id: number
  machineId: number
  orderId?: number         // si el ciclo está asociado a una orden de cliente
  status: CycleStatus
  startedAt: string        // ISO date string
  endedAt?: string         // null mientras corre
  durationMinutes?: number // calculado al terminar (endedAt - startedAt)
  programmedMinutes: number // duración esperada del ciclo
  operatorId?: number      // quién inició el ciclo
  notes?: string
}
