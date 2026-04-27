<script setup lang="ts">
  import { MACHINE_STATUS_CATALOG, MACHINE_STATUS_CLASS } from '~/const/machine.const'
  import InputWrapper from '../common/InputWrapper.vue'
  import type { IMachineStatusType } from '~/types/machine.type'
  import CustomModal from '../common/Modal/CustomModal.vue'

  const selected = ref<IMachineStatusType | null>(null)
  const observations = ref('')

  const { close } = useModal()
  const onSave = () => {
    close({
      status: selected.value,
      observations: observations.value,
    })
  }

  const machineStatus = MACHINE_STATUS_CATALOG
  const machineStatusClass = MACHINE_STATUS_CLASS
</script>
<template>
  <CustomModal title="Cambiar el estado de la máquina" @save="onSave">
    <div class="flex w-125 flex-col gap-4 pb-5">
      <div class="grid grid-cols-[1fr_1fr] gap-1.5">
        <button
          v-for="(machine, key) in machineStatus"
          :key="'machineStatus-' + machine.id"
          class="border-border cursor-pointer rounded-lg border px-4 py-2 text-left text-[12.5px]"
          :class="selected === key ? 'bg-primary-light border-primary-dark' : ''"
          @click="selected = key"
        >
          <div class="badge inline-flex items-center gap-2" :class="machineStatusClass[key].chip">
            <div>{{ machine.label }}</div>
          </div>
          <div class="text-faint mt-1">{{ machine.description }}</div>
        </button>
      </div>
      <InputWrapper
        :id="'machine-status-modal-observations'"
        v-model="observations"
        label="Nota (opcional)"
        type="text"
        :is-text-area="true"
        :rows="3"
        placeholder="Motivo del cambio, detalles técnicos"
      />
    </div>
    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <div class="flex gap-2">
          <button class="btn" @click="close(false)">Cancelar</button>
          <button class="btn btn-primary" @click="onSave">Aplicar</button>
        </div>
      </div>
    </template>
  </CustomModal>
</template>
