import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { insightAssets, insightCopy, insightLatestProducts, insightPromo } from "./data"
import type { InsightsSectionProps } from "./utils"

export function InsightsAside({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]

  return (
    <div className="grid items-stretch gap-3 lg:grid-cols-12">
      <Card className="min-w-0 shadow-sm lg:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{text.latestProducts}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {insightLatestProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-border">
                <Package className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.price}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="min-w-0 shadow-sm lg:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{text.totalAssets}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <p className="text-3xl font-bold tracking-tight">{insightAssets.total}</p>
          <div>
            <p className="mb-2 text-xs text-muted-foreground">{text.distribution}</p>
            <div className="flex h-3 overflow-hidden rounded-full">
              {insightAssets.segments.map((seg) => (
                <div
                  key={seg.label}
                  className="h-full"
                  style={{ width: `${seg.share}%`, backgroundColor: seg.color }}
                />
              ))}
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {insightAssets.segments.map((seg) => (
              <li key={seg.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                  {seg.label}
                </span>
                <span className="text-muted-foreground">
                  {seg.amount} · {seg.share}%
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="accent-theme-card flex min-h-48 flex-col justify-end shadow-sm lg:col-span-4">
        <CardContent className="space-y-3 pt-6">
          <p className="text-sm leading-relaxed">{insightPromo.body}</p>
          <h3 className="text-lg font-semibold">{text.promoTitle}</h3>
          <Button type="button" className="w-fit">
            {text.shopNow}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
