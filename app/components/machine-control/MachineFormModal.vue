<script setup lang="ts">
  import type { IMachine, IMachineStatusType } from '~/types/machine.type'
  import CustomModal from '../common/Modal/CustomModal.vue'
  import InputWrapper from '../common/InputWrapper.vue'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'
  import { MACHINE_STATUS, MACHINE_STATUS_CATALOG, MACHINE_TYPES } from '~/const/machine.const'

  interface Props {
    machine?: IMachine
    isEdit?: boolean
  }

  const props = defineProps<Props>()
  const { close } = useModal()

  const form = ref<Omit<IMachine, 'id'>>({
    name: props.machine?.name ?? '',
    type: props.machine?.type ?? MACHINE_TYPES.WASHER,
    brand: props.machine?.brand ?? '',
    model: props.machine?.model ?? '',
    serialNumber: props.machine?.serialNumber ?? '',
    capacityKg: props.machine?.capacityKg ?? undefined,
    location: props.machine?.location ?? '',
    color: props.machine?.color ?? '',
    status: props.machine?.status ?? MACHINE_STATUS.ACTIVE,
    timeCycle: props.machine?.timeCycle ?? 45,
    buyDate: props.machine?.buyDate ?? '',
    lastMaintenanceDate: props.machine?.lastMaintenanceDate ?? '',
    nextMaintenanceDate: props.machine?.nextMaintenanceDate ?? '',
    description: props.machine?.description ?? '',
  })

  const optionsMachineType = [
    { id: MACHINE_TYPES.WASHER, label: 'Lavadora' },
    { id: MACHINE_TYPES.DRYER, label: 'Secadora' },
  ]

  const optionsMachineStatus = (Object.keys(MACHINE_STATUS_CATALOG) as IMachineStatusType[]).map(
    (key) => ({ id: key, label: MACHINE_STATUS_CATALOG[key].label })
  )

  const title = computed(() => (props.isEdit ? 'Editar máquina' : 'Nueva máquina'))

  function onSave() {
    const payload = props.isEdit ? { ...form.value, id: props.machine!.id } : form.value
    close(payload)
  }
</script>

<template>
  <CustomModal :title="title" @close="close(false)">
    <div class="grid w-150 grid-cols-12 content-start gap-4 p-5">
      <InputWrapper
        id="machine-form-modal-name"
        v-model="form.name"
        label="Nombre de la máquina"
        type="text"
        placeholder="Ej. Lavadora A1"
        class="col-span-8"
      />
      <DropdownLabel
        id="machine-form-modal-type"
        v-model="form.type"
        :options="optionsMachineType"
        label="Tipo"
        class="col-span-4"
      />

      <InputWrapper
        id="machine-form-modal-brand"
        v-model="form.brand"
        label="Marca"
        type="text"
        placeholder="Ej. LG, Samsung"
        class="col-span-6"
      />
      <InputWrapper
        id="machine-form-modal-model"
        v-model="form.model"
        label="Modelo"
        type="text"
        placeholder="Ej. WM3900HBA"
        class="col-span-6"
      />

      <InputWrapper
        id="machine-form-modal-serialNumber"
        v-model="form.serialNumber"
        label="Número de serie"
        type="text"
        placeholder="Ej. LG-2021-001"
        class="col-span-6"
      />
      <InputWrapper
        id="machine-form-modal-color"
        v-model="form.color"
        label="Color"
        type="text"
        placeholder="Ej. Blanco"
        class="col-span-6"
      />

      <InputWrapper
        id="machine-form-modal-capacityKg"
        v-model="form.capacityKg"
        label="Capacidad (kg)"
        type="number"
        placeholder="Ej. 15"
        class="col-span-4"
      />
      <InputWrapper
        id="machine-form-modal-timeCycle"
        v-model="form.timeCycle"
        label="Duración ciclo (min)"
        type="number"
        placeholder="Ej. 45"
        class="col-span-4"
      />
      <InputWrapper
        id="machine-form-modal-location"
        v-model="form.location"
        label="Ubicación"
        type="text"
        placeholder="Ej. Área 1"
        class="col-span-4"
      />

      <DropdownLabel
        id="machine-form-modal-status"
        v-model="form.status"
        :options="optionsMachineStatus"
        label="Estado"
        class="col-span-6"
      />
      <InputWrapper
        id="machine-form-modal-buyDate"
        v-model="form.buyDate"
        label="Fecha de compra"
        type="date"
        class="col-span-6"
      />

      <InputWrapper
        id="machine-form-modal-lastMaintenanceDate"
        v-model="form.lastMaintenanceDate"
        label="Último mantenimiento"
        type="date"
        class="col-span-6"
      />
      <InputWrapper
        id="machine-form-modal-nextMaintenanceDate"
        v-model="form.nextMaintenanceDate"
        label="Próximo mantenimiento"
        type="date"
        class="col-span-6"
      />

      <InputWrapper
        id="machine-form-modal-description"
        v-model="form.description"
        label="Descripción / Notas"
        type="text"
        :is-text-area="true"
        :rows="3"
        placeholder="Observaciones adicionales..."
        class="col-span-12"
      />
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          class="cursor-pointer rounded-sm bg-gray-200 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-300"
          @click="close(false)"
        >
          Cancelar
        </button>
        <button
          class="bg-primary hover:bg-primary-dark cursor-pointer rounded-sm px-4 py-1.5 text-sm text-white"
          @click="onSave"
        >
          {{ isEdit ? 'Guardar cambios' : 'Crear máquina' }}
        </button>
      </div>
    </template>
  </CustomModal>
</template>
