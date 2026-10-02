import { columnPinningFeature, columnSizingFeature, columnVisibilityFeature, tableFeatures } from "@tanstack/react-table"

export const dataTableFeatures = tableFeatures({
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
})

export type DataTableFeatures = typeof dataTableFeatures
