export const MACHINE_TYPES = ['washer', 'dryer'] as const;
export const MACHINE_STATUS = [
  {
    label: 'Activo',
    type: 'active',
    classChip: 'text-white bg-status-listo',
    class: 'bg-status-listo-bg text-status-listo',
  },
  {
    label: 'En ciclo',
    type: 'running',
    classChip: 'text-white bg-status-proceso',
    class: 'bg-status-proceso-bg text-status-proceso',
  },
  {
    label: 'Mantenimiento',
    type: 'maintenance',
    classChip: 'text-white bg-status-pendiente',
    class: 'bg-status-pendiente-bg text-status-pendiente',
  },
  {
    label: 'Fuera de servicio',
    type: 'out-of-service',
    classChip: 'text-white bg-status-cancelado',
    class: 'bg-status-cancelado-bg text-status-cancelado',
  },
] as const;
