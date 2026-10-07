"use client"

import dynamic from "next/dynamic"
import { ChartBlockSkeleton } from "@/components/shared/chart-block-skeleton"

export const RevenueBarsChart = dynamic(
  () => import("../charts/revenue-bars-chart").then((mod) => mod.RevenueBarsChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-56 min-h-56" /> }
)

export const YearlyDonutChart = dynamic(
  () => import("../charts/yearly-donut-chart").then((mod) => mod.YearlyDonutChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="mx-auto h-28 w-28" /> }
)

export const SparklineChart = dynamic(
  () => import("../charts/sparkline-chart").then((mod) => mod.SparklineChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-16" /> }
)

export const SalaryBarChart = dynamic(
  () => import("../charts/salary-bar-chart").then((mod) => mod.SalaryBarChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-44 min-h-44" /> }
)

export const MiniStatBars = dynamic(
  () => import("../charts/mini-stat-bars").then((mod) => mod.MiniStatBars),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-14" /> }
)

export const WeeklyAreaChart = dynamic(
  () => import("../charts/weekly-area-chart").then((mod) => mod.WeeklyAreaChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="h-36 min-h-36" /> }
)

export const WelcomeVisitChart = dynamic(
  () => import("../charts/welcome-visit-chart").then((mod) => mod.WelcomeVisitChart),
  { ssr: false, loading: () => <ChartBlockSkeleton className="mx-auto aspect-square h-28 max-w-32" /> }
)
