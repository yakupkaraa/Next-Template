"use client"

import { createColumnHelper, type RowData } from "@tanstack/react-table"
import { DataTableExpandCell } from "@/components/shared/data-table-expand-cell"
import { dataTableFeatures } from "@/components/shared/data-table-features"
import type { DataTableExpandable } from "@/components/shared/data-table.types"

export function createExpandColumn<TData extends RowData>(
  expandable: DataTableExpandable<TData>
) {
  const columnHelper = createColumnHelper<typeof dataTableFeatures, TData>()

  return columnHelper.display({
    id: "expand",
    size: 36,
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => {
      const expanded = row.getIsExpanded()
      return (
        <DataTableExpandCell
          expanded={expanded}
          controlsId={`row-detail-${row.id}`}
          label={expanded ? expandable.collapseLabel : expandable.expandLabel}
          onToggle={() => row.toggleExpanded()}
          onPreload={expandable.onPreloadDetail}
        />
      )
    },
  })
}
