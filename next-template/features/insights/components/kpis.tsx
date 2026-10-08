import { CreditCard, Package, ShoppingBag, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { insightCopy, insightKpiLabels } from "../constants/insights"
import { insightKpis } from "../mocks/insights.mock"
import { Delta } from "./delta"
import type { InsightsSectionProps } from "../utils/section-props"

const kpiIcons = {
  orders: ShoppingBag,
  shipped: Package,
  revenue: CreditCard,
  rating: Star,
} as const

export function InsightsKpis({ locale }: InsightsSectionProps) {
  const vs = insightCopy[locale].vsLastWeek

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {insightKpis.map((kpi) => {
        const Icon = kpiIcons[kpi.id as keyof typeof kpiIcons]
        const label = insightKpiLabels[kpi.id as keyof typeof insightKpiLabels][locale]
        const suffix = "suffix" in kpi ? kpi.suffix : undefined

        return (
          <Card key={kpi.id} className="relative flex flex-col justify-between overflow-hidden rounded-xl shadow-sm">
            <div className={`absolute inset-x-0 top-0 h-1 ${kpi.bar}`} />
            <CardContent className="flex flex-col justify-between gap-4 py-5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold tracking-tight tabular-nums">
                    {kpi.value}
                    {suffix ? (
                      <span className="text-sm font-normal text-muted-foreground"> {suffix}</span>
                    ) : null}
                  </p>
                </div>
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${kpi.iconBox}`}>
                  <Icon className="size-5" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Delta value={kpi.delta} direction={kpi.direction} pill />
                  <span className="text-xs text-muted-foreground">{vs}</span>
                </div>
                <svg className="h-6 w-14 shrink-0" fill="none" viewBox="0 0 56 24" aria-hidden>
                  <path
                    d={kpi.spark}
                    stroke={kpi.sparkColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
