import type { ContentLocale } from "@/lib/i18n"
import { getDictionary } from "@/lib/i18n"
import {
  userCityOptions,
  userCompanyOptions,
  userCountryOptions,
  userDepartmentOptions,
  userLanguageOptions,
  userPlanOptions,
  userRoleOptions,
  userStatusOptions,
  userTeamOptions,
  userTimezoneOptions,
  userTitleOptions,
  type UserColumnKey,
} from "@/features/users/data"

export type UserFormFieldKind =
  | { type: "text" }
  | { type: "email" }
  | { type: "tel" }
  | { type: "number" }
  | { type: "date" }
  | { type: "select"; options: readonly string[] }
  | { type: "textarea" }

export function userFormFieldKind(
  key: UserColumnKey,
  locale: ContentLocale
): UserFormFieldKind {
  const list = getDictionary(locale).users.list

  switch (key) {
    case "email":
      return { type: "email" }
    case "phone":
      return { type: "tel" }
    case "score":
    case "orders":
      return { type: "number" }
    case "joined":
    case "lastSeen":
      return { type: "date" }
    case "note":
      return { type: "textarea" }
    case "role":
      return { type: "select", options: userRoleOptions }
    case "status":
      return { type: "select", options: userStatusOptions }
    case "department":
      return { type: "select", options: userDepartmentOptions }
    case "city":
      return { type: "select", options: userCityOptions }
    case "country":
      return { type: "select", options: userCountryOptions }
    case "company":
      return { type: "select", options: userCompanyOptions }
    case "title":
      return { type: "select", options: userTitleOptions }
    case "language":
      return { type: "select", options: userLanguageOptions }
    case "timezone":
      return { type: "select", options: userTimezoneOptions }
    case "plan":
      return { type: "select", options: userPlanOptions }
    case "team":
      return { type: "select", options: userTeamOptions }
    case "verified":
      return {
        type: "select",
        options: [list.confirmed, list.notConfirmed],
      }
    default:
      return { type: "text" }
  }
}

/** +90 5XX XXX XX XX */
export function formatPhoneInput(raw: string) {
  let digits = raw.replace(/\D/g, "")
  if (digits.startsWith("90")) digits = digits.slice(2)
  if (digits.startsWith("0")) digits = digits.slice(1)
  digits = digits.slice(0, 10)

  if (digits.length === 0) return ""

  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)].filter(
    Boolean
  )
  return `+90 ${parts.join(" ")}`.trim()
}

/** GG.AA.YYYY */
export function formatDateInput(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}
