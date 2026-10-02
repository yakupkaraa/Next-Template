import { Calendar, Download, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { dashboardCopy, type DashboardLocale } from "./data"

export function DashboardPageHeader({ locale }: { locale: DashboardLocale }) {
  const text = dashboardCopy[locale]

  return (
    <header
      data-density-toolbar=""
      className="flex flex-col justify-between gap-4 md:flex-row md:items-center"
    >
      <h1 className="text-2xl font-bold tracking-tight">{text.pageTitle}</h1>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" className="h-10 bg-card shadow-sm">
          <Calendar className="size-4 text-muted-foreground" />
          {text.last30Days}
        </Button>
        <Button type="button" variant="outline" className="h-10 bg-card shadow-sm">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          {text.filter}
        </Button>
        <Button type="button" className="h-10">
          <Download className="size-4" />
          {text.download}
        </Button>
      </div>
    </header>
  )
}
