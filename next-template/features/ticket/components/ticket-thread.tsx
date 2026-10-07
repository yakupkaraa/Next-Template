"use client"

import { useEffect, useRef } from "react"
import { Lock } from "lucide-react"
import { inboxCopy } from "@/features/ticket/constants/copy"
import {
  formatRelative,
  personById,
  type Ticket,
  type TicketRole,
} from "@/features/ticket/data"
import type { ContentLocale } from "@/lib/i18n"
import { cn } from "cn"

export function TicketThread({
  locale,
  ticket,
  role,
}: {
  locale: ContentLocale
  ticket: Ticket
  role: TicketRole
}) {
  const text = inboxCopy(locale)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [ticket.messages.length])

  const messages =
    role === "admin"
      ? ticket.messages
      : ticket.messages.filter((message) => message.type !== "internal")

  return (
    <div className="px-4 py-4">
      <ul className="flex flex-col gap-3">
        {messages.map((message) => {
          const author = personById(message.authorId)
          if (message.type === "system") {
            return (
              <li key={message.id} className="flex items-center gap-2 text-center text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                {message.body} · {formatRelative(message.createdAt, locale)}
                <span className="h-px flex-1 bg-border" />
              </li>
            )
          }
          if (message.type === "internal") {
            return (
              <li
                key={message.id}
                className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              >
                <p className="mb-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Lock className="size-3.5" />
                  {text.internalHint}
                </p>
                <p>{message.body}</p>
              </li>
            )
          }
          const admin = message.type === "admin"
          return (
            <li key={message.id} className={cn("flex", admin ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[min(100%,36rem)] rounded-xl border px-3 py-2 text-sm",
                  admin ? "border-transparent bg-primary/10 text-foreground" : "border-border bg-card"
                )}
              >
                <p className="text-[11px] text-muted-foreground">
                  {author?.name} · {formatRelative(message.createdAt, locale)}
                </p>
                <p className="mt-1 whitespace-pre-wrap">{message.body}</p>
                {message.attachments?.length ? (
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {message.attachments.map((file) => (
                      <li
                        key={file.id}
                        className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {file.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
      <div ref={endRef} />
    </div>
  )
}
