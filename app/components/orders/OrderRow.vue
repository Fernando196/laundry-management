<script setup lang="ts">
  import dayjs from '#build/dayjs.imports.mjs'
  import { ORDER_SERVICE_TYPE_CATALOG, ORDER_STATUS_CATALOG } from '~/const/orders.const'
  import type { IOrder } from '~/types/order.type'

  interface Props {
    order: IOrder
    selected?: boolean
  }

  const props = defineProps<Props>()
  defineEmits<{ select: [order: IOrder] }>()

  const orderStatus = computed(() => ORDER_STATUS_CATALOG[props.order.status])
  const formatTime = computed(() => dayjs(props.order.completedAt).format('DD/MM/YYYY HH:MM'))
</script>

<template>
  <div
    class="border-border ring-primary flex w-full cursor-pointer flex-col gap-3 rounded-md border px-4 py-3.5 shadow-md transition-colors"
    :class="selected ? 'border-primary-dark shadow-primary' : 'border-strong shadow-sm'"
    @click="$emit('select', order)"
  >
    <!-- Main info -->
    <section class="flex items-baseline justify-between gap-2">
      <div class="min-w-0">
        <div class="truncate text-sm font-semibold text-neutral-900">{{ order.customerName }}</div>
        <div class="text-subtle font-mono text-xs font-medium">ORD-{{ order.id }}</div>
      </div>
      <span
        class="badge rounded px-1.5 py-0.5 text-xs font-medium"
        :class="'badge-' + order.status"
      >
        {{ orderStatus?.label }}
      </span>
    </section>
    <section
      class="text-muted border-border bg-subtle-bg mt-0.5 flex items-center gap-2 rounded-lg border px-2 py-1"
    >
      <span>{{ ORDER_SERVICE_TYPE_CATALOG[order.service!].label }}</span>
      <span class="text-x ml-auto shrink-0">{{ formatTime }}</span>
    </section>
    <section class="border-border flex justify-between border-t border-dashed pt-2">
      <span class="text-sm text-neutral-500">Total</span>
      <span
        class="shrink-0 text-base font-bold"
        :class="selected ? 'text-primary' : 'text-neutral-700'"
      >
        ${{ order.amount }}
      </span>
    </section>
  </div>
</template>
