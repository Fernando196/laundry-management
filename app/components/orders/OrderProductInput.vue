<script setup lang="ts">
  import type { IProductOrder } from '~/types/products.type'
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'
  import { useProductStore } from '~/store/product.store'

  interface Props {
    id: number
  }
  defineProps<Props>()
  defineEmits(['remove'])
  const product = defineModel<IProductOrder>({ required: true })

  const productStore = useProductStore()
  await useAsyncData('products-orders', () => productStore.fetchProducts())
  const products = computed(() => productStore.products)

  const productsOptions = computed(() =>
    products.value.map((product) => ({
      label: product.name + ' - $' + product.price + ' MXN',
      id: product.id,
    }))
  )

  const totalPrice = computed(() => {
    const selectedProduct = products.value.find((p) => p.id === product.value.productId)
    if (!selectedProduct) return 0
    return `$ ${selectedProduct.price * Number(product.value.quantity || 0)}`
  })
</script>
<template>
  <div
    class="bg-subtle-bg border-border grid w-full grid-cols-[1fr_72px_86px_30px] items-center gap-2 rounded-sm border p-2"
  >
    <DropdownLabel
      :id="`order-dropdown-form-${id}`"
      v-model="product.productId"
      :options="productsOptions"
    />

    <input
      :id="'order-product-input-' + id + '-quantity'"
      v-model="product.quantity"
      type="text"
      class="input-content"
    />
    <input
      :id="'order-product-input-' + id + '-total-price'"
      v-model="totalPrice"
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
