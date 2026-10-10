"use client"

import { Area, AreaChart, CartesianGrid } from "recharts"
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
    <ChartContainer config={config} className="aspect-auto h-56 w-full min-h-56">
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 28, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="4 4" className="stroke-border/70" />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2.5}
          fill="var(--chart-1)"
          fillOpacity={0.16}
          dot={false}
          activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ChartContainer>
  )
}
