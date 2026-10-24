"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { FileSpreadsheet, FilterX, Hourglass, Shield, UserCheck, UserMinus, UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable, type DataTableApi } from "@/components/shared/data-table"
import { KpiStatCard } from "@/components/shared/kpi-stat-card"
import { DensityBoard } from "@/components/layout/density-board"
import { SearchBar } from "@/components/shared/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { userColumnKeys } from "@/features/users/constants/users"
import type { UserRow } from "@/features/users/types/user"
import { useUsers } from "@/features/users/hooks/use-users"
import { preloadOnHover } from "@/lib/preload-on-hover"
import { getUserListColumns } from "@/features/users/list/components/columns"
import { showSuccess } from "@/components/toast/notify"

const AddUserDialog = dynamic(() =>
  import("@/features/users/components/add-user-dialog").then((m) => ({ default: m.AddUserDialog }))
)

const preloadAddUserDialog = preloadOnHover(() =>
  import("@/features/users/components/add-user-dialog")
)

export function UserListTable({ locale }: { locale: ContentLocale }) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [createOpen, setCreateOpen] = useState(false)
  const [dialogMounted, setDialogMounted] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [columnStateActive, setColumnStateActive] = useState(false)
  const tableApiRef = useRef<DataTableApi | null>(null)
  const list = getDictionary(locale).users.list
  const { rows, loading, nextId, addUser, removeUser } = useUsers(locale)

  const handleDelete = useCallback(
    async (row: UserRow) => {
      const ok = await removeUser(row)
      if (!ok) return
      setSelected((current) => {
        const next = new Set(current)
        next.delete(row.id)
        return next
      })
    },
    [removeUser]
  )

  const handleToggle = useCallback((id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
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

  function openCreateDialog() {
    setDialogMounted(true)
    setCreateOpen(true)
  }

  function handleCreated(row: UserRow) {
    addUser(row)
    setCreateOpen(false)
    showSuccess(list.toast.created)
  }

  const kpis = [
    { label: list.kpiTotal, value: stats.total, icon: Users, tone: "primary" },
    { label: list.kpiActive, value: stats.active, icon: UserCheck, tone: "chart-2" },
    { label: list.kpiPending, value: stats.pending, icon: Hourglass, tone: "chart-3" },
    { label: list.kpiPassive, value: stats.passive, icon: UserMinus, tone: "chart-4" },
    { label: list.kpiAdmins, value: stats.admins, icon: Shield, tone: "chart-5" },
  ] as const

  return (
    <DensityBoard className="min-h-0 flex-1">
      <div
        data-kpi-row=""
        className="grid w-full min-w-0 shrink-0 grid-cols-5 gap-3"
      >
        {kpis.map((kpi) => (
          <KpiStatCard
            key={kpi.label}
            size="compact"
            icon={kpi.icon}
            label={kpi.label}
            tone={kpi.tone}
            value={kpi.value.toLocaleString(locale === "en" ? "en" : "tr")}
          />
        ))}
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
            <Button
              type="button"
              onClick={openCreateDialog}
              onPointerEnter={preloadAddUserDialog}
              onFocus={preloadAddUserDialog}
            >
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

      {dialogMounted && (
        <AddUserDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          locale={locale}
          nextId={nextId}
          onCreated={handleCreated}
        />
      )}
    </DensityBoard>
  )
}
