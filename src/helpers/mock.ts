import type { Widget } from '@/stores/widget.store'

export function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function getRandomPriceInRange(min: number, max: number): number {
  const randomNum = Math.random() * (max - min) + min
  return Number.parseFloat(randomNum.toFixed(2))
}

export function formatCurrencyUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function generateRandomWidget(i?: number): Widget {
  return {
    id: Date.now().toString(),
    name: Number.isInteger(i) ? `${getRandomString(10)} ${i}` : getRandomString(10),
    price: getRandomPriceInRange(10, 100),
  }
}

export function getRandomString(length: number): string {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}
