"use client"

import { InsightsScreen } from "./screen"
import type { InsightLocale } from "../constants/insights"

export function InsightsPageClient({ locale }: { locale: InsightLocale }) {
  return <InsightsScreen locale={locale} />
}
