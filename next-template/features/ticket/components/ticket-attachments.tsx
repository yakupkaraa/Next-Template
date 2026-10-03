"use client"

import { Check, FileText, Upload, X } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "cn"
import { createCopy } from "@/features/ticket/create/copy"
import type { ContentLocale } from "@/lib/i18n"

const ALLOWED = ["png", "jpg", "jpeg", "pdf", "log"]
const MAX_FILES = 5
const MAX_BYTES = 10 * 1024 * 1024

export type TicketFile = {
  id: string
  name: string
  size: number
  progress: number
}

function extOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? ""
}

function formatSize(size: number) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function TicketAttachments({
  locale,
  files,
  onChange,
}: {
  locale: ContentLocale
  files: TicketFile[]
  onChange: (files: TicketFile[]) => void
}) {
  const text = createCopy(locale)
  const inputRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef(files)
  const [dragging, setDragging] = useState(false)
  const [banner, setBanner] = useState("")

  useEffect(() => {
    filesRef.current = files
  }, [files])

  function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list)
    if (filesRef.current.length + incoming.length > MAX_FILES) {
      setBanner(text.dropErrorCount)
      return
    }
    const next: TicketFile[] = []
    for (const file of incoming) {
      const ext = extOf(file.name)
      if (!ALLOWED.includes(ext)) {
        setBanner(text.dropErrorType)
        continue
      }
      if (file.size > MAX_BYTES) {
        setBanner(text.dropErrorSize)
        continue
      }
      next.push({
        id: `${file.name}-${file.size}-${Date.parse("2026-10-03T12:00:00.000Z")}-${next.length}`,
        name: file.name,
        size: file.size,
        progress: 35,
      })
    }
    if (!next.length) return
    setBanner("")
    const merged = [...filesRef.current, ...next]
    onChange(merged)
    window.setTimeout(() => {
      onChange(
        filesRef.current.map((item) =>
          next.some((added) => added.id === item.id) ? { ...item, progress: 100 } : item
        )
      )
    }, 700)
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        accept=".png,.jpg,.jpeg,.pdf,.log"
        onChange={(event) => {
          if (event.target.files) addFiles(event.target.files)
          event.target.value = ""
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          addFiles(event.dataTransfer.files)
        }}
        className={cn(
          "flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center",
          dragging && "border-primary bg-primary/10"
        )}
      >
        <Upload className="size-6 text-primary" />
        <span className="text-sm font-medium">{text.dropTitle}</span>
        <span className="text-xs text-muted-foreground">{text.dropHint}</span>
      </button>
      {banner ? <p className="text-sm text-destructive">{banner}</p> : null}
      <ul className="flex flex-col gap-2">
        {files.map((file) => (
          <li
            key={file.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2"
          >
            <FileText className="size-4 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              <Progress value={file.progress} className="mt-1" />
            </div>
            {file.progress >= 100 ? <Check className="size-4 shrink-0 text-primary" /> : null}
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              className="min-h-11 min-w-11 sm:min-h-6 sm:min-w-6"
              aria-label="Remove"
              onClick={() => onChange(files.filter((item) => item.id !== file.id))}
            >
              <X />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
