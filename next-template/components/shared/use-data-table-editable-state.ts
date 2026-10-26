"use client"

import { useRef, useState } from "react"
import { moveCellCoordArrow, moveCellCoordLinear } from "@/components/shared/data-table-editable-nav"
import type {
  DataTableCellCoord,
  DataTableCellNavigateDirection,
  DataTableEditable,
  DataTableEditableRowApi,
} from "@/components/shared/data-table.types"

/** Aktif hücre, düzenleme modu ve klavye gezinmesini yönetir; `cellSelectionFeature`'a güvenmez. */
export function useDataTableEditableState<TData>(
  editable: DataTableEditable<TData> | false | undefined,
  rowIds: string[],
  columnIds: string[]
): DataTableEditableRowApi<TData> | undefined {
  const [activeCell, setActiveCell] = useState<DataTableCellCoord | null>(null)
  const [editingCell, setEditingCell] = useState<DataTableCellCoord | null>(null)
  const [announcement, setAnnouncement] = useState("")
  const cellRefs = useRef(new Map<string, HTMLTableCellElement>())

  if (!editable) return undefined

  function key(coord: DataTableCellCoord) {
    return `${coord.rowId}:${coord.columnId}`
  }

  function focus(coord: DataTableCellCoord) {
    cellRefs.current.get(key(coord))?.focus()
  }

  function onNavigate(coord: DataTableCellCoord, direction: DataTableCellNavigateDirection) {
    const next =
      direction === "tab"
        ? moveCellCoordLinear(coord, 1, rowIds, columnIds)
        : direction === "shiftTab"
          ? moveCellCoordLinear(coord, -1, rowIds, columnIds)
          : moveCellCoordArrow(coord, direction, rowIds, columnIds)
    setActiveCell(next)
    focus(next)
  }

  return {
    editable,
    activeCell,
    editingCell,
    announcement,
    onActivateCell: setActiveCell,
    onBeginEdit: (coord) => {
      setActiveCell(coord)
      setEditingCell(coord)
      setAnnouncement(editable.copy.editingAnnouncementTemplate.replace("{column}", coord.columnId))
    },
    onCommitCell: async (row, coord, value) => {
      setEditingCell(null)
      setAnnouncement(editable.copy.savedAnnouncement)
      await editable.onCellCommit(row, coord.columnId, value)
    },
    onCancelEdit: () => {
      setEditingCell(null)
      setAnnouncement(editable.copy.cancelledAnnouncement)
    },
    onNavigate,
    registerCellRef: (coord, node) => {
      const k = key(coord)
      if (node) cellRefs.current.set(k, node)
      else cellRefs.current.delete(k)
    },
  }
}
