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
    <Card className="h-full">
      <CardContent className="flex h-full flex-col justify-center gap-3 px-6 py-6 sm:px-8 sm:py-8">
        <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          <span>
            {greeting}, {copy.userName}
          </span>
          <GreetingIcon hour={hour} />
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
          {copy.hint}
        </p>
        <div>
          <Button type="button" size="sm" className="mt-1 rounded-full">
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
    <Card className="h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-medium">{copy.visitChartTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2 pb-6">
        <ChartContainer config={dashboardVisitChartConfig} className="mx-auto aspect-square h-40 w-full max-w-44">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="key" />} />
            <Pie
              data={dashboardVisitSegments}
              dataKey="value"
              nameKey="key"
              innerRadius={48}
              outerRadius={68}
              strokeWidth={2}
              stroke="var(--background)"
            >
              {dashboardVisitSegments.map((_, index) => (
                <Cell key={dashboardVisitSegments[index].key} fill={fills[index % fills.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <p className="text-center text-sm text-muted-foreground">
          <span className="text-2xl font-semibold text-foreground">{copy.visitTotal}</span>
          <span className="ml-1">{copy.visitTotalLabel}</span>
        </p>
      </CardContent>
    </Card>
  )
}

export function WelcomeSection({ locale }: { locale: DashboardLocale }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <WelcomeGreeting locale={locale} />
      </div>
      <div className="lg:col-span-4">
        <WelcomeVisitChart locale={locale} />
      </div>
    </div>
  )
}
