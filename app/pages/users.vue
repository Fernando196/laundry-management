<script setup lang="ts">
  import type { TableColumn } from '~/types/table.type'
  import DataTable from '~/components/ui/DataTable.vue'
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'
  import ConfirmModal from '~/components/common/Modal/ConfirmModal.vue'
  import PageHeader from '~/components/ui/PageHeader.vue'
  import type { IUser } from '~/types/user.type'
  import { UserService } from '~/services/users'
  import UserFormModal from '~/components/users/UserFormModal.vue'

  const catalog = useCatalog()
  const userService = UserService()
  const users = ref<IUser[]>(catalog.users.value || [])
  const { openModal } = useModal()

  const columns: TableColumn<IUser>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Correo electrónico', width: '200px' },
    { key: 'role', label: 'Rol', width: '110px' },
    { key: 'id', label: 'ID', width: '140px' },
    { key: 'active', label: 'Estado', width: '130px' },
  ]

  async function handleCreate() {
    const result = await openModal(UserFormModal)
    if (!result) return
    userService.postUser(result as Omit<IUser, 'id'>)
    users.value.push(result)
  }

  async function handleEdit(row: Record<string, unknown>) {
    const user = users.value.find((u) => u.id === row.id)
    if (!user) return
    const result = await openModal(UserFormModal, { user })
    if (!result) return
    userService.putUser(user.id, result as Partial<IUser>)
    users.value = users.value.map((u) => (u.id === user.id ? { ...u, ...result } : u))
  }

  async function handleDelete(row: Record<string, unknown>) {
    const result = await openModal(ConfirmModal, {
      title: 'Usuario a eliminar',
      description: '¿Estás seguro de que deseas eliminar este usuario?',
      confirmText: 'Eliminar',
    })
    if (!result) return
    userService.deleteUser(row.id as number)
    users.value = users.value.filter((u) => u.id !== row.id)
  }
</script>

<template>
  <div>
    <PageHeader title="Inventario de usuarios" :subtitle="users.length + ' usuarios registrados'">
      <template #right>
        <button class="btn btn-primary" @click="handleCreate">
          <MapIcon name="add" class="h-4 w-4 stroke-white" />
          Nuevo usuario
        </button>
      </template>
    </PageHeader>

    <DataTable
      class="mt-4 rounded-lg"
      :columns="columns"
      :rows="users"
      empty-message="No hay usuarios registrados"
    >
      <template #cell-role="{ value }">
        <span
          class="bg-primary-light text-success-bg rounded-full px-2.5 py-0.5 text-xs font-semibold"
          >{{ value as IUser['role'] }}</span
        >
      </template>

      <template #cell-active="{ value }">
        <span
          class="badge badge-ready inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
        >
          {{ (value as boolean) ? 'Activo' : 'Inactivo' }}
        </span>
      </template>

      <template #actions="{ row }">
        <button
          class="hover:text-primary flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-colors hover:bg-neutral-100"
          title="Editar"
          @click="handleEdit(row)"
        >
          <MapIcon name="edit" class="fill-primary h-6 w-6" />
        </button>
        <button
          class="hover:bg-accent-light hover:text-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-colors"
          title="Eliminar"
          @click="handleDelete(row)"
        >
          <MapIcon name="delete" class="stroke-accent h-6 w-6 fill-none" />
        </button>
      </template>
    </DataTable>
  </div>
</template>
