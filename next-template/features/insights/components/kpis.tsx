import { CreditCard, Package, ShoppingBag, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { toneSurfaceClass } from "@/lib/theme/tone-surface"
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
          <Card
            key={kpi.id}
            className={cn("border-0 shadow-sm ring-0", toneSurfaceClass[kpi.tone])}
          >
            <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-background/70 text-primary">
                <Icon className="size-5" />
              </span>
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold tracking-tight">
                {kpi.value}
                {suffix ? <span className="text-sm font-normal"> {suffix}</span> : null}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
