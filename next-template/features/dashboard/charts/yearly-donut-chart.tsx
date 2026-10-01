"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { dashboardYearly } from "../data"

const slices = [
  { key: "thisYear", value: dashboardYearly.thisYear, color: "var(--chart-1)" },
  { key: "prevYear", value: dashboardYearly.prevYear, color: "var(--chart-2)" },
]

const config = {
  thisYear: { label: "This", color: "var(--chart-1)" },
  prevYear: { label: "Prev", color: "var(--chart-2)" },
}

export function YearlyDonutChart() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square h-28 w-28">
      <PieChart>
        <Pie
          data={slices}
          dataKey="value"
          nameKey="key"
          innerRadius={34}
          outerRadius={48}
          strokeWidth={0}
          startAngle={90}
          endAngle={-270}
        >
          {slices.map((slice) => (
            <Cell key={slice.key} fill={slice.color} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
