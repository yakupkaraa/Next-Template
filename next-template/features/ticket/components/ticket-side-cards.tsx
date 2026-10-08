"use client"

import { BookOpen, ChevronRight, Clock } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { TicketStatusBadge } from "@/features/ticket/components/ticket-badges"
import { createCopy } from "@/features/ticket/create/constants/copy"
import { formatRelative, type Ticket } from "@/features/ticket/constants/ticket"
import { helpArticles } from "@/features/ticket/mocks/ticket.mock"
import type { ContentLocale } from "@/lib/i18n"

export function TicketSideCards({
  locale,
  prefix,
  subject,
  previous,
}: {
  locale: ContentLocale
  prefix: string
  subject: string
  previous: Ticket[]
}) {
  const text = createCopy(locale)
  const query = subject.trim().toLocaleLowerCase(locale === "en" ? "en" : "tr")
  const suggested =
    query.length >= 8
      ? helpArticles
          .filter((article) => article.keywords.some((word) => query.includes(word)))
          .slice(0, 3)
      : []

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-20">
      {suggested.length > 0 ? (
        <Card className="gap-0 py-0 shadow-sm">
          <CardContent className="flex flex-col gap-3 py-4">
            <h2 className="font-semibold">{text.suggested}</h2>
            <ul className="flex flex-col gap-1">
              {suggested.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`${prefix}/ticket`}
                    className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-muted/50"
                  >
                    <BookOpen className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{article.title[locale]}</span>
                      <span className="line-clamp-1 text-xs text-muted-foreground">
                        {article.excerpt[locale]}
                      </span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">{text.suggestedHint}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card className="gap-0 py-0 shadow-sm">
        <CardContent className="flex flex-col gap-3 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{text.previous}</h2>
            <Link href={`${prefix}/ticket`} className="text-xs font-medium text-primary">
              {text.viewAll}
            </Link>
          </div>
          <ul className="flex flex-col gap-2">
            {previous.slice(0, 4).map((ticket) => (
              <li key={ticket.id}>
                <Link
                  href={`${prefix}/ticket?id=${ticket.id}`}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted/50"
                >
                  <span className="text-xs text-muted-foreground">#{ticket.id}</span>
                  <span className="min-w-0 flex-1 truncate text-sm">{ticket.subject}</span>
                  <TicketStatusBadge status={ticket.status} locale={locale} />
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {formatRelative(ticket.updatedAt, locale)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="gap-0 border-0 bg-muted py-0 shadow-sm">
        <CardContent className="flex flex-col gap-2 py-4">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <h2 className="font-semibold">{text.hoursTitle}</h2>
          </div>
          <p className="text-sm">{text.hours}</p>
          <p className="text-sm text-muted-foreground">{text.avgReply}</p>
          <p className="flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-primary" aria-hidden />
            {text.online}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
