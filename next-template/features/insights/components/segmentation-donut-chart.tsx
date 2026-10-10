"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { insightSegments } from "../mocks/insights.mock"

export function SegmentationDonutChart() {
  const config = Object.fromEntries(
    insightSegments.map((s) => [s.key, { label: s.label, color: s.color }])
  )

  return (
    <ChartContainer config={config} className="mx-auto aspect-square h-44 w-full max-w-44">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="key" />} />
        <Pie
          data={insightSegments}
          dataKey="value"
          nameKey="key"
          innerRadius={48}
          outerRadius={66}
          strokeWidth={8}
          stroke="var(--background)"
        >
          {insightSegments.map((seg) => (
            <Cell key={seg.key} fill={seg.color} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
