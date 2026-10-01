"use client"

import { CartesianGrid, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const config = {
  value: { label: "Sales", color: "var(--chart-1)" },
}

export function TotalSalesLineChart({
  data,
}: {
  data: { label: string; value: number }[]
}) {
  return (
    <ChartContainer config={config} className="aspect-auto h-36 w-full min-h-36">
      <LineChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
