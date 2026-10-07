import type { UserColumnKey } from "@/features/users/data"
import {
  userCountryOptions,
  userDepartmentOptions,
  userLanguageOptions,
  userPlanOptions,
  userRoleOptions,
  userStatusOptions,
  userTeamOptions,
  userTimezoneOptions,
  userTitleOptions,
} from "@/features/users/data"

export const profileSectionKeys = ["personal", "contact", "org", "prefs"] as const
export type ProfileSectionKey = (typeof profileSectionKeys)[number]

export type ProfileFieldKind =
  | "text"
  | "select"
  | "combobox"
  | "textarea"
  | "tel"
  | "email"
  | "readonly"
export type ProfileEditScope = "self" | "admin" | "both"

export type ProfileFieldConfig = {
  key: UserColumnKey
  section: ProfileSectionKey | "account"
  kind: ProfileFieldKind
  editableIn: ProfileEditScope
  required: boolean
}

export const profileFields: readonly ProfileFieldConfig[] = [
  { key: "firstName", section: "personal", kind: "text", editableIn: "both", required: true },
  { key: "lastName", section: "personal", kind: "text", editableIn: "both", required: true },
  { key: "username", section: "personal", kind: "text", editableIn: "both", required: false },
  { key: "note", section: "personal", kind: "textarea", editableIn: "both", required: false },
  { key: "email", section: "contact", kind: "email", editableIn: "both", required: true },
  { key: "phone", section: "contact", kind: "tel", editableIn: "both", required: false },
  { key: "country", section: "contact", kind: "select", editableIn: "both", required: false },
  { key: "city", section: "contact", kind: "combobox", editableIn: "both", required: false },
  { key: "company", section: "org", kind: "text", editableIn: "both", required: false },
  { key: "department", section: "org", kind: "combobox", editableIn: "both", required: false },
  { key: "title", section: "org", kind: "combobox", editableIn: "both", required: false },
  { key: "team", section: "org", kind: "combobox", editableIn: "both", required: false },
  { key: "manager", section: "org", kind: "combobox", editableIn: "both", required: false },
  { key: "language", section: "prefs", kind: "select", editableIn: "both", required: false },
  { key: "timezone", section: "prefs", kind: "select", editableIn: "both", required: false },
  { key: "id", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "role", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "status", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "plan", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "joined", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "lastSeen", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "score", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "orders", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "balance", section: "account", kind: "readonly", editableIn: "admin", required: false },
  { key: "verified", section: "account", kind: "readonly", editableIn: "admin", required: false },
] as const

export const citiesByCountry: Record<(typeof userCountryOptions)[number], readonly string[]> = {
  Türkiye: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"],
  Almanya: ["Berlin", "Münih", "Hamburg", "Köln"],
  Hollanda: ["Amsterdam", "Rotterdam", "Utrecht"],
  İngiltere: ["Londra", "Manchester", "Edinburgh"],
}

export const managerOptions = [
  "Ayşe Yılmaz",
  "Mehmet Kaya",
  "Elif Demir",
  "Can Şahin",
] as const

export const fieldSelectOptions: Partial<Record<UserColumnKey, readonly string[]>> = {
  country: userCountryOptions,
  language: userLanguageOptions,
  timezone: userTimezoneOptions,
  role: userRoleOptions,
  status: userStatusOptions,
  plan: userPlanOptions,
  verified: ["Evet", "Hayır"],
}

export const fieldComboboxOptions: Partial<Record<UserColumnKey, readonly string[]>> = {
  department: userDepartmentOptions,
  title: userTitleOptions,
  team: userTeamOptions,
  manager: managerOptions,
}

export function isFieldEditable(field: ProfileFieldConfig, mode: "self" | "admin") {
  if (field.editableIn === "both") return true
  return field.editableIn === mode
}

export function parseDotDate(value: string) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim())
  if (!match) return null
  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }
  return date
}

export function formatProfileDate(value: string, locale: string) {
  const date = parseDotDate(value)
  if (!date) return value
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatProfileBalance(value: string, locale: string) {
  const digits = value.replace(/[^\d.,-]/g, "").replace(",", ".")
  const amount = Number.parseFloat(digits)
  if (Number.isNaN(amount)) return value
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(amount)
}

export const NOTE_MAX = 160
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const controlClass =
  "h-11 border-input text-sm focus-visible:border-primary focus-visible:ring-ring/30"
