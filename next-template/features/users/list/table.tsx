"use client"

import { useEffect, useMemo, useState } from "react"
import { FileSpreadsheet, UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SearchBar } from "@/components/ui/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { userColumnKeys, userList, type UserRow } from "@/features/users/data"
import { AddUserForm, addUserFormId } from "@/features/users/list/add-user-form"
import { getUserListColumns } from "@/features/users/list/columns"

export function UserListTable({ locale }: { locale: ContentLocale }) {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [createOpen, setCreateOpen] = useState(false)
  const [rows, setRows] = useState<UserRow[]>(userList)
  const list = getDictionary(locale).users.list
  const columns = useMemo(() => getUserListColumns(locale), [locale])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  const normalized = query.trim().toLocaleLowerCase(locale === "en" ? "en" : "tr")
  const filtered = normalized
    ? rows.filter((row) =>
        userColumnKeys.some((column) =>
          row[column].toLocaleLowerCase(locale === "en" ? "en" : "tr").includes(normalized)
        )
      )
    : rows

  const nextId = String(
    rows.reduce((max, row) => Math.max(max, Number.parseInt(row.id, 10) || 0), 0) + 1
  )

  function handleCreated(row: UserRow) {
    setRows((current) => [row, ...current])
    setCreateOpen(false)
  }

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <Card size="sm" className="shrink-0 rounded-[8px]">
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <Button type="button" onClick={() => setCreateOpen(true)}>
              <UserPlus />
              {list.addNew}
            </Button>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline">
                <FileSpreadsheet />
                {list.excel}
              </Button>
              <SearchBar
                value={query}
                onValueChange={setQuery}
                placeholder={list.search}
              />
            </div>
          </CardContent>
        </Card>
        <DataTable
          columns={columns}
          data={filtered}
          empty={list.empty}
          loading={loading}
          containerClassName="min-h-0 flex-1 overflow-x-scroll overflow-y-auto"
          className="w-max min-w-full"
        />
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[min(90vh,42rem)] flex-col gap-0 p-0 sm:max-w-[min(100%,56rem)]"
        >
          <DialogHeader className="flex shrink-0 flex-row items-center justify-between gap-3 space-y-0 border-b bg-muted/30 px-4 py-2.5">
            <DialogTitle className="text-base font-semibold">{list.addNew}</DialogTitle>
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
            <AddUserForm locale={locale} nextId={nextId} onCreated={handleCreated} />
          </div>
          <DialogFooter className="mt-0 shrink-0 flex-row justify-end border-t bg-background px-4 py-3">
            <Button type="submit" form={addUserFormId} size="sm">
              {list.formSubmit}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
