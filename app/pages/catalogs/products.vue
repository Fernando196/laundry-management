<script setup lang="ts">
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'
  import ConfirmModal from '~/components/common/Modal/ConfirmModal.vue'
  import DataTable from '~/components/ui/DataTable.vue'
  import TableToolbar from '~/components/ui/TableToolbar.vue'
  import { productService } from '~/services/product'
  import { useMenuStore } from '~/store/menu.store'
  import type { IProduct } from '~/types/products.type'
  import type { TableColumn } from '~/types/table.type'

  const { openModal } = useModal()
  const route = useRoute()
  const menuStore = useMenuStore()
  const name = route.params.name as string

  const activeMenuItem = menuStore.activeMenuItem

  const columns: TableColumn<IProduct>[] = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Nombre' },
    { key: 'category', label: 'Categoría' },
    { key: 'brand', label: 'Marca' },
    { key: 'description', label: 'Descripción' },
    { key: 'price', label: 'Precio', width: '120px' },
    { key: 'stock', label: 'Stock', width: '100px' },
    { key: 'minStock', label: 'Stock Mínimo', width: '120px' },
    { key: 'unit', label: 'Unidad', width: '100px' },
  ]
  const products = ref<IProduct[]>([])
  const rows = computed(() => products.value.map((p) => ({ ...p }) as Record<string, unknown>))

  const { data, refresh } = await useAsyncData('products', async () => {
    const productsData = await productService.getProducts()
    return productsData
  })

  products.value = data.value || []

  const handleEdit = (row: Record<string, unknown>) => {
    console.log('Editar producto:', row)
    // Aquí puedes implementar la lógica para editar el producto
  }
  async function handleDelete(row: Record<string, unknown>) {
    const result = await openModal(ConfirmModal, {
      title: 'Producto a eliminar',
      description: '¿Estás seguro de que deseas eliminar este producto?',
      confirmText: 'Eliminar',
    })
    if (!result) return
    productService.deleteProduct(row.id as number)
  }
</script>
<template>
  <div class="flex h-full w-full flex-col overflow-auto p-4">
    <TableToolbar
      :title="'Reporte de ' + activeMenuItem?.label"
      :subtitle="activeMenuItem?.description"
    />
    <DataTable :columns="columns" :rows="rows" empty-message="No se encontro información">
      <template #actions="{ row }">
        <button
          class="hover:text-primary flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-colors hover:bg-neutral-100"
          title="Editar"
          @click="handleEdit(row)"
        >
          <MapIcon name="edit" class="fill-primary h-6 w-6" />
        </button>
        <button
          class="hover:bg-accent-light hover:text-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-colors"
          title="Eliminar"
          @click="handleDelete(row)"
        >
          <MapIcon name="delete" class="stroke-accent h-6 w-6 fill-none" />
        </button>
      </template>
    </DataTable>
  </div>
</template>
