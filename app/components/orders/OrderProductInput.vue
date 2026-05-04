<script setup lang="ts">
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import type { IOrderProduct } from '~/types/order.type'
  import ProductsDropdown from '../app/ProductsDropdown.vue'
  import type { IProduct } from '~/types/products.type'

  interface Props {
    id: number
  }
  defineProps<Props>()
  defineEmits(['remove'])
  const product = defineModel<IOrderProduct>({ required: true })

  function handleProductSelect(selectedProduct: IProduct) {
    product.value = {
      ...product.value,
      productId: selectedProduct.id as number,
      totalPrice: selectedProduct?.price || 0,
      Product: selectedProduct,
    }
    handleChangeQuantity()
  }
  function handleChangeQuantity() {
    if (!product.value.Product) return
    product.value.totalPrice = (product.value.quantity || 0) * product.value.Product.price
  }
</script>
<template>
  <div
    class="bg-subtle-bg border-border grid w-full grid-cols-[1fr_72px_86px_30px] items-center gap-2 rounded-sm border p-2"
  >
    <ProductsDropdown :id="id" v-model="product.productId" @on-change="handleProductSelect" />

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
