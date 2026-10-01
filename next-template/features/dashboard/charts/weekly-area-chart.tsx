"use client"

import { Area, AreaChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { dashboardWeekly } from "../data"

const config = {
  value: { label: "Weekly", color: "var(--chart-1)" },
}

export function WeeklyAreaChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-36 w-full min-h-36">
      <AreaChart data={dashboardWeekly.points} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="weeklyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          fill="url(#weeklyFill)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
