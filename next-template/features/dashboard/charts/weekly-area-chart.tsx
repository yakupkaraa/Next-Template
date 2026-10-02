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
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          fill="var(--chart-1)"
          fillOpacity={0.16}
        />
      </AreaChart>
    </ChartContainer>
  )
}
