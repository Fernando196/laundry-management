export type IncidentType =
  | 'machine-failure'   // la máquina falló o se trabó
  | 'damaged-garment'   // prenda dañada durante el lavado
  | 'lost-garment'      // prenda perdida
  | 'stain-not-removed' // mancha que no salió
  | 'cycle-interrupted' // ciclo cortado antes de terminar
  | 'other'

export type IncidentSeverity = 'low' | 'medium' | 'high'

export type IncidentStatus = 'open' | 'in-review' | 'resolved'

export interface Incident {
  id: number
  type: IncidentType
  severity: IncidentSeverity
  status: IncidentStatus
  machineId: number
  cycleId?: number         // si ocurrió durante un ciclo específico
  orderId?: number         // si afecta una orden de cliente
  description: string
  reportedAt: string       // ISO date string
  reportedBy?: number      // operatorId
  resolvedAt?: string
  resolvedBy?: number
  resolution?: string      // qué se hizo para resolverlo
}
