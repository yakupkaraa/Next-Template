"use client"

import { Line, LineChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export function SparklineChart({
  data,
  heightClass = "h-16",
}: {
  data: { label: string; value: number }[]
  heightClass?: string
}) {
  const config = {
    value: { label: "Trend", color: "var(--chart-1)" },
  }

  return (
    <ChartContainer config={config} className={`aspect-auto w-full min-h-12 ${heightClass}`}>
      <LineChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
