"use client"

import { useMemo, type ReactNode } from "react"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type ScreenReaderInstructions,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DataTableRowDragHandleContext } from "@/components/shared/data-table-reorder-context"
import type { DataTableReorderAnnouncementsCopy } from "@/components/shared/data-table.types"

function formatAnnouncement(template: string, position: number, total: number) {
  return template.replace("{position}", String(position)).replace("{total}", String(total))
}

function buildAnnouncements(
  items: string[],
  copy: DataTableReorderAnnouncementsCopy
): Announcements {
  function positionOf(id: string | number) {
    return items.indexOf(String(id)) + 1
  }

  return {
    onDragStart({ active }) {
      return formatAnnouncement(copy.pickedUpTemplate, positionOf(active.id), items.length)
    },
    onDragOver({ over }) {
      if (!over) return undefined
      return formatAnnouncement(copy.movedTemplate, positionOf(over.id), items.length)
    },
    onDragEnd({ active, over }) {
      return formatAnnouncement(
        copy.droppedTemplate,
        positionOf(over?.id ?? active.id),
        items.length
      )
    },
    onDragCancel({ active }) {
      return formatAnnouncement(copy.cancelledTemplate, positionOf(active.id), items.length)
    },
  }
}

/** DndContext + SortableContext sarmalayıcısı; yalnızca `reorder` prop'u açıkken lazy yüklenir. */
export function DataTableReorderProvider({
  items,
  announcements: announcementsCopy,
  onReorder,
  children,
}: {
  items: string[]
  announcements: DataTableReorderAnnouncementsCopy
  onReorder: (activeId: string, overId: string) => void
  children: ReactNode
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const screenReaderInstructions: ScreenReaderInstructions = useMemo(
    () => ({ draggable: announcementsCopy.screenReaderInstructions }),
    [announcementsCopy.screenReaderInstructions]
  )
  const announcements = useMemo(
    () => buildAnnouncements(items, announcementsCopy),
    [items, announcementsCopy]
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    onReorder(String(active.id), String(over.id))
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      // `container: document.body` olmadan dnd-kit'in gizli duyuru div'leri DndContext'in
      // render edildiği yere (burada <tbody> içine) gömülür → "<div> içinde <tbody>" hydration
      // hatası. document.body'ye portallanarak tablo DOM yapısı bozulmadan kalır.
      accessibility={{ announcements, screenReaderInstructions, container: document.body }}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

/** Tek bir satırı sürüklenebilir yapar; tutaç hücresi context üzerinden `attributes`/`listeners` okur. */
export function DataTableSortableRow({
  id,
  disabled,
  onPreload,
  children,
}: {
  id: string
  disabled?: boolean
  onPreload: () => void
  children: (api: {
    setNodeRef: (node: HTMLElement | null) => void
    style: { transform: string | undefined; transition: string | undefined }
    isDragging: boolean
  }) => ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  })

  return (
    <DataTableRowDragHandleContext.Provider
      value={{ ready: true, disabled: Boolean(disabled), attributes, listeners, isDragging, onPreload }}
    >
      {children({
        setNodeRef,
        style: { transform: CSS.Transform.toString(transform), transition },
        isDragging,
      })}
    </DataTableRowDragHandleContext.Provider>
  )
}
