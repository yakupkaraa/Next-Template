import {
  Bookmark,
  Briefcase,
  FolderKanban,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DensityBoard } from "@/components/layout/density-board"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { KpiStatCard } from "@/components/shared/kpi-stat-card"
import {
  MiniStatBars,
  RevenueBarsChart,
  YearlyDonutChart,
} from "./charts/chart-loaders"
import { WelcomeSection } from "./welcome-card"
import { DashboardPageHeader } from "./page-header"
import { dashboardCopy } from "../constants/dashboard"
import type { DashboardLocale } from "../types/dashboard"
import {
  dashboardKpis,
  dashboardMiniStats,
  dashboardProjectsBars,
  dashboardRevenue,
  dashboardYearly,
} from "../mocks/dashboard.mock"

const kpiIcons = [Users, Briefcase, FolderKanban, Bookmark, MessageCircle, Share2] as const

export function DashboardScreen({ locale }: { locale: DashboardLocale }) {
  const text = dashboardCopy[locale]

  return (
    <DensityBoard>
      <DashboardPageHeader locale={locale} />
      <WelcomeSection locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {dashboardKpis.map((kpi, index) => (
          <KpiStatCard
            key={text.kpis[index]}
            icon={kpiIcons[index]}
            label={text.kpis[index]}
            value={kpi.value}
            tone={kpi.tone}
          />
        ))}
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-12">
        <Card className="min-w-0 shadow-sm lg:col-span-8">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>{text.revenueTitle}</CardTitle>
                <p className="text-sm text-muted-foreground">{text.revenueHint}</p>
              </div>
              <Select defaultValue="2025">
                <SelectTrigger className="h-8 w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">{text.year}</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 pt-0 lg:grid-cols-[minmax(0,1fr)_220px]">
            <RevenueBarsChart />
            <div className="flex flex-col justify-center gap-4">
              <div>
                <p className="text-2xl font-bold tracking-tight">{dashboardRevenue.total}</p>
                <p className="text-xs text-muted-foreground">{text.totalEarnings}</p>
              </div>
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm">
                  <span className="size-2.5 rounded-full bg-chart-1" />
                  {text.earningsMonth}
                </p>
                <p className="pl-4 font-semibold">{dashboardRevenue.earnings}</p>
              </div>
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm">
                  <span className="size-2.5 rounded-full bg-chart-2" />
                  {text.expenseMonth}
                </p>
                <p className="pl-4 font-semibold">{dashboardRevenue.expense}</p>
              </div>
              <Button type="button" className="w-fit rounded-full">
                {text.viewReport}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid min-w-0 gap-4 lg:col-span-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>{text.yearlyTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3 pt-0">
              <div className="space-y-2">
                <p className="text-2xl font-bold tracking-tight">{dashboardYearly.amount}</p>
                <div className="space-y-1 pt-2 text-xs">
                  <p className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-chart-1" />
                    {text.thisYear}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-chart-2" />
                    {text.prevYear}
                  </p>
                </div>
              </div>
              <YearlyDonutChart />
            </CardContent>
          </Card>

          <Card className="min-w-0 shadow-sm">
            <CardContent className="space-y-2 py-5">
              <p className="text-sm text-muted-foreground">{text.projects}</p>
              <p className="text-2xl font-bold tracking-tight">{dashboardMiniStats.projects.value}</p>
              <MiniStatBars data={[...dashboardProjectsBars]} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DensityBoard>
  )
}
