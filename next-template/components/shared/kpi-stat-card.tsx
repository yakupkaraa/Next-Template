import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { toneSurfaceClass, type ToneSurface } from "@/lib/theme/tone-surface"

export function KpiStatCard({
  icon: Icon,
  label,
  value,
  suffix,
  tone,
  size = "default",
  className,
}: {
  icon: LucideIcon
  label: string
  value: ReactNode
  suffix?: ReactNode
  tone: ToneSurface
  size?: "default" | "compact"
  className?: string
}) {
  const cardClassName = cn(
    "border-0 shadow-sm ring-0",
    size === "compact" && "min-w-0",
    toneSurfaceClass[tone],
    className
  )

  if (size === "compact") {
    return (
      <Card size="sm" className={cardClassName}>
        <CardContent className="flex flex-col items-center gap-0.5 px-2 py-1.5">
          <div className="flex min-w-0 items-center justify-center gap-1.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-background/70 text-primary">
              <Icon className="size-3" />
            </span>
            <p className="truncate text-[11px] font-medium text-muted-foreground">{label}</p>
          </div>
          <p className="text-center text-base font-bold tracking-tight tabular-nums">{value}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cardClassName}>
      <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-background/70 text-primary">
          <Icon className="size-5" />
        </span>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold tracking-tight">
          {value}
          {suffix ? <span className="text-sm font-normal"> {suffix}</span> : null}
        </p>
      </CardContent>
    </Card>
  )
}
