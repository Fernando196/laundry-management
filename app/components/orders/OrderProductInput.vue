<script setup lang="ts">
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'
  import { useProductStore } from '~/store/product.store'
  import type { IOrderProduct } from '~/types/order.type'

  interface Props {
    id: number
  }
  defineProps<Props>()
  defineEmits(['remove'])
  const product = defineModel<IOrderProduct>({ required: true })

  const productStore = useProductStore()
  await useAsyncData('products-orders', () => productStore.fetchProducts())
  const products = computed(() => productStore.products)

  const productsOptions = computed(() =>
    products.value.map((p) => ({
      label: p.name + ' - $' + p.price + ' MXN',
      id: p.id,
    }))
  )
  const selectedProduct = computed(() =>
    products.value.find((p) => p.id === product.value.productId)
  )
  function handleProductSelect(productId: number | string | null) {
    product.value = {
      ...product.value,
      productId: productId as number,
      totalPrice: products.value.find((p) => p.id === productId)?.price || 0,
    }
  }
  function handleChangeQuantity() {
    if (!selectedProduct.value) return
    product.value.totalPrice = (product.value.quantity || 0) * selectedProduct.value.price
  }
</script>
<template>
  <div
    class="bg-subtle-bg border-border grid w-full grid-cols-[1fr_72px_86px_30px] items-center gap-2 rounded-sm border p-2"
  >
    <DropdownLabel
      :id="`order-dropdown-form-${id}`"
      :model-value="product.productId"
      :options="productsOptions"
      @update:model-value="handleProductSelect"
    />

    <input
      :id="'order-product-input-' + id + '-quantity'"
      v-model="product.quantity"
      type="text"
      class="input-content"
      @change="handleChangeQuantity"
    />
    <input
      :id="'order-product-input-' + id + '-total-price'"
      v-model="product.totalPrice"
      type="text"
      class="input-content input-disabled text-right"
      readonly
    />
    <button
      class="hover:bg-error-soft mt-2 flex h-6 w-6 cursor-pointer rounded-sm"
      @click="$emit('remove')"
    >
      <MapIcon name="close" class="stroke-error" />
    </button>
  </div>
</template>
