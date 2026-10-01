"use client"

import { Bar, BarChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export function MiniSalesBars({ data }: { data: { v: number }[] }) {
  return (
    <ChartContainer
      config={{
        v: {
          label: "Sales",
          color: "color-mix(in oklch, var(--insights-card-deep-foreground) 78%, transparent)",
        },
      }}
      className="aspect-auto h-24 w-full !bg-transparent [&_.recharts-surface]:bg-transparent"
    >
      <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="v" fill="var(--color-v)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
