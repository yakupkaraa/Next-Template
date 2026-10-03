"use client"

import { InsightsScreen } from "./screen"
import type { InsightLocale } from "./data"

export function InsightsPageClient({ locale }: { locale: InsightLocale }) {
  return <InsightsScreen locale={locale} />
}
