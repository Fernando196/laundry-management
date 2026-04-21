import type { IMachine } from '~/types/machine.type'

export const machineService = {
  async getMachines(): Promise<IMachine[]> {
    const { $api } = useNuxtApp()
    const response = await $api<IMachine[]>('/machines', {
      method: 'GET',
    })
    return response
  },
  async postMachine(machine: Omit<IMachine, 'id'>): Promise<IMachine> {
    const { $api } = useNuxtApp()
    const response = await $api<IMachine>('/machines', {
      method: 'POST',
      body: machine,
    })
    return response
  },
  async putMachine(machineId: number, machine: Partial<IMachine>): Promise<IMachine> {
    const { $api } = useNuxtApp()
    const response = await $api<IMachine>(`/machines/${machineId}`, {
      method: 'PUT',
      body: machine,
    })
    return response
  },
  async deleteMachine(machineId: number): Promise<void> {
    const { $api } = useNuxtApp()
    await $api(`/machines/${machineId}`, {
      method: 'DELETE',
    })
  },
}
