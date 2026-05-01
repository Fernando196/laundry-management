import type { IMachineBrand } from '~/types/machine.type'
import type { IProductCatalog } from '~/types/products.type'
import type { IUser, IUserRole } from '~/types/user.type'

export const CatalogService = () => {
  const { $api } = useNuxtApp()

  return {
    async getMachineBrands(): Promise<IMachineBrand[]> {
      return await $api<IMachineBrand[]>('/machine-brands', { method: 'GET' })
    },
    async createMachineBrand(brand: Omit<IMachineBrand, 'id'>): Promise<IMachineBrand> {
      return await $api<IMachineBrand>('/machine-brands', { method: 'POST', body: brand })
    },
    async updateMachineBrand(id: number, brand: Partial<IMachineBrand>): Promise<IMachineBrand> {
      return await $api<IMachineBrand>(`/machine-brands/${id}`, { method: 'PUT', body: brand })
    },
    async deleteMachineBrand(id: number): Promise<void> {
      await $api(`/machine-brands/${id}`, { method: 'DELETE' })
    },

    async getProducts(): Promise<IProductCatalog[]> {
      return await $api<IProductCatalog[]>('/products?_fields=id,name,price', { method: 'GET' })
    },
    async getUsers(): Promise<IUser[]> {
      return await $api<IUser[]>('/users', { method: 'GET' })
    },

    async getUserRoles(): Promise<IUserRole[]> {
      return await $api<IUserRole[]>('/user-role', { method: 'GET' })
    },
    async createUserRole(role: Omit<IUserRole, 'id'>): Promise<IUserRole> {
      return await $api<IUserRole>('/user-role', { method: 'POST', body: role })
    },
    async updateUserRole(id: number, role: Partial<IUserRole>): Promise<IUserRole> {
      return await $api<IUserRole>(`/user-role/${id}`, { method: 'PUT', body: role })
    },
    async deleteUserRole(id: number): Promise<void> {
      await $api(`/user-role/${id}`, { method: 'DELETE' })
    },
  }
}
