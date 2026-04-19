<script setup lang="ts">
  import { ORDER_SERVICE_TYPE_CATALOG, ORDER_STATUS_CATALOG } from '~/const/orders.const'
  import type { IOrder } from '~/types/order.type'

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
  <div class="flex h-full flex-col bg-white">
    <!-- Header -->
    <div class="border-b border-neutral-100 px-6 py-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-medium tracking-wide text-neutral-400 uppercase">Pedido</p>
          <p class="text-2xl font-bold text-neutral-900">#{{ order.id }}</p>
        </div>
        <span
          class="mt-1 rounded-full px-3 py-1 text-xs font-semibold"
          :class="ORDER_STATUS_CATALOG[order.status].classChip"
        >
          {{ ORDER_STATUS_CATALOG[order.status].label }}
        </span>
      </div>
    </div>

    <!-- Body -->
    <div class="flex-1 space-y-6 overflow-auto px-6 py-5">
      <!-- Cliente -->
      <section>
        <p class="mb-2 text-xs font-medium tracking-wide text-neutral-400 uppercase">Cliente</p>
        <div class="flex items-center gap-3">
          <div
            class="bg-primary-light text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          >
            {{ order.customerName.charAt(0) }}
          </div>
          <span class="text-base font-semibold text-neutral-900">{{ order.customerName }}</span>
        </div>
      </section>

      <!-- Servicio -->
      <section>
        <p class="mb-2 text-xs font-medium tracking-wide text-neutral-400 uppercase">Servicio</p>
        <div class="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
          <p class="font-semibold text-neutral-900">
            {{ ORDER_SERVICE_TYPE_CATALOG[order.service!].label }}
          </p>
          <p class="mt-0.5 text-sm text-neutral-400">
            {{ ORDER_SERVICE_TYPE_CATALOG[order.service!].description }}
          </p>
        </div>
      </section>

      <!-- Tiempos -->
      <section>
        <p class="mb-2 text-xs font-medium tracking-wide text-neutral-400 uppercase">Tiempos</p>
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-neutral-400">Entrada</span>
            <span class="font-medium text-neutral-700">{{ formatDateTime(order.createdAt) }}</span>
          </div>
          <div v-if="order.completedAt" class="flex items-center justify-between text-sm">
            <span class="text-neutral-400">Completado</span>
            <span :class="ORDER_STATUS_CATALOG[order.status].classChip" class="font-medium">{{
              formatDateTime(order.completedAt)
            }}</span>
          </div>
        </div>
      </section>

      <!-- Monto -->
      <section class="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neutral-400">Total</span>
          <span class="text-2xl font-bold text-neutral-900"
            >${{ order.amount }} <span class="text-sm font-normal text-neutral-400">MXN</span></span
          >
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
      <p v-if="order.status === 'cancelled'" class="py-2 text-center text-sm text-neutral-400">
        Este pedido fue cancelado.
      </p>
    </div>
  </div>
</template>
