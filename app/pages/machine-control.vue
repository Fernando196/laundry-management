<script setup lang="ts">
  import Empty from '~/components/common/Empty.vue'
  import Search from '~/components/common/Search.vue'
  import MachineCard from '~/components/machine-control/MachineCard.vue'
  import MachineFilterTabs from '~/components/machine-control/MachineFilterTabs.vue'
  import PageHeader from '~/components/ui/PageHeader.vue'
  import { useMachineStore } from '~/store/machine.store'
  import type { IMachineFilterTab } from '~/types/machine.type'

  const machineStore = useMachineStore()
  const { pending } = await useAsyncData('machines', () => machineStore.fetchMachines())
  const machines = computed(() => machineStore.machines)
  const search = ref('')
  const activeFilter = ref<IMachineFilterTab>('all')
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto p-4">
    <PageHeader
      title="Control de máquinas"
      :subtitle="`Monitoreo en tiempo real - ${machines.length} máquinas`"
    >
      <template #right>
        <Search
          id="machine-control-search"
          v-model="search"
          placeholder="Buscar por máquina o estado"
        />
      </template>
      <template #bottom>
        <MachineFilterTabs v-model="activeFilter" :machines="machines" />
      </template>
    </PageHeader>
    <div
      v-if="!pending && machines.length"
      class="grid flex-1 grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5"
    >
      <MachineCard
        v-for="(machine, index) in machines"
        :key="'machine-card' + index"
        :machine="machine"
        @update:machine="machines[index] = $event"
      />
    </div>
    <Empty v-else icon="close" message="Sin registro de maquinas" />
  </div>
</template>
