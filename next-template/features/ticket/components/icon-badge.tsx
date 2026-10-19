import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { statusBadgeTones, type StatusBadgeTone } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const infoClass = "border border-info bg-info-bg font-medium text-info"

export function IconBadge({
  tone,
  icon: Icon,
  className,
  children,
}: {
  tone: StatusBadgeTone | "info"
  icon: LucideIcon
  className?: string
  children: ReactNode
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(tone === "info" ? infoClass : statusBadgeTones[tone], className)}
    >
      <Icon data-icon="inline-start" />
      {children}
    </Badge>
  )
}
