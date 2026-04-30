<script setup lang="ts">
  import ProductsTable from '~/components/catalogs/ProductsTable.vue'
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'
  import PageHeader from '~/components/ui/PageHeader.vue'

  const selectedTab = ref('products')
  const tabs = [
    { id: 'products', label: 'Productos', singular: 'producto' },
    { id: 'roles', label: 'Roles', singular: 'rol' },
    { id: 'brand', label: 'Marcas', singular: 'marca' },
    { id: '' },
  ]
  const activeTab = computed(() => tabs.find((t) => t.id === selectedTab.value))

  const handleCreate = () => {}
</script>

<template>
  <div>
    <PageHeader title="Catálogos" subtitle="Datos maestros del sistema">
      <template #right>
        <button class="btn btn-primary" @click="handleCreate">
          <MapIcon name="add" class="h-4 w-4 stroke-white" />
          Crear {{ activeTab?.singular }}
        </button>
      </template>
    </PageHeader>

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

    <ProductsTable v-if="selectedTab === 'products'" />
  </div>
</template>
