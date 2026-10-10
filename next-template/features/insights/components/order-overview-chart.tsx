"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { insightOrderOverview } from "../mocks/insights.mock"

const config = {
  seriesA: { label: "Gelir", color: "var(--chart-1)" },
  seriesB: { label: "Gider", color: "var(--chart-3)" },
}

export function OrderOverviewChart() {
  const data = insightOrderOverview.months.map((month, i) => ({
    month,
    seriesA: insightOrderOverview.seriesA[i],
    seriesB: insightOrderOverview.seriesB[i],
  }))

  return (
    <ChartContainer config={config} className="aspect-auto h-36 w-full min-h-36">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="seriesA"
          stroke="var(--color-seriesA)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--color-seriesA)", strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="seriesB"
          stroke="var(--color-seriesB)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--color-seriesB)", strokeWidth: 0 }}
        />
      </LineChart>
    </ChartContainer>
  )
}
