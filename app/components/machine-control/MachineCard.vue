<script setup lang="ts">
  import type { IMachine, IMachineStatusType } from '~/types/machine.type'
  import { MACHINE_STATUS, MACHINE_STATUS_CLASS } from '~/const/machine.const'
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import type { Icons } from '~/types/icons.type'

  interface Props {
    machine: IMachine
  }

  const props = defineProps<Props>()
  defineEmits<{
    changeCycle: [machine: IMachine]
    changeState: [machine: IMachine]
    details: [machine: IMachine]
  }>()

  const isDisabled = computed(() =>
    [MACHINE_STATUS.MAINTENANCE, MACHINE_STATUS['OUT-OF-SERVICE'] as IMachineStatusType].includes(
      props.machine.status
    )
  )
  const isRunning = computed(() => props.machine.status === 'running')

  const errorMachine = computed(() => {
    if (props.machine.status === MACHINE_STATUS.MAINTENANCE) {
      return {
        status: MACHINE_STATUS.MAINTENANCE,
        icon: 'config' as Icons,
        message: 'La máquina está en mantenimiento.',
      }
    }
    if (props.machine.status === MACHINE_STATUS['OUT-OF-SERVICE']) {
      return {
        status: MACHINE_STATUS['OUT-OF-SERVICE'],
        icon: 'alert' as Icons,
        message: 'La máquina está fuera de servicio.',
      }
    }
    return null
  })
</script>
<template>
  <div
    class="border-border bg-surface transition-border hover:border-border-strong relative flex flex-col overflow-hidden rounded-lg border hover:shadow-sm"
  >
    <div class="text-subtle relative grid aspect-4/3 place-items-center">
      <span
        class="text-subtle border-border absolute top-3 left-3 flex items-center gap-1 rounded-sm border bg-white px-2 py-0.5 text-[11px] font-medium"
      >
        <span class="h-2 w-2 rounded-full" :class="MACHINE_STATUS_CLASS[machine.status].dot" />
        {{ machine.Status.label }}
      </span>
      <div class="text-subtle border-border border px-2 py-1 font-mono text-[11px]">
        FOTO · LAVADORA · M-{{ machine.id }}
      </div>
    </div>
    <div class="flex-1 px-4 py-3.5">
      <div class="mb-2.5 flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-[13px] font-semibold">{{ machine.name }} {{ machine.id }}</span>
          <span class="text-muted font-mono text-[12px] uppercase"
            >{{ machine.brand }} · {{ machine.model }} · {{ machine.capacityKg }}</span
          >
        </div>
      </div>
      <div
        v-if="errorMachine"
        class="flex gap-1.5"
        :class="MACHINE_STATUS_CLASS[errorMachine.status].messageIconCard"
      >
        <MapIcon :name="errorMachine.icon" class="h-4 w-4" />
        <span class="text-xs">{{ errorMachine.message }}</span>
      </div>
    </div>
    <div class="flex gap-2 px-4 pb-3.5">
      <button class="btn btn-sm btn-primary flex-1 justify-center">Iniciar ciclo</button>
      <button class="btn btn-sm flex-1 justify-center">Cambiar estado</button>
    </div>
  </div>
</template>
