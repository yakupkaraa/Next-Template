"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { FileSpreadsheet, FilterX, Hourglass, Shield, UserCheck, UserMinus, UserPlus, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable, type DataTableApi } from "@/components/shared/data-table"
import { DensityBoard } from "@/components/layout/density-board"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SearchBar } from "@/components/shared/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { userColumnKeys, userList, type UserRow } from "@/features/users/data"
import { deleteUser } from "@/features/users/actions"
import { AddUserForm, addUserFormId } from "@/features/users/list/components/add-user-form"
import { getUserListColumns } from "@/features/users/list/components/columns"

export function UserListTable({ locale }: { locale: ContentLocale }) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [createOpen, setCreateOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<UserRow[]>(userList)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [columnStateActive, setColumnStateActive] = useState(false)
  const tableApiRef = useRef<DataTableApi | null>(null)
  const list = getDictionary(locale).users.list
  const handleDelete = useCallback(
    async (row: UserRow) => {
      const ok = await deleteUser(row, locale)
      if (!ok) return
      setRows((current) => current.filter((item) => item.id !== row.id))
      setSelected((current) => {
        const next = new Set(current)
        next.delete(row.id)
        return next
      })
    },
    [locale]
  )
  const handleToggle = useCallback((id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000)
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

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((row) => selected.has(row.id))
  const someVisibleSelected =
    !allVisibleSelected && filtered.some((row) => selected.has(row.id))

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

  const columns = useMemo(
    () =>
      getUserListColumns(locale, {
        onEdit: () => {
          const prefix = pathname.match(/^\/[^/]+/)?.[0] ?? `/${locale}`
          router.push(`${prefix}/users/edit`)
        },
        onDelete: handleDelete,
        selected,
        onToggle: handleToggle,
        onToggleAll: handleToggleAll,
        allSelected: allVisibleSelected,
        someSelected: someVisibleSelected,
      }),
    [
      allVisibleSelected,
      handleDelete,
      handleToggle,
      handleToggleAll,
      locale,
      pathname,
      router,
      selected,
      someVisibleSelected,
    ]
  )

  const nextId = String(
    rows.reduce((max, row) => Math.max(max, Number.parseInt(row.id, 10) || 0), 0) + 1
  )

  function handleCreated(row: UserRow) {
    setRows((current) => [row, ...current])
    setCreateOpen(false)
  }

  const kpis = [
    {
      label: list.kpiTotal,
      value: stats.total,
      icon: Users,
      badge: list.kpiBadgeTotal,
      surface: "bg-[color-mix(in_oklch,var(--primary)_88%,white)] text-primary-foreground",
    },
    {
      label: list.kpiActive,
      value: stats.active,
      icon: UserCheck,
      badge: list.kpiBadgeActive,
      surface: "bg-[color-mix(in_oklch,var(--chart-2)_88%,white)] text-white",
    },
    {
      label: list.kpiPending,
      value: stats.pending,
      icon: Hourglass,
      badge: list.kpiBadgePending,
      surface: "bg-[color-mix(in_oklch,var(--chart-3)_88%,white)] text-white",
    },
    {
      label: list.kpiPassive,
      value: stats.passive,
      icon: UserMinus,
      badge: list.kpiBadgePassive,
      surface: "bg-[color-mix(in_oklch,var(--muted-foreground)_88%,white)] text-white",
    },
    {
      label: list.kpiAdmins,
      value: stats.admins,
      icon: Shield,
      badge: list.kpiBadgeAdmins,
      surface:
        "bg-[color-mix(in_oklch,color-mix(in_srgb,var(--primary)_78%,black)_88%,white)] text-primary-foreground",
    },
  ] as const

  return (
    <DensityBoard className="min-h-0 flex-1">
      <div
        data-kpi-row=""
        className="grid w-full min-w-0 shrink-0 grid-cols-5 gap-3"
      >
        {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card
                key={kpi.label}
                size="sm"
                className={`min-w-0 border-0 py-0 shadow-sm ring-0 ${kpi.surface}`}
              >
                <CardContent className="flex flex-col gap-1.5 px-3 py-2">
                  <div className="flex min-w-0 items-center justify-between gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/20">
                      <Icon className="size-3.5" />
                    </span>
                    <span className="min-w-0 truncate rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium leading-4">
                      {kpi.badge}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-baseline gap-2">
                    <span className="text-xl font-bold tracking-tight tabular-nums leading-none">
                      {kpi.value.toLocaleString(locale === "en" ? "en" : "tr")}
                    </span>
                    <span className="truncate text-xs font-medium text-white/80">{kpi.label}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>

        <Card
          size="sm"
          className="shrink-0 rounded-[8px] border-0 bg-primary/10 shadow-sm ring-0"
        >
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <SearchBar
              className="max-w-md [&_input]:h-9 [&_input]:rounded-full"
              value={query}
              onValueChange={setQuery}
              placeholder={list.search}
            />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="bg-card"
                disabled={!columnStateActive}
                onClick={() => tableApiRef.current?.resetColumnState()}
              >
                <FilterX />
                {list.clearFilters}
              </Button>
              <Button type="button" variant="outline" className="bg-card">
                <FileSpreadsheet />
                {list.excel}
              </Button>
              <Button type="button" onClick={() => setCreateOpen(true)}>
                <UserPlus />
                {list.addNew}
              </Button>
            </div>
          </CardContent>
        </Card>
        <div data-density-fill="" className="min-h-0 flex-1 p-0.5">
        <DataTable
          columns={columns}
          data={filtered}
          empty={list.empty}
          loading={loading}
          containerClassName="h-full min-h-0 flex-1 overflow-auto rounded-xl bg-card ring-1 ring-foreground/10"
          className="w-max min-w-full table-auto"
          pinEnd={["actions"]}
          pinStart={["select"]}
          columnMenu={list.columnMenu}
          tableApiRef={tableApiRef}
          onColumnStateChange={setColumnStateActive}
          isRowSelected={(row) => selected.has(row.id)}
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
    </DensityBoard>
  )
}
