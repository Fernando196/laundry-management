export interface User {
  id: number
  name: string
  email: string
  role: string
  active: boolean
  createdAt: Date
}

export interface UserRole {
  id: number
  role: string
  description: string
}
