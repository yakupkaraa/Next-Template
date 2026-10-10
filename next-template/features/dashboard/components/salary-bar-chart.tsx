"use client"

import { Bar, BarChart, Cell, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { dashboardSalary } from "../mocks/dashboard.mock"

const config = {
  value: { label: "Salary", color: "var(--chart-1)" },
}

export function SalaryBarChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-44 w-full min-h-44">
      <BarChart data={dashboardSalary.bars} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={36}>
          {dashboardSalary.bars.map((item, index) => (
            <Cell
              key={item.label}
              fill={
                index === dashboardSalary.highlight
                  ? "var(--chart-1)"
                  : "color-mix(in oklch, var(--muted-foreground) 22%, transparent)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
