import type { Icons } from './icons.type'

export interface Menu {
  items: MenuItem[]
}

export interface MenuItem {
  id: number
  label: string
  href: string
  icon: Icons
}
