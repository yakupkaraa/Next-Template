"use client"

import type { ReactNode } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import type { ReactTable, RowData } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { DataTableFeatures } from "@/components/shared/data-table-features"
import type {
  DataTablePaginationConfig,
  DataTablePaginationCopy,
} from "@/components/shared/data-table.types"

function formatRange(template: string, from: number, to: number, total: number) {
  return template
    .replace("{from}", String(from))
    .replace("{to}", String(to))
    .replace("{total}", String(total))
}

export function DataTablePagination({
  pageIndex,
  pageSize,
  pageCount,
  rowCount,
  pageSizeOptions,
  canPreviousPage,
  canNextPage,
  copy,
  onPageIndexChange,
  onPageSizeChange,
  className,
}: {
  pageIndex: number
  pageSize: number
  pageCount: number
  rowCount: number
  pageSizeOptions: readonly number[]
  canPreviousPage: boolean
  canNextPage: boolean
  copy: DataTablePaginationCopy
  onPageIndexChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
  className?: string
}) {
  const from = rowCount === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(rowCount, pageIndex * pageSize + pageSize)
  const lastPageIndex = Math.max(pageCount - 1, 0)

  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-between gap-3 border-t px-3 py-2",
        className
      )}
    >
      <Select
        value={String(pageSize)}
        onValueChange={(next) => next && onPageSizeChange(Number(next))}
      >
        <SelectTrigger size="sm" aria-label={copy.pageSizeLabel} className="w-[4.5rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          {pageSizeOptions.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label={copy.firstPageLabel}
            disabled={!canPreviousPage}
            onClick={() => onPageIndexChange(0)}
          >
            <ChevronsLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label={copy.previousPageLabel}
            disabled={!canPreviousPage}
            onClick={() => onPageIndexChange(pageIndex - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label={copy.nextPageLabel}
            disabled={!canNextPage}
            onClick={() => onPageIndexChange(pageIndex + 1)}
          >
            <ChevronRight />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label={copy.lastPageLabel}
            disabled={!canNextPage}
            onClick={() => onPageIndexChange(lastPageIndex)}
          >
            <ChevronsRight />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground tabular-nums">
          {formatRange(copy.rangeTemplate, from, to, rowCount)}
        </span>
      </div>
    </div>
  )
}

/** DataTable'ın altına tablo gövdesini ve sayfalama çubuğunu dikey olarak dizer. */
export function DataTablePaginationBar<TData extends RowData>({
  table,
  pagination,
  children,
}: {
  table: ReactTable<DataTableFeatures, TData>
  pagination: DataTablePaginationConfig
  children: ReactNode
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1">{children}</div>
      <DataTablePagination
        pageIndex={table.state.pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={table.getPageCount()}
        rowCount={table.getRowCount()}
        pageSizeOptions={pagination.pageSizeOptions}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        copy={pagination.copy}
        onPageIndexChange={(pageIndex) => table.setPageIndex(pageIndex)}
        onPageSizeChange={(pageSize) => table.setPageSize(pageSize)}
      />
    </div>
  )
}
