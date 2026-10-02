import { UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { MiniSalesBars, TotalSalesLineChart } from "./chart-loaders"
import { insightCopy, insightMonthly, insightTotalSales } from "./data"
import { Delta, type InsightsSectionProps } from "./utils"

export function InsightsHero({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]
  const monthlyBars = insightMonthly.bars.map((value, index) => ({
    v: value,
    highlight: index === insightMonthly.bars.length - 1,
  }))
  const lastPoint = insightTotalSales.points[insightTotalSales.points.length - 1]

  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-12">
      <Card className="relative min-w-0 rounded-xl shadow-sm lg:col-span-8">
        <CardHeader className="gap-1 pb-0">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">{text.totalSales}</p>
              <div className="flex flex-wrap items-baseline gap-2.5">
                <p className="text-[28px] leading-8 font-bold tracking-tight tabular-nums">
                  {insightTotalSales.amount}
                </p>
                <Delta value={insightTotalSales.delta} direction="up" pill />
                <span className="text-xs text-muted-foreground">{text.vsLastMonth}</span>
              </div>
            </div>
            <ToggleGroup
              value={[text.intervals[1] ?? text.intervals[0]]}
              spacing={0}
              className="self-start rounded-lg bg-muted p-1"
            >
              {text.intervals.map((label) => (
                <ToggleGroupItem
                  key={label}
                  value={label}
                  className="h-auto rounded-md px-2.5 py-1 text-xs text-muted-foreground data-[pressed]:bg-card data-[pressed]:font-semibold data-[pressed]:text-primary data-[pressed]:shadow-sm"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent className="relative pt-2">
          <div className="absolute top-0 right-6 hidden items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 shadow-md sm:flex">
            <span className="size-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold">{insightTotalSales.tooltipMonth[locale]}:</span>
            <span className="text-xs tabular-nums">{insightTotalSales.amount}</span>
            <span className="text-xs font-bold text-primary">(+{insightTotalSales.delta}%)</span>
          </div>
          <TotalSalesLineChart data={insightTotalSales.points} />
          <div className="flex justify-between px-1 pt-1 text-xs tabular-nums text-muted-foreground">
            {insightTotalSales.points.map((point) => (
              <span
                key={point.label}
                className={point.label === lastPoint?.label ? "font-semibold text-primary" : undefined}
              >
                {point.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="relative flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-xl bg-primary py-0 text-primary-foreground shadow-sm ring-0 lg:col-span-4">
        <CardHeader className="relative z-10 gap-1 px-5 pt-5 pb-2">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-sm font-medium text-primary-foreground/80">
                {text.monthlySales}
              </CardTitle>
              <p className="text-[28px] leading-8 font-bold tracking-tight tabular-nums">
                {insightMonthly.value}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs text-primary-foreground/80">
                <Delta value={insightMonthly.delta} direction="up" onSurface="primary" pill />
                {text.sinceMonth}
              </p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/20 text-primary-foreground shadow-sm backdrop-blur-md">
              <UserPlus className="size-5" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 mt-auto px-5 pt-4 pb-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-[11px] font-semibold tracking-wider text-primary-foreground/80 uppercase">
              {text.last7Weeks}
            </span>
            <span className="text-xs font-semibold tabular-nums">
              {text.thisWeek}: {insightMonthly.weekValue}
            </span>
          </div>
          <MiniSalesBars data={monthlyBars} />
        </CardContent>
      </Card>
    </div>
  )
}
