"use client"

import { FileSpreadsheet, LineChart, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DensityBoard } from "@/components/layout/density-board"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { TicketAssignDialog } from "@/features/ticket/components/ticket-assign-dialog"
import { TicketDetail } from "@/features/ticket/components/ticket-detail"
import { TicketFiltersToolbar, type TicketFilters } from "@/features/ticket/components/ticket-filters-toolbar"
import { TicketList } from "@/features/ticket/components/ticket-list"
import { TicketNotice } from "@/features/ticket/components/ticket-notice"
import { TicketStatChips } from "@/features/ticket/components/ticket-stat-chips"
import { useMediaQuery } from "@/features/ticket/components/use-media-query"
import { inboxCopy } from "@/features/ticket/copy"
import {
  getCurrentUser,
  personById,
  seedTickets,
  slaBreached,
  TICKET_NOW_MS,
  type Ticket,
  type TicketMessageType,
  type TicketPriority,
} from "@/features/ticket/data"
import type { ContentLocale } from "@/lib/i18n"

const PRIORITY_RANK: Record<TicketPriority, number> = {
  urgent: 0,
  high: 1,
  normal: 2,
  low: 3,
}

export function TicketScreen({ locale }: { locale: ContentLocale }) {
  const text = inboxCopy(locale)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const user = getCurrentUser()
  const isAdmin = user.role === "admin"
  const wide = useMediaQuery("(min-width: 1280px)")
  const [tickets, setTickets] = useState<Ticket[]>(seedTickets)
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState("")
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [assignOpen, setAssignOpen] = useState(false)
  const [assignIds, setAssignIds] = useState<number[]>([])
  const [closeOpen, setCloseOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000)
    return () => window.clearTimeout(timer)
  }, [])

  const queryString = searchParams.toString()
  const filters: TicketFilters = useMemo(() => {
    const params = new URLSearchParams(queryString)
    return {
      q: params.get("q") ?? "",
      priority: params.get("priority") ?? "",
      category: params.get("category") ?? "",
      assignee: params.get("assignee") ?? "",
      date: params.get("date") ?? "",
      sort: params.get("sort") ?? "newest",
    }
  }, [queryString])
  const status = searchParams.get("status") ?? ""
  const selectedId = Number(searchParams.get("id") ?? "") || undefined

  const patch = useCallback(
    (next: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(next)) {
        if (value) params.set(key, value)
        else params.delete(key)
      }
      const query = params.toString()
      if (query === searchParams.toString()) return
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams]
  )
  const onQuery = useCallback((q: string) => patch({ q }), [patch])

  const scoped = useMemo(
    () => (isAdmin ? tickets : tickets.filter((item) => item.requesterId === user.id)),
    [isAdmin, tickets, user.id]
  )

  const filtered = useMemo(() => {
    const collator = locale === "en" ? "en" : "tr"
    const q = filters.q.trim().toLocaleLowerCase(collator)
    let rows = scoped.filter((ticket) => {
      if (status && ticket.status !== status) return false
      if (filters.priority && ticket.priority !== filters.priority) return false
      if (filters.category && ticket.category !== filters.category) return false
      if (filters.assignee === "unassigned" && ticket.assigneeId) return false
      if (filters.assignee && filters.assignee !== "unassigned" && ticket.assigneeId !== filters.assignee) {
        return false
      }
      if (filters.date) {
        const created = Date.parse(ticket.createdAt)
        const hours = (TICKET_NOW_MS - created) / 3600_000
        if (filters.date === "today" && hours > 24) return false
        if (filters.date === "7" && hours > 24 * 7) return false
        if (filters.date === "30" && hours > 24 * 30) return false
      }
      if (!q) return true
      const requester = personById(ticket.requesterId)?.name ?? ""
      return `${ticket.id} ${ticket.subject} ${requester}`.toLocaleLowerCase(collator).includes(q)
    })
    rows = [...rows].sort((a, b) => {
      if (filters.sort === "oldest") return Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
      if (filters.sort === "priority") return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
      if (filters.sort === "sla") {
        return Date.parse(a.slaDueAt ?? "9999") - Date.parse(b.slaDueAt ?? "9999")
      }
      return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    })
    return rows
  }, [filters, locale, scoped, status])

  const selected = filtered.find((item) => item.id === selectedId) ?? scoped.find((item) => item.id === selectedId)
  const slaCount = scoped.filter(slaBreached).length

  function addSystem(ids: number[], body: string, extra?: Partial<Ticket>) {
    setTickets((current) =>
      current.map((ticket) => {
        if (!ids.includes(ticket.id)) return ticket
        return {
          ...ticket,
          ...extra,
          updatedAt: new Date(TICKET_NOW_MS).toISOString(),
          messages: [
            ...ticket.messages,
            {
              id: `${ticket.id}-sys-${ticket.messages.length + 1}`,
              type: "system" as const,
              authorId: user.id,
              body,
              createdAt: new Date(TICKET_NOW_MS).toISOString(),
            },
          ],
        }
      })
    )
  }

  function copyLink(id: number) {
    const url = `${window.location.origin}${pathname}?id=${id}`
    void navigator.clipboard.writeText(url)
    setNotice(text.copied)
  }

  const bulkBar =
    isAdmin && checked.size > 0 ? (
      <div className="sticky bottom-0 z-20 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-sm">
        <span className="text-sm font-medium">
          {checked.size} {text.selected}
        </span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="min-h-11 sm:min-h-7"
          onClick={() => {
            setAssignIds([...checked])
            setAssignOpen(true)
          }}
        >
          {text.assign}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="min-h-11 sm:min-h-7"
          onClick={() => addSystem([...checked], `${user.name} durumu 'Kapalı' yaptı`, { status: "closed" })}
        >
          {text.close}
        </Button>
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          aria-label={text.clear}
          onClick={() => setChecked(new Set())}
        >
          <X />
        </Button>
      </div>
    ) : null

  const detail = (
    <TicketDetail
      locale={locale}
      ticket={selected}
      role={user.role}
      showBack={!wide}
      onBack={() => patch({ id: "" })}
      onCopy={() => selected && copyLink(selected.id)}
      onAssignChange={(userId) => {
        if (!selected) return
        const agent = personById(userId)
        addSystem([selected.id], `${user.name} bileti ${agent?.name ?? ""} kişisine atadı`, {
          assigneeId: userId,
        })
        setNotice(text.updated)
      }}
      onStatusChange={(next) => {
        if (!selected) return
        addSystem([selected.id], `${user.name} durumu '${next}' yaptı`, { status: next })
        setNotice(text.updated)
      }}
      onPriorityChange={(next) => {
        if (!selected) return
        addSystem([selected.id], `${user.name} önceliği değiştirdi`, { priority: next })
        setNotice(text.updated)
      }}
      onSend={(body, type: TicketMessageType, markReview) => {
        if (!selected) return
        setTickets((current) =>
          current.map((ticket) => {
            if (ticket.id !== selected.id) return ticket
            return {
              ...ticket,
              unread: false,
              status: markReview && type !== "internal" ? "in_review" : ticket.status,
              updatedAt: new Date(TICKET_NOW_MS).toISOString(),
              messages: [
                ...ticket.messages,
                {
                  id: `${ticket.id}-msg-${ticket.messages.length + 1}`,
                  type,
                  authorId: user.id,
                  body,
                  createdAt: new Date(TICKET_NOW_MS).toISOString(),
                },
              ],
            }
          })
        )
      }}
      onCloseTicket={() => setCloseOpen(true)}
    />
  )

  return (
    <DensityBoard>
      <TicketNotice message={notice} onClear={() => setNotice("")} />

      <div
        data-density-toolbar=""
        className="flex flex-wrap items-center gap-2"
      >
        <TicketStatChips
          locale={locale}
          tickets={scoped}
          status={status}
          slaCount={slaCount}
          isAdmin={isAdmin}
          onStatus={(next) => patch({ status: next })}
        />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-9 bg-card"
            onClick={() => setNotice(text.soon)}
          >
            <FileSpreadsheet />
            {text.excel}
          </Button>
          {isAdmin ? (
            <Button type="button" className="h-9" onClick={() => setNotice(text.soon)}>
              <LineChart />
              {text.reports}
            </Button>
          ) : null}
        </div>
      </div>

      <TicketFiltersToolbar
        locale={locale}
        isAdmin={isAdmin}
        filters={filters}
        onQuery={onQuery}
        onChange={(next) =>
          patch({
            q: next.q,
            priority: next.priority,
            category: next.category,
            assignee: next.assignee,
            date: next.date,
            sort: next.sort === "newest" ? "" : next.sort,
          })
        }
        onClear={() => patch({ q: "", priority: "", category: "", assignee: "", date: "", sort: "", status: "" })}
      />

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="flex flex-col gap-2 xl:col-span-4">
          <TicketList
            locale={locale}
            tickets={filtered}
            selectedId={selectedId}
            checkedIds={checked}
            isAdmin={isAdmin}
            loading={loading}
            onOpen={(id) => patch({ id: String(id) })}
            onToggle={(id, value) => {
              setChecked((current) => {
                const next = new Set(current)
                if (value) next.add(id)
                else next.delete(id)
                return next
              })
            }}
            onToggleAll={(value) => {
              setChecked(value ? new Set(filtered.map((item) => item.id)) : new Set())
            }}
            onAssign={(id) => {
              setAssignIds([id])
              setAssignOpen(true)
            }}
            onStatus={(id) => addSystem([id], `${user.name} durumu 'İnceleniyor' yaptı`, { status: "in_review" })}
            onCopy={copyLink}
            onClear={() => patch({ q: "", priority: "", category: "", assignee: "", date: "", sort: "", status: "" })}
          />
          {bulkBar}
        </div>
        {wide ? (
          <div className="hidden xl:col-span-8 xl:block">{detail}</div>
        ) : null}
      </div>

      {!wide ? (
        <Sheet open={Boolean(selectedId)} onOpenChange={(open) => !open && patch({ id: "" })}>
          <SheetContent
            side="bottom"
            showCloseButton={false}
            className="h-dvh max-h-dvh p-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-full sm:max-w-xl sm:border-l"
          >
            {detail}
          </SheetContent>
        </Sheet>
      ) : null}

      <TicketAssignDialog
        locale={locale}
        open={assignOpen}
        tickets={tickets}
        onOpenChange={setAssignOpen}
        onAssign={(userId) => {
          const agent = personById(userId)
          addSystem(assignIds, `${user.name} bileti ${agent?.name ?? ""} kişisine atadı`, {
            assigneeId: userId,
          })
          setChecked(new Set())
          setNotice(text.updated)
        }}
      />

      <Dialog open={closeOpen} onOpenChange={setCloseOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{text.closeConfirmTitle}</DialogTitle>
          </DialogHeader>
          <p className="px-4 text-sm text-muted-foreground">{text.closeConfirm}</p>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setCloseOpen(false)}>
              {text.cancel}
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (selected) {
                  addSystem([selected.id], `${user.name} talebi kapattı`, { status: "closed" })
                }
                setCloseOpen(false)
              }}
            >
              {text.closeTicket}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DensityBoard>
  )
}
