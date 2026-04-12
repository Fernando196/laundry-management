<script setup lang="ts">
import MachineCard from '~/components/machine-control/MachineCard.vue';
import MachineCycleModal from '~/components/machine-control/MachineCycleModal.vue';
import MachineEstateModal from '~/components/machine-control/MachineEstateModal.vue';
import { MACHINE_STATUS } from '~/const/machine.const';
import { machines as machinesData } from '~/data/machines.data';
import type { IMachine, MachineStatusType } from '~/types/machine.type';

const machines = useState('machines', () => machinesData);
const { open: openModal } = useModal();

const handleChangeCycle = async (machine: IMachine) => {
    if (machine.status.type === 'running') {
        machine.status = MACHINE_STATUS.find((s) => s.type === 'active')!;
        return;
    }
    const response = await openModal(MachineCycleModal);
    if (!response) return;

    machine.status = MACHINE_STATUS.find((s) => s.type === 'running')!;
}

const handleChangeState = async (machine: IMachine) => {
    const responseState = await openModal<MachineStatusType>(MachineEstateModal);
    if (!responseState) return;
    machine.status = responseState;
}

const openDetails = (machine: IMachine) => {
}

</script>

<template>
    <div class="w-full h-full overflow-auto p-4">
        <div class="grid grid-cols-12 gap-4">
            <MachineCard v-for="machine in machines" :machine="machine" :key="machine.id"
                @change-state="handleChangeState" @details="openDetails" @change-cycle="handleChangeCycle" />
        </div>
    </div>
</template>
