import type { ProfileFieldConfig } from "../constants/profile-fields"

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
