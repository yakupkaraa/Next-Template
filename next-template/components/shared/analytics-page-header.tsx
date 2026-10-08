import { Calendar, Download, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type AnalyticsPageHeaderProps = {
  title: string
  last30Days: string
  filter: string
  download: string
}

export function AnalyticsPageHeader({
  title,
  last30Days,
  filter,
  download,
}: AnalyticsPageHeaderProps) {
  return (
    <header
      data-density-toolbar=""
      className="flex flex-col justify-between gap-4 md:flex-row md:items-center"
    >
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" className="h-10 bg-card shadow-sm">
          <Calendar className="size-4 text-muted-foreground" />
          {last30Days}
        </Button>
        <Button type="button" variant="outline" className="h-10 bg-card shadow-sm">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          {filter}
        </Button>
        <Button type="button" className="h-10">
          <Download className="size-4" />
          {download}
        </Button>
      </div>
    </header>
  )
}
