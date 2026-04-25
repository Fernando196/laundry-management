import { CatalogService } from '~/services/catalogs'
import type { IMachineBrand } from '~/types/machine.type'
import type { IProductCatalog } from '~/types/products.type'

export const useCatalog = () => {
  const catalogService = CatalogService()
  const machineBrands = useState<IMachineBrand[]>('machineBrands', () => [])
  const products = useState<IProductCatalog[]>('products', () => [])

  async function fetchMachineBrands() {
    try {
      const data = await catalogService.getMachineBrands()
      machineBrands.value = data
    } catch (error) {
      console.error('Error fetching machine brands:', error)
    }
  }

  async function fetchProducts() {
    try {
      const data = await catalogService.getProducts()
      products.value = data
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  async function loadInitialData() {
    await fetchMachineBrands()
    await fetchProducts()
  }

  return {
    // State
    machineBrands,
    products,

    // Actions
    fetchMachineBrands,
    fetchProducts,

    loadInitialData,
  }
}
