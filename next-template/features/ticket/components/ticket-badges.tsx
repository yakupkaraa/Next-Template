import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Flag, Receipt, Tag, User, Wrench } from "lucide-react"
import { StatusBadge, statusBadgeTones, type StatusBadgeTone } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { cn } from "cn"
import type { ContentLocale } from "@/lib/i18n"
import { inboxCopy } from "@/features/ticket/constants/copy"
import type { TicketCategory, TicketPriority, TicketStatus } from "@/features/ticket/data"

const infoClass =
  "border border-primary/30 bg-primary/10 font-medium text-primary"

export function TicketStatusBadge({
  status,
  locale,
  className,
}: {
  status: TicketStatus
  locale: ContentLocale
  className?: string
}) {
  const text = inboxCopy(locale)
  const label =
    status === "open"
      ? text.open
      : status === "in_review"
        ? text.inReview
        : status === "resolved"
          ? text.resolved
          : text.closed

  if (status === "open") {
    return (
      <Badge variant="secondary" className={cn("gap-1.5", infoClass, className)}>
        <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden />
        {label}
      </Badge>
    )
  }

  const tone =
    status === "in_review" ? "warning" : status === "resolved" ? "success" : "neutral"

  return (
    <StatusBadge tone={tone} className={className}>
      {label}
    </StatusBadge>
  )
}

export function TicketPriorityBadge({
  priority,
  locale,
  className,
}: {
  priority: TicketPriority
  locale: ContentLocale
  className?: string
}) {
  const text = inboxCopy(locale)
  const label =
    priority === "low"
      ? text.low
      : priority === "normal"
        ? text.normal
        : priority === "high"
          ? text.high
          : text.urgent

  if (priority === "normal") {
    return (
      <Badge variant="secondary" className={cn("gap-1.5", infoClass, className)}>
        <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden />
        {label}
      </Badge>
    )
  }

  const tone = priority === "low" ? "neutral" : priority === "high" ? "warning" : "danger"

  return (
    <StatusBadge tone={tone} className={className}>
      {label}
    </StatusBadge>
  )
}

export function priorityDotClass(priority: TicketPriority) {
  if (priority === "low") return "bg-muted-foreground"
  if (priority === "normal") return "bg-primary"
  if (priority === "high") return "bg-chart-3"
  return "bg-destructive"
}

function IconBadge({
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

export function TicketPriorityIconBadge({
  priority,
  locale,
  className,
}: {
  priority: TicketPriority
  locale: ContentLocale
  className?: string
}) {
  const text = inboxCopy(locale)
  const label =
    priority === "low"
      ? text.low
      : priority === "normal"
        ? text.normal
        : priority === "high"
          ? text.high
          : text.urgent
  const tone: StatusBadgeTone | "info" =
    priority === "low"
      ? "neutral"
      : priority === "normal"
        ? "info"
        : priority === "high"
          ? "warning"
          : "danger"

  return (
    <IconBadge tone={tone} icon={Flag} className={className}>
      {label}
    </IconBadge>
  )
}

const categoryIcons: Record<TicketCategory, LucideIcon> = {
  technical: Wrench,
  account: User,
  billing: Receipt,
  feature: Tag,
  other: Tag,
}

export function TicketCategoryBadge({
  category,
  label,
  className,
}: {
  category: TicketCategory
  label: string
  className?: string
}) {
  return (
    <IconBadge tone="success" icon={categoryIcons[category]} className={className}>
      {label}
    </IconBadge>
  )
}
