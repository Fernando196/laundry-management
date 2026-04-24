<script setup lang="ts">
  import Empty from '~/components/common/Empty.vue'
  import Search from '~/components/common/Search.vue'
  import MachineCard from '~/components/machine-control/MachineCard.vue'
  import MachineCycleModal from '~/components/machine-control/MachineCycleModal.vue'
  import MachineEstateModal from '~/components/machine-control/MachineEstateModal.vue'
  import MachineFilterTabs from '~/components/machine-control/MachineFilterTabs.vue'
  import PageHeader from '~/components/ui/PageHeader.vue'
  import { MACHINE_STATUS } from '~/const/machine.const'
  import { useMachineStore } from '~/store/machine.store'
  import type { IMachineFilterTab, IMachine, IMachineStatusType } from '~/types/machine.type'

  const machineStore = useMachineStore()
  const { pending } = await useAsyncData('machines', () => machineStore.fetchMachines())
  const machines = computed(() => machineStore.machines)
  const { open: openModal } = useModal()

  const search = ref('')
  const activeFilter = ref<IMachineFilterTab>('all')

  const handleChangeCycle = async (machine: IMachine) => {
    if (machine.status === MACHINE_STATUS.RUNNING) {
      machine.status = MACHINE_STATUS.ACTIVE
      return
    }
    const response = await openModal(MachineCycleModal)
    if (!response) return

    machine.status = MACHINE_STATUS.RUNNING!
  }

  const handleChangeState = async (machine: IMachine) => {
    const responseState = await openModal<IMachineStatusType>(MachineEstateModal)
    if (!responseState) return
    machine.status = responseState
  }

  const openDetails = (machine: IMachine) => {}
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
    <div v-if="!pending && machines.length" class="grid flex-1 grid-cols-12 gap-4">
      <MachineCard
        v-for="machine in machines"
        :key="machine.id + 'machine-card'"
        :machine="machine"
        @change-state="handleChangeState"
        @details="openDetails"
        @change-cycle="handleChangeCycle"
      />
    </div>
    <Empty v-else icon="close" message="Sin registro de maquinas" />
  </div>
</template>
