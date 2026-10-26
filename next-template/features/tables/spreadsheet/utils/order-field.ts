import { orderStatusOptions, paymentMethodOptions } from "@/features/tables/constants/orders"
import type { OrderRow, OrderStatus, PaymentMethod } from "@/features/tables/types/order"

function isOrderStatus(value: string): value is OrderStatus {
  return (orderStatusOptions as readonly string[]).includes(value)
}

function isPaymentMethod(value: string): value is PaymentMethod {
  return (paymentMethodOptions as readonly string[]).includes(value)
}

export function getOrderFieldValue(row: OrderRow, columnId: string): string {
  switch (columnId) {
    case "customer":
      return row.customer
    case "date":
      return row.date
    case "status":
      return row.status
    case "paymentMethod":
      return row.paymentMethod
    case "total":
      return String(row.total)
    default:
      return ""
  }
}

export function withOrderFieldValue(row: OrderRow, columnId: string, value: string): OrderRow {
  switch (columnId) {
    case "customer":
      return { ...row, customer: value }
    case "date":
      return { ...row, date: value }
    case "status":
      return isOrderStatus(value) ? { ...row, status: value } : row
    case "paymentMethod":
      return isPaymentMethod(value) ? { ...row, paymentMethod: value } : row
    case "total":
      return { ...row, total: Number(value) }
    default:
      return row
  }
}
