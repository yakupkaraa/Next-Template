import type { userColumnKeys } from "../constants/users"

export type UserColumnKey = (typeof userColumnKeys)[number]
export type UserRow = Record<UserColumnKey, string>
