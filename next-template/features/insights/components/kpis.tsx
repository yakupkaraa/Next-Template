import { CreditCard, Package, ShoppingBag, Star } from "lucide-react"
import { KpiStatCard } from "@/components/shared/kpi-stat-card"
import { insightKpiLabels } from "../constants/insights"
import { insightKpis } from "../mocks/insights.mock"
import type { InsightsSectionProps } from "../utils/section-props"

const kpiIcons = {
  orders: ShoppingBag,
  shipped: Package,
  revenue: CreditCard,
  rating: Star,
} as const

export function InsightsKpis({ locale }: InsightsSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {insightKpis.map((kpi) => {
        const Icon = kpiIcons[kpi.id as keyof typeof kpiIcons]
        const label = insightKpiLabels[kpi.id as keyof typeof insightKpiLabels][locale]
        const suffix = "suffix" in kpi ? kpi.suffix : undefined

        return (
          <KpiStatCard
            key={kpi.id}
            icon={Icon}
            label={label}
            value={kpi.value}
            suffix={suffix}
            tone={kpi.tone}
          />
        )
      })}
    </div>
  )
}
