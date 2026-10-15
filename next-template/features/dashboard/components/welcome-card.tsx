"use client"

import { Card, CardContent } from "@/components/ui/card"
import { WelcomeVisitChart } from "./charts/chart-loaders"
import { WelcomeGreeting } from "./welcome-greeting"
import { dashboardCopy } from "../constants/dashboard"
import { dashboardVisit } from "../mocks/dashboard.mock"
import type { DashboardLocale } from "../types/dashboard"

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
