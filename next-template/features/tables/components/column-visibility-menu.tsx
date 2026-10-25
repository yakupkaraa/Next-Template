"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ColumnVisibilityMenu({
  columns,
  visibility,
  onVisibilityChange,
  triggerLabel,
}: {
  columns: { id: string; label: string }[]
  visibility: Record<string, boolean>
  onVisibilityChange: (next: Record<string, boolean>) => void
  triggerLabel: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        render={<Button type="button" variant="outline" className="bg-card" />}
      >
        <SlidersHorizontal />
        {triggerLabel}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={visibility[column.id] ?? true}
            onCheckedChange={(checked) =>
              onVisibilityChange({ ...visibility, [column.id]: checked === true })
            }
          >
            {column.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
