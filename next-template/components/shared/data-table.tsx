"use client"

import { Fragment, useEffect, useImperativeHandle, useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useTable, type RowData } from "@tanstack/react-table"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { DataTableDetailRow } from "@/components/shared/data-table-detail-row"
import { createExpandColumn } from "@/components/shared/data-table-expand-column"
import { DataTableHeaderRow } from "@/components/shared/data-table-header-row"
import { DataTablePaginationBar } from "@/components/shared/data-table-pagination"
import { useDataTablePaginationState } from "@/components/shared/use-data-table-pagination-state"
import { pinningClass, pinningStyle } from "@/components/shared/data-table-pinning"
import { dataTableFeatures } from "@/components/shared/data-table-features"
import type { DataTableProps } from "@/components/shared/data-table.types"

export type {
  DataTableApi,
  DataTableColumnMenuCopy,
  DataTableExpandable,
  DataTablePaginationConfig,
  DataTablePaginationCopy,
  DataTableProps,
} from "@/components/shared/data-table.types"

const ROW_ESTIMATE_HEIGHT = 41
const VIRTUALIZE_MIN_ROWS = 16
const INITIAL_SCROLL_RECT = { width: 1280, height: 720 }

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
  columnMenu,
  tableApiRef,
  onColumnStateChange,
  isRowSelected,
  pagination = false,
  columnVisibility,
  onColumnVisibilityChange,
  getRowId,
  expandable,
}: DataTableProps<TData>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [paginationState, setPaginationState] = useDataTablePaginationState(
    pagination ? pagination.pageSize : Number.POSITIVE_INFINITY
  )
  const effectiveColumns = expandable ? [createExpandColumn(expandable), ...columns] : columns

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: effectiveColumns,
    enableSortingRemoval: true,
    enableMultiSort: false,
    getRowId,
    getRowCanExpand: expandable
      ? (row) => expandable.getRowCanExpand?.(row.original) ?? true
      : undefined,
    state: {
      pagination: paginationState,
      ...(columnVisibility ? { columnVisibility } : {}),
    },
    onPaginationChange: setPaginationState,
    onColumnVisibilityChange,
    initialState: {
      columnPinning: {
        start: pinStart ?? [],
        end: pinEnd ?? [],
      },
    },
  })

  const rows = table.getRowModel().rows
  const useVirtualRows =
    virtualize && !pagination && !expandable && !loading && rows.length >= VIRTUALIZE_MIN_ROWS

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Virtual React Compiler ile memoize edilemez (bilinen kütüphane sınırı)
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
      <Fragment key={row.id}>
        <TableRow
          className="group"
          data-state={isRowSelected?.(row.original) ? "selected" : undefined}
        >
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
        {expandable && row.getIsExpanded() ? (
          <DataTableDetailRow id={`row-detail-${row.id}`} colSpan={effectiveColumns.length}>
            {expandable.renderDetail(row.original)}
          </DataTableDetailRow>
        ) : null}
      </Fragment>
    )
  }

  const hasColumnFilters = table.getAllColumns().some((column) => column.getIsFiltered())
  const hasSorting = table.getAllColumns().some((column) => column.getIsSorted())
  const columnStateActive = hasColumnFilters || hasSorting

  useImperativeHandle(tableApiRef, () => ({
    resetColumnState: () => {
      table.resetColumnFilters(true)
      table.resetSorting(true)
    },
  }))

  useEffect(() => {
    onColumnStateChange?.(columnStateActive)
  }, [columnStateActive, onColumnStateChange])

  const tableElement = (
    <Table
      containerRef={scrollRef}
      containerClassName={containerClassName}
      className={className}
    >
      <DataTableHeaderRow table={table} columnMenu={columnMenu} />
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
            <TableCell colSpan={effectiveColumns.length} className="text-muted-foreground">
              {empty}
            </TableCell>
          </TableRow>
        ) : null}
        {!loading && useVirtualRows ? (
          <>
            {paddingTop > 0 ? (
              <TableRow aria-hidden className="pointer-events-none border-0 hover:bg-transparent">
                <TableCell colSpan={effectiveColumns.length} className="p-0" style={{ height: paddingTop }} />
              </TableRow>
            ) : null}
            {virtualRows.map((virtualRow) => renderRow(rows[virtualRow.index]))}
            {paddingBottom > 0 ? (
              <TableRow aria-hidden className="pointer-events-none border-0 hover:bg-transparent">
                <TableCell colSpan={effectiveColumns.length} className="p-0" style={{ height: paddingBottom }} />
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

  if (!pagination) return tableElement

  return (
    <DataTablePaginationBar table={table} pagination={pagination}>
      {tableElement}
    </DataTablePaginationBar>
  )
}
