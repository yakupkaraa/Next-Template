"use client"

import { useState } from "react"
import { UserTableFields } from "@/features/users/user-table-fields"
import {
  emptyUserFormValues,
  type UserRow,
} from "@/features/users/data"
import { normalizeEmail } from "@/features/users/list/form-field-meta"
import type { ContentLocale } from "@/lib/i18n"

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
  const [values, setValues] = useState(emptyUserFormValues)

  function setField(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
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
    setValues(emptyUserFormValues())
  }

  return (
    <form id={addUserFormId} className="flex flex-col" onSubmit={handleSubmit}>
      <UserTableFields
        locale={locale}
        values={values}
        onChange={setField}
        idPrefix="user-field"
        compact
      />
    </form>
  )
}
