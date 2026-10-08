import { MoreVertical } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrderOverviewChart, SegmentationDonutChart, UserActivityChart } from "./chart-loaders"
import { insightCopy } from "../constants/insights"
import {
  insightActivityTotals,
  insightOrderOverview,
  insightSegmentTotal,
  insightSegments,
} from "../mocks/insights.mock"
import type { InsightsSectionProps } from "../utils/section-props"

export function InsightsChartsRow({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]

  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-3">
      <Card className="flex min-w-0 flex-col justify-between rounded-xl shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-base font-semibold">{text.segmentation}</CardTitle>
              <span className="text-xs text-muted-foreground">{text.segmentHint}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                nativeButton
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Seçenekler"
                    className="text-muted-foreground"
                  />
                }
              >
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{text.thisWeek}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between space-y-4 pt-0">
          <div className="relative mx-auto flex h-44 w-full max-w-44 items-center justify-center">
            <SegmentationDonutChart />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold tabular-nums">
                {insightSegmentTotal.toLocaleString(locale === "tr" ? "tr-TR" : "en-US")}
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                {text.total}
              </span>
            </div>
          </div>
          <ul className="space-y-1">
            {insightSegments.map((seg, index) => (
              <li
                key={seg.key}
                className={cn(
                  "flex items-center justify-between gap-2 py-1 text-sm",
                  index < insightSegments.length - 1 && "border-b border-muted"
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="truncate font-medium">{seg.label}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3 tabular-nums">
                  <span className="text-muted-foreground">
                    {seg.value.toLocaleString(locale === "tr" ? "tr-TR" : "en-US")}{" "}
                    <span className="text-xs text-muted-foreground/70">
                      (%{Math.round((seg.value / insightSegmentTotal) * 100)})
                    </span>
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      seg.delta >= 0 ? "text-(--trend-up)" : "text-destructive"
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

      <Card className="flex min-w-0 flex-col justify-between rounded-xl shadow-sm">
        <CardHeader className="gap-3 pb-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <CardTitle className="text-base font-semibold">{text.orderOverview}</CardTitle>
            <Select defaultValue="2025">
              <SelectTrigger className="h-7 w-auto gap-1 rounded-md bg-muted px-2.5 text-xs font-semibold">
                <SelectValue placeholder={text.year} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">{text.year}</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col rounded-lg bg-muted/60 p-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-muted-foreground">{text.netRevenue}</span>
              </div>
              <span className="mt-0.5 text-base font-bold tabular-nums">{insightOrderOverview.salesTotal}</span>
            </div>
            <div className="flex flex-col rounded-lg bg-muted/60 p-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-chart-3" />
                <span className="text-xs font-medium text-muted-foreground">{text.opExpense}</span>
              </div>
              <span className="mt-0.5 text-base font-bold tabular-nums">{insightOrderOverview.ordersTotal}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <OrderOverviewChart />
          <div className="flex items-center justify-center gap-6 pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-primary" />
              {text.netRevenue}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-chart-3" />
              {text.opExpense}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="flex min-w-0 flex-col justify-between rounded-xl shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">{text.userActivity}</CardTitle>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-primary">
              {text.thisWeek}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between space-y-3 pt-0">
          <UserActivityChart />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">{text.viewed}:</span>
              <span className="font-semibold tabular-nums">{insightActivityTotals.viewed}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-chart-5" />
              <span className="text-muted-foreground">{text.checkout}:</span>
              <span className="font-semibold tabular-nums">{insightActivityTotals.checkout}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
