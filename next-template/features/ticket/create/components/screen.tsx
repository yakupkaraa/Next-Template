"use client"

import { Send } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useMemo, useState, useSyncExternalStore } from "react"
import { DensityBoard } from "@/components/layout/density-board"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TicketForm, type TicketFormErrors, type TicketFormValue } from "@/features/ticket/components/ticket-form"
import { TicketNotice } from "@/features/ticket/components/ticket-notice"
import { TicketSideCards } from "@/features/ticket/components/ticket-side-cards"
import { createCopy } from "@/features/ticket/create/constants/copy"
import {
  nextTicketId,
  TICKET_NOW_MS,
  type Ticket,
} from "@/features/ticket/constants/ticket"
import { getCurrentUser, seedTickets } from "@/features/ticket/mocks/ticket.mock"
import type { ContentLocale } from "@/lib/i18n"

const DRAFT_KEY = "ticket-create-draft"

function subscribeDraft(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getDraftSnapshot() {
  try {
    return localStorage.getItem(DRAFT_KEY)
  } catch {
    return null
  }
}

const emptyForm: TicketFormValue = {
  subject: "",
  category: "",
  priority: "normal",
  module: "",
  environment: "",
  description: "",
  notify: true,
  files: [],
}

function isDirty(value: TicketFormValue) {
  return Boolean(
    value.subject || value.category || value.description || value.module || value.environment || value.files.length
  )
}

export function TicketCreateScreen({ locale }: { locale: ContentLocale }) {
  const text = createCopy(locale)
  const router = useRouter()
  const pathname = usePathname()
  const prefix = pathname.match(/^\/[^/]+/)?.[0] ?? `/${locale}`
  const user = getCurrentUser()
  const [tickets, setTickets] = useState<Ticket[]>(() =>
    seedTickets.filter((ticket) => ticket.requesterId === user.id)
  )
  const [value, setValue] = useState<TicketFormValue>(emptyForm)
  const [errors, setErrors] = useState<TicketFormErrors>({})
  const [notice, setNotice] = useState("")
  const [leaveOpen, setLeaveOpen] = useState(false)
  const draftRaw = useSyncExternalStore(subscribeDraft, getDraftSnapshot, () => null)
  const [draftDismissed, setDraftDismissed] = useState(false)
  const [saved, setSaved] = useState(true)
  const showDraft = Boolean(draftRaw) && !draftDismissed

  const errorBanner = useMemo(() => {
    const count = Object.keys(errors).length
    if (!count) return ""
    return text.formError.replace("{n}", String(count))
  }, [errors, text.formError])

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as TicketFormValue
      setValue({ ...emptyForm, ...parsed, files: [] })
      setDraftDismissed(true)
      setSaved(true)
    } catch {
      setDraftDismissed(true)
    }
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...value, files: [] }))
      setSaved(true)
      setDraftDismissed(true)
      setNotice(text.draftSaved)
      setLeaveOpen(false)
    } catch {
      /* ignore */
    }
  }

  function validate() {
    const next: TicketFormErrors = {}
    if (!value.subject.trim()) next.subject = text.subjectError
    if (!value.category) next.category = text.categoryError
    if (!value.priority) next.priority = text.priorityError
    if (value.description.trim().length < 30) next.description = text.descriptionError
    setErrors(next)
    return next
  }

  function submit() {
    const next = validate()
    if (Object.keys(next).length) return
    const id = nextTicketId(tickets)
    const created: Ticket = {
      id,
      subject: value.subject.trim(),
      description: value.description.trim(),
      status: "open",
      priority: value.priority,
      category: value.category || "other",
      module: value.module || "other",
      environment: value.environment || "production",
      requesterId: user.id,
      createdAt: new Date(TICKET_NOW_MS).toISOString(),
      updatedAt: new Date(TICKET_NOW_MS).toISOString(),
      unread: false,
      tags: [],
      attachments: value.files.map((file) => ({
        id: file.id,
        name: file.name,
        sizeLabel: `${Math.round(file.size / 1024)} KB`,
      })),
      messages: [
        {
          id: `m${id}-1`,
          type: "user",
          authorId: user.id,
          body: value.description.trim(),
          createdAt: new Date(TICKET_NOW_MS).toISOString(),
        },
      ],
    }
    setTickets((current) => [created, ...current])
    setValue(emptyForm)
    setErrors({})
    setSaved(true)
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      /* ignore */
    }
    setNotice(`${text.submitted} · #${id}`)
  }

  function requestLeave() {
    if (isDirty(value) && !saved) {
      setLeaveOpen(true)
      return
    }
    router.push(`${prefix}/ticket`)
  }

  return (
    <DensityBoard>
      <div className="flex w-full flex-col gap-4 p-0.5">
        {showDraft ? (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm">
            <span>{text.restoreDraft}</span>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => setDraftDismissed(true)}>
                {text.dismissDraft}
              </Button>
              <Button type="button" size="sm" onClick={restoreDraft}>
                {text.restore}
              </Button>
            </div>
          </div>
        ) : null}

        <TicketNotice message={notice} onClear={() => setNotice("")} />

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="p-px lg:col-span-8">
            <TicketForm
              locale={locale}
              value={value}
              errors={errors}
              errorBanner={errorBanner}
              onChange={(next) => {
                setValue(next)
                setSaved(false)
              }}
              onSubmit={submit}
              onDraft={saveDraft}
              onCancel={requestLeave}
            />
          </div>
          <div className="p-px lg:col-span-4">
            <TicketSideCards locale={locale} prefix={prefix} subject={value.subject} previous={tickets} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 -mx-4 mt-4 border-t border-border bg-card px-4 py-3 md:hidden">
        <div className="flex flex-col gap-2">
          <Button type="button" className="min-h-11 w-full" onClick={submit}>
            <Send />
            {text.submit}
          </Button>
          <Button type="button" variant="outline" className="min-h-11 w-full" onClick={saveDraft}>
            {text.saveDraft}
          </Button>
          <Button type="button" variant="ghost" className="min-h-11 w-full" onClick={requestLeave}>
            {text.cancel}
          </Button>
        </div>
      </div>

      <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{text.unsavedTitle}</DialogTitle>
          </DialogHeader>
          <p className="px-4 text-sm text-muted-foreground">{text.unsavedBody}</p>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button type="button" variant="ghost" onClick={() => setLeaveOpen(false)}>
              {text.stay}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setLeaveOpen(false)
                router.push(`${prefix}/ticket`)
              }}
            >
              {text.leave}
            </Button>
            <Button type="button" onClick={saveDraft}>
              {text.saveDraft}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DensityBoard>
  )
}
