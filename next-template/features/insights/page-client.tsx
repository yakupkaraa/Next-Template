"use client"

import dynamic from "next/dynamic"
import { InsightsRouteFallback } from "./route-fallback"
import type { InsightLocale } from "./data"

const InsightsScreen = dynamic(
  () => import("./screen").then((mod) => mod.InsightsScreen),
  { ssr: false, loading: () => <InsightsRouteFallback /> }
)

export function InsightsPageClient({ locale }: { locale: InsightLocale }) {
  return <InsightsScreen locale={locale} />
}
