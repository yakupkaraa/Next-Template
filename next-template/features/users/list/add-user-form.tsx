"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormSelectField } from "@/features/users/list/form-select-field"
import { Textarea } from "@/components/ui/textarea"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  userFormFieldKeys,
  type UserColumnKey,
  type UserRow,
} from "@/features/users/data"
import {
  formatDateInput,
  formatPhoneInput,
  normalizeEmail,
  userFormFieldKind,
} from "@/features/users/list/form-field-meta"

function emptyForm(): Record<UserColumnKey, string> {
  return Object.fromEntries(userFormFieldKeys.map((key) => [key, ""])) as Record<
    UserColumnKey,
    string
  >
}

function todayJoined() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, "0")
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${day}.${month}.${now.getFullYear()}`
}

function todayLastSeen() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, "0")
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `${day}.${month}.${now.getFullYear()}`
}

export const addUserFormId = "add-user-form"

export function AddUserForm({
  locale,
  nextId,
  onCreated,
}: {
  locale: ContentLocale
  nextId: string
  onCreated: (row: UserRow) => void
}) {
  const list = getDictionary(locale).users.list
  const [values, setValues] = useState(emptyForm)

  function setField(key: UserColumnKey, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function handleFieldChange(key: UserColumnKey, raw: string) {
    const kind = userFormFieldKind(key, locale)
    if (kind.type === "tel") {
      setField(key, formatPhoneInput(raw))
      return
    }
    if (kind.type === "date") {
      setField(key, formatDateInput(raw))
      return
    }
    if (kind.type === "email") {
      setField(key, raw)
      return
    }
    setField(key, raw)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const row: UserRow = {
      ...values,
      email: normalizeEmail(values.email),
      id: nextId,
      lastSeen: todayLastSeen(),
      joined: values.joined.trim() || todayJoined(),
    }
    onCreated(row)
    setValues(emptyForm())
  }

  return (
    <form id={addUserFormId} className="flex flex-col" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {userFormFieldKeys.map((key) => {
          const label = list.columns[key]
          const kind = userFormFieldKind(key, locale)
          const wide = key === "note"
          const fieldId = `user-field-${key}`

          return (
            <div
              key={key}
              className={
                wide
                  ? "flex flex-col gap-0.5 lg:col-span-3"
                  : "flex min-w-0 flex-col gap-0.5"
              }
            >
              <Label htmlFor={fieldId} className="text-xs font-medium">
                {label}
              </Label>
              {kind.type === "textarea" ? (
                <Textarea
                  id={fieldId}
                  value={values[key]}
                  onChange={(event) => handleFieldChange(key, event.target.value)}
                  rows={2}
                  className="min-h-16 resize-none py-1.5 text-sm"
                />
              ) : kind.type === "select" ? (
                <FormSelectField
                  id={fieldId}
                  value={values[key]}
                  placeholder={list.selectPlaceholder}
                  options={kind.options}
                  onValueChange={(value) => setField(key, value)}
                />
              ) : (
                <Input
                  id={fieldId}
                  value={values[key]}
                  onChange={(event) => handleFieldChange(key, event.target.value)}
                  onBlur={
                    kind.type === "email"
                      ? () => setField(key, normalizeEmail(values[key]))
                      : undefined
                  }
                  type={kind.type === "number" ? "text" : kind.type}
                  inputMode={kind.type === "number" ? "numeric" : kind.type === "tel" ? "tel" : kind.type === "email" ? "email" : undefined}
                  autoComplete={kind.type === "email" ? "email" : kind.type === "tel" ? "tel" : "off"}
                  placeholder={
                    kind.type === "tel"
                      ? "+90 532 000 00 00"
                      : kind.type === "email"
                        ? "ornek@firma.com"
                        : kind.type === "date"
                          ? "GG.AA.YYYY"
                          : undefined
                  }
                  pattern={kind.type === "email" ? undefined : kind.type === "date" ? "\\d{2}\\.\\d{2}\\.\\d{4}" : undefined}
                  className="h-8 py-1 text-sm"
                />
              )}
            </div>
          )
        })}
      </div>
    </form>
  )
}
