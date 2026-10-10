"use client"

import { Bar, BarChart, Cell } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export function MiniSalesBars({
  data,
}: {
  data: { v: number; highlight?: boolean }[]
}) {
  return (
    <ChartContainer
      config={{
        v: {
          label: "Sales",
          color: "color-mix(in oklch, var(--primary-foreground) 30%, transparent)",
        },
      }}
      className="aspect-auto h-24 w-full !bg-transparent [&_.recharts-surface]:bg-transparent"
    >
      <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="v" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                entry.highlight
                  ? "var(--primary-foreground)"
                  : "color-mix(in oklch, var(--primary-foreground) 30%, transparent)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
