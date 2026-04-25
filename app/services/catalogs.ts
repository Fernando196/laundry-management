import type { IMachineBrand } from '~/types/machine.type'
import type { IProductCatalog } from '~/types/products.type'

export const CatalogService = () => {
  const { $api } = useNuxtApp()

  return {
    async getMachineBrands(): Promise<IMachineBrand[]> {
      return await $api<IMachineBrand[]>('/machine-brands', {
        method: 'GET',
      })
    },
    async getProducts(): Promise<IProductCatalog[]> {
      return await $api<IProductCatalog[]>('/products?_fields=id,name,price', {
        method: 'GET',
      })
    },
  }
}
