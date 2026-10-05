"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { CountryFlag } from "@/components/shared/locale-flag"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { StatusBadge, type StatusBadgeTone } from "@/components/ui/status-badge"
import type { DataTableFeatures } from "@/components/ui/data-table-features"
import { UserRowActions } from "@/features/users/list/row-actions"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { cn } from "cn"
import {
  userColumnKeys,
  type UserColumnKey,
  type UserRow,
} from "@/features/users/data"

const tableCheckboxClass =
  "size-[18px] border-2 border-muted-foreground bg-background data-checked:border-primary dark:border-foreground/70"

const avatarSurfaces = [
  "bg-primary text-primary-foreground",
  "bg-chart-2 text-white",
  "bg-chart-3 text-white",
  "bg-chart-4 text-white",
] as const

function userInitials(user: UserRow) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toLocaleUpperCase("tr")
}

function statusTone(value: string): StatusBadgeTone {
  if (value === "Aktif") return "success"
  if (value === "Beklemede") return "warning"
  return "danger"
}

function roleBadgeClass(role: string) {
  if (role === "Yönetici") return "border-primary/30 bg-primary/10 text-primary"
  if (role === "Editör") return "border-info/30 bg-info/10 text-info"
  if (role === "Analist") return "border-warning/30 bg-warning/10 text-warning"
  return "border-border bg-muted text-muted-foreground"
}

function renderCell(key: UserColumnKey, value: string, confirmedLabel: string) {
  if (key === "status") return <StatusBadge tone={statusTone(value)}>{value}</StatusBadge>
  if (key === "role") {
    return (
      <Badge variant="outline" className={cn("font-medium", roleBadgeClass(value))}>
        {value}
      </Badge>
    )
  }
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
    selected: Set<string>
    onToggle: (id: string, checked: boolean) => void
    onToggleAll: (checked: boolean) => void
    allSelected: boolean
    someSelected: boolean
  }
) {
  const list = getDictionary(locale).users.list
  const upper = locale === "en" ? "en-US" : "tr-TR"

  return columnHelper.columns([
    columnHelper.display({
      id: "select",
      enableSorting: false,
      enableColumnFilter: false,
      header: () => (
        <div className="flex justify-center">
          <Checkbox
            checked={actions.allSelected}
            indeterminate={actions.someSelected}
            aria-label={list.selectAll}
            className={tableCheckboxClass}
            onCheckedChange={(checked) => actions.onToggleAll(checked === true)}
          />
        </div>
      ),
      size: 44,
      enablePinning: true,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={actions.selected.has(row.original.id)}
            aria-label={`${list.selectRow}: ${row.original.firstName} ${row.original.lastName}`}
            className={tableCheckboxClass}
            onCheckedChange={(checked) => actions.onToggle(row.original.id, checked === true)}
          />
        </div>
      ),
    }),
    ...userColumnKeys.flatMap((key) => {
      if (key === "lastName") return []
      if (key === "firstName") {
        return [
          columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`.trim(), {
            id: "name",
            header: list.name.toLocaleUpperCase(upper),
            size: 220,
            filterFn: "excel",
            sortFn: "alphanumeric",
            cell: ({ row }) => {
              const user = row.original
              const name = `${user.firstName} ${user.lastName}`.trim()
              const tone = Number.parseInt(user.id, 10) % avatarSurfaces.length
              return (
                <span className="flex min-w-0 items-center gap-2.5">
                  <Avatar size="sm" className="size-8">
                    <AvatarFallback
                      className={cn("text-[11px] font-semibold", avatarSurfaces[tone])}
                    >
                      {userInitials(user)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate font-medium">{name}</span>
                </span>
              )
            },
          }),
        ]
      }
      return [
        columnHelper.accessor((row) => row[key], {
          id: key,
          header: list.columns[key].toLocaleUpperCase(upper),
          filterFn: "excel",
          sortFn: "alphanumeric",
          cell: ({ row }) => renderCell(key, row.getValue(key), list.confirmed),
        }),
      ]
    }),
    columnHelper.display({
      id: "actions",
      header: list.actions.toLocaleUpperCase(upper),
      enablePinning: true,
      enableSorting: false,
      enableColumnFilter: false,
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
