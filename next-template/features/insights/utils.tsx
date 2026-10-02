import { CreditCard, Package, ShoppingBag, Star, TrendingDown, TrendingUp } from "lucide-react"
import type { StatusBadgeTone } from "@/components/ui/status-badge"
import type { InsightLocale, OrderStatus } from "./data"

export type InsightsSectionProps = { locale: InsightLocale }

export type DeltaSurface = "primary" | "soft" | "default"

export const kpiIcons = {
  orders: ShoppingBag,
  shipped: Package,
  revenue: CreditCard,
  rating: Star,
} as const

export const statusTone: Record<OrderStatus, StatusBadgeTone> = {
  pending: "warning",
  shipped: "neutral",
  delivered: "success",
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

  return direction === "up" ? "text-(--trend-up)" : "text-destructive"
}

export function Delta({
  value,
  direction,
  onSurface = "default",
  pill = false,
}: {
  value: number
  direction: "up" | "down"
  onSurface?: DeltaSurface
  pill?: boolean
}) {
  const Icon = direction === "up" ? TrendingUp : TrendingDown
  const signed = `${direction === "up" ? "+" : "-"}${value.toFixed(1)}%`

  if (onSurface === "primary" && pill) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs font-semibold text-primary-foreground">
        <Icon className="size-3" />
        {signed}
      </span>
    )
  }

  if (pill) {
    return (
      <span
        className={
          direction === "up"
            ? "inline-flex items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 text-xs font-semibold text-(--trend-up)"
            : "inline-flex items-center gap-0.5 rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive"
        }
      >
        <Icon className="size-3" />
        {signed}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${deltaToneClass(direction, onSurface)}`}>
      <Icon className="size-3" />
      {signed}
    </span>
  )
}
