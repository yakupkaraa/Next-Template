import type { UserColumnKey } from "@/features/users/types/user"
import type { profileSectionKeys } from "../constants/profile-fields"

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
