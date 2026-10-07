import { Badge } from "@/components/ui/badge"
import { cn } from "cn"
import type { ComponentProps } from "react"

export const statusBadgeTones = {
  success:
    "border border-[#86d9a8] bg-[#eefbf3] font-medium text-[#1f8a4c] dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning:
    "border border-[#f0c56a] bg-[#fff6e0] font-medium text-[#d4940a] dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300",
  neutral:
    "border border-slate-300 bg-slate-50 font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300",
  danger:
    "border border-[#f0a8a8] bg-[#fdeeee] font-medium text-[#e03d3d] dark:border-rose-700 dark:bg-rose-950 dark:text-rose-300",
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
