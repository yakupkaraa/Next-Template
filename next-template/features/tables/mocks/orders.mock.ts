import { orderStatusOptions, paymentMethodOptions } from "../constants/orders"
import type { OrderItem, OrderRow } from "../types/order"

const firstNames = [
  "Ayşe",
  "Mehmet",
  "Elif",
  "Can",
  "Zeynep",
  "Emre",
  "Deniz",
  "Selin",
  "Burak",
  "Ece",
]
const lastNames = [
  "Yılmaz",
  "Kaya",
  "Demir",
  "Şahin",
  "Çelik",
  "Aydın",
  "Koç",
  "Arslan",
  "Polat",
  "Güneş",
]

const catalog: { name: string; unitPrice: number }[] = [
  { name: "Kablosuz Mouse", unitPrice: 349 },
  { name: "Mekanik Klavye", unitPrice: 1299 },
  { name: "USB-C Hub", unitPrice: 599 },
  { name: "27'' Monitör", unitPrice: 6499 },
  { name: "Laptop Standı", unitPrice: 449 },
  { name: "Bluetooth Kulaklık", unitPrice: 1899 },
  { name: "Webcam", unitPrice: 899 },
  { name: "Harici SSD 1TB", unitPrice: 2199 },
  { name: "Ofis Sandalyesi", unitPrice: 4299 },
  { name: "Masa Lambası", unitPrice: 349 },
  { name: "Kablosuz Şarj Pedi", unitPrice: 299 },
  { name: "Mikrofon", unitPrice: 1599 },
]

function pick<T>(list: readonly T[], index: number) {
  return list[index % list.length]
}

function buildItems(index: number): OrderItem[] {
  const count = (index % 4) + 1
  const items: OrderItem[] = []
  for (let i = 0; i < count; i++) {
    const product = pick(catalog, index * 3 + i)
    items.push({
      name: product.name,
      quantity: ((index + i) % 3) + 1,
      unitPrice: product.unitPrice,
    })
  }
  return items
}

function isoDate(index: number) {
  const date = new Date(2026, 0, 1)
  date.setDate(date.getDate() + index * 2)
  return date.toISOString().slice(0, 10)
}

export const orderList: OrderRow[] = Array.from({ length: 60 }, (_, index) => {
  const n = index + 1
  const items = buildItems(index)
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  return {
    id: String(n),
    orderNo: `SP-2026-${String(n).padStart(4, "0")}`,
    customer: `${pick(firstNames, index)} ${pick(lastNames, index * 5)}`,
    date: isoDate(index),
    status: pick(orderStatusOptions, index),
    paymentMethod: pick(paymentMethodOptions, index * 2),
    items,
    total,
    position: index,
  }
})
