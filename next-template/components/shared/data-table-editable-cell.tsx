"use client"

import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react"
import { TableCell } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { loadDataTableCellEditor } from "@/components/shared/data-table-editable-lazy"
import type { DataTableCellEditor as CellEditorConfig } from "@/components/shared/data-table-cell-editor-types"

type CellEditorModule = Awaited<ReturnType<typeof loadDataTableCellEditor>>

export type DataTableCellNavigateDirection = "up" | "down" | "left" | "right" | "tab" | "shiftTab"

/**
 * Düzenlenebilir (veya salt okunur ama gezinilebilir) tek bir `<td>`. Editör chunk'ı
 * yalnızca düzenleme moduna girilmeden önce (hover/focus/Enter) `loadDataTableCellEditor()`
 * ile indirilir; indirilene kadar okuma modu içeriği aynı boyutta görünmeye devam eder.
 */
export function DataTableEditableCell({
  readModeContent,
  value,
  editor,
  isActive,
  isEditing,
  className,
  style,
  validate,
  onActivate,
  onBeginEdit,
  onCommit,
  onCancel,
  onNavigate,
  registerRef,
}: {
  readModeContent: ReactNode
  value: string
  editor?: CellEditorConfig
  isActive: boolean
  isEditing: boolean
  className?: string
  style?: CSSProperties
  validate?: (value: string) => string | undefined
  onActivate: () => void
  onBeginEdit: () => void
  onCommit: (value: string) => void
  onCancel: () => void
  onNavigate: (direction: DataTableCellNavigateDirection) => void
  registerRef: (node: HTMLTableCellElement | null) => void
}) {
  const [editorModule, setEditorModule] = useState<CellEditorModule | null>(null)

  function preloadEditor() {
    if (editor && !editorModule) {
      loadDataTableCellEditor()
        .then(setEditorModule)
        .catch(() => {})
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTableCellElement>) {
    if (isEditing) return
    if ((event.key === "Enter" || event.key === "F2") && editor) {
      event.preventDefault()
      preloadEditor()
      onBeginEdit()
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      onNavigate("up")
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      onNavigate("down")
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      onNavigate("left")
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      onNavigate("right")
    } else if (event.key === "Tab") {
      event.preventDefault()
      onNavigate(event.shiftKey ? "shiftTab" : "tab")
    }
  }

  return (
    <TableCell
      ref={registerRef}
      role="gridcell"
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      // p-0: hücrenin yüksekliği okuma/düzenleme modunda AYNI kalsın diye kontrolü
      // içerideki sabit yükseklikli (h-9) sarmalayıcıya veriyoruz (TableCell'in kendi
      // p-2'si + editör yüksekliği üst üste binince hücre büyüyordu).
      // `style.width` (table-fixed ile birlikte) sütun genişliğini KİLİTLER — okuma/düzenleme
      // modu arasında içerik değişse de sütun büyüyüp küçülmez.
      style={{ ...style, boxSizing: "border-box" }}
      className={cn(
        "relative overflow-hidden text-ellipsis whitespace-nowrap p-0 align-middle outline-none",
        editor && "cursor-text",
        isActive && "ring-2 ring-inset ring-primary",
        className
      )}
      onClick={() => {
        onActivate()
        if (editor) {
          preloadEditor()
          onBeginEdit()
        }
      }}
      onFocus={onActivate}
      onPointerEnter={preloadEditor}
      onKeyDown={handleKeyDown}
    >
      {isEditing && editor && editorModule ? (
        <editorModule.DataTableCellEditor
          editor={editor}
          initialValue={value}
          validate={validate}
          onCommit={onCommit}
          onCancel={onCancel}
        />
      ) : (
        <div className="flex h-9 min-w-0 items-center overflow-hidden px-2">
          {readModeContent}
        </div>
      )}
    </TableCell>
  )
}
