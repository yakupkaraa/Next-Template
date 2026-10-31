"use client"

import { useEffect, useState } from "react"
import { mockRequest } from "@/lib/mock-request"
import { userList } from "@/features/users/mocks/users.mock"
import type { UserRow } from "@/features/users/types/user"

// TODO: gerçek API'de burası TanStack Query + features/users/endpoint.ts olacak
export function useUsers() {
  const [rows, setRows] = useState<UserRow[]>(() => [...userList])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600)
    return () => window.clearTimeout(timer)
  }, [])

  const nextId = String(
    rows.reduce((max, row) => Math.max(max, Number.parseInt(row.id, 10) || 0), 0) + 1
  )

  async function removeUser(user: UserRow): Promise<void> {
    await mockRequest(() => undefined)
    setRows((current) => current.filter((u) => u.id !== user.id))
  }

  function addUser(row: UserRow) {
    setRows((current) => [row, ...current])
  }

  return { rows, loading, nextId, addUser, removeUser }
}
