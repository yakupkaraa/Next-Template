import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { orderStatusOptions, paymentMethodOptions } from "@/features/tables/constants/orders"
import {
  createOrderDataColumns,
  orderColumnLabels,
  type OrderColumnEditors,
} from "@/features/tables/components/order-columns"

const editors: OrderColumnEditors = {
  customer: { type: "text" },
  date: { type: "date" },
  status: { type: "select", options: orderStatusOptions },
  paymentMethod: { type: "select", options: paymentMethodOptions },
  total: { type: "number", min: 0 },
}

export function getSpreadsheetOrderColumns(locale: ContentLocale) {
  const copy = getDictionary(locale).tables.spreadsheet
  return createOrderDataColumns(locale, copy.columns, { sortable: true }, editors)
}

export function spreadsheetOrderColumnLabels(locale: ContentLocale) {
  return orderColumnLabels(getDictionary(locale).tables.spreadsheet.columns)
}
