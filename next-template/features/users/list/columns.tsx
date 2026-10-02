"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { CountryFlag } from "@/components/shared/locale-flag"
import { StatusBadge, type StatusBadgeTone } from "@/components/ui/status-badge"
import type { DataTableFeatures } from "@/components/ui/data-table-features"
import { UserRowActions } from "@/features/users/list/row-actions"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  userColumnKeys,
  type UserColumnKey,
  type UserRow,
} from "@/features/users/data"

function statusTone(value: string): StatusBadgeTone {
  if (value === "Aktif") return "success"
  if (value === "Beklemede") return "warning"
  return "danger"
}

function renderCell(key: UserColumnKey, value: string, confirmedLabel: string) {
  if (key === "status") return <StatusBadge tone={statusTone(value)}>{value}</StatusBadge>
  if (key === "verified") {
    return (
      <StatusBadge tone={value === confirmedLabel ? "success" : "danger"}>{value}</StatusBadge>
    )
  }
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

export function getUserListColumns(
  locale: ContentLocale,
  actions: {
    onEdit: (row: UserRow) => void
    onDelete: (row: UserRow) => void
  }
) {
  const list = getDictionary(locale).users.list
  const upper = locale === "en" ? "en-US" : "tr-TR"

  return columnHelper.columns([
    ...userColumnKeys.map((key) =>
      columnHelper.accessor(key, {
        header: list.columns[key].toLocaleUpperCase(upper),
        cell: ({ row }) => renderCell(key, row.getValue(key), list.confirmed),
      })
    ),
    columnHelper.display({
      id: "actions",
      header: list.actions.toLocaleUpperCase(upper),
      enablePinning: true,
      size: 56,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <UserRowActions
            row={row.original}
            editLabel={list.edit}
            deleteLabel={list.delete}
            menuLabel={list.actionsMenu}
            onEdit={actions.onEdit}
            onDelete={actions.onDelete}
          />
        </div>
      ),
    }),
  ])
}
