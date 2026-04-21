<script setup lang="ts">
  import type { TableColumn } from '~/types/table.type'
  import type { IMachine } from '~/types/machine.type'
  import TableToolbar from '~/components/ui/TableToolbar.vue'
  import DataTable from '~/components/ui/DataTable.vue'
  import MachineFormModal from '~/components/machine-control/MachineFormModal.vue'
  import { MACHINE_STATUS_CATALOG, MACHINE_TYPES } from '~/const/machine.const'
  import { useMachineStore } from '~/store/machine.store'
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'

  const machineStore = useMachineStore()
  const { open: openModal } = useModal()

  const columns: TableColumn[] = [
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

  const rows = computed(() =>
    machineStore.machines.map((m) => ({ ...m }) as Record<string, unknown>)
  )

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

  function handleDelete(row: Record<string, unknown>) {
    machineStore.deleteMachine(row.id as number)
  }
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto p-4">
    <TableToolbar title="Inventario de Máquinas" subtitle="Gestión y control de equipos">
      <template #actions>
        <button
          class="bg-primary hover:bg-primary-dark flex cursor-pointer items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm text-white"
          @click="handleCreate"
        >
          <MapIcon name="add" class="h-4 w-4 stroke-white" />
          Nueva máquina
        </button>
      </template>
    </TableToolbar>

    <DataTable :columns="columns" :rows="rows" empty-message="No hay máquinas registradas">
      <template #cell-type="{ value }">
        <span class="text-neutral-600">{{ machineTypeLabel[value as string] ?? value }}</span>
      </template>

      <template #cell-status="{ value }">
        <span
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="MACHINE_STATUS_CATALOG[value as keyof typeof MACHINE_STATUS_CATALOG]?.class ?? ''"
        >
          {{ MACHINE_STATUS_CATALOG[value as keyof typeof MACHINE_STATUS_CATALOG]?.label ?? value }}
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
