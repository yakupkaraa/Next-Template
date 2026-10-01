import { cn } from "cn"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrderOverviewChart, SegmentationDonutChart, UserActivityChart } from "./chart-loaders"
import {
  insightActivityTotals,
  insightCopy,
  insightOrderOverview,
  insightSegmentTotal,
  insightSegments,
} from "./data"
import type { InsightsSectionProps } from "./utils"

export function InsightsChartsRow({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]

  return (
    <div className="grid items-stretch gap-3 lg:grid-cols-12">
      <Card className="min-w-0 shadow-sm lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{text.segmentation}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="relative mx-auto flex h-44 w-full max-w-44 items-center justify-center">
            <SegmentationDonutChart />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-muted-foreground">{text.total}</span>
              <span className="text-lg font-bold">{insightSegmentTotal.toLocaleString()}</span>
            </div>
          </div>
          <ul className="space-y-2.5">
            {insightSegments.map((seg) => (
              <li key={seg.key} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="truncate">{seg.label}</span>
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {seg.value.toLocaleString()}{" "}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      seg.delta >= 0 ? "text-primary" : "text-destructive"
                    )}
                  >
                    {seg.delta >= 0 ? "+" : ""}
                    {seg.delta}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="min-w-0 shadow-sm lg:col-span-6">
        <CardHeader className="gap-3 pb-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <CardTitle className="text-base">{text.orderOverview}</CardTitle>
            <Select defaultValue="2025">
              <SelectTrigger className="h-8 w-24">
                <SelectValue placeholder={text.year} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">{text.year}</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-muted-foreground">{text.totalSales}</p>
              <p className="text-lg font-semibold">{insightOrderOverview.salesTotal}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{text.orders}</p>
              <p className="text-lg font-semibold">{insightOrderOverview.ordersTotal}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <OrderOverviewChart />
        </CardContent>
      </Card>

      <Card className="min-w-0 shadow-sm lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{text.userActivity}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <UserActivityChart />
          <div className="flex flex-wrap justify-center gap-4 border-t pt-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-chart-2" />
              {text.viewed} {insightActivityTotals.viewed}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-chart-1" />
              {text.checkout} {insightActivityTotals.checkout}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
