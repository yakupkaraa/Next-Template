import type { ReactTable, RowData } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { pinningClass, pinningStyle } from "@/components/shared/data-table-pinning"
import type { DataTableFeatures } from "@/components/shared/data-table-features"
import type { DataTableColumnMenuCopy } from "@/components/shared/data-table.types"

export function DataTableHeaderRow<TData extends RowData>({
  table,
  columnMenu,
}: {
  table: ReactTable<DataTableFeatures, TData>
  columnMenu?: DataTableColumnMenuCopy
}) {
  return (
    <TableHeader className="sticky top-0 z-30 bg-card">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const pinned = header.column.getIsPinned()
            return (
              <TableHead
                key={header.id}
                className={cn(
                  "w-max min-w-max whitespace-nowrap",
                  pinningClass(pinned),
                  pinned && "z-40",
                  header.column.id === "actions" && "text-center"
                )}
                style={pinningStyle(header.column)}
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
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
