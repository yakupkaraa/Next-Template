"use client"

import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { dataTableFeatures, type DataTableFeatures } from "@/components/ui/data-table-features"

const ROW_ESTIMATE_HEIGHT = 41
const VIRTUALIZE_MIN_ROWS = 16

export function DataTable<TData extends RowData>({
  columns,
  data,
  empty,
  loading = false,
  containerClassName,
  className,
  virtualize = true,
}: {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  empty: string
  loading?: boolean
  containerClassName?: string
  className?: string
  /** Satır sayısı yüksekken yalnızca görünür satırları render eder. */
  virtualize?: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
  })

  const rows = table.getRowModel().rows
  const useVirtualRows =
    virtualize && !loading && rows.length >= VIRTUALIZE_MIN_ROWS

  const rowVirtualizer = useVirtualizer({
    count: useVirtualRows ? rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_ESTIMATE_HEIGHT,
    overscan: 10,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
      : 0

  function renderRow(row: (typeof rows)[number]) {
    return (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="whitespace-nowrap">
            <table.FlexRender cell={cell} />
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <Table
      containerRef={scrollRef}
      containerClassName={containerClassName}
      className={className}
    >
      <TableHeader className="sticky top-0 z-10 bg-background">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="whitespace-nowrap bg-background">
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 18 }, (_, row) => (
              <TableRow key={`skeleton-${row}`}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={column.id ?? columnIndex}>
                    <Skeleton
                      className={`h-4 ${columnIndex % 3 === 0 ? "w-16" : columnIndex % 3 === 1 ? "w-28" : "w-20"}`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : null}
        {!loading && rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-muted-foreground">
              {empty}
            </TableCell>
          </TableRow>
        ) : null}
        {!loading && useVirtualRows ? (
          <>
            {paddingTop > 0 ? (
              <TableRow aria-hidden className="pointer-events-none border-0 hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0" style={{ height: paddingTop }} />
              </TableRow>
            ) : null}
            {virtualRows.map((virtualRow) => renderRow(rows[virtualRow.index]))}
            {paddingBottom > 0 ? (
              <TableRow aria-hidden className="pointer-events-none border-0 hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0" style={{ height: paddingBottom }} />
              </TableRow>
            ) : null}
          </>
        ) : null}
        {!loading && !useVirtualRows
          ? rows.map((row) => renderRow(row))
          : null}
      </TableBody>
    </Table>
  )
}
