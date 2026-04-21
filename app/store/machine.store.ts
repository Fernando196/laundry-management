import { defineStore } from 'pinia'
import { machineService } from '~/services/machine'
import type { IMachine } from '~/types/machine.type'

export const useMachineStore = defineStore('machine', () => {
  const machines = ref<IMachine[]>([])

  async function fetchMachines() {
    const data = await machineService.getMachines()
    machines.value = data
    return data
  }

  async function addMachine(machine: Omit<IMachine, 'id'>) {
    const newMachine = await machineService.postMachine(machine)
    machines.value.push(newMachine)
  }

  async function updateMachine(updated: IMachine) {
    const updatedMachine = await machineService.putMachine(updated.id, updated)
    const idx = machines.value.findIndex((m) => m.id === updatedMachine.id)
    if (idx !== -1) machines.value[idx] = updatedMachine
  }

  async function deleteMachine(id: number) {
    await machineService.deleteMachine(id)
    machines.value = machines.value.filter((m) => m.id !== id)
  }

  return { machines, fetchMachines, addMachine, updateMachine, deleteMachine }
})
