"use client"

import { AlertTriangle, CheckCircle2, Info, Loader2, XCircle } from "lucide-react"
import { toast } from "sonner"

const iconClass = "size-5 shrink-0"

export function showSuccess(message: string) {
  return toast.success(message, {
    icon: <CheckCircle2 className={iconClass} />,
  })
}

export function showError(message: string) {
  return toast.error(message, {
    icon: <XCircle className={iconClass} />,
  })
}

export function showWarning(message: string) {
  return toast.warning(message, {
    icon: <AlertTriangle className={iconClass} />,
  })
}

export function showInfo(message: string) {
  return toast.info(message, {
    icon: <Info className={iconClass} />,
  })
}

export function showLoading(message: string) {
  return toast.loading(message, {
    icon: <Loader2 className={`${iconClass} animate-spin`} />,
  })
}

export function dismissToast(id: string | number) {
  toast.dismiss(id)
}
