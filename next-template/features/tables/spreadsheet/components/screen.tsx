"use client"

import { useMemo, useRef, useState } from "react"
import { FilterX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DataTable,
  type DataTableApi,
  type DataTableColumnResizeConfig,
  type DataTableEditable,
  type DataTablePaginationConfig,
} from "@/components/shared/data-table"
import { DensityBoard } from "@/components/layout/density-board"
import { SearchBar } from "@/components/shared/search-bar"
import { showError } from "@/components/toast/notify"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { useOrders } from "@/features/tables/hooks/use-orders"
import { useUpdateOrderField } from "@/features/tables/hooks/use-update-order-field"
import { orderDefaultPageSize, orderPageSizeOptions } from "@/features/tables/constants/orders"
import { TablePaginationToggle } from "@/features/tables/components/pagination-toggle"
import { ColumnVisibilityMenu } from "@/features/tables/components/column-visibility-menu"
import {
  getSpreadsheetOrderColumns,
  spreadsheetOrderColumnLabels,
} from "@/features/tables/spreadsheet/components/columns"
import { getOrderFieldValue, withOrderFieldValue } from "@/features/tables/spreadsheet/utils/order-field"
import { validateOrderCell } from "@/features/tables/spreadsheet/utils/validate-cell"
import type { OrderRow } from "@/features/tables/types/order"

export function TablesSpreadsheetScreen({ locale }: { locale: ContentLocale }) {
  const [query, setQuery] = useState("")
  const [paginationEnabled, setPaginationEnabled] = useState(true)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})
  const [lockedColumns, setLockedColumns] = useState<Record<string, boolean>>({})
  const [columnStateActive, setColumnStateActive] = useState(false)
  const tableApiRef = useRef<DataTableApi | null>(null)
  const copy = getDictionary(locale).tables.spreadsheet
  const { rows, loading, updateOrder } = useOrders()
  const { updateField } = useUpdateOrderField(updateOrder)

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

  const columns = useMemo(() => getSpreadsheetOrderColumns(locale), [locale])
  const columnLabels = useMemo(() => spreadsheetOrderColumnLabels(locale), [locale])

  const pagination: DataTablePaginationConfig | false = paginationEnabled
    ? { pageSize: orderDefaultPageSize, pageSizeOptions: orderPageSizeOptions, copy: copy.pagination }
    : false

  // Başarıda toast yok (her hücrede gürültü olmasın); hata olursa eski değere dönülür + toast.
  const editable: DataTableEditable<OrderRow> = {
    getCellValue: getOrderFieldValue,
    validateCell: (columnId, value) => validateOrderCell(columnId, value, copy.editable.errors),
    onCellCommit: async (row, columnId, value) => {
      const next = withOrderFieldValue(row, columnId, value)
      try {
        await updateField(row, next)
      } catch {
        showError(copy.editable.saveFailedToast)
      }
    },
    copy: {
      editingAnnouncementTemplate: copy.editable.editingAnnouncementTemplate,
      savedAnnouncement: copy.editable.savedAnnouncement,
      cancelledAnnouncement: copy.editable.cancelledAnnouncement,
    },
  }

  const columnResize: DataTableColumnResizeConfig = {
    lockedColumns,
    onLockedColumnsChange: setLockedColumns,
    lockColumnLabel: copy.lockColumnLabel,
    unlockColumnLabel: copy.unlockColumnLabel,
    resizeHandleLabel: copy.resizeHandleLabel,
  }

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
          // table-fixed: sütun genişlikleri header'daki `getSize()` değerleriyle KİLİTLENİR,
          // bir hücre düzenleme moduna girince (input/select render edilince) değişmez.
          className="w-full table-fixed"
          columnMenu={copy.columnMenu}
          tableApiRef={tableApiRef}
          onColumnStateChange={setColumnStateActive}
          pagination={pagination}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          getRowId={(row) => row.id}
          gridLines="cells"
          editable={editable}
          columnResize={columnResize}
        />
      </div>
    </DensityBoard>
  )
}
