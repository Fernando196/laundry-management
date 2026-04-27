<script setup lang="ts">
  import PageHeader from '~/components/ui/PageHeader.vue'

  const selectedTab = ref('products')

  const tabs = [
    { id: 'products', label: 'Productos' },
    { id: 'roles', label: 'Roles' },
    { id: 'brand', label: 'Marcas' },
    { id: '' },
  ]

  const catalog = useCatalog()
  const products = computed(() => catalog.products)
  const roles = computed(() => catalog.userRoles)
  const brands = computed(() => catalog.machineBrands)
</script>

<template>
  <div>
    <PageHeader title="Catálogos" subtitle="Datos maestros del sistema" />

    <div class="border-b-border mt-3 flex border-b">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="hover:text-text text-muted -mb-px cursor-pointer border-b-2 border-transparent px-4 pb-2 font-medium transition-colors duration-200"
        :class="selectedTab === tab.id ? 'text-primary border-b-primary border-b' : ''"
        @click="selectedTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div></div>
  </div>
</template>
