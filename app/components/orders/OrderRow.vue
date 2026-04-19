<script setup lang="ts">
  import dayjs from '#build/dayjs.imports.mjs'
  import { ORDER_STATUS_CATALOG } from '~/const/orders.const'
  import type { IOrder, ServiceType } from '~/types/order.type'

  interface Props {
    order: IOrder
    selected?: boolean
  }

  const props = defineProps<Props>()
  defineEmits<{ select: [order: IOrder] }>()

  const orderStatus = computed(() => ORDER_STATUS_CATALOG[props.order.status])
  const formatTime = computed(() => dayjs(props.order.completedAt).format('DD/MM/YYYY HH:MM'))

  const serviceMap: Record<ServiceType, string> = {
    wash: 'Lavado',
    dry: 'Secado',
    'wash-dry': 'Lav. + Sec.',
    ironing: 'Planchado',
    express: 'Express',
  }
</script>

<template>
  <button
    class="flex w-full cursor-pointer items-center gap-3 rounded-md border border-neutral-100 px-4 py-3 text-left shadow-md transition-colors last:border-b-0"
    :class="selected ? 'bg-primary-light' : 'bg-white hover:bg-neutral-50'"
    @click="$emit('select', order)"
  >
    <!-- Status dot -->
    <span class="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" :class="[orderStatus?.dot]" />

    <!-- Main info -->
    <div class="min-w-0 flex-1">
      <div class="flex items-baseline justify-between gap-2">
        <span class="truncate text-sm font-semibold text-neutral-900">{{
          order.customerName
        }}</span>
        <span
          class="shrink-0 text-sm font-bold"
          :class="selected ? 'text-primary' : 'text-neutral-700'"
        >
          ${{ order.amount }}
        </span>
      </div>
      <div class="mt-0.5 flex items-center gap-2">
        <span class="rounded px-1.5 py-0.5 text-xs font-medium" :class="orderStatus?.classChip">
          {{ orderStatus?.label }}
        </span>
        <span class="text-xs text-neutral-400">{{
          serviceMap[order?.service as ServiceType]
        }}</span>
        <span class="ml-auto shrink-0 text-xs text-neutral-400">{{ formatTime }}</span>
      </div>
    </div>
  </button>
</template>
