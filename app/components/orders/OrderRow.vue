<script setup lang="ts">
import type { IOrder } from '~/types/order.type'

interface Props {
  order: IOrder
  selected?: boolean
}

defineProps<Props>()
defineEmits<{ select: [order: IOrder] }>()

const statusMap: Record<IOrder['status'], { label: string; dot: string; chip: string }> = {
  pending: { label: 'Pendiente', dot: 'bg-status-pendiente', chip: 'bg-status-pendiente-bg text-status-pendiente' },
  'in-process': { label: 'En proceso', dot: 'bg-status-proceso', chip: 'bg-status-proceso-bg text-status-proceso' },
  ready: { label: 'Listo', dot: 'bg-status-listo', chip: 'bg-status-listo-bg text-status-listo' },
  cancelled: { label: 'Cancelado', dot: 'bg-status-cancelado', chip: 'bg-status-cancelado-bg text-status-cancelado' },
}

const serviceMap: Record<IOrder['service'], string> = {
  wash: 'Lavado',
  dry: 'Secado',
  'wash-dry': 'Lav. + Sec.',
  ironing: 'Planchado',
  express: 'Express',
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false })
}
</script>

<template>
  <button
    class="rounded-md flex w-full cursor-pointer items-center gap-3 border-b border-neutral-100 px-4 py-3 text-left transition-colors last:border-b-0"
    :class="selected ? 'bg-primary-light' : 'bg-white hover:bg-neutral-50'" @click="$emit('select', order)">
    <!-- Status dot -->
    <span class="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" :class="statusMap[order.status].dot" />

    <!-- Main info -->
    <div class="min-w-0 flex-1">
      <div class="flex items-baseline justify-between gap-2">
        <span class="truncate text-sm font-semibold text-neutral-900">{{ order.customerName }}</span>
        <span class="shrink-0 text-sm font-bold" :class="selected ? 'text-primary' : 'text-neutral-700'">
          ${{ order.amount }}
        </span>
      </div>
      <div class="mt-0.5 flex items-center gap-2">
        <span class="rounded px-1.5 py-0.5 text-xs font-medium" :class="statusMap[order.status].chip">
          {{ statusMap[order.status].label }}
        </span>
        <span class="text-xs text-neutral-400">{{ serviceMap[order.service] }}</span>
        <span class="ml-auto shrink-0 text-xs text-neutral-400">{{ formatTime(order.createdAt) }}</span>
      </div>
    </div>
  </button>
</template>
