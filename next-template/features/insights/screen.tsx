"use client"

import { DensityBoard } from "@/components/layout/density-board"
import { InsightsAside } from "./aside"
import { InsightsChartsRow } from "./charts-row"
import type { InsightLocale } from "./data"
import { InsightsHero } from "./hero"
import { InsightsKpis } from "./kpis"
import { InsightsOrders } from "./orders"

export function InsightsScreen({ locale }: { locale: InsightLocale }) {
  return (
    <DensityBoard className="gap-3">
      <InsightsHero locale={locale} />
      <InsightsKpis />
      <InsightsChartsRow locale={locale} />
      <InsightsOrders locale={locale} />
      <InsightsAside locale={locale} />
    </DensityBoard>
  )
}
