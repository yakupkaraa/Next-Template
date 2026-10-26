import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from "@tanstack/react-table"
import type { DataTableColumnMeta } from "@/components/shared/data-table-cell-editor-types"

function excelFilter(
  row: { getValue: (columnId: string) => unknown },
  columnId: string,
  filterValue: unknown
) {
  if (!Array.isArray(filterValue) || filterValue.length === 0) return true
  return filterValue.includes(String(row.getValue(columnId) ?? ""))
}
excelFilter.autoRemove = (value: unknown) => value == null

export const dataTableFeatures = tableFeatures({
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  columnFilteringFeature,
  columnFacetingFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowExpandingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { excel: excelFilter },
  sortFns: { alphanumeric: sortFn_alphanumeric },
  // `as` burada kaçınılmaz: TanStack v9'un `columnMeta` tip-yuvası tam olarak bu imzayı
  // istiyor (bkz. node_modules/@tanstack/table-core ColumnDef.d.ts yorumu: "columnMeta: {} as MyColumnMeta").
  // Runtime'da hiçbir etkisi yok — boş obje, yalnızca `cell.column.columnDef.meta` için tip taşıyıcı.
  columnMeta: {} as DataTableColumnMeta,
})

export type DataTableFeatures = typeof dataTableFeatures
