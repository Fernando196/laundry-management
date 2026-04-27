<script setup lang="ts">
  import type { TableColumn } from '~/types/table.type'
  import type { IMachine } from '~/types/machine.type'
  import DataTable from '~/components/ui/DataTable.vue'
  import MachineFormModal from '~/components/machine-control/MachineFormModal.vue'
  import {
    MACHINE_STATUS_CATALOG,
    MACHINE_STATUS_CLASS,
    MACHINE_TYPES,
  } from '~/const/machine.const'
  import { useMachineStore } from '~/store/machine.store'
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'
  import ConfirmModal from '~/components/common/Modal/ConfirmModal.vue'
  import PageHeader from '~/components/ui/PageHeader.vue'

  const machineStore = useMachineStore()
  const machines = computed(() => machineStore.machines)
  const { openModal } = useModal()

  await useAsyncData('machines', () => machineStore.fetchMachines())

  const columns: TableColumn<IMachine>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'type', label: 'Tipo', width: '110px' },
    { key: 'brand', label: 'Marca', width: '110px' },
    { key: 'model', label: 'Modelo', width: '140px' },
    { key: 'serialNumber', label: 'No. Serie', width: '130px' },
    { key: 'capacityKg', label: 'Cap. (kg)', width: '90px', align: 'center' },
    { key: 'timeCycle', label: 'Ciclo (min)', width: '100px', align: 'center' },
    { key: 'location', label: 'Ubicación', width: '110px' },
    { key: 'status', label: 'Estado', width: '180px' },
  ]

  const machineTypeLabel: Record<string, string> = {
    [MACHINE_TYPES.WASHER]: 'Lavadora',
    [MACHINE_TYPES.DRYER]: 'Secadora',
  }

  async function handleCreate() {
    const result = await openModal(MachineFormModal)
    if (!result) return
    machineStore.addMachine(result as Omit<IMachine, 'id'>)
  }

  async function handleEdit(row: Record<string, unknown>) {
    const machine = machineStore.machines.find((m) => m.id === row.id)
    if (!machine) return
    const result = await openModal(MachineFormModal, { machine, isEdit: true })
    if (!result) return
    machineStore.updateMachine(result as IMachine)
  }

  async function handleDelete(row: Record<string, unknown>) {
    const result = await openModal(ConfirmModal, {
      title: 'Máquina a eliminar',
      description: '¿Estás seguro de que deseas eliminar esta máquina?',
      confirmText: 'Eliminar',
    })
    if (!result) return
    machineStore.deleteMachine(row.id as number)
  }
</script>

<template>
  <div>
    <PageHeader
      title="Inventario de máquinas"
      :subtitle="machines.length + ' máquinas registradas'"
    >
      <template #right>
        <button class="btn btn-primary" @click="handleCreate">
          <MapIcon name="add" class="h-4 w-4 stroke-white" />
          Nueva máquina
        </button>
      </template>
    </PageHeader>

    <DataTable
      class="mt-4 rounded-lg"
      :columns="columns"
      :rows="machines"
      empty-message="No hay máquinas registradas"
    >
      <template #cell-type="{ value }">
        <span class="text-neutral-600">{{
          machineTypeLabel[value as IMachine['type']] ?? value
        }}</span>
      </template>

      <template #cell-status="{ value }">
        <span
          class="badge inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="MACHINE_STATUS_CLASS[value as IMachine['status']].chip ?? ''"
        >
          {{ MACHINE_STATUS_CATALOG[value as IMachine['status']]?.label ?? value }}
        </span>
      </template>

      <template #actions="{ row }">
        <button
          class="hover:text-primary flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-colors hover:bg-neutral-100"
          title="Editar"
          @click="handleEdit(row)"
        >
          <MapIcon name="edit" class="fill-primary h-6 w-6" />
        </button>
        <button
          class="hover:bg-accent-light hover:text-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-colors"
          title="Eliminar"
          @click="handleDelete(row)"
        >
          <MapIcon name="delete" class="stroke-accent h-6 w-6 fill-none" />
        </button>
      </template>
    </DataTable>
  </div>
</template>
