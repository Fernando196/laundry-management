<script setup lang="ts">
import type { IMachine } from '~/types/machine.type';
import MapIcon from '../common/MapIcon/MapIcon.vue';

interface Props {
    machine: IMachine
}

const props = defineProps<Props>();
defineEmits<{ changeCycle: [machine: IMachine]; changeState: [machine: IMachine]; details: [machine: IMachine] }>()

const machineTypeSpanish = {
    'washer': "Lavadora",
    "dryer": "Secadora"
}

const isDisabled = computed(() => ['maintenance', 'out-of-service'].includes(props.machine.status.type));
const isRunning = computed(() => props.machine.status.type === 'running')

</script>
<template>
    <div
        class="col-span-12 flex flex-col overflow-hidden rounded-2xl border border-neutral-100 border-b-0 bg-white shadow-sm sm:col-span-6 md:col-span-4 lg:col-span-3">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 pt-4">
            <span class="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                {{ machineTypeSpanish[machine.type] }}
            </span>
            <span :class="machine.status.class" class="rounded-full px-2 py-0.5 text-xs font-semibold">
                {{ machine.status.label }}
            </span>
        </div>

        <!-- Image -->
        <div class="px-6 py-4 h-70 w-70 mx-auto">
            <img :src="machine.image" :alt="machine.name" class="aspect-square w-full rounded-xl object-contain" />
        </div>

        <!-- Info -->
        <div class="flex flex-col gap-0.5 px-4 pb-4">
            <div class="flex items-center gap-2">
                <span class="text-base font-semibold text-neutral-900">{{ machine.name }}</span>
                <button class="outline-none h-6 w-6 cursor-pointer" @click="$emit('details', machine)">
                    <MapIcon name="info" class=" stroke-neutral-900" />
                </button>
            </div>
            <span class="text-sm text-neutral-400">{{ machine.brand }} · {{ machine.timeCycle }} min</span>
        </div>

        <!-- Actions -->
        <div class="flex divide-x divide-neutral-100 border-t border-neutral-100">
            <button @click="!isDisabled ? $emit('changeCycle', machine) : null"
                class="flex-1 py-3 text-sm font-medium  transition-colors" :class="{
                    'bg-red-500 text-white hover:text-red-500 hover:bg-white cursor-pointer': isRunning,
                    'text-white bg-green-600 hover:text-green-600 hover:bg-white cursor-pointer': !isRunning && !isDisabled,
                    'bg-gray-300 text-gray-500 cursor-default': isDisabled
                }">
                {{ isRunning ? 'Detener Ciclo' : 'Iniciar Ciclo' }}
            </button>
            <button @click="$emit('changeState', machine)"
                class="flex-1 py-3 text-sm font-medium  transition-colors cursor-pointer  bg-orange-400 hover:text-orange-400 text-white hover:bg-white">
                Cambiar estado
            </button>
            <!-- <button @click="$emit('details', machine)"
                class="flex-1 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50  cursor-pointer">
                Detalles
            </button> -->
        </div>
    </div>
</template>