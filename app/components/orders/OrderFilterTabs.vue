<script setup lang="ts">
  import { ORDER_STATUS_CATALOG } from '~/const/orders.const'
  import type { IOrder, OrderFilterTab, OrderStatus } from '~/types/order.type'

  interface Props {
    orders: IOrder[]
  }

  const props = defineProps<Props>()

  const keys = Object.keys(ORDER_STATUS_CATALOG) as OrderStatus[]
  const filterTabs = computed<{ key: OrderFilterTab; label: string }[]>(() => {
    return [
      { key: 'all', label: 'Todos' },
      ...keys.map((key) => ({
        key,
        label: ORDER_STATUS_CATALOG[key].label,
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
      class="btn btn-sm"
      :class="selected === tab.key ? 'btn-primary' : ''"
      @click="selected = tab.key"
    >
      {{ tab.label }}
      <span v-if="tab.key !== 'all'" class="ml-1 opacity-70">
        {{ countByStatus(tab.key as OrderStatus) }}
      </span>
    </button>
  </div>
</template>
