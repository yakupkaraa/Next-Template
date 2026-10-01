"use client"

import dynamic from "next/dynamic"
import { DashboardRouteFallback } from "./route-fallback"
import type { DashboardLocale } from "./data"

const DashboardScreen = dynamic(
  () => import("./screen").then((mod) => mod.DashboardScreen),
  { ssr: false, loading: () => <DashboardRouteFallback /> }
)

export function DashboardPageClient({ locale }: { locale: DashboardLocale }) {
  return <DashboardScreen locale={locale} />
}
