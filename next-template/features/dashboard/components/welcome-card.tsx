"use client"

import { useMemo } from "react"
import { ArrowRight, CloudSun, Moon, Sun, Sunset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WelcomeVisitChart } from "./chart-loaders"
import { dashboardCopy, dashboardVisit, type DashboardLocale } from "../data"

function greetingKey(hour: number) {
  if (hour >= 5 && hour < 12) return "greetingMorning" as const
  if (hour >= 12 && hour < 17) return "greetingAfternoon" as const
  if (hour >= 17 && hour < 22) return "greetingEvening" as const
  return "greetingNight" as const
}

function GreetingIcon({ hour }: { hour: number }) {
  const className = "size-5 text-white/90 dark:text-card-foreground"
  if (hour >= 5 && hour < 12) return <Sun className={className} aria-hidden />
  if (hour >= 12 && hour < 17) return <CloudSun className={className} aria-hidden />
  if (hour >= 17 && hour < 22) return <Sunset className={className} aria-hidden />
  return <Moon className={className} aria-hidden />
}

function WelcomeGreeting({ locale }: { locale: DashboardLocale }) {
  const copy = dashboardCopy[locale]
  const hour = useMemo(() => new Date().getHours(), [])
  const greeting = copy[greetingKey(hour)]

  return (
    <Card className="welcome-accent-card h-full w-full !bg-primary !text-white ring-0 dark:!bg-card dark:!text-card-foreground">
      <CardContent className="flex h-full flex-col justify-center gap-2 py-4">
        <h2 className="flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-white dark:text-card-foreground sm:text-xl">
          <span>
            {greeting}, {copy.welcomeUser}
          </span>
          <GreetingIcon hour={hour} />
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-white/85 dark:text-muted-foreground sm:text-[0.9375rem]">
          {copy.welcomeHint}
        </p>
        <div>
          <Button
            type="button"
            size="sm"
            className="rounded-full bg-white text-primary hover:bg-white/90 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80"
          >
            {copy.welcomeCta}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function WelcomeSection({ locale }: { locale: DashboardLocale }) {
  const copy = dashboardCopy[locale]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">
      <div className="flex lg:col-span-8">
        <WelcomeGreeting locale={locale} />
      </div>
      <div className="flex lg:col-span-4">
        <Card className="h-full w-full shadow-sm">
          <CardContent className="flex h-full items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="text-sm font-medium">{copy.visitTitle}</p>
              <p className="text-2xl font-bold tracking-tight">{dashboardVisit.total}</p>
              <p className="text-xs text-muted-foreground">{copy.visitTotalLabel}</p>
            </div>
            <WelcomeVisitChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
