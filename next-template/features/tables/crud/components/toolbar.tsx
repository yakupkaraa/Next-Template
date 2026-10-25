"use client"

import { FilterX, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "@/components/shared/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { TablePaginationToggle } from "@/features/tables/components/pagination-toggle"
import { ColumnVisibilityMenu } from "@/features/tables/components/column-visibility-menu"
import { preloadConfirmModal, preloadOrderFormDialog } from "@/features/tables/crud/components/order-modals"

export function CrudToolbar({
  locale,
  query,
  onQueryChange,
  paginationEnabled,
  onPaginationEnabledChange,
  columnVisibility,
  onColumnVisibilityChange,
  columnLabels,
  clearFiltersDisabled,
  onClearFilters,
  onAddNew,
  selectedCount,
  onBulkDelete,
}: {
  locale: ContentLocale
  query: string
  onQueryChange: (value: string) => void
  paginationEnabled: boolean
  onPaginationEnabledChange: (checked: boolean) => void
  columnVisibility: Record<string, boolean>
  onColumnVisibilityChange: (next: Record<string, boolean>) => void
  columnLabels: { id: string; label: string }[]
  clearFiltersDisabled: boolean
  onClearFilters: () => void
  onAddNew: () => void
  selectedCount: number
  onBulkDelete: () => void
}) {
  const copy = getDictionary(locale).tables.crud

  return (
    <>
      <Card size="sm" className="shrink-0 rounded-[8px] border-0 bg-primary/10 shadow-sm ring-0">
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <SearchBar
            className="max-w-md [&_input]:h-9 [&_input]:rounded-full"
            value={query}
            onValueChange={onQueryChange}
            placeholder={copy.search}
          />
          <div className="flex items-center gap-2">
            <TablePaginationToggle
              checked={paginationEnabled}
              onCheckedChange={onPaginationEnabledChange}
              label={copy.paginationToggle}
            />
            <ColumnVisibilityMenu
              columns={columnLabels}
              visibility={columnVisibility}
              onVisibilityChange={onColumnVisibilityChange}
              triggerLabel={copy.columnsToggle}
            />
            <Button
              type="button"
              variant="outline"
              className="bg-card"
              disabled={clearFiltersDisabled}
              onClick={onClearFilters}
            >
              <FilterX />
              {copy.clearFilters}
            </Button>
            <Button
              type="button"
              onClick={onAddNew}
              onPointerEnter={preloadOrderFormDialog}
              onFocus={preloadOrderFormDialog}
            >
              <Plus />
              {copy.addNew}
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedCount > 0 ? (
        <div className="flex shrink-0 items-center justify-end">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            onPointerEnter={preloadConfirmModal}
            onFocus={preloadConfirmModal}
          >
            <Trash2 />
            {copy.bulkDelete}
          </Button>
        </div>
      ) : null}
    </>
  )
}
