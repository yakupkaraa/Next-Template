"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge, type StatusBadgeTone } from "@/components/shared/status-badge"
import { showError } from "@/components/toast/notify"
import { validateAvatarFile } from "../utils/profile-tab"

const ERROR_ID = "profile-avatar-error"

export function AvatarPicker({
  preview,
  fullName,
  initials,
  role,
  status,
  statusTone,
  actionLabel,
  removeLabel,
  hint,
  typeErrorText,
  sizeErrorText,
  onSelect,
  onClear,
}: {
  preview: string | null
  fullName: string
  initials: string
  role?: string
  status?: string
  statusTone: StatusBadgeTone
  actionLabel: string
  removeLabel: string
  hint: string
  typeErrorText: string
  sizeErrorText: string
  onSelect: (file: File) => void
  onClear: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const problem = validateAvatarFile(file)
    if (problem) {
      const message = problem === "type" ? typeErrorText : sizeErrorText
      setError(message)
      showError(message)
      event.target.value = ""
      return
    }
    setError(null)
    onSelect(file)
  }

  function handleClear() {
    setError(null)
    if (fileRef.current) fileRef.current.value = ""
    onClear()
  }

  return (
    <div className="flex items-center gap-4 xl:flex-col xl:text-center">
      <Avatar className="size-16 shrink-0 rounded-2xl xl:size-28">
        {preview ? <AvatarImage src={preview} alt="" /> : null}
        <AvatarFallback className="rounded-2xl bg-muted text-lg font-medium">{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 xl:flex-none">
        <p className="truncate text-base font-semibold">{fullName}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 xl:justify-center">
          {role ? <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{role}</span> : null}
          {status ? <StatusBadge tone={statusTone}>{status}</StatusBadge> : null}
        </div>
        <Input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? ERROR_ID : undefined}
          onChange={handleChange}
        />
        <div className="mt-3 flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 w-full"
            aria-label={actionLabel}
            onClick={() => fileRef.current?.click()}
          >
            <Upload />
            {actionLabel}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="min-h-11 w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
            disabled={!preview}
            onClick={handleClear}
          >
            {removeLabel}
          </Button>
          {error ? (
            <p id={ERROR_ID} className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">{hint}</p>
          )}
        </div>
      </div>
    </div>
  )
}
