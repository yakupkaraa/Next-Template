import type { OrderStatus, PaymentMethod } from "@/features/tables/types/order"

export type OrderFormValues = {
  customer: string
  date: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  total: string
}

export type OrderFormErrors = Partial<Record<keyof OrderFormValues, string>>

export type OrderFormErrorCopy = {
  customerRequired: string
  dateRequired: string
  totalRequired: string
  totalInvalid: string
}
