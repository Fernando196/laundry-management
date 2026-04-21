import { defineStore } from 'pinia'
import { MOCK_MACHINES } from '~/data/machines.data'
import type { IMachine } from '~/types/machine.type'

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
