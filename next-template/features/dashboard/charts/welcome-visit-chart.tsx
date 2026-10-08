"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { dashboardVisit } from "../mocks/dashboard.mock"

const config = Object.fromEntries(
  dashboardVisit.segments.map((s) => [s.key, { label: s.key, color: s.color }])
)

export function WelcomeVisitChart() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square h-28 w-full max-w-32">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="key" />} />
        <Pie
          data={[...dashboardVisit.segments]}
          dataKey="value"
          nameKey="key"
          innerRadius={34}
          outerRadius={48}
          strokeWidth={2}
          stroke="var(--background)"
        >
          {dashboardVisit.segments.map((seg) => (
            <Cell key={seg.key} fill={seg.color} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
