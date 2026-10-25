"use client"

import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { OrderRow } from "@/features/tables/types/order"

export function OrderRowActions({
  row,
  editLabel,
  deleteLabel,
  menuLabel,
  onEdit,
  onDelete,
  onPreload,
}: {
  row: OrderRow
  editLabel: string
  deleteLabel: string
  menuLabel: string
  onEdit: (row: OrderRow) => void
  onDelete: (row: OrderRow) => void
  onPreload?: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={menuLabel}
            onPointerEnter={onPreload}
            onFocus={onPreload}
          />
        }
      >
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuItem onClick={() => onEdit(row)}>
          <Pencil />
          {editLabel}
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={() => onDelete(row)}>
          <Trash2 />
          {deleteLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
