import type { LucideIcon } from "lucide-react"
import { Flag, Receipt, Tag, User, Wrench } from "lucide-react"
import { StatusBadge, type StatusBadgeTone } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ContentLocale } from "@/lib/i18n"
import { inboxCopy } from "@/features/ticket/constants/copy"
import type {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@/features/ticket/types/ticket"
import { IconBadge } from "./icon-badge"

const infoClass = "border border-info bg-info-bg font-medium text-info"

const statusToneByStatus: Record<TicketStatus, StatusBadgeTone> = {
  open: "neutral",
  in_review: "warning",
  resolved: "success",
  closed: "neutral",
}

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
  const labelByStatus: Record<TicketStatus, string> = {
    open: text.open,
    in_review: text.inReview,
    resolved: text.resolved,
    closed: text.closed,
  }
  const label = labelByStatus[status]

  if (status === "open") {
    return (
      <Badge variant="secondary" className={cn("gap-1.5", infoClass, className)}>
        <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden />
        {label}
      </Badge>
    )
  }

  return (
    <StatusBadge tone={statusToneByStatus[status]} className={className}>
      {label}
    </StatusBadge>
  )
}

const priorityToneByPriority: Record<TicketPriority, StatusBadgeTone> = {
  low: "neutral",
  normal: "neutral",
  high: "warning",
  urgent: "danger",
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
  const labelByPriority: Record<TicketPriority, string> = {
    low: text.low,
    normal: text.normal,
    high: text.high,
    urgent: text.urgent,
  }
  const label = labelByPriority[priority]

  if (priority === "normal") {
    return (
      <Badge variant="secondary" className={cn("gap-1.5", infoClass, className)}>
        <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden />
        {label}
      </Badge>
    )
  }

  return (
    <StatusBadge tone={priorityToneByPriority[priority]} className={className}>
      {label}
    </StatusBadge>
  )
}

export function priorityDotClass(priority: TicketPriority) {
  if (priority === "low") return "bg-muted-foreground"
  if (priority === "normal") return "bg-info"
  if (priority === "high") return "bg-warning"
  return "bg-error"
}

const priorityIconToneByPriority: Record<TicketPriority, StatusBadgeTone | "info"> = {
  low: "neutral",
  normal: "info",
  high: "warning",
  urgent: "danger",
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
  const labelByPriority: Record<TicketPriority, string> = {
    low: text.low,
    normal: text.normal,
    high: text.high,
    urgent: text.urgent,
  }
  const label = labelByPriority[priority]

  return (
    <IconBadge tone={priorityIconToneByPriority[priority]} icon={Flag} className={className}>
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
