<script setup lang="ts">
  import InputWrapper from '../common/InputWrapper.vue'

  const machineCycle = {
    clothes: 0,
    detergent: 0,
    bleach: 0,
    stainRemover: 0,
    powderDetergent: 0,
    liquidDetergent: 0,
    detergentPods: 0,
  }

  const { close } = useModal()

  const onSave = () => {
    close(machineCycle)
  }
</script>
<template>
  <div class="flex w-120 flex-col gap-2 rounded-2xl bg-white px-8 py-4">
    <h1>Detalle del ciclo</h1>
    <div class="grid grid-cols-12 gap-4">
      <InputWrapper
        id="clothes"
        v-model="machineCycle.clothes"
        class="col-span-6"
        type="number"
        label="Total de ropa:"
      />
      <InputWrapper
        id="detergent"
        v-model="machineCycle.detergent"
        class="col-span-6"
        type="number"
        label="Total de detergente:"
      />
      <InputWrapper
        id="bleach"
        v-model="machineCycle.bleach"
        class="col-span-6"
        type="number"
        label="Total de blanqueador:"
      />
      <InputWrapper
        id="stainRemover"
        v-model="machineCycle.stainRemover"
        class="col-span-6"
        type="number"
        label="Total de quitamanchas:"
      />
      <InputWrapper
        id="powderDetergent"
        v-model="machineCycle.powderDetergent"
        class="col-span-6"
        type="number"
        label="Total de Jabon en polvo:"
      />
      <InputWrapper
        id="liquidDetergent"
        v-model="machineCycle.liquidDetergent"
        class="col-span-6"
        type="number"
        label="Total de jabon liquido:"
      />
    </div>

    <div class="mt-2 flex justify-end gap-2">
      <button
        class="bg-accent rounded-sm px-5 py-1 text-white focus:outline-none"
        @click="close(false)"
      >
        Cancelar
      </button>
      <button class="bg-primary rounded-sm px-5 py-1 text-white focus:outline-none" @click="onSave">
        Iniciar
      </button>
    </div>
  </div>
</template>
