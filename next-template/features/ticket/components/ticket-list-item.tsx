"use client"

import { MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  TicketCategoryBadge,
  TicketPriorityIconBadge,
  TicketStatusBadge,
} from "@/features/ticket/components/ticket-badges"
import { inboxCopy } from "@/features/ticket/constants/copy"
import {
  formatRelative,
  initialsOf,
  labelOf,
  personById,
  ticketCategories,
  type Ticket,
} from "@/features/ticket/data"
import type { ContentLocale } from "@/lib/i18n"
import { cn } from "cn"

export function TicketListItem({
  locale,
  ticket,
  selected,
  checked,
  isAdmin,
  onOpen,
  onCheck,
  onAssign,
  onStatus,
  onCopy,
}: {
  locale: ContentLocale
  ticket: Ticket
  selected: boolean
  checked: boolean
  isAdmin: boolean
  onOpen: () => void
  onCheck: (checked: boolean) => void
  onAssign: () => void
  onStatus: () => void
  onCopy: () => void
}) {
  const text = inboxCopy(locale)
  const requester = personById(ticket.requesterId)
  const categoryLabel = labelOf(ticketCategories, ticket.category, locale)

  return (
    <div
      role="option"
      aria-selected={selected}
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpen()
        }
      }}
      className={cn(
        "flex cursor-pointer items-start gap-3 border-b border-border px-3 py-3 hover:bg-muted/50",
        selected && "border-l-2 border-l-primary bg-accent"
      )}
    >
      {isAdmin ? (
        <div
          className={cn(
            "pt-1",
            checked ? "opacity-100" : "sm:opacity-0 sm:group-hover:opacity-100"
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <Checkbox
            checked={checked}
            aria-label={text.selectAll}
            className="min-h-5 min-w-5"
            onCheckedChange={(value) => onCheck(value === true)}
          />
        </div>
      ) : null}
      <Avatar className="mt-0.5 size-8">
        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
          {initialsOf(requester?.name ?? "?")}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <p className="min-w-0 flex-1 truncate text-sm font-medium">{ticket.subject}</p>
          <TicketStatusBadge
            status={ticket.status}
            locale={locale}
            className="shrink-0"
          />
          <div className="-mr-1 -mt-1 shrink-0" onClick={(event) => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger
                nativeButton
                render={
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    className="min-h-11 min-w-11 sm:min-h-6 sm:min-w-6"
                    aria-label={text.filters}
                  />
                }
              >
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin ? (
                  <>
                    <DropdownMenuItem onClick={onAssign}>{text.assign}</DropdownMenuItem>
                    <DropdownMenuItem onClick={onStatus}>{text.changeStatus}</DropdownMenuItem>
                  </>
                ) : null}
                <DropdownMenuItem onClick={onCopy}>{text.copyLink}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          <span className="tabular-nums">#{ticket.id}</span>
          <span> · </span>
          <span>{requester?.name}</span>
          <span> · </span>
          <span>{formatRelative(ticket.updatedAt, locale)}</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <TicketPriorityIconBadge priority={ticket.priority} locale={locale} />
          <TicketCategoryBadge category={ticket.category} label={categoryLabel} />
        </div>
      </div>
    </div>
  )
}
