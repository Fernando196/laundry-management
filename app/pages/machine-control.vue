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
  const search = ref('')
  const activeFilter = ref<IMachineFilterTab>('all')
  const machines = computed(() => {
    return machineStore.machines.filter((machine) => {
      const matchesSearch =
        machine.name.toLowerCase().includes(search.value.toLowerCase()) ||
        machine.status.toLowerCase().includes(search.value.toLowerCase())
      const matchesFilter = activeFilter.value === 'all' || machine.status === activeFilter.value
      return matchesSearch && matchesFilter
    })
  })
</script>

<template>
  <div class="">
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
        <MachineFilterTabs v-model="activeFilter" :machines="machineStore.machines" />
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
