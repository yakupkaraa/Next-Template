"use client"

import { DashboardScreen } from "./screen"
import type { DashboardLocale } from "./data"

export function DashboardPageClient({ locale }: { locale: DashboardLocale }) {
  return <DashboardScreen locale={locale} />
}
