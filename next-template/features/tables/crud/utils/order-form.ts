import { orderStatusOptions, paymentMethodOptions } from "@/features/tables/constants/orders"
import { formatOrderNo } from "@/features/tables/utils/orders"
import type { OrderRow } from "@/features/tables/types/order"
import type { OrderFormErrorCopy, OrderFormErrors, OrderFormValues } from "@/features/tables/crud/types/order-form"

export function emptyOrderFormValues(): OrderFormValues {
  return {
    customer: "",
    date: new Date().toISOString().slice(0, 10),
    status: orderStatusOptions[0],
    paymentMethod: paymentMethodOptions[0],
    total: "",
  }
}

export function orderFormValuesFromRow(row: OrderRow): OrderFormValues {
  return {
    customer: row.customer,
    date: row.date,
    status: row.status,
    paymentMethod: row.paymentMethod,
    total: String(row.total),
  }
}

/** Düzenlemede mevcut `id`/`orderNo`/`items` korunur; yeni kayıtta `nextSequence`'tan üretilir, `items` boş dizi olur. */
export function buildOrderRow(
  values: OrderFormValues,
  existing: OrderRow | null,
  nextSequence: number
): OrderRow {
  return {
    id: existing?.id ?? String(nextSequence),
    orderNo: existing?.orderNo ?? formatOrderNo(nextSequence),
    customer: values.customer.trim(),
    date: values.date,
    status: values.status,
    paymentMethod: values.paymentMethod,
    items: existing?.items ?? [],
    total: Number(values.total),
  }
}

export function validateOrderForm(
  values: OrderFormValues,
  copy: OrderFormErrorCopy
): OrderFormErrors {
  const errors: OrderFormErrors = {}
  if (!values.customer.trim()) errors.customer = copy.customerRequired
  if (!values.date.trim()) errors.date = copy.dateRequired
  if (!values.total.trim()) errors.total = copy.totalRequired
  else if (!Number.isFinite(Number(values.total)) || Number(values.total) <= 0) {
    errors.total = copy.totalInvalid
  }
  return errors
}
