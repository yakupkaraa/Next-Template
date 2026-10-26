"use client"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DataTableCellEditor as CellEditorConfig } from "@/components/shared/data-table-cell-editor-types"

const errorId = "data-table-cell-editor-error"

export function DataTableCellEditor({
  editor,
  initialValue,
  validate,
  onCommit,
  onCancel,
}: {
  editor: CellEditorConfig
  initialValue: string
  validate?: (value: string) => string | undefined
  onCommit: (value: string) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | undefined>(undefined)

  function commit(next: string) {
    const err = validate?.(next)
    if (err) {
      setError(err)
      return
    }
    setError(undefined)
    onCommit(next)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault()
      commit(value)
    } else if (event.key === "Escape") {
      event.preventDefault()
      onCancel()
    }
  }

  if (editor.type === "select") {
    return (
      // min-w-0: tarayıcı, table-auto genişlik hesabında <select>/<input>'un varsayılan
      // minimum içerik genişliğini sütunu büyütmek için kullanmasın diye zincirin her
      // halkasında (sarmalayıcı + trigger) sıfırlanıyor.
      <div className="flex h-9 w-full min-w-0 items-center px-1">
        <Select
          value={value}
          onValueChange={(next) => {
            if (!next) return
            setValue(next)
            commit(next)
          }}
        >
          <SelectTrigger
            autoFocus
            size="sm"
            className="w-full min-w-0"
            onKeyDown={handleKeyDown}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            {editor.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    // Hücre yüksekliği sabit kalsın diye hata metni normal akışta DEĞİL, absolute
    // konumlandırılıyor (satır yüksekliğini etkilemiyor, hücrenin altına taşıyor).
    // min-w-0: <input>'un varsayılan minimum içerik genişliği sütunu büyütmesin.
    <div className="relative flex h-9 w-full min-w-0 items-center px-1">
      <Input
        autoFocus
        type={editor.type === "number" ? "number" : editor.type === "date" ? "date" : "text"}
        min={editor.type === "number" ? editor.min : undefined}
        value={value}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className="h-8 w-full min-w-0"
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => commit(value)}
      />
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="absolute top-full left-1 z-20 mt-1 w-max max-w-xs rounded-md bg-destructive px-2 py-1 text-xs text-white shadow-md"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}
