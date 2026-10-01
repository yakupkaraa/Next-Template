"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { insightOrderOverview } from "../data"

const config = {
  seriesA: { label: "Lorem", color: "var(--chart-1)" },
  seriesB: { label: "Ipsum", color: "var(--chart-2)" },
}

export function OrderOverviewChart() {
  const data = insightOrderOverview.months.map((month, i) => ({
    month,
    seriesA: insightOrderOverview.seriesA[i],
    seriesB: insightOrderOverview.seriesB[i],
  }))

  return (
    <ChartContainer config={config} className="aspect-auto h-56 w-full min-h-56">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="seriesA"
          stroke="var(--color-seriesA)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="seriesB"
          stroke="var(--color-seriesB)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
