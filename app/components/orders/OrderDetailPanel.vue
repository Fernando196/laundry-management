<script setup lang="ts">
  import {
    ORDER_SERVICE_TYPE_CATALOG,
    ORDER_STATUS_CATALOG,
    ORDER_STATUS_TYPE,
  } from '~/const/orders.const'
  import type { IOrder } from '~/types/order.type'
  import MapIcon from '../common/MapIcon/MapIcon.vue'

  interface Props {
    order: IOrder
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    advance: [order: IOrder]
    collect: [order: IOrder]
    cancel: [order: IOrder]
  }>()

  function formatDateTime(iso: string) {
    return new Date(iso).toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const canAdvance = computed(
    () => props.order.status === 'pending' || props.order.status === 'in-process'
  )
  const canCollect = computed(() => props.order.status === 'ready')
  const canCancel = computed(
    () => props.order.status === 'pending' || props.order.status === 'in-process'
  )

  const advanceLabel = computed(() =>
    props.order.status === 'pending' ? 'Iniciar proceso' : 'Marcar como listo'
  )
</script>

<template>
  <div class="border-border flex h-full flex-col rounded-lg border bg-white">
    <!-- Header -->
    <div class="border-border bg-subtle-bg flex flex-col border-b px-5 pt-4 pb-3.5">
      <div class="flex justify-between">
        <div class="text-subtle font-mono text-xs">FACTURA · ORD-{{ order.id }}</div>
        <div class="badge" :class="'badge-' + order.status">
          {{ ORDER_STATUS_CATALOG[order.status].label }}
        </div>
      </div>
      <h1 class="text-base font-semibold">{{ order.customerName }}</h1>
      <div class="flex justify-between">
        <button class="btn btn-sm mt-2 w-max">
          <MapIcon name="edit" class="h-4 w-4" />
          Editar
        </button>

        <button class="btn btn-sm btn-ghost stroke-error">
          <MapIcon name="delete" class="h-4 w-4 fill-none" />
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="flex-1 space-y-6 overflow-auto px-6 py-5">
      <section class="">
        <div
          class="text-faint border-border mb-1.5 border-b border-dashed pb-1 text-[12px] font-semibold uppercase"
        >
          DETALLE DEL SERVICIO
        </div>
        <dl class="text-12.5 grid grid-cols-[1fr_auto] gap-[6px_12px] p-0">
          <dt>Fecha de recepción</dt>
          <dd>
            {{ formatDateTime(order.createdAt) }}
          </dd>
          <dt>Tipo de servicio</dt>
          <dd class="text-right">
            {{ ORDER_SERVICE_TYPE_CATALOG[order.service!].label }}
          </dd>
          <dt>Peso / Cantidad</dt>
          <dd>{{ order.quantity || 0 }} Kg</dd>
          <dt>Tarifa base</dt>
          <dd>${{ ORDER_SERVICE_TYPE_CATALOG[order.service!].serviceCost }}</dd>
          <dt>Máquina asignada</dt>
          <dd>
            {{ order.assignedMachine ?? 'Sin asignar' }}
          </dd>
        </dl>
      </section>
      <section class="">
        <div
          class="text-faint border-border mb-1.5 border-b border-dashed pb-1 text-[12px] font-semibold uppercase"
        >
          CONCEPTO
        </div>
      </section>
    </div>

    <!-- Actions -->
    <div class="space-y-2 border-t border-neutral-100 px-6 py-4">
      <!-- Cobrar (solo cuando listo) -->
      <button
        v-if="canCollect"
        class="bg-status-ready flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        @click="emit('collect', order)"
      >
        Cobrar y cerrar · ${{ order.amount }} MXN
      </button>

      <!-- Avanzar estado -->
      <button
        v-if="canAdvance"
        class="bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        @click="emit('advance', order)"
      >
        {{ advanceLabel }}
      </button>

      <!-- Cancelar -->
      <button
        v-if="canCancel"
        class="hover:border-accent hover:text-accent flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-100 bg-white px-4 py-2.5 text-sm font-medium text-neutral-400 transition-colors"
        @click="emit('cancel', order)"
      >
        Cancelar pedido
      </button>

      <!-- Estado final -->
      <p
        v-if="order.status === ORDER_STATUS_TYPE.CANCELED"
        class="py-2 text-center text-sm text-neutral-400"
      >
        Este pedido fue cancelado.
      </p>
    </div>
  </div>
</template>
<style scoped>
  @import '~/assets/css/main.css';
  dt {
    @apply text-muted;
  }
  dd {
    @apply text-right font-mono font-medium;
  }
</style>
