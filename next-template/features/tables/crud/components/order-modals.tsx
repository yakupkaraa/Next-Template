"use client"

import dynamic from "next/dynamic"
import { preloadOnHover } from "@/lib/preload-on-hover"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import type { OrderRow } from "@/features/tables/types/order"

export const OrderFormDialog = dynamic(() =>
  import("@/features/tables/crud/components/order-form-dialog").then((m) => ({
    default: m.OrderFormDialog,
  }))
)
export const preloadOrderFormDialog = preloadOnHover(() =>
  import("@/features/tables/crud/components/order-form-dialog")
)

const ConfirmModal = dynamic(() =>
  import("@/components/shared/confirm-modal").then((m) => ({ default: m.ConfirmModal }))
)
export const preloadConfirmModal = preloadOnHover(() => import("@/components/shared/confirm-modal"))

export function OrderModals({
  locale,
  formMounted,
  formOpen,
  onFormOpenChange,
  editingOrder,
  nextSequence,
  nextPosition,
  onSaved,
  deleteMounted,
  deleteTarget,
  onDeleteOpenChange,
  onConfirmDelete,
  bulkDeleteMounted,
  bulkDeleteOpen,
  onBulkDeleteOpenChange,
  onConfirmBulkDelete,
  bulkCount,
}: {
  locale: ContentLocale
  formMounted: boolean
  formOpen: boolean
  onFormOpenChange: (open: boolean) => void
  editingOrder: OrderRow | null
  nextSequence: number
  nextPosition: number
  onSaved: (row: OrderRow) => void
  deleteMounted: boolean
  deleteTarget: OrderRow | null
  onDeleteOpenChange: (open: boolean) => void
  onConfirmDelete: () => void
  bulkDeleteMounted: boolean
  bulkDeleteOpen: boolean
  onBulkDeleteOpenChange: (open: boolean) => void
  onConfirmBulkDelete: () => void
  bulkCount: number
}) {
  const copy = getDictionary(locale).tables.crud

  return (
    <>
      {formMounted ? (
        <OrderFormDialog
          open={formOpen}
          onOpenChange={onFormOpenChange}
          locale={locale}
          order={editingOrder}
          nextSequence={nextSequence}
          nextPosition={nextPosition}
          onSaved={onSaved}
        />
      ) : null}

      {deleteMounted ? (
        <ConfirmModal
          open={deleteTarget !== null}
          onOpenChange={onDeleteOpenChange}
          title={copy.deleteConfirm.title}
          description={copy.deleteConfirm.descriptionTemplate.replace(
            "{orderNo}",
            deleteTarget?.orderNo ?? ""
          )}
          confirmLabel={copy.deleteConfirm.confirmLabel}
          cancelLabel={copy.deleteConfirm.cancelLabel}
          onConfirm={onConfirmDelete}
        />
      ) : null}

      {bulkDeleteMounted ? (
        <ConfirmModal
          open={bulkDeleteOpen}
          onOpenChange={onBulkDeleteOpenChange}
          title={copy.bulkDeleteConfirm.title}
          description={copy.bulkDeleteConfirm.descriptionTemplate.replace("{count}", String(bulkCount))}
          confirmLabel={copy.bulkDeleteConfirm.confirmLabel}
          cancelLabel={copy.bulkDeleteConfirm.cancelLabel}
          onConfirm={onConfirmBulkDelete}
        />
      ) : null}
    </>
  )
}
