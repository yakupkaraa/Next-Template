"use client"

import { BookOpen, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { createCopy } from "@/features/ticket/create/constants/copy"
import { suggestedArticles } from "@/features/ticket/utils/ticket"
import type { ContentLocale } from "@/lib/i18n"

export function TicketSideCards({
  locale,
  prefix,
  subject,
}: {
  locale: ContentLocale
  prefix: string
  subject: string
}) {
  const text = createCopy(locale)
  const suggested = suggestedArticles(subject, locale)

  if (!suggested.length) return null

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-20">
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
    </div>
  )
}
