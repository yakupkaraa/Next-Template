"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { StatusBadge } from "@/components/shared/status-badge"
import type { DataTableFeatures } from "@/components/shared/data-table-features"
import type { DataTableCellEditor } from "@/components/shared/data-table.types"
import { type ContentLocale } from "@/lib/i18n"
import { formatOrderAmount, formatOrderDate, orderStatusTone } from "@/features/tables/utils/orders"
import type { OrderRow } from "@/features/tables/types/order"

export type OrderEditableColumnId = "customer" | "date" | "status" | "paymentMethod" | "total"
export type OrderColumnEditors = Partial<Record<OrderEditableColumnId, DataTableCellEditor>>

export type OrderColumnsCopy = {
  orderNo: string
  customer: string
  date: string
  paymentMethod: string
  status: string
  itemCount: string
  total: string
}

const checkboxClass =
  "size-[18px] border-2 border-muted-foreground bg-background data-checked:border-primary dark:border-foreground/70"

const columnHelper = createColumnHelper<DataTableFeatures, OrderRow>()

/** Standart ve CRUD sayfalarının paylaştığı satır seçim sütunu. */
export function createOrderSelectColumn(copy: {
  selectAll: string
  selectRow: string
}, actions: {
  selected: Set<string>
  onToggle: (id: string, checked: boolean) => void
  onToggleAll: (checked: boolean) => void
  allSelected: boolean
  someSelected: boolean
}) {
  return columnHelper.display({
    id: "select",
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
    size: 44,
    enablePinning: true,
    header: () => (
      <div className="flex justify-center">
        <Checkbox
          checked={actions.allSelected}
          indeterminate={actions.someSelected}
          aria-label={copy.selectAll}
          className={checkboxClass}
          onCheckedChange={(checked) => actions.onToggleAll(checked === true)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={actions.selected.has(row.original.id)}
          aria-label={`${copy.selectRow}: ${row.original.orderNo}`}
          className={checkboxClass}
          onCheckedChange={(checked) => actions.onToggle(row.original.id, checked === true)}
        />
      </div>
    ),
  })
}

/** Standart, Genişletilebilir ve CRUD sayfalarının paylaştığı sipariş veri sütunları. */
export function createOrderDataColumns(
  locale: ContentLocale,
  copy: OrderColumnsCopy,
  options: { sortable: boolean },
  editors?: OrderColumnEditors
) {
  const enableSorting = options.sortable
  const sortFn = options.sortable ? ("alphanumeric" as const) : undefined

  return columnHelper.columns([
    columnHelper.accessor("orderNo", {
      header: copy.orderNo,
      enableSorting,
      sortFn,
      filterFn: "excel",
      size: 130,
    }),
    columnHelper.accessor("customer", {
      header: copy.customer,
      enableSorting,
      sortFn,
      filterFn: "excel",
      size: 170,
      meta: { editor: editors?.customer },
    }),
    columnHelper.accessor((row) => formatOrderDate(row.date, locale), {
      id: "date",
      header: copy.date,
      enableSorting,
      sortFn,
      filterFn: "excel",
      size: 120,
      meta: { editor: editors?.date },
    }),
    columnHelper.accessor("paymentMethod", {
      header: copy.paymentMethod,
      enableSorting,
      sortFn,
      filterFn: "excel",
      size: 150,
      meta: { editor: editors?.paymentMethod },
    }),
    columnHelper.accessor("status", {
      header: copy.status,
      enableSorting,
      sortFn,
      filterFn: "excel",
      size: 130,
      meta: { editor: editors?.status },
      cell: ({ getValue }) => {
        const status = getValue()
        return <StatusBadge tone={orderStatusTone(status)}>{status}</StatusBadge>
      },
    }),
    columnHelper.accessor((row) => row.items.length, {
      id: "itemCount",
      header: copy.itemCount,
      enableSorting,
      sortFn,
      filterFn: "excel",
      size: 110,
      cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span>,
    }),
    columnHelper.accessor("total", {
      header: copy.total,
      enableSorting,
      sortFn,
      filterFn: "excel",
      size: 130,
      meta: { editor: editors?.total },
      cell: ({ getValue }) => (
        <div className="w-full text-right font-medium tabular-nums">
          {formatOrderAmount(getValue(), locale)}
        </div>
      ),
    }),
  ])
}

/** Standart ve CRUD sayfalarının sütun görünürlüğü menüsünde kullandığı etiket listesi. */
export function orderColumnLabels(copy: OrderColumnsCopy) {
  return [
    { id: "orderNo", label: copy.orderNo },
    { id: "customer", label: copy.customer },
    { id: "date", label: copy.date },
    { id: "paymentMethod", label: copy.paymentMethod },
    { id: "status", label: copy.status },
    { id: "itemCount", label: copy.itemCount },
    { id: "total", label: copy.total },
  ]
}
