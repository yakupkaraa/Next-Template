"use client"

import { createContext, useContext } from "react"
// Yalnızca tip — `import type` derleme sırasında silinir, dnd-kit runtime kodu bundle'a girmez.
import type { DraggableAttributes, DraggableSyntheticListeners } from "@dnd-kit/core"

/**
 * `ready: false` iken dnd-kit henüz yüklenmedi; tutaç statik/disabled görünür ve
 * yalnızca `onPreload`'u tetikleyebilir. `DataTableSortableRow` yüklendiğinde satır
 * başına daha spesifik bir context değeriyle bunu geçersiz kılar (`ready: true`).
 */
export type DataTableRowDragHandle = {
  ready: boolean
  disabled: boolean
  attributes?: DraggableAttributes
  listeners?: DraggableSyntheticListeners
  isDragging: boolean
  onPreload: () => void
}

export const DataTableRowDragHandleContext = createContext<DataTableRowDragHandle | null>(null)

export function useDataTableRowDragHandle() {
  return useContext(DataTableRowDragHandleContext)
}
