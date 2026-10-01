import { Card, CardContent } from "@/components/ui/card"
import { insightKpiLabels, insightKpis } from "./data"
import { Delta, kpiIcons } from "./utils"

export function InsightsKpis() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {insightKpis.map((kpi) => {
        const Icon = kpiIcons[kpi.id as keyof typeof kpiIcons]
        const label = insightKpiLabels[kpi.id as keyof typeof insightKpiLabels]
        const suffix = "suffix" in kpi ? kpi.suffix : undefined

        return (
          <Card key={kpi.id} className="shadow-sm">
            <CardContent className="flex items-start justify-between gap-3 py-4">
              <div className="min-w-0 space-y-1">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold tracking-tight">
                  {kpi.value}
                  {suffix ? (
                    <span className="text-base font-medium text-muted-foreground">{suffix}</span>
                  ) : null}
                </p>
                <Delta value={kpi.delta} direction={kpi.direction} />
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
