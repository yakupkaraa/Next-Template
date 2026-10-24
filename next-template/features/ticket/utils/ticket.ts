import type { ContentLocale } from "@/lib/i18n"
import { TICKET_NOW_MS } from "../constants/ticket-options"
import { helpArticles } from "../mocks/ticket.mock"
import type { HelpArticle, Ticket } from "../types/ticket"

export function suggestedArticles(subject: string, locale: ContentLocale): HelpArticle[] {
  const query = subject.trim().toLocaleLowerCase(locale === "en" ? "en" : "tr")
  if (query.length < 8) return []
  return helpArticles
    .filter((article) => article.keywords.some((word) => query.includes(word)))
    .slice(0, 3)
}

export function labelOf(
  items: { id: string; tr: string; en: string }[],
  id: string,
  locale: ContentLocale
) {
  return items.find((item) => item.id === id)?.[locale] ?? id
}

export function openTicketCount(tickets: Ticket[]) {
  return tickets.filter((ticket) => ticket.status === "open" || ticket.status === "in_review")
    .length
}

export function slaBreached(ticket: Ticket) {
  return Boolean(ticket.slaDueAt && Date.parse(ticket.slaDueAt) < TICKET_NOW_MS)
}

export function formatRelative(iso: string, locale: ContentLocale) {
  const diffMs = Date.parse(iso) - TICKET_NOW_MS
  const abs = Math.abs(diffMs)
  const minute = 60_000
  const hour = 3600_000
  const day = 86_400_000
  const rtf = new Intl.RelativeTimeFormat(locale === "en" ? "en" : "tr", { numeric: "auto" })
  if (abs < hour) return rtf.format(Math.round(diffMs / minute), "minute")
  if (abs < day) return rtf.format(Math.round(diffMs / hour), "hour")
  return rtf.format(Math.round(diffMs / day), "day")
}

export function formatDateTime(iso: string, locale: ContentLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso))
}

export function formatSla(iso: string | undefined, locale: ContentLocale) {
  if (!iso) return "—"
  const diff = Date.parse(iso) - TICKET_NOW_MS
  if (diff < 0) return locale === "en" ? "SLA overdue" : "SLA aşıldı"
  const hours = Math.floor(diff / 3600_000)
  const minutes = Math.round((diff % 3600_000) / 60_000)
  return locale === "en" ? `SLA ${hours}h ${minutes}m` : `SLA ${hours}s ${minutes}dk`
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr")
}

export function nextTicketId(tickets: Ticket[]) {
  return tickets.reduce((max, ticket) => Math.max(max, ticket.id), 0) + 1
}
