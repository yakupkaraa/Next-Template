import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export const statusBadgeTones = {
  success: "border border-success bg-success-bg font-medium text-success",
  warning: "border border-warning bg-warning-bg font-medium text-warning",
  neutral: "border border-border bg-muted font-medium text-muted-foreground",
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
