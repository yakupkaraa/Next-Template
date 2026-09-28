"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { CountryFlag } from "@/components/layout/header/locale-flag"
import { Badge } from "@/components/ui/badge"
import type { DataTableFeatures } from "@/components/ui/data-table-features"
import { userColumns, userListView, type UserColumnKey, type UserRow } from "./data"

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

function VerifiedChip({ value }: { value: string }) {
  const confirmed = value === userListView.confirmed

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

function renderCell(key: UserColumnKey, value: string) {
  if (key === "status") return <StatusChip value={value} />
  if (key === "verified") return <VerifiedChip value={value} />
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

export const columns = columnHelper.columns(
  userColumns.map((column) =>
    columnHelper.accessor(column.key, {
      header: column.label.toLocaleUpperCase("tr"),
      cell: ({ row }) => renderCell(column.key, row.getValue(column.key)),
    })
  )
)
