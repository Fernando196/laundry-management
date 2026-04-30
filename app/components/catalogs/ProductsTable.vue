<script setup lang="ts">
  import type { IProduct } from '~/types/products.type'
  import type { TableColumn } from '~/types/table.type'
  import ConfirmModal from '../common/Modal/ConfirmModal.vue'
  import { useProductStore } from '~/store/product.store'
  import DataTable from '../ui/DataTable.vue'
  import MapIcon from '../common/MapIcon/MapIcon.vue'

  const productStore = useProductStore()
  await useAsyncData('products', () => productStore.fetchProducts())
  const products = computed(() => productStore.products)
  const { openModal } = useModal()

  const columns: TableColumn<IProduct>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripcion' },
    { key: 'category', label: 'Categoria' },
    { key: 'brand', label: 'Marca', width: '20px' },
    { key: 'unit', label: 'Unidad', width: '20px' },
    { key: 'stock', label: 'Stock', width: '20px' },
    { key: 'price', label: 'Precio', width: '20px' },
  ]

  async function handleEdit(row: Record<string, unknown>) {
    const user = products.value.find((u) => u.id === row.id)
    if (!user) return
    // const result = await openModal(Prod, { user })
    // if (!result) return
    // products.value = products.value.map((u) => (u.id === user.id ? { ...u, ...result } : u))
  }

  async function handleDelete(row: Record<string, unknown>) {
    const result = await openModal(ConfirmModal, {
      title: 'Eliminar ' + row.name,
      message: '¿Estás seguro de que deseas eliminar este producto?',
      confirmText: 'Eliminar',
    })
    if (!result) return
    productStore.deleteProduct(row.id as number)
    productStore.products = products.value.filter((u) => u.id !== row.id)
  }
</script>
<template>
  <DataTable
    class="mt-4 rounded-lg"
    :columns="columns"
    :rows="products"
    empty-message="No hay usuarios registrados"
  >
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
</template>
