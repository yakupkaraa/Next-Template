"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "@/components/shared/search-bar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { inboxCopy } from "@/features/ticket/constants/copy"
import { ticketCategories } from "@/features/ticket/constants/ticket"
import { ticketPeople } from "@/features/ticket/mocks/ticket.mock"
import type { ContentLocale } from "@/lib/i18n"

export type TicketFilters = {
  q: string
  priority: string
  category: string
  assignee: string
  date: string
  sort: string
}

export function TicketFiltersToolbar({
  locale,
  isAdmin,
  filters,
  onChange,
  onQuery,
  onClear,
}: {
  locale: ContentLocale
  isAdmin: boolean
  filters: TicketFilters
  onChange: (next: TicketFilters) => void
  onQuery: (q: string) => void
  onClear: () => void
}) {
  const text = inboxCopy(locale)
  const [query, setQuery] = useState(filters.q)
  const [sheet, setSheet] = useState(false)
  const debounceRef = useRef<number>(0)

  function handleSearch(next: string) {
    setQuery(next)
    window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => onQuery(next), 300)
  }

  const activeCount = [
    filters.priority,
    filters.category,
    filters.assignee,
    filters.date,
    filters.sort && filters.sort !== "newest" ? filters.sort : "",
  ].filter(Boolean).length

  const fields = (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={filters.priority || null}
        onValueChange={(next) => onChange({ ...filters, priority: next ?? "" })}
      >
        <SelectTrigger className="min-h-11 min-w-36 border-border bg-card sm:min-h-8">
          <SelectValue placeholder={text.priority} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">{text.low}</SelectItem>
          <SelectItem value="normal">{text.normal}</SelectItem>
          <SelectItem value="high">{text.high}</SelectItem>
          <SelectItem value="urgent">{text.urgent}</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.category || null}
        onValueChange={(next) => onChange({ ...filters, category: next ?? "" })}
      >
        <SelectTrigger className="min-h-11 min-w-36 border-border bg-card sm:min-h-8">
          <SelectValue placeholder={text.category} />
        </SelectTrigger>
        <SelectContent>
          {ticketCategories.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item[locale]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isAdmin ? (
        <Select
          value={filters.assignee || null}
          onValueChange={(next) => onChange({ ...filters, assignee: next ?? "" })}
        >
          <SelectTrigger className="min-h-11 min-w-36 border-border bg-card sm:min-h-8">
            <SelectValue placeholder={text.assignee} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">{text.unassigned}</SelectItem>
            {ticketPeople
              .filter((person) => person.role === "admin")
              .map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  {person.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      ) : null}
      <Select
        value={filters.date || null}
        onValueChange={(next) => onChange({ ...filters, date: next ?? "" })}
      >
        <SelectTrigger className="min-h-11 min-w-36 border-border bg-card sm:min-h-8">
          <SelectValue placeholder={text.date} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">{text.today}</SelectItem>
          <SelectItem value="7">{text.days7}</SelectItem>
          <SelectItem value="30">{text.days30}</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.sort || "newest"}
        onValueChange={(next) => onChange({ ...filters, sort: next ?? "newest" })}
      >
        <SelectTrigger className="min-h-11 min-w-36 border-border bg-card sm:min-h-8">
          <SelectValue placeholder={text.sort} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">{text.newest}</SelectItem>
          <SelectItem value="oldest">{text.oldest}</SelectItem>
          <SelectItem value="priority">{text.byPriority}</SelectItem>
          <SelectItem value="sla">{text.bySla}</SelectItem>
        </SelectContent>
      </Select>
      <Button
        type="button"
        variant="ghost"
        className="min-h-11 sm:min-h-8"
        onClick={() => {
          setQuery("")
          onClear()
        }}
      >
        {text.clear}
      </Button>
    </div>
  )

  return (
    <Card
      size="sm"
      data-density-toolbar=""
      className="shrink-0 rounded-2xl border-0 bg-primary/10 py-0 shadow-sm ring-0"
    >
      <CardContent className="flex flex-wrap items-center gap-2 py-3">
          <SearchBar
            className="min-w-56 max-w-xs flex-1 [&_input]:h-9 [&_input]:rounded-full"
            value={query}
            onValueChange={handleSearch}
            placeholder={text.search}
          />
          <Button
            type="button"
            variant="outline"
            className="min-h-11 bg-card lg:hidden"
            onClick={() => setSheet(true)}
          >
            {text.filters}
            {activeCount ? (
              <span className="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">
                {activeCount}
              </span>
            ) : null}
          </Button>
          <div className="hidden min-w-0 flex-wrap items-center gap-2 lg:flex">{fields}</div>
        <Sheet open={sheet} onOpenChange={setSheet}>
          <SheetContent side="bottom" className="h-auto max-h-[85dvh]">
            <SheetHeader>
              <SheetTitle>{text.filters}</SheetTitle>
            </SheetHeader>
            <div className="p-4">{fields}</div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}
