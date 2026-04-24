import { useProductStore } from '~/store/product.store'

export default defineNuxtPlugin(async () => {
  const productStore = useProductStore()
  await productStore.fetchProducts()
})
