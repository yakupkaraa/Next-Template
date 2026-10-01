import { LineChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiniSalesBars, TotalSalesLineChart } from "./chart-loaders"
import { insightCopy, insightGrowth, insightMonthly, insightTotalSales } from "./data"
import { Delta, type InsightsSectionProps } from "./utils"

export function InsightsHero({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]
  const monthlyBars = insightMonthly.bars.map((value) => ({ v: value }))

  return (
    <div className="grid items-stretch gap-3 lg:grid-cols-12">
      <Card className="min-w-0 shadow-sm lg:col-span-5">
        <CardHeader className="gap-1 pb-0">
          <p className="text-xs text-muted-foreground">{text.storeHint}</p>
          <CardTitle className="text-base font-semibold">{text.totalSales}</CardTitle>
          <div className="flex flex-wrap items-end justify-between gap-2 pt-1">
            <p className="text-3xl font-bold tracking-tight">{insightTotalSales.amount}</p>
            <Delta value={insightTotalSales.delta} direction="up" />
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <TotalSalesLineChart data={insightTotalSales.points} />
        </CardContent>
      </Card>

      <Card className="insights-surface-card flex min-h-[12rem] flex-col gap-0 overflow-hidden !bg-[var(--insights-card-deep)] !py-0 !text-[var(--insights-card-deep-foreground)] !ring-0 shadow-md lg:col-span-4">
        <CardHeader className="gap-1 px-4 pt-4 pb-2">
          <CardTitle className="text-base font-semibold">{text.monthlySales}</CardTitle>
          <p className="text-2xl font-bold">{insightMonthly.value}</p>
          <p className="insights-muted flex items-center gap-1.5 text-xs">
            <Delta value={insightMonthly.delta} direction="up" onSurface="primary" />
            {text.sinceMonth}
          </p>
        </CardHeader>
        <CardContent className="mt-auto px-2 pb-0 pt-0">
          <MiniSalesBars data={monthlyBars} />
        </CardContent>
      </Card>

      <Card className="insights-soft-card flex min-h-[12rem] flex-col gap-0 overflow-hidden !bg-[var(--insights-card-bright)] !py-0 !text-[var(--insights-card-bright-foreground)] !ring-0 shadow-md lg:col-span-3">
        <CardHeader className="gap-2 rounded-none bg-transparent px-4 pt-4 pb-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold text-[var(--insights-card-bright-foreground)]">
              {text.revenueGrowth}
            </CardTitle>
            <span className="flex size-9 items-center justify-center rounded-full bg-[color-mix(in_oklch,var(--insights-card-bright-foreground)_16%,transparent)]">
              <LineChart className="size-4 text-[var(--insights-card-bright-foreground)]" />
            </span>
          </div>
          <p className="text-4xl font-bold tracking-tight text-[var(--insights-card-bright-foreground)]">
            +{insightGrowth.percent}%
          </p>
          <p className="insights-muted flex items-center gap-1.5 text-xs">
            <Delta value={insightGrowth.delta} direction="up" onSurface="soft" />
            {text.last7Days}
          </p>
        </CardHeader>
      </Card>
    </div>
  )
}
