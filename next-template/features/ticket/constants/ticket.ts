import type { ContentLocale } from "@/lib/i18n"

/** Göreli zaman hesapları için sabit referans (render'da Date.now yok). */
export const TICKET_NOW_MS = Date.parse("2026-10-03T12:00:00.000Z")

export type TicketRole = "admin" | "user"

export type TicketStatus = "open" | "in_review" | "resolved" | "closed"
export type TicketPriority = "low" | "normal" | "high" | "urgent"
export type TicketCategory = "technical" | "account" | "billing" | "feature" | "other"
export type TicketModule = "users" | "blog" | "operations" | "other"
export type TicketEnvironment = "production" | "test"
export type TicketMessageType = "user" | "admin" | "internal" | "system"

export type TicketPerson = {
  id: string
  name: string
  email: string
  role: TicketRole
}

export type TicketAttachment = {
  id: string
  name: string
  sizeLabel: string
}

export type TicketMessage = {
  id: string
  type: TicketMessageType
  authorId: string
  body: string
  createdAt: string
  attachments?: TicketAttachment[]
}

export type Ticket = {
  id: number
  subject: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  module: TicketModule
  environment: TicketEnvironment
  requesterId: string
  assigneeId?: string
  createdAt: string
  updatedAt: string
  slaDueAt?: string
  unread: boolean
  tags: string[]
  attachments: TicketAttachment[]
  messages: TicketMessage[]
}

export type HelpArticle = {
  id: string
  title: { tr: string; en: string }
  excerpt: { tr: string; en: string }
  keywords: string[]
}

export const ticketCategories: { id: TicketCategory; tr: string; en: string }[] = [
  { id: "technical", tr: "Teknik sorun", en: "Technical issue" },
  { id: "account", tr: "Hesap ve giriş", en: "Account and sign-in" },
  { id: "billing", tr: "Faturalama", en: "Billing" },
  { id: "feature", tr: "Özellik talebi", en: "Feature request" },
  { id: "other", tr: "Diğer", en: "Other" },
]

export const ticketModules: { id: TicketModule; tr: string; en: string }[] = [
  { id: "users", tr: "Kullanıcı", en: "Users" },
  { id: "blog", tr: "Blog", en: "Blog" },
  { id: "operations", tr: "Operasyon", en: "Operations" },
  { id: "other", tr: "Diğer", en: "Other" },
]

export const ticketEnvironments: { id: TicketEnvironment; tr: string; en: string }[] = [
  { id: "production", tr: "Üretim", en: "Production" },
  { id: "test", tr: "Test", en: "Test" },
]

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
