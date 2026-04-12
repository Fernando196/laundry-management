<script setup lang="ts">
import type { Machine, MachineStatus } from '~/types/machine.type';

interface Props {
    machine: Machine
}

defineProps<Props>();

const typeLabel: Record<string, string> = {
    washer: 'Lavadora',
    dryer: 'Secadora',
}

const statusConfig: Record<MachineStatus, { label: string; class: string }> = {
    idle: { label: 'Disponible', class: 'bg-status-listo-bg text-status-listo' },
    running: { label: 'En ciclo', class: 'bg-status-proceso-bg text-status-proceso' },
    maintenance: { label: 'Mantenimiento', class: 'bg-status-pendiente-bg text-status-pendiente' },
    'out-of-service': { label: 'Fuera de servicio', class: 'bg-status-cancelado-bg text-status-cancelado' },
}

</script>
<template>
    <div
        class="col-span-12 flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm sm:col-span-6 md:col-span-4 lg:col-span-3">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 pt-4">
            <span class="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                {{ typeLabel[machine.type] }}
            </span>
            <span :class="statusConfig[machine.status].class" class="rounded-full px-2 py-0.5 text-xs font-semibold">
                {{ statusConfig[machine.status].label }}
            </span>
        </div>

        <!-- Image -->
        <div class="px-6 py-4 h-70 w-70 mx-auto">
            <img :src="machine.image" :alt="machine.name" class="aspect-square w-full rounded-xl object-contain" />
        </div>

        <!-- Info -->
        <div class="flex flex-col gap-0.5 px-4 pb-4">
            <span class="text-sm font-semibold text-neutral-900">{{ machine.name }}</span>
            <span class="text-xs text-neutral-400">{{ machine.brand }} · {{ machine.timeCycle }} min</span>
        </div>

        <!-- Actions -->
        <div class="flex divide-x divide-neutral-100 border-t border-neutral-100">
            <button class="flex-1 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-light">
                Iniciar ciclo
            </button>
            <button class="flex-1 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
                Detalles
            </button>
        </div>
    </div>
</template>