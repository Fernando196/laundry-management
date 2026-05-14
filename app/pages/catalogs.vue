<script setup lang="ts">
  import ProductsTable from '~/components/catalogs/ProductsTable.vue'
  import RolesTable from '~/components/catalogs/RolesTable.vue'
  import BrandsTable from '~/components/catalogs/BrandsTable.vue'
  import BrandFormModal from '~/components/catalogs/BrandFormModal.vue'
  import RoleFormModal from '~/components/catalogs/RoleFormModal.vue'
  import ProductFormModal from '~/components/catalogs/ProductFormModal.vue'
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'
  import PageHeader from '~/components/ui/PageHeader.vue'
  import { useCatalogStore } from '~/store/catalog.store'
  import { useProductStore } from '~/store/product.store'

  const selectedTab = ref('products')
  const tabs = [
    { id: 'products', label: 'Productos', singular: 'producto' },
    { id: 'roles', label: 'Roles', singular: 'rol' },
    { id: 'brand', label: 'Marcas', singular: 'marca' },
  ]
  const activeTab = computed(() => tabs.find((t) => t.id === selectedTab.value))

  const { openModal } = useModal()
  const catalogStore = useCatalogStore()
  const productStore = useProductStore()

  const TAB_ACTIONS: Record<string, { modal: Component; add: (r: any) => void }> = {
    brand: { modal: BrandFormModal, add: (r) => catalogStore.addBrand(r) },
    roles: { modal: RoleFormModal, add: (r) => catalogStore.addRole(r) },
    products: { modal: ProductFormModal, add: (r) => productStore.addProduct(r) },
  }

  const handleCreate = async () => {
    const config = TAB_ACTIONS[selectedTab.value]
    if (!config) return
    const result = await openModal(config.modal)
    if (!result) return
    config.add(result)
  }
</script>

<template>
  <div class="w-full h-full overflow-auto">
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
    <RolesTable v-else-if="selectedTab === 'roles'" />
    <BrandsTable v-else-if="selectedTab === 'brand'" />
  </div>
</template>
