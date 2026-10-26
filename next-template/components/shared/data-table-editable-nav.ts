export type DataTableCellCoord = { rowId: string; columnId: string }

export type DataTableArrowDirection = "up" | "down" | "left" | "right"

export function moveCellCoordArrow(
  current: DataTableCellCoord,
  direction: DataTableArrowDirection,
  rowIds: readonly string[],
  columnIds: readonly string[]
): DataTableCellCoord {
  const rowIndex = rowIds.indexOf(current.rowId)
  const colIndex = columnIds.indexOf(current.columnId)
  if (rowIndex === -1 || colIndex === -1) return current

  if (direction === "up") {
    return { rowId: rowIds[Math.max(0, rowIndex - 1)], columnId: current.columnId }
  }
  if (direction === "down") {
    return { rowId: rowIds[Math.min(rowIds.length - 1, rowIndex + 1)], columnId: current.columnId }
  }
  if (direction === "left") {
    return { rowId: current.rowId, columnId: columnIds[Math.max(0, colIndex - 1)] }
  }
  return { rowId: current.rowId, columnId: columnIds[Math.min(columnIds.length - 1, colIndex + 1)] }
}

/** Tab (+1) / Shift+Tab (-1): satır sonunda/başında bir alt/üst satıra geçer. */
export function moveCellCoordLinear(
  current: DataTableCellCoord,
  delta: 1 | -1,
  rowIds: readonly string[],
  columnIds: readonly string[]
): DataTableCellCoord {
  const rowIndex = rowIds.indexOf(current.rowId)
  const colIndex = columnIds.indexOf(current.columnId)
  if (rowIndex === -1 || colIndex === -1) return current

  let nextCol = colIndex + delta
  let nextRow = rowIndex
  if (nextCol < 0) {
    nextRow = Math.max(0, rowIndex - 1)
    nextCol = columnIds.length - 1
  } else if (nextCol >= columnIds.length) {
    nextRow = Math.min(rowIds.length - 1, rowIndex + 1)
    nextCol = 0
  }
  return { rowId: rowIds[nextRow], columnId: columnIds[nextCol] }
}
