<script setup lang="ts">
  import InputWrapper from '../common/InputWrapper.vue'
  import type { MachineStatusType } from '~/types/machine.type'
  import StatusChips from '../app/StatusChips.vue'

  const selected = ref<MachineStatusType | null>(null)

  const { close } = useModal()
  const onSave = () => {
    close(selected)
  }
</script>
<template>
  <div class="w-100 rounded-md bg-white p-4">
    <div class="text-base font-semibold">Selecciona el nuevo estatus</div>
    <StatusChips v-model="selected" />
    <InputWrapper type="text" :rows="5" :is-text-area="true" label="Descripción :" />
    <div class="mt-4 flex justify-end gap-2">
      <button
        class="bg-accent cursor-pointer rounded-sm px-5 py-1 text-white focus:outline-none"
        @click="close(false)"
      >
        Cancelar
      </button>
      <button
        class="bg-primary cursor-pointer rounded-sm px-5 py-1 text-white focus:outline-none"
        @click="onSave"
      >
        Actualizar
      </button>
    </div>
  </div>
</template>
