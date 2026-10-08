import { Badge } from "@/components/ui/badge"
import { cn } from "cn"
import type { ComponentProps } from "react"

export const statusBadgeTones = {
  success: "border border-success bg-success-bg font-medium text-success",
  warning: "border border-warning bg-warning-bg font-medium text-warning",
  neutral:
    "border border-slate-300 bg-slate-50 font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300",
  danger: "border border-error bg-error-bg font-medium text-error",
} as const

export type StatusBadgeTone = keyof typeof statusBadgeTones

export function StatusBadge({
  tone = "neutral",
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Badge>, "variant"> & {
  tone?: StatusBadgeTone
}) {
  return (
    <Badge
      variant="secondary"
      className={cn("gap-1.5", statusBadgeTones[tone], className)}
      {...props}
    >
      <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden />
      {children}
    </Badge>
  )
}
