"use client"

import { runAction } from "@/components/toast/run-action"
import { mockRequest } from "@/lib/mock-request"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import type { UserRow } from "@/features/users/constants/users"

export async function deleteUser(row: UserRow, locale: ContentLocale): Promise<boolean> {
  const toast = getDictionary(locale).users.list.toast
  const name = `${row.firstName} ${row.lastName}`.trim() || row.email
  return runAction({
    pending: toast.deleting,
    success: toast.deleted.replace("{name}", name),
    error: toast.deleteFailed,
    run: () => mockRequest(() => undefined),
  })
}
