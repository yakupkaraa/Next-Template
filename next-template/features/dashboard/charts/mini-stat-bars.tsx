"use client"

import { Bar, BarChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export function MiniStatBars({ data }: { data: { label: string; value: number }[] }) {
  const config = {
    value: { label: "Value", color: "var(--chart-1)" },
  }

  return (
    <ChartContainer config={config} className="aspect-auto h-14 w-full min-h-14">
      <BarChart data={data} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
        <Bar dataKey="value" fill="var(--color-value)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
