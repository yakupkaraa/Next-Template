import { userColumnKeys } from "@/features/users/constants/users"
import type { UserRow } from "@/features/users/types/user"
import { emptyUserFormValues } from "@/features/users/utils/users"
import { userCreateDemo } from "../../mocks/users.mock"
import type { ProfileFieldConfig } from "../types/profile-fields"

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

function emptyProfileValues(): UserRow {
  return {
    ...emptyUserFormValues(),
    ...Object.fromEntries(userColumnKeys.map((key) => [key, ""])),
  } as UserRow
}

export function initialValues(intent: "create" | "edit"): UserRow {
  if (intent === "create") return emptyProfileValues()
  return {
    ...emptyProfileValues(),
    id: "24",
    firstName: userCreateDemo.nameValue.split(" ")[0] ?? "",
    lastName: userCreateDemo.nameValue.split(" ").slice(1).join(" "),
    username: "jdoe",
    email: userCreateDemo.emailValue,
    phone: userCreateDemo.phoneValue,
    company: userCreateDemo.companyValue,
    country: userCreateDemo.countryValue,
    city: "İstanbul",
    department: "Ürün",
    title: "Kıdemli",
    team: "Alpha",
    manager: "Ayşe Yılmaz",
    language: "Türkçe",
    timezone: "Europe/Istanbul",
    note: userCreateDemo.noteValue,
    role: "Editör",
    status: "Aktif",
    plan: "Pro",
    joined: "12.03.2024",
    lastSeen: "03.10.2026",
    score: "86",
    orders: "14",
    balance: "1280 TL",
    verified: "Evet",
  }
}
