import type { ReactTable, RowData } from "@tanstack/react-table"
import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { pinningClass, pinningStyle } from "@/components/shared/data-table-pinning"
import type { DataTableFeatures } from "@/components/shared/data-table-features"

export function DataTableSkeletonRows<TData extends RowData>({
  table,
  rowCount = 18,
}: {
  table: ReactTable<DataTableFeatures, TData>
  rowCount?: number
}) {
  return (
    <>
      {Array.from({ length: rowCount }, (_, row) => (
        <TableRow key={`skeleton-${row}`}>
          {table.getVisibleLeafColumns().map((column) => {
            const pinned = column.getIsPinned()
            return (
              <TableCell
                key={column.id}
                className={cn(pinningClass(pinned))}
                style={pinningStyle(column)}
              >
                <Skeleton className="h-4 w-20" />
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </>
  )
}
