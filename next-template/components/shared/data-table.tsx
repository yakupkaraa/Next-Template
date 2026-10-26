"use client"

import { useEffect, useImperativeHandle, useRef, useState } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useTable, type RowData } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { DataTableBodyRow } from "@/components/shared/data-table-body-row"
import { DataTableSkeletonRows } from "@/components/shared/data-table-skeleton-rows"
import { DataTableVirtualPaddingRow } from "@/components/shared/data-table-virtual-padding-row"
import { createExpandColumn } from "@/components/shared/data-table-expand-column"
import { createReorderColumns } from "@/components/shared/data-table-reorder-column"
import { DataTableReorderBody, type ReorderDndModule } from "@/components/shared/data-table-reorder-body"
import { loadDataTableReorderDnd } from "@/components/shared/data-table-reorder-lazy"
import { DataTableHeaderRow } from "@/components/shared/data-table-header-row"
import { DataTablePaginationBar } from "@/components/shared/data-table-pagination"
import { useDataTablePaginationState } from "@/components/shared/use-data-table-pagination-state"
import { useDataTableEditableState } from "@/components/shared/use-data-table-editable-state"
import { dataTableFeatures } from "@/components/shared/data-table-features"
import type { DataTableProps } from "@/components/shared/data-table.types"

export type {
  DataTableApi,
  DataTableCellEditor,
  DataTableColumnMenuCopy,
  DataTableColumnMeta,
  DataTableColumnResizeConfig,
  DataTableEditable,
  DataTableExpandable,
  DataTableGridLines,
  DataTablePaginationConfig,
  DataTablePaginationCopy,
  DataTableProps,
  DataTableReorderAnnouncementsCopy,
  DataTableReorderConfig,
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
  reorder,
  gridLines = "rows",
  editable,
  columnResize,
}: DataTableProps<TData>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [paginationState, setPaginationState] = useDataTablePaginationState(
    pagination ? pagination.pageSize : Number.POSITIVE_INFINITY
  )
  const [reorderDnd, setReorderDnd] = useState<ReorderDndModule | null>(null)
  const effectiveColumns = [
    ...(reorder ? createReorderColumns<TData>(reorder) : []),
    ...(expandable ? [createExpandColumn(expandable)] : []),
    ...columns,
  ]

  function handlePreloadReorder() {
    if (reorderDnd) return
    loadDataTableReorderDnd()
      .then(setReorderDnd)
      .catch(() => {})
  }

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: effectiveColumns,
    enableSortingRemoval: true,
    enableMultiSort: false,
    enableColumnResizing: Boolean(columnResize),
    columnResizeMode: "onChange",
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
  const editableApi = useDataTableEditableState(
    editable,
    rows.map((row) => row.id),
    table.getVisibleLeafColumns().map((column) => column.id)
  )
  const useVirtualRows =
    virtualize &&
    !pagination &&
    !expandable &&
    !reorder &&
    !editable &&
    !loading &&
    rows.length >= VIRTUALIZE_MIN_ROWS

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
      <DataTableBodyRow
        key={row.id}
        row={row}
        isRowSelected={isRowSelected}
        gridLines={gridLines}
        editableApi={editableApi}
        expandable={expandable}
        colSpan={effectiveColumns.length}
        reorder={reorder}
        reorderDnd={reorderDnd}
        onPreloadReorder={handlePreloadReorder}
      />
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

  const plainRows = !loading && !useVirtualRows ? rows.map((row) => renderRow(row)) : null
  const bodyRows = reorder ? (
    <DataTableReorderBody
      reorder={reorder}
      reorderDnd={reorderDnd}
      rowIds={rows.map((row) => row.id)}
      onPreload={handlePreloadReorder}
    >
      {plainRows}
    </DataTableReorderBody>
  ) : (
    plainRows
  )

  const tableElement = (
    <Table
      containerRef={scrollRef}
      containerClassName={containerClassName}
      className={className}
      role={editable ? "grid" : undefined}
    >
      <DataTableHeaderRow
        table={table}
        columnMenu={columnMenu}
        gridLines={gridLines}
        grid={Boolean(editable)}
        columnResize={columnResize}
      />
      <TableBody>
        {loading ? <DataTableSkeletonRows table={table} /> : null}
        {!loading && rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={effectiveColumns.length} className="text-muted-foreground">
              {empty}
            </TableCell>
          </TableRow>
        ) : null}
        {!loading && useVirtualRows ? (
          <>
            <DataTableVirtualPaddingRow height={paddingTop} colSpan={effectiveColumns.length} />
            {virtualRows.map((virtualRow) => renderRow(rows[virtualRow.index]))}
            <DataTableVirtualPaddingRow height={paddingBottom} colSpan={effectiveColumns.length} />
          </>
        ) : null}
        {bodyRows}
      </TableBody>
    </Table>
  )

  const liveRegion = editableApi ? (
    <span className="sr-only" role="status" aria-live="polite">
      {editableApi.announcement}
    </span>
  ) : null

  if (!pagination) {
    return (
      <>
        {tableElement}
        {liveRegion}
      </>
    )
  }

  return (
    <>
      <DataTablePaginationBar table={table} pagination={pagination}>
        {tableElement}
      </DataTablePaginationBar>
      {liveRegion}
    </>
  )
}
