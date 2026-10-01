"use client"

import { useEffect, useMemo, useState } from "react"
import { FileSpreadsheet, Hourglass, Shield, UserCheck, UserMinus, UserPlus, Users, X } from "lucide-react"
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

  const stats = useMemo(() => {
    const total = rows.length
    const active = rows.filter((row) => row.status === "Aktif").length
    const pending = rows.filter((row) => row.status === "Beklemede").length
    const passive = rows.filter((row) => row.status === "Pasif").length
    const admins = rows.filter((row) => row.role === "Yönetici").length
    return { total, active, pending, passive, admins }
  }, [rows])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale === "en" ? "en" : "tr")
    if (!normalized) return rows
    const collatorLocale = locale === "en" ? "en" : "tr"
    return rows.filter((row) =>
      userColumnKeys.some((column) =>
        row[column].toLocaleLowerCase(collatorLocale).includes(normalized)
      )
    )
  }, [locale, query, rows])

  const nextId = String(
    rows.reduce((max, row) => Math.max(max, Number.parseInt(row.id, 10) || 0), 0) + 1
  )

  function handleCreated(row: UserRow) {
    setRows((current) => [row, ...current])
    setCreateOpen(false)
  }

  const kpis = [
    { label: list.kpiTotal, value: stats.total, icon: Users, tone: "text-primary" },
    { label: list.kpiActive, value: stats.active, icon: UserCheck, tone: "text-emerald-500" },
    { label: list.kpiPending, value: stats.pending, icon: Hourglass, tone: "text-amber-500" },
    { label: list.kpiPassive, value: stats.passive, icon: UserMinus, tone: "text-rose-500" },
    { label: list.kpiAdmins, value: stats.admins, icon: Shield, tone: "text-sky-500" },
  ] as const

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="grid shrink-0 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label} size="sm" className="py-0 shadow-sm">
                <CardContent className="flex items-center gap-3 px-3 py-2.5">
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 ${kpi.tone}`}>
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
                    <p className="text-lg font-semibold tracking-tight">
                      {kpi.value.toLocaleString(locale === "en" ? "en" : "tr")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card
          size="sm"
          className="shrink-0 rounded-[8px] border-primary/20 bg-[color-mix(in_oklch,var(--primary)_14%,var(--card))] ring-primary/20 dark:border-border dark:bg-card dark:ring-foreground/10"
        >
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button type="button" onClick={() => setCreateOpen(true)}>
                <UserPlus />
                {list.addNew}
              </Button>
              <Button type="button">
                <FileSpreadsheet />
                {list.excel}
              </Button>
            </div>
            <SearchBar
              className="max-w-md"
              value={query}
              onValueChange={setQuery}
              placeholder={list.search}
            />
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
            <AddUserForm locale={locale} nextId={nextId} onCreated={handleCreated} />
          </div>
          <DialogFooter className="mt-0 shrink-0 flex-row justify-end border-t bg-background px-4 py-3">
            <Button type="submit" form={addUserFormId} size="sm">
              {list.formSubmit}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
