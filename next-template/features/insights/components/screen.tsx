"use client"

import { DensityBoard } from "@/components/layout/density-board"
import { InsightsAside } from "./aside"
import { InsightsChartsRow } from "./charts-row"
import type { InsightLocale } from "../data"
import { InsightsHero } from "./hero"
import { InsightsKpis } from "./kpis"
import { InsightsOrders } from "./orders"

import { InsightsPageHeader } from "./page-header"
import { InsightsWelcome } from "./welcome"

export function InsightsScreen({ locale }: { locale: InsightLocale }) {
  return (
    <DensityBoard>
      <InsightsPageHeader locale={locale} />
      <InsightsWelcome locale={locale} />
      <InsightsHero locale={locale} />
      <InsightsKpis locale={locale} />
      <InsightsChartsRow locale={locale} />
      <InsightsOrders locale={locale} />
      <InsightsAside locale={locale} />
    </DensityBoard>
  )
}
