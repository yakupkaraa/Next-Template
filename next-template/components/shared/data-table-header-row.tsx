import type { ReactTable, RowData } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { DataTableColumnResizeHandle } from "@/components/shared/data-table-column-resize-handle"
import { pinningClass, pinningStyle } from "@/components/shared/data-table-pinning"
import { dataTableGridLineCellClass } from "@/components/shared/data-table-grid-lines"
import type { DataTableFeatures } from "@/components/shared/data-table-features"
import type {
  DataTableColumnMenuCopy,
  DataTableColumnResizeConfig,
  DataTableGridLines,
} from "@/components/shared/data-table.types"

export function DataTableHeaderRow<TData extends RowData>({
  table,
  columnMenu,
  gridLines = "rows",
  grid = false,
  columnResize,
}: {
  table: ReactTable<DataTableFeatures, TData>
  columnMenu?: DataTableColumnMenuCopy
  gridLines?: DataTableGridLines
  /** Editable tablolarda role="grid" semantiğiyle eşleşmesi için başlık hücrelerine rol ekler. */
  grid?: boolean
  /** Opt-in sütun genişliği değiştirme (kilit + sürüklenebilir tutaç). */
  columnResize?: DataTableColumnResizeConfig
}) {
  return (
    <TableHeader className="sticky top-0 z-30 bg-card">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} role={grid ? "row" : undefined}>
          {headerGroup.headers.map((header) => {
            const pinned = header.column.getIsPinned()
            const resizable = Boolean(columnResize) && header.column.getCanResize()
            const lockedWidth = grid || Boolean(columnResize)
            return (
              <TableHead
                key={header.id}
                role={grid ? "columnheader" : undefined}
                className={cn(
                  "relative",
                  lockedWidth ? "overflow-hidden text-ellipsis whitespace-nowrap" : "w-max min-w-max whitespace-nowrap",
                  resizable && "pr-8",
                  pinningClass(pinned),
                  pinned && "z-40",
                  header.column.id === "actions" && "text-center",
                  dataTableGridLineCellClass[gridLines]
                )}
                // table-fixed ile birlikte: sütun genişliğini header belirler, gövde hücreleri
                // (aynı `getSize()` değerini kullanarak) buna uyar — tıklama/düzenleme ile değişmez.
                style={{
                  ...pinningStyle(header.column),
                  width: lockedWidth ? header.column.getSize() : undefined,
                }}
              >
                {header.isPlaceholder ? null : columnMenu &&
                  (header.column.getCanSort() || header.column.getCanFilter()) &&
                  typeof header.column.columnDef.header === "string" ? (
                  <DataTableColumnHeader
                    column={header.column}
                    title={header.column.columnDef.header}
                    copy={columnMenu}
                  />
                ) : (
                  <table.FlexRender header={header} />
                )}
                {resizable && columnResize ? (
                  <DataTableColumnResizeHandle
                    locked={Boolean(columnResize.lockedColumns[header.column.id])}
                    onToggleLock={() =>
                      columnResize.onLockedColumnsChange({
                        ...columnResize.lockedColumns,
                        [header.column.id]: !columnResize.lockedColumns[header.column.id],
                      })
                    }
                    onResizeStart={header.getResizeHandler()}
                    lockColumnLabel={columnResize.lockColumnLabel}
                    unlockColumnLabel={columnResize.unlockColumnLabel}
                    resizeHandleLabel={columnResize.resizeHandleLabel}
                  />
                ) : null}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
