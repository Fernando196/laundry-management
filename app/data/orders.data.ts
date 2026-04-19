import type { IOrder } from '~/types/order.type'

// Seeded pseudo-random — same output on every reload
function sr(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const customers = [
  'María García',
  'Juan López',
  'Ana Martínez',
  'Carlos Hernández',
  'Rosa Jiménez',
  'Pedro Sánchez',
  'Laura Díaz',
  'Miguel Torres',
  'Elena Ruiz',
  'Antonio Moreno',
]

const services: IOrder['service'][] = ['wash', 'dry', 'wash-dry', 'ironing', 'express']
const baseAmounts: Record<IOrder['service'], number> = {
  wash: 80,
  dry: 70,
  'wash-dry': 140,
  ironing: 60,
  express: 200,
}

function generateOrders(): IOrder[] {
  const today = new Date('2026-04-12')
  const result: IOrder[] = []
  let id = 1

  for (let day = 29; day >= 0; day--) {
    const date = new Date(today)
    date.setDate(date.getDate() - day)
    const dateStr = date.toISOString().split('T')[0]!
    const count = 5 + Math.floor(sr(day * 100) * 10) // 5–14 pedidos por día

    for (let i = 0; i < count; i++) {
      const seed = day * 1000 + i
      const service = services[Math.floor(sr(seed) * services.length)]!
      const statusRand = sr(seed + 1)
      const status: IOrder['status'] =
        statusRand < 0.38
          ? 'ready'
          : statusRand < 0.65
            ? 'pending'
            : statusRand < 0.88
              ? 'in-process'
              : 'cancelled'

      const hour = 8 + Math.floor(sr(seed + 2) * 11) // 8–18h
      const min = Math.floor(sr(seed + 3) * 60)
      const amount = baseAmounts[service] + Math.floor(sr(seed + 4) * 40) - 10

      result.push({
        id: id++,
        status,
        service,
        customerName: customers[Math.floor(sr(seed + 5) * customers.length)]!,
        amount,
        createdAt: `${dateStr}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00.000Z`,
        completedAt:
          status === 'ready'
            ? `${dateStr}T${String(hour + 2).padStart(2, '0')}:${String(min).padStart(2, '0')}:00.000Z`
            : undefined,
      })
    }
  }

  return result
}

export const ordersData = generateOrders()
