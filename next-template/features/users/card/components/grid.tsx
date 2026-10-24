"use client"

import { useCallback, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { FileSpreadsheet, UserPlus } from "lucide-react"
import { DensityBoard } from "@/components/layout/density-board"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ConfirmModal } from "@/components/shared/confirm-modal"
import { SearchBar } from "@/components/shared/search-bar"
import { showError, showSuccess } from "@/components/toast/notify"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  userDepartmentOptions,
  userRoleOptions,
  userStatusOptions,
} from "@/features/users/constants/users"
import { useUsers } from "@/features/users/hooks/use-users"
import { preloadOnHover } from "@/lib/preload-on-hover"
import type { UserRow } from "@/features/users/types/user"
import { UserCard } from "./user-card"
import { UserCardSkeleton } from "./user-card-skeleton"
import { UserCardsVirtualized, GRID_CLASS, CARD_CELL_CLASS } from "./user-cards-virtualized"
import { FilterSelect } from "./filter-select"

const AddUserDialog = dynamic(() =>
  import("@/features/users/components/add-user-dialog").then((m) => ({ default: m.AddUserDialog }))
)

const preloadAddUserDialog = preloadOnHover(() =>
  import("@/features/users/components/add-user-dialog")
)

const ALL = "all"

export function UserCardGrid({ locale }: { locale: ContentLocale }) {
  const router = useRouter()
  const pathname = usePathname()
  const dict = getDictionary(locale)
  const list = dict.users.list
  const card = dict.users.card
  const prefix = pathname.match(/^\/[^/]+/)?.[0] ?? `/${locale}`
  const { rows, loading, nextId, addUser, removeUser } = useUsers(locale)
  const [query, setQuery] = useState("")
  const [role, setRole] = useState(ALL)
  const [status, setStatus] = useState(ALL)
  const [department, setDepartment] = useState(ALL)
  const [createOpen, setCreateOpen] = useState(false)
  const [dialogMounted, setDialogMounted] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null)

  const filtered = useMemo(() => {
    const collatorLocale = locale === "en" ? "en" : "tr"
    const normalized = query.trim().toLocaleLowerCase(collatorLocale)

    return rows.filter((row) => {
      if (role !== ALL && row.role !== role) return false
      if (status !== ALL && row.status !== status) return false
      if (department !== ALL && row.department !== department) return false
      if (!normalized) return true
      const haystack = `${row.firstName} ${row.lastName} ${row.email} ${row.title}`.toLocaleLowerCase(
        collatorLocale
      )
      return haystack.includes(normalized)
    })
  }, [department, locale, query, role, rows, status])

  function openCreateDialog() {
    setDialogMounted(true)
    setCreateOpen(true)
  }

  const handleCreated = useCallback(
    (row: UserRow) => {
      addUser(row)
      setCreateOpen(false)
      showSuccess(list.toast.created)
    },
    [addUser, list.toast.created]
  )

  const goEdit = useCallback(() => {
    router.push(`${prefix}/users/edit`)
  }, [prefix, router])

  const toggleSelected = useCallback((id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  const copyUser = useCallback(
    async (user: UserRow) => {
      try {
        await navigator.clipboard.writeText(user.email)
        showSuccess(card.copied)
      } catch {
        showError(card.copyFailed)
      }
    },
    [card.copied, card.copyFailed]
  )

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

  const requestDelete = useCallback((row: UserRow) => {
    setDeleteTarget(row)
  }, [])

  return (
    <DensityBoard>
      <header
        data-density-toolbar=""
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{card.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
      </header>

      <Card size="sm" className="rounded-[8px] border-0 bg-primary/10 py-0 shadow-sm ring-0">
        <CardContent className="flex flex-wrap items-center gap-2 py-3">
          <SearchBar
            className="min-w-56 flex-1 [&_input]:h-9 [&_input]:rounded-full"
            value={query}
            onValueChange={setQuery}
            placeholder={card.search}
          />
          <FilterSelect
            id="user-card-role"
            value={role}
            allLabel={card.roleAll}
            options={userRoleOptions}
            onValueChange={setRole}
          />
          <FilterSelect
            id="user-card-status"
            value={status}
            allLabel={card.statusAll}
            options={userStatusOptions}
            onValueChange={setStatus}
          />
          <FilterSelect
            id="user-card-department"
            value={department}
            allLabel={card.departmentAll}
            options={userDepartmentOptions}
            onValueChange={setDepartment}
          />
        </CardContent>
      </Card>

      <div className="relative w-full">
        {filtered.length === 0 && !loading ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{list.empty}</p>
        ) : null}
        {loading ? (
          <div data-skeleton-grid="" className={GRID_CLASS} aria-hidden>
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className={CARD_CELL_CLASS}>
                <UserCardSkeleton />
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <UserCardsVirtualized
            users={filtered}
            renderCard={(user) => (
              <UserCard
                user={user}
                selected={selected.has(user.id)}
                copyLabel={card.copy}
                editLabel={list.edit}
                deleteLabel={list.delete}
                menuLabel={list.actionsMenu}
                onToggle={toggleSelected}
                onEdit={goEdit}
                onDelete={requestDelete}
                onCopy={copyUser}
              />
            )}
          />
        ) : null}
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

      <ConfirmModal
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title={card.deleteConfirmTitle}
        description={card.deleteConfirmHint.replace(
          "{name}",
          deleteTarget ? `${deleteTarget.firstName} ${deleteTarget.lastName}` : ""
        )}
        confirmLabel={card.yes}
        cancelLabel={card.no}
        onConfirm={() => {
          if (deleteTarget) handleDelete(deleteTarget)
        }}
      />
    </DensityBoard>
  )
}
