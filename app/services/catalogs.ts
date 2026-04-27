import type { IMachineBrand } from '~/types/machine.type'
import type { IProductCatalog } from '~/types/products.type'
import type { IUser, IUserRole } from '~/types/user.type'

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
    async getUsers(): Promise<IUser[]> {
      return await $api<IUser[]>('/users', {
        method: 'GET',
      })
    },
    async getUserRoles(): Promise<IUserRole[]> {
      return await $api<IUserRole[]>('/user-role', {
        method: 'GET',
      })
    },
  }
}
