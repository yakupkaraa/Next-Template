"use client"

import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { TicketListItem } from "@/features/ticket/components/ticket-list-item"
import { inboxCopy } from "@/features/ticket/constants/copy"
import type { Ticket } from "@/features/ticket/constants/ticket"
import type { ContentLocale } from "@/lib/i18n"

export function TicketList({
  locale,
  tickets,
  selectedId,
  checkedIds,
  isAdmin,
  loading,
  onOpen,
  onToggle,
  onToggleAll,
  onAssign,
  onStatus,
  onCopy,
  onClear,
}: {
  locale: ContentLocale
  tickets: Ticket[]
  selectedId?: number
  checkedIds: Set<number>
  isAdmin: boolean
  loading: boolean
  onOpen: (id: number) => void
  onToggle: (id: number, checked: boolean) => void
  onToggleAll: (checked: boolean) => void
  onAssign: (id: number) => void
  onStatus: (id: number) => void
  onCopy: (id: number) => void
  onClear: () => void
}) {
  const text = inboxCopy(locale)
  const allChecked = tickets.length > 0 && tickets.every((item) => checkedIds.has(item.id))

  return (
    <Card className="flex flex-col gap-0 overflow-hidden py-0 shadow-sm">
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        {isAdmin ? (
          <Checkbox
            checked={allChecked}
            aria-label={text.selectAll}
            onCheckedChange={(value) => onToggleAll(value === true)}
          />
        ) : null}
        <span className="text-sm font-medium">
          {tickets.length} {text.ticketsCount}
        </span>
      </div>
      <div role="listbox" aria-label={text.title} className="flex flex-col">
        {loading
          ? Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="flex gap-3 border-b px-3 py-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-3 w-2/5" />
                </div>
              </div>
            ))
          : null}
        {!loading && tickets.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
            <Inbox className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{text.empty}</p>
            <Button type="button" variant="outline" onClick={onClear}>
              {text.clear}
            </Button>
          </div>
        ) : null}
        {!loading
          ? tickets.map((ticket) => (
              <div key={ticket.id} className="group">
                <TicketListItem
                  locale={locale}
                  ticket={ticket}
                  selected={selectedId === ticket.id}
                  checked={checkedIds.has(ticket.id)}
                  isAdmin={isAdmin}
                  onOpen={() => onOpen(ticket.id)}
                  onCheck={(checked) => onToggle(ticket.id, checked)}
                  onAssign={() => onAssign(ticket.id)}
                  onStatus={() => onStatus(ticket.id)}
                  onCopy={() => onCopy(ticket.id)}
                />
              </div>
            ))
          : null}
      </div>
    </Card>
  )
}
