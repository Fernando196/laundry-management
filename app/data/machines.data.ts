import { MACHINE_STATUS, MACHINE_TYPES } from '~/const/machine.const'
import type { IMachine } from '~/types/machine.type'

const machines: IMachine[] = []

for (let i = 0; i < 8; i++) {
  machines.push({
    id: i + 1,
    name: 'Lavadora ' + (i + 1),
    type: i % 2 === 0 ? MACHINE_TYPES.WASHER : MACHINE_TYPES.DRYER,
    brand: 'Mabe',
    status: MACHINE_STATUS[Math.floor(Math.random() * MACHINE_STATUS.length)]!,
    timeCycle: 45,
    image: 'https://www.viu.mx/img/1024/1024/resize/L/G/LG_01440_x3_1.jpg',
  })
}

export { machines }
