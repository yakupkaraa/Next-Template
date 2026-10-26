"use client"

import { useMemo, useRef, useState } from "react"
import { FilterX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable, type DataTableApi, type DataTablePaginationConfig } from "@/components/shared/data-table"
import { DensityBoard } from "@/components/layout/density-board"
import { SearchBar } from "@/components/shared/search-bar"
import { runAction } from "@/components/toast/run-action"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { useReorderOrders } from "@/features/tables/hooks/use-reorder-orders"
import { orderDefaultPageSize, orderPageSizeOptions } from "@/features/tables/constants/orders"
import { TablePaginationToggle } from "@/features/tables/components/pagination-toggle"
import { ColumnVisibilityMenu } from "@/features/tables/components/column-visibility-menu"
import {
  getReorderOrderColumns,
  reorderOrderColumnLabels,
} from "@/features/tables/reorder/components/columns"

export function TablesReorderScreen({ locale }: { locale: ContentLocale }) {
  const [query, setQuery] = useState("")
  const [paginationEnabled, setPaginationEnabled] = useState(true)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})
  const [columnStateActive, setColumnStateActive] = useState(false)
  const tableApiRef = useRef<DataTableApi | null>(null)
  const copy = getDictionary(locale).tables.reorder
  const { rows, loading, reorder } = useReorderOrders()

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

  const reorderDisabled = Boolean(query.trim()) || columnStateActive

  async function handleReorder(activeId: string, overId: string) {
    await runAction({
      pending: copy.reorderingToast,
      success: copy.reorderedToast,
      error: copy.reorderFailedToast,
      run: () => reorder(activeId, overId),
    })
  }

  const columns = useMemo(() => getReorderOrderColumns(locale), [locale])
  const columnLabels = useMemo(() => reorderOrderColumnLabels(locale), [locale])

  const pagination: DataTablePaginationConfig | false = paginationEnabled
    ? { pageSize: orderDefaultPageSize, pageSizeOptions: orderPageSizeOptions, copy: copy.pagination }
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
          <div className="flex items-center gap-2">
            <TablePaginationToggle
              checked={paginationEnabled}
              onCheckedChange={setPaginationEnabled}
              label={copy.paginationToggle}
            />
            <ColumnVisibilityMenu
              columns={columnLabels}
              visibility={columnVisibility}
              onVisibilityChange={setColumnVisibility}
              triggerLabel={copy.columnsToggle}
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

      {reorderDisabled ? (
        <p className="shrink-0 text-sm text-muted-foreground">{copy.disabledHint}</p>
      ) : null}

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
          pinStart={["reorder", "sequence"]}
          columnMenu={copy.columnMenu}
          tableApiRef={tableApiRef}
          onColumnStateChange={setColumnStateActive}
          pagination={pagination}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          getRowId={(row) => row.id}
          reorder={{
            onReorder: handleReorder,
            disabled: reorderDisabled,
            dragHandleLabel: copy.dragHandleLabel,
            sequenceHeader: copy.sequenceHeader,
            announcements: copy.announcements,
          }}
        />
      </div>
    </DensityBoard>
  )
}
