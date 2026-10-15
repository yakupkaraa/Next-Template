"use client"

import { InsightsScreen } from "./screen"
import type { InsightLocale } from "../types/insights"

export function InsightsPageClient({ locale }: { locale: InsightLocale }) {
  return <InsightsScreen locale={locale} />
}
