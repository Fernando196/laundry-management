<script setup lang="ts">
  import type { IMachine, MachineStatusType } from '~/types/machine.type'
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import { MACHINE_ESTATUS_CATALOG, MACHINE_STATUS } from '~/const/machine.const'

  interface Props {
    machine: IMachine
  }

  const props = defineProps<Props>()
  defineEmits<{
    changeCycle: [machine: IMachine]
    changeState: [machine: IMachine]
    details: [machine: IMachine]
  }>()

  const machineTypeSpanish = {
    washer: 'Lavadora',
    dryer: 'Secadora',
  }

  const machineStatus = computed(() => MACHINE_ESTATUS_CATALOG[props.machine.status] || null)
  const isDisabled = computed(() =>
    [MACHINE_STATUS.MAINTENANCE, MACHINE_STATUS['OUT-OF-SERVICE'] as MachineStatusType].includes(
      props.machine.status
    )
  )
  const isRunning = computed(() => props.machine.status === 'running')
</script>
<template>
  <div
    class="col-span-12 flex flex-col overflow-hidden rounded-2xl border border-b-0 border-neutral-100 bg-white shadow-sm sm:col-span-6 md:col-span-4 lg:col-span-3"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-4 pt-4">
      <span class="text-xs font-medium tracking-wide text-neutral-400 uppercase">
        {{ machineTypeSpanish[machine.type] }}
      </span>
      <span :class="machineStatus?.class" class="rounded-full px-2 py-0.5 text-xs font-semibold">
        {{ machineStatus?.label }}
      </span>
    </div>

    <!-- Image -->
    <div class="mx-auto h-70 w-70 px-6 py-4">
      <img
        :src="machine.image"
        :alt="machine.name"
        class="aspect-square w-full rounded-xl object-contain"
      />
    </div>

    <!-- Info -->
    <div class="flex flex-col gap-0.5 px-4 pb-4">
      <div class="flex items-center gap-2">
        <span class="text-base font-semibold text-neutral-900">{{ machine.name }}</span>
        <button class="h-6 w-6 cursor-pointer outline-none" @click="$emit('details', machine)">
          <MapIcon name="info" class="stroke-neutral-900" />
        </button>
      </div>
      <span class="text-sm text-neutral-400"
        >{{ machine.brand }} · {{ machine.timeCycle }} min</span
      >
    </div>

    <!-- Actions -->
    <div class="flex divide-x divide-neutral-100 border-t border-neutral-100">
      <button
        class="flex-1 py-3 text-sm font-medium transition-colors"
        :class="{
          'cursor-pointer bg-red-500 text-white hover:bg-white hover:text-red-500': isRunning,
          'cursor-pointer bg-green-600 text-white hover:bg-white hover:text-green-600':
            !isRunning && !isDisabled,
          'cursor-default bg-gray-300 text-gray-500': isDisabled,
        }"
        @click="!isDisabled ? $emit('changeCycle', machine) : null"
      >
        {{ isRunning ? 'Detener Ciclo' : 'Iniciar Ciclo' }}
      </button>
      <button
        class="flex-1 cursor-pointer bg-orange-400 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-orange-400"
        @click="$emit('changeState', machine)"
      >
        Cambiar estado
      </button>
      <!-- <button @click="$emit('details', machine)"
                class="flex-1 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50  cursor-pointer">
                Detalles
            </button> -->
    </div>
  </div>
</template>
