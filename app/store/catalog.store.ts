import { CatalogService } from '~/services/catalogs'
import type { IMachineBrand } from '~/types/machine.type'
import type { IUserRole } from '~/types/user.type'

export const useCatalogStore = defineStore('catalog', () => {
  const service = CatalogService()

  const brands = ref<IMachineBrand[]>([])
  const roles = ref<IUserRole[]>([])

  async function fetchBrands({ force = false } = {}) {
    if (!force && brands.value.length > 0) return brands.value
    const data = await service.getMachineBrands()
    brands.value = data
    return data
  }

  async function addBrand(brand: Omit<IMachineBrand, 'id'>) {
    const created = await service.createMachineBrand(brand)
    brands.value.push(created)
  }

  async function updateBrand(id: number, brand: Partial<IMachineBrand>) {
    const updated = await service.updateMachineBrand(id, brand)
    const index = brands.value.findIndex((b) => b.id === id)
    if (index !== -1) brands.value[index] = updated
  }

  async function deleteBrand(id: number) {
    await service.deleteMachineBrand(id)
    brands.value = brands.value.filter((b) => b.id !== id)
  }

  async function fetchRoles({ force = false } = {}) {
    if (!force && roles.value.length > 0) return roles.value
    const data = await service.getUserRoles()
    roles.value = data
    return data
  }

  async function addRole(role: Omit<IUserRole, 'id'>) {
    const created = await service.createUserRole(role)
    roles.value.push(created)
  }

  async function updateRole(id: number, role: Partial<IUserRole>) {
    const updated = await service.updateUserRole(id, role)
    const index = roles.value.findIndex((r) => r.id === id)
    if (index !== -1) roles.value[index] = updated
  }

  async function deleteRole(id: number) {
    await service.deleteUserRole(id)
    roles.value = roles.value.filter((r) => r.id !== id)
  }

  return {
    brands,
    roles,
    fetchBrands,
    addBrand,
    updateBrand,
    deleteBrand,
    fetchRoles,
    addRole,
    updateRole,
    deleteRole,
  }
})
