"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { CountryFlag } from "@/components/shared/locale-flag"
import { Badge } from "@/components/ui/badge"
import type { DataTableFeatures } from "@/components/ui/data-table-features"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  userColumnKeys,
  type UserColumnKey,
  type UserRow,
} from "@/features/users/data"

const statusColors: Record<string, string> = {
  Aktif: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Beklemede: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Pasif: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
}

function StatusChip({ value }: { value: string }) {
  return (
    <Badge variant="secondary" className={statusColors[value]}>
      {value}
    </Badge>
  )
}

function VerifiedChip({ value, confirmedLabel }: { value: string; confirmedLabel: string }) {
  const confirmed = value === confirmedLabel

  return (
    <Badge
      variant="secondary"
      className={
        confirmed
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
      }
    >
      {value}
    </Badge>
  )
}

function renderCell(key: UserColumnKey, value: string, confirmedLabel: string) {
  if (key === "status") return <StatusChip value={value} />
  if (key === "verified") return <VerifiedChip value={value} confirmedLabel={confirmedLabel} />
  if (key === "country") {
    return (
      <span className="inline-flex items-center gap-2">
        <CountryFlag country={value} />
        {value}
      </span>
    )
  }
  return value
}

const columnHelper = createColumnHelper<DataTableFeatures, UserRow>()

export function getUserListColumns(locale: ContentLocale) {
  const list = getDictionary(locale).users.list
  const upper = locale === "en" ? "en-US" : "tr-TR"

  return columnHelper.columns(
    userColumnKeys.map((key) =>
      columnHelper.accessor(key, {
        header: list.columns[key].toLocaleUpperCase(upper),
        cell: ({ row }) => renderCell(key, row.getValue(key), list.confirmed),
      })
    )
  )
}
