import { Fragment, type ReactNode } from "react"
import type { Row, RowData } from "@tanstack/react-table"
import { DataTableDetailRow } from "@/components/shared/data-table-detail-row"
import { DataTableRow, type DataTableRowDragApi } from "@/components/shared/data-table-row"
import type {
  DataTableEditableRowApi,
  DataTableExpandable,
  DataTableGridLines,
  DataTableReorderConfig,
} from "@/components/shared/data-table.types"
import type { DataTableFeatures } from "@/components/shared/data-table-features"
import type { ReorderDndModule } from "@/components/shared/data-table-reorder-body"

/** `renderRow`'un satır başına değişmeyen prop'ları — dnd-kit yüklenince sarmalayıcı eklenir. */
export function DataTableBodyRow<TData extends RowData>({
  row,
  isRowSelected,
  gridLines,
  editableApi,
  expandable,
  colSpan,
  reorder,
  reorderDnd,
  onPreloadReorder,
}: {
  row: Row<DataTableFeatures, TData>
  isRowSelected?: (row: TData) => boolean
  gridLines: DataTableGridLines
  editableApi?: DataTableEditableRowApi<TData>
  expandable?: DataTableExpandable<TData>
  colSpan: number
  reorder?: DataTableReorderConfig
  reorderDnd: ReorderDndModule | null
  onPreloadReorder: () => void
}): ReactNode {
  const isSelected = Boolean(isRowSelected?.(row.original))
  const rowElement = (dragApi?: DataTableRowDragApi) => (
    <DataTableRow
      row={row}
      isSelected={isSelected}
      dragApi={dragApi}
      gridLines={gridLines}
      editableApi={editableApi}
    />
  )

  return (
    <Fragment key={row.id}>
      {reorder && reorderDnd ? (
        <reorderDnd.DataTableSortableRow
          id={row.id}
          disabled={reorder.disabled}
          onPreload={onPreloadReorder}
        >
          {rowElement}
        </reorderDnd.DataTableSortableRow>
      ) : (
        rowElement()
      )}
      {expandable && row.getIsExpanded() ? (
        <DataTableDetailRow id={`row-detail-${row.id}`} colSpan={colSpan}>
          {expandable.renderDetail(row.original)}
        </DataTableDetailRow>
      ) : null}
    </Fragment>
  )
}
