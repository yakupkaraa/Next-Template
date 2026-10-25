import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  createOrderDataColumns,
  createOrderSelectColumn,
  orderColumnLabels,
} from "@/features/tables/components/order-columns"

export function getStandardOrderColumns(
  locale: ContentLocale,
  actions: {
    selected: Set<string>
    onToggle: (id: string, checked: boolean) => void
    onToggleAll: (checked: boolean) => void
    allSelected: boolean
    someSelected: boolean
  }
) {
  const copy = getDictionary(locale).tables.standard

  return [
    createOrderSelectColumn(copy, actions),
    ...createOrderDataColumns(locale, copy.columns, { sortable: true }),
  ]
}

export function standardOrderColumnLabels(locale: ContentLocale) {
  return orderColumnLabels(getDictionary(locale).tables.standard.columns)
}
