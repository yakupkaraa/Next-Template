import { Activity, Package, ShoppingBag, Star, TrendingDown, TrendingUp } from "lucide-react"
import type { InsightLocale, OrderStatus } from "./data"

export type InsightsSectionProps = { locale: InsightLocale }

export type DeltaSurface = "primary" | "soft" | "default"

export const kpiIcons = {
  orders: ShoppingBag,
  shipped: Package,
  revenue: Activity,
  rating: Star,
} as const

export const statusTone: Record<OrderStatus, string> = {
  pending: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  shipped: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
}

export function deltaToneClass(direction: "up" | "down", onSurface: DeltaSurface = "default") {
  if (onSurface === "primary") {
    return direction === "up"
      ? "text-[color-mix(in_oklch,var(--primary-foreground)_92%,var(--chart-2))]"
      : "text-[color-mix(in_oklch,var(--primary-foreground)_75%,oklch(0.85_0.12_25))]"
  }

  if (onSurface === "soft") {
    return direction === "up"
      ? "text-[var(--insights-card-bright-foreground)]"
      : "text-[color-mix(in_oklch,var(--insights-card-bright-foreground)_80%,oklch(0.75_0.12_25))]"
  }

  return direction === "up" ? "text-primary" : "text-destructive"
}

export function Delta({
  value,
  direction,
  onSurface = "default",
}: {
  value: number
  direction: "up" | "down"
  onSurface?: DeltaSurface
}) {
  const Icon = direction === "up" ? TrendingUp : TrendingDown

  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${deltaToneClass(direction, onSurface)}`}>
      <Icon className="size-3" />
      {direction === "up" ? "+" : "-"}
      {value.toFixed(1)}%
    </span>
  )
}
