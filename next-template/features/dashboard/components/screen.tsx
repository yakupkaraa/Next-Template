"use client"

import {
  Bookmark,
  Briefcase,
  DollarSign,
  FolderKanban,
  MessageCircle,
  MonitorPlay,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "cn"
import {
  MiniStatBars,
  RevenueBarsChart,
  SalaryBarChart,
  SparklineChart,
  WeeklyAreaChart,
  YearlyDonutChart,
} from "./chart-loaders"
import { WelcomeSection } from "./welcome-card"
import { DashboardPageHeader } from "./page-header"
import {
  dashboardBestSellers,
  dashboardCopy,
  dashboardCustomersSpark,
  dashboardKpis,
  dashboardMiniStats,
  dashboardMonthly,
  dashboardPriorityLabels,
  dashboardProjectsBars,
  dashboardProjectsTable,
  dashboardPromoPeople,
  dashboardRevenue,
  dashboardSalary,
  dashboardWeekly,
  dashboardYearly,
  type DashboardLocale,
  type ProjectPriority,
} from "../data"

const kpiIcons = [Users, Briefcase, FolderKanban, Bookmark, MessageCircle, Share2] as const

const kpiToneClass: Record<(typeof dashboardKpis)[number]["tone"], string> = {
  "chart-1": "bg-[color-mix(in_oklch,var(--chart-1)_16%,var(--card))] text-primary",
  "chart-2": "bg-[color-mix(in_oklch,var(--chart-2)_18%,var(--card))] text-primary",
  "chart-3": "bg-[color-mix(in_oklch,var(--chart-3)_18%,var(--card))] text-primary",
  "chart-4": "bg-[color-mix(in_oklch,var(--chart-4)_16%,var(--card))] text-primary",
  "chart-5": "bg-[color-mix(in_oklch,var(--chart-5)_16%,var(--card))] text-primary",
  primary: "bg-primary/10 text-primary",
}

const priorityTone: Record<ProjectPriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/10 text-primary",
  high: "bg-secondary text-secondary-foreground",
  veryHigh: "bg-destructive/10 text-destructive",
}

function Delta({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
      <TrendingUp className="size-3" />+{value}%
    </span>
  )
}

export function DashboardScreen({ locale }: { locale: DashboardLocale }) {
  const text = dashboardCopy[locale]

  return (
    <DensityBoard>
      <DashboardPageHeader locale={locale} />
      <WelcomeSection locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {dashboardKpis.map((kpi, index) => {
          const Icon = kpiIcons[index]
          return (
            <Card
              key={text.kpis[index]}
              className={cn("border-0 shadow-sm ring-0", kpiToneClass[kpi.tone])}
            >
              <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-background/70 text-primary">
                  <Icon className="size-5" />
                </span>
                <p className="text-xs font-medium text-muted-foreground">{text.kpis[index]}</p>
                <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
              </CardContent>
            </Card>
          )
        })}
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
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Delta value={dashboardYearly.delta} />
                  {text.lastYear}
                </p>
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

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{text.monthlyTitle}</CardTitle>
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <DollarSign className="size-4" />
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-bold tracking-tight">{dashboardMonthly.amount}</p>
              <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Delta value={dashboardMonthly.delta} />
                {text.lastYear}
              </p>
              <SparklineChart data={[...dashboardMonthly.points]} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-12">
        <Card className="min-w-0 shadow-sm lg:col-span-3 lg:row-span-2">
          <CardHeader className="pb-2">
            <CardTitle>{text.salaryTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">{text.salaryHint}</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <SalaryBarChart />
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-sm bg-muted-foreground/30" />
                <div>
                  <p className="text-xs text-muted-foreground">{text.salary}</p>
                  <p className="font-semibold">{dashboardSalary.salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-sm bg-chart-1" />
                <div>
                  <p className="text-xs text-muted-foreground">{text.profit}</p>
                  <p className="font-semibold">{dashboardSalary.profit}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 shadow-sm lg:col-span-3">
          <CardContent className="space-y-2 py-5">
            <p className="text-sm text-muted-foreground">{text.customers}</p>
            <p className="text-2xl font-bold tracking-tight">{dashboardMiniStats.customers.value}</p>
            <Delta value={dashboardMiniStats.customers.delta} />
            <SparklineChart data={[...dashboardCustomersSpark]} heightClass="h-14" />
          </CardContent>
        </Card>

        <Card className="min-w-0 shadow-sm lg:col-span-3">
          <CardContent className="space-y-2 py-5">
            <p className="text-sm text-muted-foreground">{text.projects}</p>
            <p className="text-2xl font-bold tracking-tight">{dashboardMiniStats.projects.value}</p>
            <Delta value={dashboardMiniStats.projects.delta} />
            <MiniStatBars data={[...dashboardProjectsBars]} />
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden border-0 bg-primary py-0 text-primary-foreground shadow-md ring-0 lg:col-span-3 lg:row-span-2 dark:bg-card dark:text-card-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-foreground dark:text-card-foreground">
              {text.bestTitle}
            </CardTitle>
            <p className="text-sm text-primary-foreground/80 dark:text-muted-foreground">
              {text.bestHint}
            </p>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="flex h-28 items-center justify-center rounded-xl bg-primary-foreground/10 dark:bg-muted">
              <MonitorPlay className="size-12 text-primary-foreground dark:text-primary" />
            </div>
            {dashboardBestSellers.map((item) => (
              <div
                key={item.name}
                className="space-y-2 rounded-xl bg-primary-foreground/10 p-3 dark:bg-muted"
              >
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium">{item.name}</span>
                  <span className="shrink-0 opacity-80">{item.share}%</span>
                </div>
                <p className="text-xs opacity-80">{item.price}</p>
                <div className="h-1.5 overflow-hidden rounded-full bg-primary-foreground/20 dark:bg-background">
                  <div
                    className="h-full rounded-full bg-primary-foreground dark:bg-primary"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="min-w-0 shadow-sm lg:col-span-6">
          <CardContent className="flex items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Users className="size-7" />
              </span>
              <div>
                <p className="font-semibold">{text.promoTitle}</p>
                <p className="text-sm text-muted-foreground">{text.promoHint}</p>
                <p className="pt-1 text-xs text-muted-foreground">{text.promoDate}</p>
              </div>
            </div>
            <div className="flex -space-x-2">
              {dashboardPromoPeople.map((initials) => (
                <Avatar key={initials} size="sm" className="ring-2 ring-background">
                  <AvatarFallback className="bg-primary/15 text-[10px] text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-12">
        <Card className="min-w-0 shadow-sm lg:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle>{text.weeklyTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">{text.weeklyHint}</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <WeeklyAreaChart />
            <ul className="space-y-3">
              {dashboardWeekly.items.map((item) => (
                <li key={item.title} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className="flex size-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in oklch, var(--${item.tone}) 18%, var(--card))`,
                        color: "var(--primary)",
                      }}
                    >
                      <Share2 className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.name}</p>
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-primary">+{item.delta}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="min-w-0 shadow-sm lg:col-span-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>{text.tableTitle}</CardTitle>
                <p className="text-sm text-muted-foreground">{text.tableHint}</p>
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
          <CardContent className="overflow-x-auto px-0 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">{text.assigned}</TableHead>
                  <TableHead>{text.project}</TableHead>
                  <TableHead>{text.priority}</TableHead>
                  <TableHead className="pr-6 text-right">{text.budget}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardProjectsTable.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {row.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{row.name}</p>
                          <p className="text-xs text-muted-foreground">{row.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{row.project}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={priorityTone[row.priority]}>
                        {dashboardPriorityLabels[row.priority][locale]}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right font-medium">{row.budget}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DensityBoard>
  )
}
