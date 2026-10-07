"use client"

import { useMemo, useState } from "react"
import { ArrowDownAZ, ArrowUpZA, ChevronDown, Filter } from "lucide-react"
import type { Column, RowData } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "cn"
import type { DataTableColumnMenuCopy, DataTableFeatures } from "@/components/shared/data-table-features"

export function DataTableColumnHeader<TData extends RowData>({
  column,
  title,
  copy,
}: {
  column: Column<DataTableFeatures, TData>
  title: string
  copy: DataTableColumnMenuCopy
}) {
  const [query, setQuery] = useState("")
  const sorted = column.getIsSorted()
  const filtered = column.getIsFiltered()
  const unique = useMemo(() => {
    const fromFacet = [...column.getFacetedUniqueValues().keys()]
    const keys =
      fromFacet.length > 0
        ? fromFacet
        : column.getFacetedRowModel().flatRows.map((row) => row.getValue(column.id))
    return [...new Set(keys.map((value) => String(value ?? "")))].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    )
  }, [column])

  const selected = (column.getFilterValue() as string[] | undefined) ?? unique
  const selectedSet = new Set(selected)
  const visible = unique.filter((value) =>
    value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )

  function toggleValue(value: string, checked: boolean) {
    const next = checked
      ? [...selected.filter((item) => item !== value), value]
      : selected.filter((item) => item !== value)
    const allOn = unique.length > 0 && unique.every((item) => next.includes(item))
    column.setFilterValue(allOn ? undefined : next)
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "-ml-1.5 h-7 w-max shrink-0 justify-start px-1.5 font-medium whitespace-nowrap text-muted-foreground hover:text-foreground",
              (sorted || filtered) && "text-primary"
            )}
          />
        }
      >
        <span className="whitespace-nowrap">{title}</span>
        {sorted === "asc" ? <ArrowDownAZ className="size-3.5 text-primary" /> : null}
        {sorted === "desc" ? <ArrowUpZA className="size-3.5 text-primary" /> : null}
        {filtered ? <Filter className="size-3.5 text-primary" /> : null}
        {!sorted && !filtered ? <ChevronDown className="size-3.5 opacity-60" /> : null}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 gap-2 p-2">
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowDownAZ />
            {copy.sortAsc}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowUpZA />
            {copy.sortDesc}
          </Button>
          {sorted ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="justify-start text-muted-foreground"
              onClick={() => column.clearSorting()}
            >
              {copy.clearSort}
            </Button>
          ) : null}
        </div>
        <Separator />
        <Input
          value={query}
          placeholder={copy.search}
          className="h-8"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => column.setFilterValue(undefined)}
          >
            {copy.selectAll}
          </Button>
          {filtered ? (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              className="text-muted-foreground"
              onClick={() => column.setFilterValue(undefined)}
            >
              {copy.clearFilter}
            </Button>
          ) : null}
        </div>
        <div className="max-h-52 overflow-y-auto">
          {visible.length === 0 ? (
            <p className="px-1 py-2 text-xs text-muted-foreground">{copy.empty}</p>
          ) : (
            visible.map((value) => (
              <label
                key={value}
                className="flex min-h-8 cursor-pointer items-center gap-2 rounded-md px-1 text-sm hover:bg-muted"
              >
                <Checkbox
                  checked={selectedSet.has(value)}
                  className="size-[18px] border-2 border-muted-foreground bg-background data-checked:border-primary dark:border-foreground/70"
                  onCheckedChange={(checked) => toggleValue(value, checked === true)}
                />
                <span className="min-w-0 truncate">{value || "—"}</span>
              </label>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
