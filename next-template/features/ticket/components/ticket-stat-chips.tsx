"use client"

import { cn } from "cn"
import { inboxCopy } from "@/features/ticket/constants/copy"
import type { Ticket, TicketStatus } from "@/features/ticket/constants/ticket"
import type { ContentLocale } from "@/lib/i18n"

const chips: { id: "all" | TicketStatus; labelKey: "all" | "open" | "inReview" | "resolved" | "closed"; className: string }[] = [
  { id: "all", labelKey: "all", className: "" },
  { id: "open", labelKey: "open", className: "text-primary" },
  { id: "in_review", labelKey: "inReview", className: "text-chart-3" },
  { id: "resolved", labelKey: "resolved", className: "text-primary" },
  { id: "closed", labelKey: "closed", className: "text-muted-foreground" },
]

export function TicketStatChips({
  locale,
  tickets,
  status,
  slaCount,
  isAdmin,
  onStatus,
}: {
  locale: ContentLocale
  tickets: Ticket[]
  status: string
  slaCount: number
  isAdmin: boolean
  onStatus: (status: string) => void
}) {
  const text = inboxCopy(locale)
  const counts = {
    all: tickets.length,
    open: tickets.filter((item) => item.status === "open").length,
    in_review: tickets.filter((item) => item.status === "in_review").length,
    resolved: tickets.filter((item) => item.status === "resolved").length,
    closed: tickets.filter((item) => item.status === "closed").length,
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto snap-x">
      {chips.map((chip) => {
        const selected = (status || "all") === chip.id
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onStatus(chip.id === "all" ? "" : chip.id)}
            className={cn(
              "snap-start min-h-11 shrink-0 rounded-full px-3 py-1.5 text-sm",
              selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            )}
          >
            <span className="font-semibold tabular-nums">{counts[chip.id]}</span>{" "}
            {text[chip.labelKey]}
          </button>
        )
      })}
      {isAdmin ? (
        <>
          <span className="hidden shrink-0 text-xs text-muted-foreground whitespace-nowrap lg:inline">
            {text.avgReply}
          </span>
          <span className="shrink-0 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
            {text.slaBreach} {slaCount}
          </span>
        </>
      ) : null}
    </div>
  )
}
