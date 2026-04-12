<script setup lang="ts">
import InputWrapper from '../common/InputWrapper.vue';


const machineCycle = {
    clothes: 0,
    detergent: 0,
    bleach: 0,
    stainRemover: 0,
    powderDetergent: 0,
    liquidDetergent: 0,
    detergentPods: 0,
}

const { close } = useModal();

const onSave = () => {
    close(machineCycle);
}

</script>
<template>
    <div class="flex flex-col gap-2 w-120 bg-white px-8 py-4 rounded-2xl">
        <h1>Detalle del ciclo</h1>
        <div class="grid grid-cols-12 gap-4">
            <InputWrapper class="col-span-6" type="number" label="Total de ropa:" v-model="machineCycle.clothes" />
            <InputWrapper class="col-span-6" type="number" label="Total de detergente:"
                v-model="machineCycle.detergent" />
            <InputWrapper class="col-span-6" type="number" label="Total de blanqueador:"
                v-model="machineCycle.bleach" />
            <InputWrapper class="col-span-6" type="number" label="Total de quitamanchas:"
                v-model="machineCycle.stainRemover" />
            <InputWrapper class="col-span-6" type="number" label="Total de Jabon en polvo:"
                v-model="machineCycle.powderDetergent" />
            <InputWrapper class="col-span-6" type="number" label="Total de jabon liquido:"
                v-model="machineCycle.liquidDetergent" />
        </div>

        <div class="flex justify-end gap-2 mt-2">
            <button @click="close(false)" class="focus:outline-none px-5 py-1 bg-accent text-white rounded-sm">
                Cancelar
            </button>
            <button @click="onSave" class="focus:outline-none px-5 py-1 bg-primary text-white rounded-sm">
                Iniciar
            </button>
        </div>
    </div>
</template>