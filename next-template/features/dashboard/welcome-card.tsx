"use client"

import { useMemo } from "react"
import { ArrowRight, CloudSun, Moon, Sun, Sunset } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  dashboardVisitChartConfig,
  dashboardVisitSegments,
  dashboardWelcome,
  type DashboardLocale,
} from "./data"

function greetingKey(hour: number) {
  if (hour >= 5 && hour < 12) return "greetingMorning" as const
  if (hour >= 12 && hour < 17) return "greetingAfternoon" as const
  if (hour >= 17 && hour < 22) return "greetingEvening" as const
  return "greetingNight" as const
}

function GreetingIcon({ hour }: { hour: number }) {
  if (hour >= 5 && hour < 12) return <Sun className="size-5 text-muted-foreground" aria-hidden />
  if (hour >= 12 && hour < 17) return <CloudSun className="size-5 text-muted-foreground" aria-hidden />
  if (hour >= 17 && hour < 22) return <Sunset className="size-5 text-muted-foreground" aria-hidden />
  return <Moon className="size-5 text-muted-foreground" aria-hidden />
}

function WelcomeGreeting({ locale }: { locale: DashboardLocale }) {
  const copy = dashboardWelcome[locale]
  const hour = useMemo(() => new Date().getHours(), [])
  const greeting = copy[greetingKey(hour)]

  return (
    <Card className="h-full w-full">
      <CardContent className="flex h-full flex-col justify-center gap-2 py-4">
        <h2 className="flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          <span>
            {greeting}, {copy.userName}
          </span>
          <GreetingIcon hour={hour} />
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          {copy.hint}
        </p>
        <div>
          <Button type="button" size="sm" className="rounded-full">
            {copy.cta}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function WelcomeVisitChart({ locale }: { locale: DashboardLocale }) {
  const copy = dashboardWelcome[locale]
  const fills = ["var(--color-web)", "var(--color-mobile)", "var(--color-other)"] as const

  return (
    <Card className="h-full w-full">
      <CardHeader className="shrink-0 py-3 pb-0">
        <CardTitle className="text-sm font-medium">{copy.visitChartTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-1 pb-4 pt-1">
        <ChartContainer config={dashboardVisitChartConfig} className="mx-auto aspect-square h-28 w-full max-w-32">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="key" />} />
            <Pie
              data={dashboardVisitSegments}
              dataKey="value"
              nameKey="key"
              innerRadius={34}
              outerRadius={50}
              strokeWidth={2}
              stroke="var(--background)"
            >
              {dashboardVisitSegments.map((_, index) => (
                <Cell key={dashboardVisitSegments[index].key} fill={fills[index % fills.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <p className="text-center text-xs text-muted-foreground">
          <span className="text-lg font-semibold text-foreground">{copy.visitTotal}</span>
          <span className="ml-1">{copy.visitTotalLabel}</span>
        </p>
      </CardContent>
    </Card>
  )
}

export function WelcomeSection({ locale }: { locale: DashboardLocale }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">
      <div className="flex lg:col-span-8">
        <WelcomeGreeting locale={locale} />
      </div>
      <div className="flex lg:col-span-4">
        <WelcomeVisitChart locale={locale} />
      </div>
    </div>
  )
}
