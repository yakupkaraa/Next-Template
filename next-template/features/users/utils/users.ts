import type { StatusBadgeTone } from "@/components/shared/status-badge"
import { userFormFieldKeys } from "../constants/users"
import type { UserRow } from "../types/user"

export function emptyUserFormValues(): UserRow {
  return Object.fromEntries(userFormFieldKeys.map((key) => [key, ""])) as UserRow
}

export function userStatusTone(value: string): StatusBadgeTone {
  if (value === "Aktif") return "success"
  if (value === "Beklemede") return "warning"
  return "danger"
}
