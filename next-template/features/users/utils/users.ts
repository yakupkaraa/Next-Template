import { userFormFieldKeys } from "../constants/users"
import type { UserRow } from "../types/user"

export function emptyUserFormValues(): UserRow {
  return Object.fromEntries(userFormFieldKeys.map((key) => [key, ""])) as UserRow
}
