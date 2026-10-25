"use client"

import { useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { FilterX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable, type DataTableApi, type DataTablePaginationConfig } from "@/components/shared/data-table"
import { DensityBoard } from "@/components/layout/density-board"
import { SearchBar } from "@/components/shared/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { preloadOnHover } from "@/lib/preload-on-hover"
import { useOrders } from "@/features/tables/hooks/use-orders"
import { orderDefaultPageSize, orderPageSizeOptions } from "@/features/tables/constants/orders"
import { TablePaginationToggle } from "@/features/tables/components/pagination-toggle"
import { getExpandableOrderColumns } from "@/features/tables/expandable/components/columns"
import { OrderItemsDetailSkeleton } from "@/features/tables/expandable/components/order-items-detail-skeleton"
import type { OrderRow } from "@/features/tables/types/order"

const OrderItemsDetail = dynamic(
  () =>
    import("@/features/tables/expandable/components/order-items-detail").then((m) => ({
      default: m.OrderItemsDetail,
    })),
  { loading: () => <OrderItemsDetailSkeleton /> }
)

const preloadOrderItemsDetail = preloadOnHover(() =>
  import("@/features/tables/expandable/components/order-items-detail")
)

export function TablesExpandableScreen({ locale }: { locale: ContentLocale }) {
  const [query, setQuery] = useState("")
  const [paginationEnabled, setPaginationEnabled] = useState(true)
  const [columnStateActive, setColumnStateActive] = useState(false)
  const tableApiRef = useRef<DataTableApi | null>(null)
  const copy = getDictionary(locale).tables.expandable
  const { rows, loading } = useOrders()

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale === "en" ? "en" : "tr")
    if (!normalized) return rows
    const collatorLocale = locale === "en" ? "en" : "tr"
    return rows.filter(
      (row) =>
        row.orderNo.toLocaleLowerCase(collatorLocale).includes(normalized) ||
        row.customer.toLocaleLowerCase(collatorLocale).includes(normalized)
    )
  }, [locale, query, rows])

  const columns = useMemo(() => getExpandableOrderColumns(locale), [locale])

  const pagination: DataTablePaginationConfig | false = paginationEnabled
    ? {
        pageSize: orderDefaultPageSize,
        pageSizeOptions: orderPageSizeOptions,
        copy: copy.pagination,
      }
    : false

  return (
    <DensityBoard className="min-h-0 flex-1">
      <Card size="sm" className="shrink-0 rounded-[8px] border-0 bg-primary/10 shadow-sm ring-0">
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <SearchBar
            className="max-w-md [&_input]:h-9 [&_input]:rounded-full"
            value={query}
            onValueChange={setQuery}
            placeholder={copy.search}
          />
          <div className="flex items-center gap-3">
            <TablePaginationToggle
              checked={paginationEnabled}
              onCheckedChange={setPaginationEnabled}
              label={copy.paginationToggle}
            />
            <Button
              type="button"
              variant="outline"
              className="bg-card"
              disabled={!columnStateActive}
              onClick={() => tableApiRef.current?.resetColumnState()}
            >
              <FilterX />
              {copy.clearFilters}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div
        data-density-fill=""
        className="min-h-0 flex-1 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      >
        <DataTable
          columns={columns}
          data={filtered}
          empty={copy.empty}
          loading={loading}
          containerClassName="h-full min-h-0 flex-1 overflow-auto"
          className="w-max min-w-full table-auto"
          columnMenu={copy.columnMenu}
          tableApiRef={tableApiRef}
          onColumnStateChange={setColumnStateActive}
          pagination={pagination}
          getRowId={(row: OrderRow) => row.id}
          expandable={{
            renderDetail: (row: OrderRow) => <OrderItemsDetail order={row} locale={locale} />,
            expandLabel: copy.expandLabel,
            collapseLabel: copy.collapseLabel,
            onPreloadDetail: preloadOrderItemsDetail,
          }}
        />
      </div>
    </DensityBoard>
  )
}
