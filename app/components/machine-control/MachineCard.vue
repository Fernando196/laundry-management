<script setup lang="ts">
  import type { IMachine } from '~/types/machine.type'
  import { MACHINE_STATUS, MACHINE_STATUS_CLASS } from '~/const/machine.const'
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import type { Icons } from '~/types/icons.type'
  import MachineCycleModal from './MachineCycleModal.vue'

  const props = defineProps<{
    machine: IMachine
  }>()

  const { openModal } = useModal()
  const emit = defineEmits<{ 'update:machine': [machine: IMachine] }>()

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
    return false
  })

  const labelStatus = computed(() => {
    switch (props.machine.status) {
      case MACHINE_STATUS.ACTIVE:
        return 'Iniciar ciclo'
      case MACHINE_STATUS.RUNNING:
        return 'Detener'
      default:
        return ''
    }
  })

  const handleChangeState = async () => {
    if (props.machine.status === MACHINE_STATUS.ACTIVE) {
      const response = await openModal(MachineCycleModal, {
        machine: props.machine,
      })
      if (!response) return
      emit('update:machine', {
        ...props.machine,
        status: MACHINE_STATUS.RUNNING,
        cycleStartTime: new Date().toISOString(),
        cycleDuration: 30 * 60 * 1000, // 30 minutos
      })
    } else if (props.machine.status === MACHINE_STATUS.RUNNING) {
      emit('update:machine', {
        ...props.machine,
        status: MACHINE_STATUS.ACTIVE,
        cycleStartTime: undefined,
        cycleDuration: undefined,
      })
    }
  }

  const cycleTime = computed(() => {
    if (props.machine.status !== MACHINE_STATUS.RUNNING) return null
    if (!props.machine.cycleStartTime || !props.machine.cycleDuration) return null

    if (props.machine.status === MACHINE_STATUS.RUNNING) {
      const elapsed = Date.now() - new Date(props.machine.cycleStartTime).getTime()
      const remaining = Math.max(0, props.machine.cycleDuration - elapsed)
      return `${Math.floor(remaining / 60000)}:${Math.floor((remaining % 60000) / 1000)
        .toString()
        .padStart(2, '0')}`
    }
    return '00:00'
  })
  const progress = computed(() => {
    if (props.machine.status !== MACHINE_STATUS.RUNNING) return 0
    if (!props.machine.cycleStartTime || !props.machine.cycleDuration) return 0

    const elapsed = Date.now() - new Date(props.machine.cycleStartTime).getTime()
    return Math.min(100, (elapsed / props.machine.cycleDuration) * 100)
    return 0
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
        {{ machine?.Status?.label || '' }}
      </span>
      <div class="text-subtle border-border border px-2 py-1 font-mono text-[11px]">
        FOTO · LAVADORA · M-{{ machine.id }}
      </div>
    </div>
    <div class="flex-1 px-4 py-3.5">
      <div class="mb-2.5 flex w-full items-center justify-between">
        <div class="flex w-full flex-col">
          <div class="flex justify-between">
            <span class="text-[14px] font-semibold">{{ machine.name }} {{ machine.id }}</span>
            <span class="text-[10px]">M-{{ machine.id }}</span>
          </div>
          <span class="text-muted font-mono text-[12px]"
            >{{ machine.brand }} · {{ machine.model }} · {{ machine.capacityKg }}Kg</span
          >
        </div>
      </div>
      <div
        v-if="errorMachine"
        class="flex items-center gap-1.5"
        :class="MACHINE_STATUS_CLASS[errorMachine.status].messageIconCard"
      >
        <MapIcon :name="errorMachine.icon" class="h-4 w-4" />
        <span class="text-xs">{{ errorMachine.message }}</span>
      </div>
      <div v-else-if="machine.status === MACHINE_STATUS.RUNNING" class="mt-2">
        <div class="h-2 w-full rounded-full bg-gray-200">
          <div
            class="bg-primary h-full rounded-full transition-all"
            :style="{ width: progress + '%' }"
          />
        </div>
        <div class="text-muted mt-1 flex justify-between font-mono text-[11px]">
          <span>{{ progress.toFixed(0) }}%</span>
          <span>{{ cycleTime }}m restantes</span>
        </div>
      </div>
    </div>
    <div class="flex gap-2 px-4 pb-3.5">
      <button
        v-if="!errorMachine"
        class="btn btn-sm flex-1 justify-center"
        :class="machine.status === MACHINE_STATUS.RUNNING ? '' : 'btn-primary'"
        @click="handleChangeState"
      >
        <MapIcon
          v-if="machine.status === MACHINE_STATUS.RUNNING"
          name="square"
          class="h-4 w-4 stroke-current"
        />
        {{ labelStatus }}
      </button>
      <button class="btn btn-sm flex-1 justify-center" :class="errorMachine ? 'btn-primary' : ''">
        Cambiar estado
      </button>
    </div>
  </div>
</template>
