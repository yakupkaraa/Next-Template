"use client"

import { ArrowLeft, Copy, MoreVertical, Printer, Ticket as TicketIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TicketPriorityBadge,
  TicketStatusBadge,
} from "@/features/ticket/components/ticket-badges"
import { TicketComposer } from "@/features/ticket/components/ticket-composer"
import { TicketThread } from "@/features/ticket/components/ticket-thread"
import { inboxCopy } from "@/features/ticket/constants/copy"
import {
  formatDateTime,
  formatSla,
  initialsOf,
  labelOf,
  ticketCategories,
  ticketModules,
  type Ticket,
  type TicketMessageType,
  type TicketPriority,
  type TicketRole,
  type TicketStatus,
} from "@/features/ticket/constants/ticket"
import { personById, ticketPeople } from "@/features/ticket/mocks/ticket.mock"
import type { ContentLocale } from "@/lib/i18n"

export function TicketDetail({
  locale,
  ticket,
  role,
  showBack,
  onBack,
  onCopy,
  onAssignChange,
  onStatusChange,
  onPriorityChange,
  onSend,
  onCloseTicket,
}: {
  locale: ContentLocale
  ticket: Ticket | undefined
  role: TicketRole
  showBack?: boolean
  onBack?: () => void
  onCopy: () => void
  onAssignChange: (userId: string) => void
  onStatusChange: (status: TicketStatus) => void
  onPriorityChange: (priority: TicketPriority) => void
  onSend: (body: string, type: TicketMessageType, markReview: boolean) => void
  onCloseTicket: () => void
}) {
  const text = inboxCopy(locale)

  if (!ticket) {
    return (
      <Card className="flex min-h-[60rem] flex-col items-center justify-center gap-2 py-16 text-center shadow-sm">
        <TicketIcon className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{text.emptyDetail}</p>
      </Card>
    )
  }

  const requester = personById(ticket.requesterId)
  const isAdmin = role === "admin"

  return (
    <Card className="flex min-h-[60rem] flex-col gap-0 py-0 shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {showBack ? (
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="min-h-11 min-w-11"
                aria-label={text.back}
                onClick={onBack}
              >
                <ArrowLeft />
              </Button>
            ) : null}
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">#{ticket.id}</span>
          </div>
          <h2 className="mt-1 truncate text-lg font-bold">{ticket.subject}</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <TicketStatusBadge status={ticket.status} locale={locale} />
            <TicketPriorityBadge priority={ticket.priority} locale={locale} />
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {labelOf(ticketCategories, ticket.category, locale)}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {labelOf(ticketModules, ticket.module, locale)}
            </span>
          </div>
        </div>
        <div className="flex shrink-0">
          <Button type="button" size="icon-sm" variant="ghost" aria-label={text.copyLink} onClick={onCopy}>
            <Copy />
          </Button>
          <Button type="button" size="icon-sm" variant="ghost" aria-label={text.print} onClick={() => window.print()}>
            <Printer />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton
              render={<Button type="button" size="icon-sm" variant="ghost" aria-label={text.filters} />}
            >
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{text.merge}</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">{text.delete}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-2 bg-muted p-3 sm:grid-cols-3">
        <div className="rounded-xl bg-card px-3 py-2">
          <p className="text-[11px] text-muted-foreground">{text.requester}</p>
          <div className="mt-1 flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                {initialsOf(requester?.name ?? "?")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{requester?.name}</p>
              <p className="truncate text-xs text-muted-foreground">{requester?.email}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card px-3 py-2">
          <p className="text-[11px] text-muted-foreground">{text.created}</p>
          <p className="mt-2 text-sm">{formatDateTime(ticket.createdAt, locale)}</p>
        </div>
        {isAdmin ? (
          <div className="rounded-xl bg-card px-3 py-2">
            <p className="text-[11px] text-muted-foreground">{text.sla}</p>
            <p className="mt-2 text-sm">{formatSla(ticket.slaDueAt, locale)}</p>
          </div>
        ) : null}
      </div>

      {isAdmin ? (
        <div className="grid gap-2 border-b border-border px-4 py-3 sm:grid-cols-3">
          <Select value={ticket.assigneeId ?? null} onValueChange={(next) => next && onAssignChange(next)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={text.assignee} />
            </SelectTrigger>
            <SelectContent>
              {ticketPeople
                .filter((person) => person.role === "admin")
                .map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    {person.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Select
            value={ticket.status}
            onValueChange={(next) => next && onStatusChange(next as TicketStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">{text.open}</SelectItem>
              <SelectItem value="in_review">{text.inReview}</SelectItem>
              <SelectItem value="resolved">{text.resolved}</SelectItem>
              <SelectItem value="closed">{text.closed}</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={ticket.priority}
            onValueChange={(next) => next && onPriorityChange(next as TicketPriority)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">{text.low}</SelectItem>
              <SelectItem value="normal">{text.normal}</SelectItem>
              <SelectItem value="high">{text.high}</SelectItem>
              <SelectItem value="urgent">{text.urgent}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null}

      {ticket.tags.length ? (
        <div className="flex flex-wrap gap-1 px-4 py-2">
          {ticket.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <TicketThread locale={locale} ticket={ticket} role={role} />
      <TicketComposer locale={locale} role={role} onSend={onSend} onCloseTicket={onCloseTicket} />
    </Card>
  )
}
