"use client"

import {
  CalendarRange,
  CircleCheck,
  RotateCcw,
  Star,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  insightCapacity,
  insightCopy,
  insightOccupancy,
  insightOccupancyConfig,
  insightPipeline,
  insightPipelineColors,
  insightRates,
  insightRevenue,
  insightRevenueConfig,
  insightReviews,
  insightStats,
  insightStays,
  type InsightLocale,
} from "./data"

const statIcons = {
  reservations: CalendarRange,
  confirmed: CircleCheck,
  refunds: RotateCcw,
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

function Delta({ value, direction }: { value: number; direction: "up" | "down" }) {
  const Icon = direction === "up" ? TrendingUp : TrendingDown
  return (
    <span
      className={
        direction === "up"
          ? "inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600"
          : "inline-flex items-center gap-0.5 text-xs font-medium text-rose-600"
      }
    >
      <Icon className="size-3" />
      {direction === "up" ? "+" : "-"}
      {value.toFixed(1)}%
    </span>
  )
}

type InsightTextKey = keyof (typeof insightCopy)["tr"]

export function InsightsScreen({ locale }: { locale: InsightLocale }) {
  const text = insightCopy[locale]
  const revenue = insightRevenue.points.map((point) => ({
    month: point[locale],
    value: point.value,
  }))

  return (
    <div className="mx-auto flex w-[90%] flex-col gap-4">
      <div className="grid items-start gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex-row items-start justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="size-4 text-sky-600" />
                {text.revenue}
              </CardTitle>
              <p className="text-3xl font-semibold tracking-tight">{insightRevenue.amount}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Delta value={insightRevenue.delta} direction="up" />
              <span className="text-xs text-muted-foreground">{text.lastQuarter}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={insightRevenueConfig} className="aspect-auto h-44 w-full">
              <LineChart data={revenue} margin={{ left: 8, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {insightStats.map((stat) => {
            const Icon = statIcons[stat.id as keyof typeof statIcons]
            const label = text[stat.id as "reservations" | "confirmed" | "refunds"]
            return (
              <Card key={stat.id}>
                <CardContent className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Delta value={stat.delta} direction={stat.direction} />
                      {text.sinceMonth}
                    </p>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
                    <Icon className="size-4" />
                  </span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{text.capacity}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <ChartContainer
              config={{
                occupied: { label: text.occupied, color: "oklch(0.62 0.14 230)" },
                open: { label: text.open, color: "oklch(0.92 0.01 230)" },
              }}
              className="aspect-square h-36"
            >
              <PieChart>
                <Pie
                  data={[
                    { key: "occupied", value: insightCapacity.occupied },
                    { key: "open", value: insightCapacity.open },
                  ]}
                  dataKey="value"
                  nameKey="key"
                  innerRadius={42}
                  outerRadius={62}
                  strokeWidth={0}
                >
                  <Cell fill="var(--color-occupied)" />
                  <Cell fill="var(--color-open)" />
                </Pie>
              </PieChart>
            </ChartContainer>
            <p className="text-center text-sm">
              <span className="text-2xl font-semibold">{insightCapacity.occupied}</span>
              <span className="text-muted-foreground"> / {insightCapacity.totalRooms} {text.rooms}</span>
            </p>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span>{text.occupied}</span>
              <span>{text.open} {insightCapacity.open}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>{text.pipeline}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {insightPipeline.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label[locale]}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.share}%`, backgroundColor: insightPipelineColors[index] }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {insightRates.map((rate) => (
            <Card key={rate.id}>
              <CardContent className="flex items-center gap-3">
                <ChartContainer
                  config={{
                    rate: { label: text[rate.id as InsightTextKey], color: "oklch(0.62 0.15 195)" },
                  }}
                  className="aspect-square h-16 w-16"
                >
                  <RadialBarChart
                    data={[{ rate: rate.percent, fill: "var(--color-rate)" }]}
                    innerRadius="72%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={90 - (360 * rate.percent) / 100}
                  >
                    <RadialBar dataKey="rate" background cornerRadius={6} />
                  </RadialBarChart>
                </ChartContainer>
                <div>
                  <p className="text-lg font-semibold">{rate.percent}%</p>
                  <p className="text-sm text-muted-foreground">{text[rate.id as InsightTextKey]}</p>
                  <p className="text-xs text-muted-foreground">
                    {rate.figure} {text.guests}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{text.reviews}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {insightReviews.count} {text.reviewCount}
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{initials(insightReviews.author)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{insightReviews.author}</p>
                <p className="text-xs text-muted-foreground">{insightReviews.posted[locale]}</p>
              </div>
            </div>
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={index < insightReviews.stars ? "size-4 fill-current" : "size-4 text-muted-foreground"}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{insightReviews.body[locale]}</p>
            <div className="flex flex-wrap gap-2">
              {insightReviews.tags[locale].map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1">
                {text.reject}
              </Button>
              <Button type="button" className="flex-1">
                {text.accept}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{text.occupancy}</CardTitle>
            <Button type="button" variant="outline" size="sm">
              {text.period}
            </Button>
          </CardHeader>
          <CardContent>
            <ChartContainer config={insightOccupancyConfig} className="aspect-auto h-56 w-full">
              <BarChart data={insightOccupancy}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="period" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="occupied" fill="var(--color-occupied)" radius={4} />
                <Bar dataKey="open" fill="var(--color-open)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold">{text.arrivals}</h2>
          <p className="text-sm text-muted-foreground">
            {insightStays.length} {text.stayCount}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {insightStays.map((stay) => (
            <Card key={stay.id} className="pt-0">
              <img
                src={stay.image}
                alt=""
                className="h-36 w-full object-cover"
              />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{initials(stay.guest)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{stay.guest}</CardTitle>
                    <p className="text-xs text-muted-foreground">{stay.when[locale]}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {stay.nights} {text.nights} · {stay.guests} {text.guestsShort}
                </p>
                <Badge>{stay.price}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
