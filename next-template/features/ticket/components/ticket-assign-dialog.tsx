"use client"

import { useMemo, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { inboxCopy } from "@/features/ticket/copy"
import { initialsOf, openTicketCount, ticketPeople, type Ticket } from "@/features/ticket/data"
import type { ContentLocale } from "@/lib/i18n"

export function TicketAssignDialog({
  locale,
  open,
  tickets,
  onOpenChange,
  onAssign,
}: {
  locale: ContentLocale
  open: boolean
  tickets: Ticket[]
  onOpenChange: (open: boolean) => void
  onAssign: (userId: string) => void
}) {
  const text = inboxCopy(locale)
  const [query, setQuery] = useState("")
  const [picked, setPicked] = useState("")
  const agents = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale === "en" ? "en" : "tr")
    return ticketPeople.filter((person) => {
      if (person.role !== "admin") return false
      if (!normalized) return true
      return `${person.name} ${person.email}`.toLocaleLowerCase(locale === "en" ? "en" : "tr").includes(
        normalized
      )
    })
  }, [locale, query])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{text.assignTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 px-4 py-3">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.search}
            aria-label={text.search}
          />
          <ul className="max-h-64 overflow-y-auto">
            {agents.map((agent) => {
              const openCount = openTicketCount(
                tickets.filter((ticket) => ticket.assigneeId === agent.id)
              )
              return (
                <li key={agent.id}>
                  <button
                    type="button"
                    onClick={() => setPicked(agent.id)}
                    className="flex w-full min-h-11 items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-muted/50 aria-pressed:bg-accent"
                    aria-pressed={picked === agent.id}
                  >
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-xs text-primary">
                        {initialsOf(agent.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{agent.name}</span>
                      <span className="block text-xs text-muted-foreground">{agent.role}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {openCount} {text.openTickets}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {text.cancel}
          </Button>
          <Button
            type="button"
            disabled={!picked}
            onClick={() => {
              onAssign(picked)
              onOpenChange(false)
            }}
          >
            {text.assign}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
