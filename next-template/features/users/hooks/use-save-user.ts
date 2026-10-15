"use client"

import { useState } from "react"
import { mockRequest } from "@/lib/mock-request"
import type { UserRow } from "@/features/users/types/user"

// TODO: gerçek API'de burası TanStack Query mutation + features/users/endpoint.ts olacak
export function useSaveUser() {
  const [saving, setSaving] = useState(false)

  async function saveUser(values: UserRow): Promise<UserRow> {
    setSaving(true)
    const result = await mockRequest(() => values)
    setSaving(false)
    return result
  }

  return { saveUser, saving }
}
