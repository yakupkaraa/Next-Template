"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DataTableExpandCell({
  expanded,
  controlsId,
  label,
  onToggle,
  onPreload,
}: {
  expanded: boolean
  controlsId: string
  label: string
  onToggle: () => void
  onPreload?: () => void
}) {
  const Icon = expanded ? ChevronDown : ChevronRight

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-expanded={expanded}
      aria-controls={controlsId}
      aria-label={label}
      onPointerEnter={onPreload}
      onFocus={onPreload}
      onClick={onToggle}
    >
      <Icon />
    </Button>
  )
}
