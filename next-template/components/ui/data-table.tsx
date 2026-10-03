"use client"

import { useRef, type CSSProperties } from "react"
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
import { cn } from "cn"
import { dataTableFeatures, type DataTableFeatures } from "@/components/ui/data-table-features"

const ROW_ESTIMATE_HEIGHT = 41
const VIRTUALIZE_MIN_ROWS = 16
const INITIAL_SCROLL_RECT = { width: 1280, height: 720 }

function pinningStyle(column: {
  getIsPinned: () => false | "start" | "end"
  getStart: (position?: false | "start" | "end" | "center") => number
  getAfter: (position?: false | "start" | "end" | "center") => number
}): CSSProperties {
  const pinned = column.getIsPinned()
  if (!pinned) return {}

  return {
    position: "sticky",
    zIndex: 2,
    left: pinned === "start" ? `${column.getStart("start")}px` : undefined,
    right: pinned === "end" ? `${column.getAfter("end")}px` : undefined,
  }
}

function pinningClass(pinned: false | "start" | "end") {
  if (pinned === "end") {
    return "sticky right-0 z-20 bg-card shadow-[-8px_0_12px_-8px_hsl(0_0%_0%/0.18)]"
  }
  if (pinned === "start") {
    return "sticky left-0 z-20 bg-card shadow-[8px_0_12px_-8px_hsl(0_0%_0%/0.18)]"
  }
  return "bg-card"
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  empty,
  loading = false,
  containerClassName,
  className,
  virtualize = true,
  pinEnd,
  pinStart,
}: {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  empty: string
  loading?: boolean
  containerClassName?: string
  className?: string
  virtualize?: boolean
  /** Sağa sabitlenen kolon id'leri (LTR). */
  pinEnd?: string[]
  /** Sola sabitlenen kolon id'leri (LTR). */
  pinStart?: string[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
    initialState: {
      columnPinning: {
        start: pinStart ?? [],
        end: pinEnd ?? [],
      },
    },
  })

  const rows = table.getRowModel().rows
  const useVirtualRows =
    virtualize && !loading && rows.length >= VIRTUALIZE_MIN_ROWS

  const rowVirtualizer = useVirtualizer({
    count: useVirtualRows ? rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_ESTIMATE_HEIGHT,
    overscan: 8,
    initialRect: INITIAL_SCROLL_RECT,
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
        {row.getVisibleCells().map((cell) => {
          const pinned = cell.column.getIsPinned()
          return (
            <TableCell
              key={cell.id}
              className={cn(
                "whitespace-nowrap",
                pinningClass(pinned),
                cell.column.id === "actions" && "text-center"
              )}
              style={pinningStyle(cell.column)}
            >
              <table.FlexRender cell={cell} />
            </TableCell>
          )
        })}
      </TableRow>
    )
  }

  return (
    <Table
      containerRef={scrollRef}
      containerClassName={containerClassName}
      className={className}
    >
      <TableHeader className="sticky top-0 z-10 bg-card">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const pinned = header.column.getIsPinned()
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    "whitespace-nowrap",
                    pinningClass(pinned),
                    pinned && "z-30",
                    header.column.id === "actions" && "text-center"
                  )}
                  style={pinningStyle(header.column)}
                >
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 18 }, (_, row) => (
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
