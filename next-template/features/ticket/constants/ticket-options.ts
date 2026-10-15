import type { TicketCategory, TicketEnvironment, TicketModule } from "../types/ticket"

/** Göreli zaman hesapları için sabit referans (render'da Date.now yok). */
export const TICKET_NOW_MS = Date.parse("2026-10-03T12:00:00.000Z")

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
