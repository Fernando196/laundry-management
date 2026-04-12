<script setup lang="ts">
import { MACHINE_STATUS } from '~/const/machine.const';
import type { MachineStatusType } from '~/types/machine.type';
const selected = defineModel<MachineStatusType | null>();
</script>
<template>
    <div class="flex gap-4 flex-wrap py-4">
        <div v-for="state in MACHINE_STATUS" :class="{
            [state.classChip]: selected?.type === state.type,
            'bg-gray-400 text-white': selected?.type !== state.type
        }" class="w-40 px-4 py-2 rounded-md cursor-pointer" @click="selected = state">
            {{ state.label }}
        </div>
    </div>
</template>