import { defineStore } from 'pinia'
import type { IMachine } from '~/types/machine.type'
import { MACHINE_STATUS, MACHINE_TYPES } from '~/const/machine.const'

const MOCK_MACHINES: IMachine[] = [
  {
    id: 1,
    name: 'Lavadora A1',
    type: MACHINE_TYPES.WASHER,
    brand: 'LG',
    model: 'WM3900HBA',
    serialNumber: 'LG-2021-001',
    capacityKg: 15,
    location: 'Área 1',
    status: MACHINE_STATUS.ACTIVE,
    timeCycle: 45,
    buyDate: '2021-03-10',
    lastMaintenanceDate: '2024-01-15',
    nextMaintenanceDate: '2025-01-15',
  },
  {
    id: 2,
    name: 'Secadora B2',
    type: MACHINE_TYPES.DRYER,
    brand: 'Samsung',
    model: 'DV25BB6900H',
    serialNumber: 'SAM-2022-004',
    capacityKg: 12,
    location: 'Área 2',
    status: MACHINE_STATUS.RUNNING,
    timeCycle: 60,
    buyDate: '2022-07-20',
    lastMaintenanceDate: '2024-03-01',
    nextMaintenanceDate: '2025-03-01',
  },
  {
    id: 3,
    name: 'Lavadora C3',
    type: MACHINE_TYPES.WASHER,
    brand: 'Whirlpool',
    model: 'WTW5000DW',
    serialNumber: 'WP-2020-009',
    capacityKg: 20,
    location: 'Área 1',
    status: MACHINE_STATUS.MAINTENANCE,
    timeCycle: 50,
    buyDate: '2020-11-05',
    lastMaintenanceDate: '2023-11-05',
    nextMaintenanceDate: '2025-05-05',
  },
  {
    id: 4,
    name: 'Secadora D4',
    type: MACHINE_TYPES.DRYER,
    brand: 'Mabe',
    model: 'MSS1718WBB0',
    serialNumber: 'MB-2019-002',
    capacityKg: 10,
    location: 'Área 3',
    status: MACHINE_STATUS['OUT-OF-SERVICE'],
    timeCycle: 40,
    buyDate: '2019-06-15',
    lastMaintenanceDate: '2023-06-15',
    nextMaintenanceDate: '2024-06-15',
  },
]

export const useMachineStore = defineStore('machine', () => {
  const machines = ref<IMachine[]>(MOCK_MACHINES)
  let nextId = MOCK_MACHINES.length + 1

  function addMachine(machine: Omit<IMachine, 'id'>) {
    machines.value.push({ ...machine, id: nextId++ })
  }

  function updateMachine(updated: IMachine) {
    const idx = machines.value.findIndex((m) => m.id === updated.id)
    if (idx !== -1) machines.value[idx] = updated
  }

  function deleteMachine(id: number) {
    machines.value = machines.value.filter((m) => m.id !== id)
  }

  return { machines, addMachine, updateMachine, deleteMachine }
})
