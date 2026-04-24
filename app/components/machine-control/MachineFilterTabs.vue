<script setup lang="ts">
  import { MACHINE_STATUS_CATALOG } from '~/const/machine.const'
  import type { IMachine, IMachineFilterTab, IMachineStatusType } from '~/types/machine.type'

  interface Props {
    machines: IMachine[]
  }

  const props = defineProps<Props>()

  const keys = Object.keys(MACHINE_STATUS_CATALOG) as IMachineStatusType[]
  const filterTabs = computed<{ key: IMachineFilterTab; label: string }[]>(() => {
    return [
      { key: 'all', label: 'Todos' },
      ...keys.map((key) => ({
        key,
        label: MACHINE_STATUS_CATALOG[key].label,
      })),
    ]
  })

  const selected = defineModel<IMachineFilterTab>()

  function countByStatus(status: IMachineStatusType) {
    return props.machines.filter((o) => o.status === status).length
  }
</script>
<template>
  <div class="flex gap-2 overflow-x-auto pb-2">
    <button
      v-for="tab in filterTabs"
      :key="'tab-' + tab.key"
      class="btn btn-sm"
      :class="selected === tab.key ? 'btn-primary' : ''"
      @click="selected = tab.key"
    >
      {{ tab.label }}
      <span v-if="tab.key !== 'all'" class="ml-1 opacity-70">
        {{ countByStatus(tab.key as IMachineStatusType) }}
      </span>
    </button>
  </div>
</template>
