"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { runAction } from "@/components/toast/run-action"
import { resolveErrorMessage } from "@/components/toast/resolve-error-message"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { useSaveOrder } from "@/features/tables/hooks/use-save-order"
import { buildOrderRow } from "@/features/tables/crud/utils/order-form"
import { OrderForm, orderFormId } from "@/features/tables/crud/components/order-form"
import type { OrderFormValues } from "@/features/tables/crud/types/order-form"
import type { OrderRow } from "@/features/tables/types/order"

export function OrderFormDialog({
  open,
  onOpenChange,
  locale,
  order,
  nextSequence,
  onSaved,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: ContentLocale
  /** Düzenlenen kayıt; `null` ise yeni sipariş oluşturuluyor. */
  order: OrderRow | null
  /** Yeni sipariş için `id`/`orderNo` üretiminde kullanılan sıra numarası. */
  nextSequence: number
  onSaved: (row: OrderRow) => void
}) {
  const copy = getDictionary(locale).tables.crud
  const { saveOrder, saving } = useSaveOrder()

  async function handleValid(values: OrderFormValues) {
    const row = buildOrderRow(values, order, nextSequence)
    await runAction({
      pending: order ? copy.toast.updating : copy.toast.creating,
      success: order ? copy.toast.updated : copy.toast.created,
      error: (err) => resolveErrorMessage(err, copy.toast.saveFailed),
      run: async () => {
        const saved = await saveOrder(row)
        onSaved(saved)
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(90vh,38rem)] flex-col gap-0 p-0 sm:max-w-lg"
      >
        <DialogHeader className="flex shrink-0 flex-row items-center justify-between gap-3 space-y-0">
          <DialogTitle>{order ? copy.form.editTitle : copy.form.addTitle}</DialogTitle>
          <DialogClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0"
                aria-label={locale === "en" ? "Close" : "Kapat"}
              />
            }
          >
            <X className="size-4" />
          </DialogClose>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          <OrderForm order={order} copy={copy.form} errorCopy={copy.form.errors} onValid={handleValid} />
        </div>
        <DialogFooter className="mt-0 shrink-0 flex-row justify-end border-t bg-background px-4 py-3">
          <Button type="submit" form={orderFormId} size="sm" disabled={saving}>
            {copy.form.submit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
