"use client"

import { DashboardScreen } from "./screen"
import type { DashboardLocale } from "../types/dashboard"

export function DashboardPageClient({ locale }: { locale: DashboardLocale }) {
  return <DashboardScreen locale={locale} />
}
