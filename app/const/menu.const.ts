import type { IMenuItem } from '~/types/menu.type'

export const MOCK_MENU: IMenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    path: '/',
    icon: 'dashboard',
    type: 'item',
  },
  {
    id: 2,
    label: 'Pedidos',
    path: '/orders',
    icon: 'order',
    type: 'item',
  },
  {
    id: 3,
    label: 'Control',
    path: '/machine-control',
    icon: 'laundry',
    type: 'item',
  },
  {
    id: 4,
    label: 'Inventario',
    path: '/inventory',
    icon: 'inventory',
    type: 'item',
  },
  {
    id: 5,
    label: 'Usuarios',
    path: '/users',
    icon: 'users',
    type: 'item',
  },
  {
    id: 6,
    label: 'Catalogos',
    path: '/nav-hub',
    icon: 'catalogs',
    type: 'item',
    children: [
      {
        id: 7,
        label: 'Productos',
        path: '/catalogs/products',
        icon: 'soap',
        type: 'item',
        description:
          'Gestiona los productos disponibles en el sistema, incluyendo detergentes, suavizantes y otros artículos relacionados con el lavado.',
      },
      {
        id: 8,
        label: 'Marcas',
        path: '/catalogs/brands',
        icon: 'brands',
        type: 'item',
        description:
          'Administra las marcas de productos que ofreces, permitiéndote agregar, editar o eliminar marcas para mantener tu catálogo actualizado.',
      },
      {
        id: 10,
        label: 'Roles de Usuario',
        path: '/catalogs/user-roles',
        icon: 'user-role',
        type: 'item',
        description:
          'Define y gestiona los roles de usuario en el sistema, asignando permisos específicos para controlar el acceso a diferentes funcionalidades según el rol.',
      },
      {
        id: 9,
        label: 'Estatus de maquinas',
        path: '/catalogs/machine-status',
        icon: 'status',
        type: 'item',
        description:
          'Administra los diferentes estados de las máquinas, como "En uso", "Disponible" o "En mantenimiento", para facilitar la gestión y el monitoreo de tu inventario de máquinas.',
      },
    ],
  },
]
