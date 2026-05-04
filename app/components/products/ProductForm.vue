<script setup lang="ts">
  import type { IProduct } from '~/types/products.type'
  import CustomModal from '../common/Modal/CustomModal.vue'

  interface Props {
    product: IProduct
  }

  const props = defineProps<Props>()
  const productForm = ref<IProduct>(
    props.product || {
      id: null,
      name: '',
      category: '',
      brand: '',
      unit: '',
      stock: 0,
      price: 0,
      description: '',
    }
  )
</script>
<template>
  <CustomModal :title="productForm?.id ? 'Editar' : 'Crear' + ' Producto'">
    <div class="grid h-max w-full grid-cols-12 content-start gap-4 pb-10 md:w-150">
      <InputWapper
        id="product-form-modal-name"
        v-model="productForm.name"
        label=""
        class="col-span-12 md:col-span-6"
        type="text"
      />
      <InputWapper
        id="product-form-modal-category"
        v-model="productForm.category"
        label=""
        class="col-span-12 md:col-span-6"
        type="text"
      />
      <InputWapper
        id="product-form-modal-brand"
        v-model="productForm.brand"
        label=""
        class="col-span-12 md:col-span-6"
        type="text"
      />
      <InputWapper
        id="product-form-modal-unit"
        v-model="productForm.unit"
        label=""
        class="col-span-12 md:col-span-6"
        type="text"
      />
      <InputWapper
        id="product-form-modal-stock"
        v-model="productForm.stock"
        label=""
        class="col-span-12 md:col-span-6"
        type="text"
      />
      <InputWapper
        id="product-form-modal-price"
        v-model="productForm.price"
        label=""
        class="col-span-12 md:col-span-6"
        type="text"
      />
      <InputWapper
        id="product-form-modal-description"
        v-model="productForm.description"
        label=""
        class="col-span-12 md:col-span-6"
        type="text"
      />
    </div>
  </CustomModal>
</template>
