"use client"

import { createColumnHelper, type RowData } from "@tanstack/react-table"
import { GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDataTableRowDragHandle } from "@/components/shared/data-table-reorder-context"
import { dataTableFeatures } from "@/components/shared/data-table-features"
import type { DataTableReorderConfig } from "@/components/shared/data-table.types"

function DragHandleCell({ label }: { label: string }) {
  const handle = useDataTableRowDragHandle()
  const interactive = handle !== null && handle.ready && !handle.disabled
  const loadedButDisabled = handle !== null && handle.ready && handle.disabled
  const dragProps =
    interactive && handle ? { ...handle.attributes, ...handle.listeners } : { "aria-disabled": true }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      // dnd-kit yüklenene kadar native `disabled` KULLANMA: Button'ın `disabled:pointer-events-none`
      // sınıfı hover/focus'u da engeller, bu da preload'u asla tetiklenemez hale getirir.
      // Yalnızca yüklendikten SONRA `reorder.disabled` true ise gerçekten devre dışı bırak.
      disabled={loadedButDisabled}
      className={cn(
        "cursor-grab touch-none active:cursor-grabbing",
        !interactive && "cursor-default opacity-50"
      )}
      onPointerEnter={handle?.onPreload}
      onFocus={handle?.onPreload}
      {...dragProps}
    >
      <GripVertical />
    </Button>
  )
}

/** Her tablo sayfasının paylaştığı sürükleme tutacı + sıra sütunu. */
export function createReorderColumns<TData extends RowData>(config: DataTableReorderConfig) {
  const columnHelper = createColumnHelper<typeof dataTableFeatures, TData>()

  return [
    columnHelper.display({
      id: "reorder",
      size: 40,
      enableSorting: false,
      enableColumnFilter: false,
      enableHiding: false,
      enablePinning: true,
      cell: () => <DragHandleCell label={config.dragHandleLabel} />,
    }),
    columnHelper.display({
      id: "sequence",
      header: config.sequenceHeader,
      enableSorting: false,
      enableColumnFilter: false,
      enableHiding: false,
      cell: ({ row }) => <span className="tabular-nums">{row.index + 1}</span>,
    }),
  ]
}
