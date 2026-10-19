import { DensityBoard } from "@/components/layout/density-board"
import { InsightsChartsRow } from "./charts-row"
import type { InsightLocale } from "../types/insights"
import { InsightsHero } from "./hero"
import { InsightsKpis } from "./kpis"
import { InsightsOrders } from "./orders"

import { InsightsPageHeader } from "./page-header"

export function InsightsScreen({ locale }: { locale: InsightLocale }) {
  return (
    <DensityBoard>
      <InsightsPageHeader locale={locale} />
      <InsightsHero locale={locale} />
      <InsightsKpis locale={locale} />
      <InsightsChartsRow locale={locale} />
      <InsightsOrders locale={locale} />
    </DensityBoard>
  )
}
