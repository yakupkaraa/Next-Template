"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { DataTable, type DataTableApi, type DataTablePaginationConfig } from "@/components/shared/data-table"
import { DensityBoard } from "@/components/layout/density-board"
import { runAction } from "@/components/toast/run-action"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { useOrders } from "@/features/tables/hooks/use-orders"
import { orderDefaultPageSize, orderPageSizeOptions } from "@/features/tables/constants/orders"
import { nextOrderSequence } from "@/features/tables/utils/orders"
import { crudOrderColumnLabels, getCrudOrderColumns } from "@/features/tables/crud/components/columns"
import { CrudToolbar } from "@/features/tables/crud/components/toolbar"
import { OrderModals, preloadConfirmModal, preloadOrderFormDialog } from "@/features/tables/crud/components/order-modals"
import type { OrderRow } from "@/features/tables/types/order"

export function TablesCrudScreen({ locale }: { locale: ContentLocale }) {
  const [query, setQuery] = useState("")
  const [paginationEnabled, setPaginationEnabled] = useState(true)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [columnStateActive, setColumnStateActive] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [formMounted, setFormMounted] = useState(false)
  const [editingOrder, setEditingOrder] = useState<OrderRow | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<OrderRow | null>(null)
  const [deleteMounted, setDeleteMounted] = useState(false)
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [bulkDeleteMounted, setBulkDeleteMounted] = useState(false)
  const tableApiRef = useRef<DataTableApi | null>(null)
  const copy = getDictionary(locale).tables.crud
  const { rows, loading, addOrder, updateOrder, removeOrder, removeOrders } = useOrders()

  const nextSequence = useMemo(() => nextOrderSequence(rows), [rows])
  const nextPosition = rows.length

  const handleToggle = useCallback((id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale === "en" ? "en" : "tr")
    if (!normalized) return rows
    const collatorLocale = locale === "en" ? "en" : "tr"
    return rows.filter(
      (row) =>
        row.orderNo.toLocaleLowerCase(collatorLocale).includes(normalized) ||
        row.customer.toLocaleLowerCase(collatorLocale).includes(normalized)
    )
  }, [locale, query, rows])

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((row) => selected.has(row.id))
  const someVisibleSelected = !allVisibleSelected && filtered.some((row) => selected.has(row.id))

  const handleToggleAll = useCallback(
    (checked: boolean) => {
      setSelected((current) => {
        const next = new Set(current)
        if (checked) filtered.forEach((row) => next.add(row.id))
        else filtered.forEach((row) => next.delete(row.id))
        return next
      })
    },
    [filtered]
  )

  function openCreateDialog() {
    setEditingOrder(null)
    setFormMounted(true)
    setFormOpen(true)
  }

  function openEditDialog(row: OrderRow) {
    setEditingOrder(row)
    setFormMounted(true)
    setFormOpen(true)
  }

  function handleSaved(row: OrderRow) {
    if (editingOrder) updateOrder(row)
    else addOrder(row)
  }

  function requestDelete(row: OrderRow) {
    setDeleteMounted(true)
    setDeleteTarget(row)
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    const target = deleteTarget
    await runAction({
      pending: copy.toast.deleting,
      success: copy.toast.deletedTemplate.replace("{orderNo}", target.orderNo),
      error: copy.toast.deleteFailed,
      run: () => removeOrder(target.id),
    })
    setSelected((current) => {
      const next = new Set(current)
      next.delete(target.id)
      return next
    })
  }

  function requestBulkDelete() {
    setBulkDeleteMounted(true)
    setBulkDeleteOpen(true)
  }

  async function confirmBulkDelete() {
    const ids = new Set(selected)
    await runAction({
      pending: copy.toast.bulkDeleting,
      success: copy.toast.bulkDeletedTemplate.replace("{count}", String(ids.size)),
      error: copy.toast.bulkDeleteFailed,
      run: () => removeOrders(ids),
    })
    setSelected(new Set())
  }

  const preloadRowMenuAssets = useCallback(() => {
    preloadOrderFormDialog()
    preloadConfirmModal()
  }, [])

  const columns = useMemo(
    () =>
      getCrudOrderColumns(locale, {
        selected,
        onToggle: handleToggle,
        onToggleAll: handleToggleAll,
        allSelected: allVisibleSelected,
        someSelected: someVisibleSelected,
        onEdit: openEditDialog,
        onDelete: requestDelete,
        onPreloadForm: preloadRowMenuAssets,
      }),
    [allVisibleSelected, handleToggle, handleToggleAll, locale, preloadRowMenuAssets, selected, someVisibleSelected]
  )

  const columnLabels = useMemo(() => crudOrderColumnLabels(locale), [locale])

  const pagination: DataTablePaginationConfig | false = paginationEnabled
    ? { pageSize: orderDefaultPageSize, pageSizeOptions: orderPageSizeOptions, copy: copy.pagination }
    : false

  return (
    <DensityBoard className="min-h-0 flex-1">
      <CrudToolbar
        locale={locale}
        query={query}
        onQueryChange={setQuery}
        paginationEnabled={paginationEnabled}
        onPaginationEnabledChange={setPaginationEnabled}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        columnLabels={columnLabels}
        clearFiltersDisabled={!columnStateActive}
        onClearFilters={() => tableApiRef.current?.resetColumnState()}
        onAddNew={openCreateDialog}
        selectedCount={selected.size}
        onBulkDelete={requestBulkDelete}
      />

      <div
        data-density-fill=""
        className="min-h-0 flex-1 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
      >
        <DataTable
          columns={columns}
          data={filtered}
          empty={copy.empty}
          loading={loading}
          containerClassName="h-full min-h-0 flex-1 overflow-auto"
          className="w-max min-w-full table-auto"
          pinStart={["select"]}
          pinEnd={["actions"]}
          columnMenu={copy.columnMenu}
          tableApiRef={tableApiRef}
          onColumnStateChange={setColumnStateActive}
          isRowSelected={(row) => selected.has(row.id)}
          pagination={pagination}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </div>

      <OrderModals
        locale={locale}
        formMounted={formMounted}
        formOpen={formOpen}
        onFormOpenChange={setFormOpen}
        editingOrder={editingOrder}
        nextSequence={nextSequence}
        nextPosition={nextPosition}
        onSaved={handleSaved}
        deleteMounted={deleteMounted}
        deleteTarget={deleteTarget}
        onDeleteOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        onConfirmDelete={() => void confirmDelete()}
        bulkDeleteMounted={bulkDeleteMounted}
        bulkDeleteOpen={bulkDeleteOpen}
        onBulkDeleteOpenChange={setBulkDeleteOpen}
        onConfirmBulkDelete={() => void confirmBulkDelete()}
        bulkCount={selected.size}
      />
    </DensityBoard>
  )
}
