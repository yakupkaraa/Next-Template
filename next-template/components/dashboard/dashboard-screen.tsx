"use client"

import {
  ChevronDown,
  Contact,
  FileText,
  Mail,
  TrendingUp,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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
    <ChartContainer config={dashboardWorkflowConfig} className="aspect-auto h-28 w-full">
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
    <ChartContainer config={dashboardMarketingConfig} className="aspect-auto h-28 w-full">
      <BarChart data={dashboardMarketing} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" hide />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={3} />
      </BarChart>
    </ChartContainer>
  )
}

export function DashboardScreen({ locale }: { locale: DashboardLocale }) {
  const text = dashboardCopy[locale]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">{text.title}</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {text.document}
            </CardTitle>
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <FileText className="size-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-3xl font-semibold tracking-tight">{dashboardFigures.document}</p>
            <Trend label={text.since} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {text.contact}
            </CardTitle>
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <Contact className="size-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-3xl font-semibold tracking-tight">{dashboardFigures.contact}</p>
            <Trend label={text.since} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {text.email}
            </CardTitle>
            <span className="flex size-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <Mail className="size-4" />
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-3xl font-semibold tracking-tight">{dashboardFigures.email}</p>
            <Trend label={text.since} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{text.workflow}</CardTitle>
            <span className="inline-flex items-center gap-0.5 text-sm font-medium text-emerald-600">
              <TrendingUp className="size-3.5" />
              {dashboardTrend}
            </span>
          </CardHeader>
          <CardContent>
            <WorkflowChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{text.marketing}</CardTitle>
            <span className="inline-flex items-center gap-0.5 text-sm font-medium text-emerald-600">
              <TrendingUp className="size-3.5" />
              {dashboardTrend}
            </span>
          </CardHeader>
          <CardContent>
            <MarketingChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <CardTitle>{text.document}</CardTitle>
              <p className="text-sm text-muted-foreground">{text.tracking}</p>
            </div>
            <Button type="button" variant="outline" size="sm">
              {text.weekly}
              <ChevronDown />
            </Button>
          </CardHeader>
          <CardContent>
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
                      <span
                        className={
                          row.status === "sent"
                            ? "inline-flex rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                            : "inline-flex rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700"
                        }
                      >
                        {row.status === "sent" ? text.sent : text.pending}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{text.popular}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {dashboardProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between gap-3">
                  <span>{product.name}</span>
                  <span className="text-muted-foreground">{product.price}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{text.chat}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {dashboardChats.map((person) => (
                <div key={person.name} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-slate-900 text-xs text-white">
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
        </div>
      </div>
    </div>
  )
}
