<script setup lang="ts">
import InputWrapper from '../common/InputWrapper.vue';
import type { MachineStatusType } from '~/types/machine.type';
import StatusChips from '../app/StatusChips.vue';

const selected = ref<MachineStatusType | null>(null)

const { close } = useModal();
const onSave = () => {
    close(selected)
}
</script>
<template>
    <div class=" bg-white rounded-md p-4 w-100">
        <div class="text-base font-semibold">Selecciona el nuevo estatus</div>
        <StatusChips v-model="selected" />
        <InputWrapper type="text" :rows="5" :is-text-area="true" label="Descripción :" />
        <div class="flex justify-end gap-2 mt-4">
            <button @click="close(false)"
                class="focus:outline-none px-5 py-1 bg-accent text-white rounded-sm cursor-pointer">
                Cancelar
            </button>
            <button @click="onSave"
                class="focus:outline-none px-5 py-1 bg-primary text-white rounded-sm cursor-pointer">
                Actualizar
            </button>
        </div>
    </div>
</template>