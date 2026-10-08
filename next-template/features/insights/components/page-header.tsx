import { AnalyticsPageHeader } from "@/components/shared/analytics-page-header"
import { insightCopy } from "../constants/insights"
import type { InsightsSectionProps } from "../utils/section-props"

export function InsightsPageHeader({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]

  return (
    <AnalyticsPageHeader
      title={text.pageTitle}
      last30Days={text.last30Days}
      filter={text.filter}
      download={text.download}
    />
  )
}
