import type { orderStatusOptions, paymentMethodOptions } from "../constants/orders"

export type OrderStatus = (typeof orderStatusOptions)[number]
export type PaymentMethod = (typeof paymentMethodOptions)[number]

export type OrderItem = {
  name: string
  quantity: number
  unitPrice: number
}

export type OrderRow = {
  id: string
  orderNo: string
  customer: string
  /** ISO 8601 tarih (yyyy-mm-dd). */
  date: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  items: OrderItem[]
  total: number
  /** Satır Sıralama sayfasının kalıcı sıra alanı; diğer sayfalar bu alanı kullanmaz. */
  position: number
}
