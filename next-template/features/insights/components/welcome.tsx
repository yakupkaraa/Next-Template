import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { insightCopy, insightWelcome } from "../data"
import type { InsightsSectionProps } from "./utils"

export function InsightsWelcome({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]
  const pct = insightWelcome.progress

  return (
    <Card className="border-0 bg-primary/10 py-0 shadow-sm ring-0">
      <CardContent className="flex flex-col justify-between gap-4 p-3.5 sm:px-5 md:flex-row md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-4" />
          </div>
          <p className="truncate text-sm">
            {text.welcome}{" "}
            <span className="font-semibold text-primary">%{pct}</span>
            {locale === "tr" ? "'" : " "}
            {text.welcomeSuffix}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center gap-2.5 sm:flex">
            <Progress value={pct} className="h-2 w-44" />
            <span className="text-xs font-semibold tabular-nums text-muted-foreground">%{pct}</span>
          </div>
          <Button type="button" variant="outline" size="sm" className="bg-card text-primary shadow-sm">
            {text.details}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
