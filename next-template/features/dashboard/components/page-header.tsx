import { AnalyticsPageHeader } from "@/components/shared/analytics-page-header"
import { dashboardCopy } from "../constants/dashboard"
import type { DashboardLocale } from "../types/dashboard"

export function DashboardPageHeader({ locale }: { locale: DashboardLocale }) {
  const text = dashboardCopy[locale]

  return (
    <AnalyticsPageHeader
      title={text.pageTitle}
      last30Days={text.last30Days}
      filter={text.filter}
      download={text.download}
    />
  )
}
