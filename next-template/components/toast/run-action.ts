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
  /** Sabit metin veya yakalanan hataya göre mesaj üreten fonksiyon (bkz. resolve-error-message.ts). */
  error: string | ((err: unknown) => string)
  run: () => Promise<void>
}): Promise<boolean> {
  const id = showLoading(pending)
  try {
    await run()
    dismissToast(id)
    showSuccess(success)
    return true
  } catch (err) {
    dismissToast(id)
    showError(typeof error === "function" ? error(err) : error)
    return false
  }
}
