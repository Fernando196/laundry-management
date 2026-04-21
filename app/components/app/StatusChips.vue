<script setup lang="ts">
  import { MACHINE_STATUS_CATALOG } from '~/const/machine.const'
  import type { MachineStatusType } from '~/types/machine.type'
  const selected = defineModel<MachineStatusType | null>()
</script>
<template>
  <div class="flex flex-wrap gap-4 py-4">
    <div
      v-for="(state, key) in MACHINE_STATUS_CATALOG"
      :key="'status-chip-' + key"
      :class="[selected === key ? state.classChip : 'bg-gray-400 text-white']"
      class="w-40 cursor-pointer rounded-md px-4 py-2"
      @click="selected = key"
    >
      {{ state.label }}
    </div>
  </div>
</template>
