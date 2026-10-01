"use client"

import {
  ChevronDown,
  Contact,
  FileText,
  Mail,
  ShoppingBag,
  TrendingUp,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { WelcomeSection } from "./welcome-card"
import {
  dashboardChats,
  dashboardCopy,
  dashboardDocuments,
  dashboardFigures,
  dashboardMarketing,
  dashboardMarketingConfig,
  dashboardProducts,
  dashboardTrend,
  dashboardWorkflow,
  dashboardWorkflowConfig,
  type DashboardLocale,
} from "./data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function Trend({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-0.5 font-medium text-emerald-600">
        <TrendingUp className="size-3" />
        {dashboardTrend}
      </span>
      {label}
    </p>
  )
}

function WorkflowChart() {
  return (
    <ChartContainer config={dashboardWorkflowConfig} className="aspect-auto h-full min-h-16 w-full">
      <LineChart data={dashboardWorkflow} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" hide />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

function MarketingChart() {
  return (
    <ChartContainer config={dashboardMarketingConfig} className="aspect-auto h-full min-h-16 w-full">
      <BarChart data={dashboardMarketing} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" hide />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={3} />
      </BarChart>
    </ChartContainer>
  )
}

function cell(className: string) {
  return `h-full min-h-0 overflow-hidden ${className}`
}

export function DashboardScreen({ locale }: { locale: DashboardLocale }) {
  const text = dashboardCopy[locale]
  const stats = [
    { title: text.document, value: dashboardFigures.document, icon: FileText },
    { title: text.contact, value: dashboardFigures.contact, icon: Contact },
    { title: text.email, value: dashboardFigures.email, icon: Mail },
    { title: text.order, value: dashboardFigures.order, icon: ShoppingBag },
  ]
  const statPlaces = [
    "lg:[grid-column:span_3] lg:[grid-row:3/span_2]",
    "lg:[grid-column:4/span_3] lg:[grid-row:3/span_2]",
    "lg:[grid-column:7/span_3] lg:[grid-row:3/span_2]",
    "lg:[grid-column:10/span_3] lg:[grid-row:3/span_2]",
  ]

  return (
    <div className="mx-auto flex w-[90%] flex-col gap-4">
      <WelcomeSection locale={locale} />
      <div className="grid h-224 min-h-0 grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-12">
      <Card className={cell("lg:[grid-column:span_8] lg:[grid-row:span_2]")}>
        <CardHeader className="py-3">
          <CardTitle>{text.workflow}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-0 flex-1">
          <WorkflowChart />
        </CardContent>
      </Card>

      <Card className={cell("lg:[grid-column:9/span_4] lg:[grid-row:span_2]")}>
        <CardHeader className="py-3">
          <CardTitle>{text.marketing}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-0 flex-1">
          <MarketingChart />
        </CardContent>
      </Card>

      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className={cell(statPlaces[index])}>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-2">
              <div>
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                <Trend label={text.since} />
              </div>
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4" />
              </span>
            </CardContent>
          </Card>
        )
      })}

      <Card className={cell("lg:[grid-column:span_4] lg:[grid-row:5/span_3]")}>
        <CardHeader className="py-3">
          <CardTitle>{text.popular}</CardTitle>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto">
          {dashboardProducts.map((product) => (
            <div key={product.name} className="flex items-center justify-between gap-3">
              <span>{product.name}</span>
              <span className="text-muted-foreground">{product.price}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className={cell("lg:[grid-column:5/span_8] lg:[grid-row:5/span_3]")}>
        <CardHeader className="py-3">
          <CardTitle>{text.chat}</CardTitle>
        </CardHeader>
        <CardContent className="grid min-h-0 flex-1 gap-3 overflow-auto sm:grid-cols-2">
          {dashboardChats.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{person.name}</p>
                <p className="truncate text-xs text-muted-foreground">{person.note}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className={cell("lg:[grid-column:span_9] lg:[grid-row:8/span_5]")}>
        <CardHeader className="py-3">
          <div className="flex flex-col gap-1">
            <CardTitle>{text.document}</CardTitle>
            <p className="text-sm text-muted-foreground">{text.tracking}</p>
          </div>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 overflow-auto px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{text.name}</TableHead>
                <TableHead>{text.file}</TableHead>
                <TableHead>{text.category}</TableHead>
                <TableHead>{text.author}</TableHead>
                <TableHead>{text.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardDocuments.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.file}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        row.status === "sent"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }
                    >
                      {row.status === "sent" ? text.sent : text.pending}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className={cell("lg:[grid-column:10/span_3] lg:[grid-row:8/span_2]")}>
        <CardHeader className="py-3">
          <CardTitle>{text.weekly}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button type="button" variant="outline" size="sm">
            {text.weekly}
            <ChevronDown />
          </Button>
        </CardContent>
      </Card>

      <Card className={cell("lg:[grid-column:10/span_3] lg:[grid-row:10/span_3]")}>
        <CardHeader className="py-3">
          <CardTitle>{text.since}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight">{dashboardTrend}</p>
          <Trend label={text.since} />
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
