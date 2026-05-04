<script setup lang="ts">
  import { useProductStore } from '~/store/product.store'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'
  import type { IProduct } from '~/types/products.type'

  interface Props {
    id: string | number
  }

  defineProps<Props>()

  const productStore = useProductStore()
  await useAsyncData('products-dropdown', () => productStore.fetchProducts())
  const products = computed(() => productStore.products)

  const productsOptions = computed(() =>
    products.value.map((p) => ({
      label: p.name + ' - $' + p.price + ' MXN',
      id: p.id || 0,
    }))
  )
  const selectedProduct = defineModel<number | null>({ default: null })

  const emit = defineEmits<{
    onChange: [product: IProduct]
  }>()

  function handleChangeProduct(productId: number | string | null) {
    const product = products.value.find((p) => p.id === productId)
    if (!product) return
    emit('onChange', product)
  }
</script>
<template>
  <DropdownLabel
    :id="`order-dropdown-form-${id}`"
    :model-value="selectedProduct"
    :options="productsOptions"
    @update:model-value="handleChangeProduct"
  />
</template>
