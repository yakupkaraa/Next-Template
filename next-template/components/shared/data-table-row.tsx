import { flexRender, type Row, type RowData } from "@tanstack/react-table"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { pinningClass, pinningStyle } from "@/components/shared/data-table-pinning"
import {
  dataTableGridLineCellClass,
  dataTableGridLineRowClass,
} from "@/components/shared/data-table-grid-lines"
import { DataTableEditableCell } from "@/components/shared/data-table-editable-cell"
import type { DataTableFeatures } from "@/components/shared/data-table-features"
import type { DataTableEditableRowApi, DataTableGridLines } from "@/components/shared/data-table.types"

export type DataTableRowDragApi = {
  setNodeRef: (node: HTMLElement | null) => void
  style: { transform?: string; transition?: string }
  isDragging: boolean
}

export function DataTableRow<TData extends RowData>({
  row,
  isSelected,
  dragApi,
  gridLines = "rows",
  editableApi,
}: {
  row: Row<DataTableFeatures, TData>
  isSelected: boolean
  dragApi?: DataTableRowDragApi
  gridLines?: DataTableGridLines
  editableApi?: DataTableEditableRowApi<TData>
}) {
  return (
    <TableRow
      ref={dragApi?.setNodeRef}
      style={dragApi?.style}
      role={editableApi ? "row" : undefined}
      className={cn(
        "group",
        dataTableGridLineRowClass[gridLines],
        dragApi?.isDragging && "relative z-10 bg-card shadow-md ring-1 ring-primary/40"
      )}
      data-state={isSelected ? "selected" : undefined}
    >
      {row.getVisibleCells().map((cell) => {
        const pinned = cell.column.getIsPinned()
        const baseClassName = cn(
          pinningClass(pinned),
          cell.column.id === "actions" && "text-center",
          dataTableGridLineCellClass[gridLines]
        )
        const readModeContent = flexRender(cell.column.columnDef.cell, cell.getContext())

        if (!editableApi) {
          return (
            <TableCell
              key={cell.id}
              className={cn("whitespace-nowrap", baseClassName)}
              style={pinningStyle(cell.column)}
            >
              {readModeContent}
            </TableCell>
          )
        }

        const coord = { rowId: row.id, columnId: cell.column.id }
        const isActive =
          editableApi.activeCell?.rowId === coord.rowId &&
          editableApi.activeCell?.columnId === coord.columnId
        const isEditing =
          editableApi.editingCell?.rowId === coord.rowId &&
          editableApi.editingCell?.columnId === coord.columnId
        const editor = cell.column.columnDef.meta?.editor

        return (
          <DataTableEditableCell
            key={cell.id}
            readModeContent={readModeContent}
            value={editableApi.editable.getCellValue(row.original, cell.column.id)}
            editor={editor}
            isActive={isActive}
            isEditing={isEditing}
            className={baseClassName}
            style={{ ...pinningStyle(cell.column), width: cell.column.getSize() }}
            validate={
              editableApi.editable.validateCell
                ? (value) => editableApi.editable.validateCell?.(cell.column.id, value)
                : undefined
            }
            onActivate={() => editableApi.onActivateCell(coord)}
            onBeginEdit={() => editableApi.onBeginEdit(coord)}
            onCommit={(value) => editableApi.onCommitCell(row.original, coord, value)}
            onCancel={editableApi.onCancelEdit}
            onNavigate={(direction) => editableApi.onNavigate(coord, direction)}
            registerRef={(node) => editableApi.registerCellRef(coord, node)}
          />
        )
      })}
    </TableRow>
  )
}
