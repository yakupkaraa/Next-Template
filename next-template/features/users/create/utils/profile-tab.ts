import { userColumnKeys } from "@/features/users/constants/users"
import type { UserRow } from "@/features/users/types/user"
import { emptyUserFormValues } from "@/features/users/utils/users"
import { userCreateDemo } from "../../mocks/users.mock"
import { ALLOWED_AVATAR_TYPES, MAX_AVATAR_BYTES } from "../constants/profile-fields"
import type { ProfileFieldConfig } from "../types/profile-fields"

export function isFieldEditable(field: ProfileFieldConfig, mode: "self" | "admin") {
  if (field.editableIn === "both") return true
  return field.editableIn === mode
}

export const NOTE_MAX = 160
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type AvatarFileError = "type" | "size"

export function validateAvatarFile(file: File): AvatarFileError | null {
  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) return "type"
  if (file.size > MAX_AVATAR_BYTES) return "size"
  return null
}

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
