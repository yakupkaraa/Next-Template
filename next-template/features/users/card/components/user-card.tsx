"use client"

import { memo } from "react"
import {
  Building2,
  Copy,
  Mail,
  MoreVertical,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge, type StatusBadgeTone } from "@/components/shared/status-badge"
import { cn } from "@/lib/utils"
import type { UserRow } from "@/features/users/types/user"

export const CARD_FRAME_CLASS = "h-full min-h-[21rem]"

export const cardSurfaces = [
  "bg-primary/12 ring-primary/20",
  "bg-[color-mix(in_oklch,var(--chart-3)_16%,var(--card))] ring-border",
  "bg-[color-mix(in_oklch,var(--primary)_8%,var(--card))] ring-primary/15",
  "bg-[color-mix(in_oklch,var(--chart-2)_14%,var(--card))] ring-border",
] as const

export const avatarSurfaces = [
  "bg-primary text-primary-foreground",
  "bg-chart-2 text-white",
  "bg-chart-3 text-white",
  "bg-chart-4 text-white",
] as const

export function initials(user: UserRow) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toLocaleUpperCase("tr")
}

export function toneIndex(user: UserRow) {
  return Number.parseInt(user.id, 10) % cardSurfaces.length
}

export function statusTone(value: string): StatusBadgeTone {
  if (value === "Aktif") return "success"
  if (value === "Beklemede") return "warning"
  return "danger"
}

export const UserCard = memo(function UserCard({
  user,
  selected,
  copyLabel,
  editLabel,
  deleteLabel,
  menuLabel,
  onToggle,
  onEdit,
  onDelete,
  onCopy,
}: {
  user: UserRow
  selected: boolean
  copyLabel: string
  editLabel: string
  deleteLabel: string
  menuLabel: string
  onToggle: (id: string, checked: boolean) => void
  onEdit: (user: UserRow) => void
  onDelete: (user: UserRow) => void
  onCopy: (user: UserRow) => void
}) {
  const tone = toneIndex(user)

  return (
    <Card
      className={cn(
        CARD_FRAME_CLASS,
        "gap-0 overflow-hidden rounded-2xl border-0 py-0 shadow-none ring-1",
        cardSurfaces[tone]
      )}
    >
      <CardContent className="flex flex-col gap-3 px-4 pt-4 pb-3">
        <div className="flex items-start justify-between">
          <Checkbox
            checked={selected}
            aria-label={`${user.firstName} ${user.lastName}`}
            className="size-5 rounded-md border-primary data-checked:bg-primary"
            onCheckedChange={(checked) => onToggle(user.id, checked === true)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  aria-label={menuLabel}
                />
              }
            >
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Pencil />
                {editLabel}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCopy(user)}>
                <Copy />
                {copyLabel}
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(user)}>
                <Trash2 />
                {deleteLabel}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col items-center text-center">
          <Avatar className="size-16">
            <AvatarFallback className={cn("text-base font-semibold", avatarSurfaces[tone])}>
              {initials(user)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-3 max-w-full truncate text-[15px] font-semibold">
            {user.firstName} {user.lastName}
          </CardTitle>
          <p className="mt-0.5 max-w-full truncate text-xs text-muted-foreground">{user.title}</p>
          <StatusBadge className="mt-2" tone={statusTone(user.status)}>
            {user.status}
          </StatusBadge>
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <p className="flex min-w-0 items-center gap-2">
            <Building2 className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">
              {user.department} · {user.company}
            </span>
          </p>
          <p className="flex min-w-0 items-center gap-2">
            <Mail className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{user.email}</span>
          </p>
          <p className="flex min-w-0 items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{user.phone}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
})
