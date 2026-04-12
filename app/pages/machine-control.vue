<script setup lang="ts">
import MachineCard from '~/components/app/MachineCard.vue';
import { machineStatus, machineTypes, type Machine } from '~/types/machine.type'

const machines: Machine[] = []

for (let i = 0; i < 8; i++) {
    machines.push({
        id: i + 1,
        name: 'Lavadora ' + (i + 1),
        type: i % 2 === 0 ? machineTypes[0] : machineTypes[1],
        brand: 'Mabe',
        status: machineStatus[i % machineStatus.length],
        timeCycle: 45,
        image: 'https://www.viu.mx/img/1024/1024/resize/L/G/LG_01440_x3_1.jpg',
    })
}
</script>

<template>
    <div class="w-full h-full overflow-auto p-4">
        <div class="grid grid-cols-12 gap-4">
            <MachineCard v-for="machine in machines" :machine="machine" :key="machine.id" />
        </div>
    </div>
</template>
