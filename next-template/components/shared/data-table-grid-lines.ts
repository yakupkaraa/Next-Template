import type { DataTableGridLines } from "@/components/shared/data-table.types"

/** Tailwind JIT taraması için literal class string'leri — dinamik birleştirme yok. */
export const dataTableGridLineRowClass: Record<DataTableGridLines, string> = {
  none: "border-b-0",
  rows: "",
  cells: "",
}

export const dataTableGridLineCellClass: Record<DataTableGridLines, string> = {
  none: "",
  rows: "",
  cells: "border-r border-border last:border-r-0",
}
