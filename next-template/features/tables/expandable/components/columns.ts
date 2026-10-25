import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { createOrderDataColumns } from "@/features/tables/components/order-columns"

export function getExpandableOrderColumns(locale: ContentLocale) {
  const copy = getDictionary(locale).tables.expandable
  return createOrderDataColumns(locale, copy.columns, { sortable: false })
}
