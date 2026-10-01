"use client"

import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { insightUserActivity } from "../data"

const config = {
  viewed: { label: "Viewed", color: "var(--chart-2)" },
  checkout: { label: "Checkout", color: "var(--chart-1)" },
}

export function UserActivityChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-52 w-full min-h-52">
      <BarChart data={insightUserActivity} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="viewed" stackId="a" fill="var(--color-viewed)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="checkout" stackId="a" fill="var(--color-checkout)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
