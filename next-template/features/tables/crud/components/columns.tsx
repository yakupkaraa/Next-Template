"use client"

import { createColumnHelper } from "@tanstack/react-table"
import {
  createOrderDataColumns,
  createOrderSelectColumn,
  orderColumnLabels,
} from "@/features/tables/components/order-columns"
import type { DataTableFeatures } from "@/components/shared/data-table-features"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { OrderRowActions } from "@/features/tables/crud/components/row-actions"
import type { OrderRow } from "@/features/tables/types/order"

const columnHelper = createColumnHelper<DataTableFeatures, OrderRow>()

export function getCrudOrderColumns(
  locale: ContentLocale,
  actions: {
    selected: Set<string>
    onToggle: (id: string, checked: boolean) => void
    onToggleAll: (checked: boolean) => void
    allSelected: boolean
    someSelected: boolean
    onEdit: (row: OrderRow) => void
    onDelete: (row: OrderRow) => void
    onPreloadForm: () => void
  }
) {
  const copy = getDictionary(locale).tables.crud

  return [
    createOrderSelectColumn(copy, actions),
    ...createOrderDataColumns(locale, copy.columns, { sortable: true }),
    columnHelper.display({
      id: "actions",
      header: copy.actions,
      enableSorting: false,
      enableColumnFilter: false,
      enableHiding: false,
      enablePinning: true,
      size: 56,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <OrderRowActions
            row={row.original}
            editLabel={copy.edit}
            deleteLabel={copy.delete}
            menuLabel={copy.actionsMenu}
            onEdit={actions.onEdit}
            onDelete={actions.onDelete}
            onPreload={actions.onPreloadForm}
          />
        </div>
      ),
    }),
  ]
}

export function crudOrderColumnLabels(locale: ContentLocale) {
  return orderColumnLabels(getDictionary(locale).tables.crud.columns)
}
