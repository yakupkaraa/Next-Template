"use client"

import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { dashboardRevenue } from "../mocks/dashboard.mock"

const config = {
  value: { label: "Value", color: "var(--chart-1)" },
}

export function RevenueBarsChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-56 w-full min-h-56">
      <BarChart data={dashboardRevenue.bars} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={28} />
        <ReferenceLine y={0} stroke="var(--border)" />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" radius={[4, 4, 4, 4]} maxBarSize={18}>
          {dashboardRevenue.bars.map((item) => (
            <Cell
              key={item.label}
              fill={
                item.value >= 0
                  ? "var(--chart-1)"
                  : "color-mix(in oklch, var(--chart-1) 42%, transparent)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
