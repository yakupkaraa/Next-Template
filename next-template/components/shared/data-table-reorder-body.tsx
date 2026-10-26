import type { ReactNode } from "react"
import { DataTableRowDragHandleContext } from "@/components/shared/data-table-reorder-context"
import type { loadDataTableReorderDnd } from "@/components/shared/data-table-reorder-lazy"
import type { DataTableReorderConfig } from "@/components/shared/data-table.types"

export type ReorderDndModule = Awaited<ReturnType<typeof loadDataTableReorderDnd>>

/** Dış context (henüz yüklenmemiş/disabled varsayılanı) + yüklendiyse gerçek DndContext sarmalayıcısı. */
export function DataTableReorderBody({
  reorder,
  reorderDnd,
  rowIds,
  onPreload,
  children,
}: {
  reorder: DataTableReorderConfig
  reorderDnd: ReorderDndModule | null
  rowIds: string[]
  onPreload: () => void
  children: ReactNode
}) {
  return (
    <DataTableRowDragHandleContext.Provider
      value={{ ready: false, disabled: true, isDragging: false, onPreload }}
    >
      {reorderDnd ? (
        <reorderDnd.DataTableReorderProvider
          items={rowIds}
          announcements={reorder.announcements}
          onReorder={reorder.onReorder}
        >
          {children}
        </reorderDnd.DataTableReorderProvider>
      ) : (
        children
      )}
    </DataTableRowDragHandleContext.Provider>
  )
}
