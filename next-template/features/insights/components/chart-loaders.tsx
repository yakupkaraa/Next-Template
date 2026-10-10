"use client"

import dynamic from "next/dynamic"
import { ChartBlockSkeleton } from "@/components/shared/chart-block-skeleton"

export const TotalSalesLineChart = dynamic(
  () => import("./total-sales-line-chart").then((mod) => mod.TotalSalesLineChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-56 min-h-56" /> }
)

export const MiniSalesBars = dynamic(
  () => import("./mini-sales-bars").then((mod) => mod.MiniSalesBars),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-20" /> }
)

export const SegmentationDonutChart = dynamic(
  () => import("./segmentation-donut-chart").then((mod) => mod.SegmentationDonutChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="mx-auto aspect-square h-44 max-w-44" /> }
)

export const OrderOverviewChart = dynamic(
  () => import("./order-overview-chart").then((mod) => mod.OrderOverviewChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-36 min-h-36" /> }
)

export const UserActivityChart = dynamic(
  () => import("./user-activity-chart").then((mod) => mod.UserActivityChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-40 min-h-40" /> }
)
