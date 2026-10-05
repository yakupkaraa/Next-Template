"use client"

import { dismissToast, showError, showLoading, showSuccess } from "./notify"

export async function runAction({
  pending,
  success,
  error,
  run,
}: {
  pending: string
  success: string
  error: string
  run: () => Promise<void>
}): Promise<boolean> {
  const id = showLoading(pending)
  try {
    await run()
    dismissToast(id)
    showSuccess(success)
    return true
  } catch {
    dismissToast(id)
    showError(error)
    return false
  }
}
