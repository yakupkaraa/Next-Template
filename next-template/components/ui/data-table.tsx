"use client"

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

export function DataTable<TData extends RowData>({
  columns,
  data,
  empty,
  loading = false,
  containerClassName,
  className,
}: {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  empty: string
  loading?: boolean
  containerClassName?: string
  className?: string
}) {
  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
  })

  return (
    <Table containerClassName={containerClassName} className={className}>
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
          ? Array.from({ length: 14 }, (_, row) => (
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
        {!loading && table.getRowModel().rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-muted-foreground">
              {empty}
            </TableCell>
          </TableRow>
        ) : null}
        {!loading
          ? table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="whitespace-nowrap">
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  )
}
