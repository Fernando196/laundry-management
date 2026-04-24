import { defineStore } from 'pinia'
import { machineService } from '~/services/machine'
import type { IMachine } from '~/types/machine.type'

export const useMachineStore = defineStore('machine', () => {
  const machines = ref<IMachine[]>([])
  const peding = ref<boolean>(false)

  async function fetchMachines() {
    peding.value = true
    try {
      const data = await machineService.getMachines()
      machines.value = data
      return data
    } catch (error) {
      console.error('Error fetching machines:', error)
      throw error
    } finally {
      peding.value = false
    }
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
