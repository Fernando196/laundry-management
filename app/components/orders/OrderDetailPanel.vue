<script setup lang="ts">
  import {
    ORDER_SERVICE_TYPE_CATALOG,
    ORDER_STATUS_CATALOG,
    ORDER_STATUS_TYPE,
  } from '~/const/orders.const'
  import type { IOrder, OrderStatus } from '~/types/order.type'
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
    () =>
      props.order.status === ORDER_STATUS_TYPE.PENDING ||
      props.order.status === ORDER_STATUS_TYPE['IN-PROCESS']
  )
  const canCollect = computed(() => props.order.status === ORDER_STATUS_TYPE.READY)
  const canCancel = computed(
    () =>
      props.order.status === ORDER_STATUS_TYPE.PENDING ||
      props.order.status === ORDER_STATUS_TYPE['IN-PROCESS']
  )

  const advanceLabel = computed(() =>
    props.order.status === ORDER_STATUS_TYPE.PENDING ? 'Iniciar proceso' : 'Marcar como listo'
  )

  const indexEstausCurrent = computed(() =>
    Object.keys(ORDER_STATUS_CATALOG).findIndex((key) => key === props.order.status)
  )
  const orderEstatus = computed(() =>
    Object.keys(ORDER_STATUS_CATALOG).map((key, index) => ({
      done: index < indexEstausCurrent.value,
      current: index === indexEstausCurrent.value,
      label: ORDER_STATUS_CATALOG[key as OrderStatus].label,
      time:
        index < indexEstausCurrent.value
          ? 'Completado'
          : index === indexEstausCurrent.value
            ? 'En curso'
            : '',
    }))
  )
</script>

<template>
  <div
    class="border-border relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white"
  >
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
    <div class="min-h-0 flex-1 space-y-6 overflow-x-hidden overflow-y-auto px-6 py-5">
      <section class="">
        <div class="detail-section-label">DETALLE DEL SERVICIO</div>
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
      <section class="flex flex-col gap-2">
        <div class="detail-section-label detail-section-border">CONCEPTO</div>
        <div class="flex flex-col">
          <div class="grid grid-cols-[1fr_auto_auto] gap-2.5 py-1.5 text-[13px]">
            <div class="flex flex-col">
              <span class="font-medium">Lavado de ropa</span>
              <span class="text-subtle text-[11.5px]">$130 x 6kg</span>
            </div>
            <div class="text-muted min-w-8 text-right font-mono">6</div>
            <div class="min-w-19 text-right font-mono">$730.00</div>
          </div>
          <div class="grid grid-cols-[1fr_auto_auto] gap-2.5 py-1.5 text-[13px]">
            <div class="flex flex-col">
              <span class="font-medium">Jabon liquido 1L</span>
              <span class="text-subtle text-[11.5px]">$35 c/u</span>
            </div>
            <div class="text-muted min-w-8 text-right font-mono">x1</div>
            <div class="min-w-19 text-right font-mono">$35.00</div>
          </div>
        </div>
        <div class="text-muted border-border grid grid-cols-[1fr_auto] border-t border-dashed pt-2">
          <div class="">Subtotal servicio</div>
          <div class="text-right font-mono font-medium">${{ order.amount }}</div>
        </div>
        <div class="text-muted grid grid-cols-[1fr_auto]">
          <div class="">Aditamentos</div>
          <div class="text-right font-mono font-medium">${{ order.amount }}</div>
        </div>
        <div class="border-border grid grid-cols-[1fr_auto] border-t pt-2">
          <div class="font-bold">Total a cobrar</div>
          <div class="text-right font-mono font-medium">${{ order.amount }}.00 MXN</div>
        </div>
      </section>
      <section class="">
        <div class="detail-section-label">COMENTARIOS</div>
        <div class="bg-subtle-bg text-subtle border-border rounded-md border p-2">
          {{ order.comments || 'Sin comentarios adicionales' }}
        </div>
      </section>
      <section class="">
        <div class="detail-section-label">PROGRESO</div>
        <div
          v-for="(status, index) in orderEstatus"
          :key="'timeline-detail-' + index"
          class="timeline-step"
          :class="{
            done: status.done,
            current: status.current,
          }"
        >
          <div class="timeline-dot" />
          <div class="py-1">
            <div class="timeline-label font-medium">{{ status.label }}</div>
            <div v-if="status.time" class="timeline-time text-subtle font-mono text-[11.5px]">
              {{ status.time }}
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Actions -->
    <div class="border-t-border bg-subtle-bg shrink-0 space-y-2 border-t px-6 py-4">
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
<style scoped lang="css">
  @reference '~/assets/css/main.css';
  dt {
    @apply text-muted;
  }
  dd {
    @apply text-right font-mono font-medium;
  }

  .detail-section-label {
    @apply text-faint mb-1 pb-1 text-[12px] font-semibold uppercase;
  }
  .detail-section-border {
    @apply border-border mb-1.5 border-b border-dashed;
  }
  .line {
    @apply border-border border-l;
    min-height: 40px;
  }
  .line::before {
    content: '';
    width: 10px;
    height: 10px;
    background-color: var(--color-primary);
    border-radius: 9999px;
    display: block;
    margin-left: -5px;
    margin-top: 4px;
  }
  .timeline-step {
    @apply text-faint relative grid grid-cols-[20px_1fr] gap-2.5 text-[12.5px];
  }
  .done,
  .current {
    @apply text-text;
  }
  .timeline-step::before {
    content: '';
    position: absolute;
    left: 9px;
    top: 20px;
    bottom: -10px;
    width: 2px;
    background: var(--color-border);
  }
  .timeline-step:last-child::before {
    display: none;
  }
  .timeline-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 8px;
    border: 2px solid var(--color-border);
    z-index: 1;
    margin-left: 5px;
    background-color: var(--color-muted-bg);
  }
  .timeline-step.done .timeline-dot {
    background-color: var(--color-success);
    border-color: var(--color-success);
  }
  .timeline-step.current .timeline-dot {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px var(--color-primary-light);
  }
</style>
