<script setup lang="ts">
  import { ORDER_STATUS_CATALOG } from '~/const/orders.const'
  import type { IOrder, OrderFilterTab, OrderStatus } from '~/types/order.type'

  interface Props {
    orders: IOrder[]
  }

  const props = defineProps<Props>()

  const keys = Object.keys(ORDER_STATUS_CATALOG) as OrderStatus[]
  const filterTabs = computed<{ key: OrderFilterTab; label: string; classChip: string }[]>(() => {
    return [
      { key: 'all', label: 'Todos', classChip: 'bg-primary text-primary-light' },
      ...keys.map((key) => ({
        key,
        label: ORDER_STATUS_CATALOG[key].label,
        classChip: ORDER_STATUS_CATALOG[key].classChip,
      })),
    ]
  })

  const selected = defineModel<OrderFilterTab>()

  function countByStatus(status: OrderStatus) {
    return props.orders.filter((o) => o.status === status).length
  }
</script>
<template>
  <div class="flex gap-2 overflow-x-auto pb-2">
    <button
      v-for="tab in filterTabs"
      :key="'tab-' + tab.key"
      class="shrink-0 cursor-pointer rounded-full px-3 py-1 text-[14px] font-semibold transition-colors"
      :class="
        selected === tab.key
          ? tab.classChip
          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
      "
      @click="selected = tab.key"
    >
      {{ tab.label }}
      <span v-if="tab.key !== 'all'" class="ml-1 opacity-70">
        {{ countByStatus(tab.key as OrderStatus) }}
      </span>
    </button>
  </div>
</template>
