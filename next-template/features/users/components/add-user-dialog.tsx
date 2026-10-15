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
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { AddUserForm, addUserFormId } from "@/features/users/list/components/add-user-form"
import type { UserRow } from "@/features/users/types/user"

export function AddUserDialog({
  open,
  onOpenChange,
  locale,
  nextId,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: ContentLocale
  nextId: string
  onCreated: (row: UserRow) => void
}) {
  const list = getDictionary(locale).users.list

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(90vh,42rem)] flex-col gap-0 p-0 sm:max-w-[min(100%,56rem)]"
      >
        <DialogHeader className="flex shrink-0 flex-row items-center justify-between gap-3 space-y-0">
          <DialogTitle>{list.addNew}</DialogTitle>
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
          <AddUserForm locale={locale} nextId={nextId} onCreated={onCreated} />
        </div>
        <DialogFooter className="mt-0 shrink-0 flex-row justify-end border-t bg-background px-4 py-3">
          <Button type="submit" form={addUserFormId} size="sm">
            {list.formSubmit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
