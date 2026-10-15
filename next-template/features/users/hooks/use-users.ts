"use client"

import { useEffect, useState } from "react"
import { runAction } from "@/components/toast/run-action"
import { mockRequest } from "@/lib/mock-request"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { userList } from "@/features/users/mocks/users.mock"
import type { UserRow } from "@/features/users/types/user"

// TODO: gerçek API'de burası TanStack Query + features/users/endpoint.ts olacak
export function useUsers(locale: ContentLocale) {
  const [rows, setRows] = useState<UserRow[]>(() => [...userList])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600)
    return () => window.clearTimeout(timer)
  }, [])

  const nextId = String(
    rows.reduce((max, row) => Math.max(max, Number.parseInt(row.id, 10) || 0), 0) + 1
  )

  async function removeUser(user: UserRow): Promise<boolean> {
    const toast = getDictionary(locale).users.list.toast
    const name = `${user.firstName} ${user.lastName}`.trim() || user.email
    const ok = await runAction({
      pending: toast.deleting,
      success: toast.deleted.replace("{name}", name),
      error: toast.deleteFailed,
      run: () => mockRequest(() => undefined),
    })
    if (ok) setRows((current) => current.filter((u) => u.id !== user.id))
    return ok
  }

  function addUser(row: UserRow) {
    setRows((current) => [row, ...current])
  }

  return { rows, loading, nextId, addUser, removeUser }
}
