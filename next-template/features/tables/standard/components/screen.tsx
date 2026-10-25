"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { FilterX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable, type DataTableApi, type DataTablePaginationConfig } from "@/components/shared/data-table"
import { DensityBoard } from "@/components/layout/density-board"
import { SearchBar } from "@/components/shared/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { useOrders } from "@/features/tables/hooks/use-orders"
import { orderDefaultPageSize, orderPageSizeOptions } from "@/features/tables/constants/orders"
import { ColumnVisibilityMenu } from "@/features/tables/components/column-visibility-menu"
import { TablePaginationToggle } from "@/features/tables/components/pagination-toggle"
import {
  getStandardOrderColumns,
  standardOrderColumnLabels,
} from "@/features/tables/standard/components/columns"

export function TablesStandardScreen({ locale }: { locale: ContentLocale }) {
  const [query, setQuery] = useState("")
  const [paginationEnabled, setPaginationEnabled] = useState(true)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [columnStateActive, setColumnStateActive] = useState(false)
  const tableApiRef = useRef<DataTableApi | null>(null)
  const copy = getDictionary(locale).tables.standard
  const { rows, loading } = useOrders()

  const handleToggle = useCallback((id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

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

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((row) => selected.has(row.id))
  const someVisibleSelected = !allVisibleSelected && filtered.some((row) => selected.has(row.id))

  const handleToggleAll = useCallback(
    (checked: boolean) => {
      setSelected((current) => {
        const next = new Set(current)
        if (checked) filtered.forEach((row) => next.add(row.id))
        else filtered.forEach((row) => next.delete(row.id))
        return next
      })
    },
    [filtered]
  )

  const columns = useMemo(
    () =>
      getStandardOrderColumns(locale, {
        selected,
        onToggle: handleToggle,
        onToggleAll: handleToggleAll,
        allSelected: allVisibleSelected,
        someSelected: someVisibleSelected,
      }),
    [allVisibleSelected, handleToggle, handleToggleAll, locale, selected, someVisibleSelected]
  )

  const columnLabels = useMemo(() => standardOrderColumnLabels(locale), [locale])

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
          pinStart={["select"]}
          columnMenu={copy.columnMenu}
          tableApiRef={tableApiRef}
          onColumnStateChange={setColumnStateActive}
          isRowSelected={(row) => selected.has(row.id)}
          pagination={pagination}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </div>
    </DensityBoard>
  )
}
