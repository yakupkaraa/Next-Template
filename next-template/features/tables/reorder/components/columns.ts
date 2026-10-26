import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  createOrderDataColumns,
  orderColumnLabels,
} from "@/features/tables/components/order-columns"

export function getReorderOrderColumns(locale: ContentLocale) {
  const copy = getDictionary(locale).tables.reorder
  return createOrderDataColumns(locale, copy.columns, { sortable: true })
}

export function reorderOrderColumnLabels(locale: ContentLocale) {
  return orderColumnLabels(getDictionary(locale).tables.reorder.columns)
}
