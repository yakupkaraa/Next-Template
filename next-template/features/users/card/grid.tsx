"use client"

import { memo, useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useVirtualizer } from "@tanstack/react-virtual"
import {
  Building2,
  Copy,
  FileSpreadsheet,
  Mail,
  MoreVertical,
  Pencil,
  Phone,
  Trash2,
  UserPlus,
  X,
} from "lucide-react"
import { DensityBoard } from "@/components/layout/density-board"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchBar } from "@/components/ui/search-bar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge, type StatusBadgeTone } from "@/components/ui/status-badge"
import { cn } from "cn"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  userDepartmentOptions,
  userList,
  userRoleOptions,
  userStatusOptions,
  type UserRow,
} from "@/features/users/data"
import { AddUserForm, addUserFormId } from "@/features/users/list/add-user-form"

const CARD_MIN_WIDTH_PX = 248
const GRID_GAP_PX = 16
const ROW_ESTIMATE_HEIGHT = 320
const ALL = "all"

const cardSurfaces = [
  "bg-primary/12 ring-primary/20",
  "bg-[color-mix(in_oklch,var(--chart-3)_16%,var(--card))] ring-border",
  "bg-[color-mix(in_oklch,var(--primary)_8%,var(--card))] ring-primary/15",
  "bg-[color-mix(in_oklch,var(--chart-2)_14%,var(--card))] ring-border",
] as const

const avatarSurfaces = [
  "bg-primary text-primary-foreground",
  "bg-chart-2 text-white",
  "bg-chart-3 text-white",
  "bg-chart-4 text-white",
] as const

function initials(user: UserRow) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toLocaleUpperCase("tr")
}

function toneIndex(user: UserRow) {
  return Number.parseInt(user.id, 10) % cardSurfaces.length
}

function statusTone(value: string): StatusBadgeTone {
  if (value === "Aktif") return "success"
  if (value === "Beklemede") return "warning"
  return "danger"
}

function FilterSelect({
  id,
  value,
  allLabel,
  options,
  onValueChange,
}: {
  id: string
  value: string
  allLabel: string
  options: readonly string[]
  onValueChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={(next) => onValueChange(next ?? ALL)}>
      <SelectTrigger id={id} className="h-9 rounded-full border-border bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const UserCard = memo(function UserCard({
  user,
  selected,
  copyLabel,
  editLabel,
  deleteLabel,
  menuLabel,
  onToggle,
  onEdit,
  onDelete,
  onCopy,
}: {
  user: UserRow
  selected: boolean
  copyLabel: string
  editLabel: string
  deleteLabel: string
  menuLabel: string
  onToggle: (id: string, checked: boolean) => void
  onEdit: (user: UserRow) => void
  onDelete: (user: UserRow) => void
  onCopy: (user: UserRow) => void
}) {
  const tone = toneIndex(user)

  return (
    <Card
      className={cn(
        "h-full gap-0 overflow-hidden rounded-2xl border-0 py-0 shadow-none ring-1",
        cardSurfaces[tone]
      )}
    >
      <CardContent className="flex flex-col gap-3 px-4 pt-4 pb-3">
        <div className="flex items-start justify-between">
          <Checkbox
            checked={selected}
            aria-label={`${user.firstName} ${user.lastName}`}
            className="size-5 rounded-md border-primary data-checked:bg-primary"
            onCheckedChange={(checked) => onToggle(user.id, checked === true)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                  aria-label={menuLabel}
                />
              }
            >
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Pencil />
                {editLabel}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCopy(user)}>
                <Copy />
                {copyLabel}
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(user)}>
                <Trash2 />
                {deleteLabel}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col items-center text-center">
          <Avatar className="size-16">
            <AvatarFallback className={cn("text-base font-semibold", avatarSurfaces[tone])}>
              {initials(user)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-3 text-[15px] font-semibold">
            {user.firstName} {user.lastName}
          </CardTitle>
          <p className="mt-0.5 text-xs text-muted-foreground">{user.title}</p>
          <StatusBadge className="mt-2" tone={statusTone(user.status)}>
            {user.status}
          </StatusBadge>
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <p className="flex min-w-0 items-center gap-2">
            <Building2 className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">
              {user.department} · {user.company}
            </span>
          </p>
          <p className="flex min-w-0 items-center gap-2">
            <Mail className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{user.email}</span>
          </p>
          <p className="flex min-w-0 items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{user.phone}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto justify-between border-t border-primary/10 bg-transparent px-4 py-2">
        <span className="text-[11px] text-muted-foreground">{user.lastSeen}</span>
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground"
            aria-label={editLabel}
            onClick={() => onEdit(user)}
          >
            <Pencil />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground"
            aria-label={copyLabel}
            onClick={() => onCopy(user)}
          >
            <Copy />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground hover:text-destructive"
            aria-label={deleteLabel}
            onClick={() => onDelete(user)}
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
})

function UserCardSkeleton() {
  return (
    <Card className="h-full gap-0 overflow-hidden rounded-2xl border-0 bg-primary/10 py-0 shadow-none ring-1 ring-primary/15">
      <CardContent className="flex flex-col items-center gap-3 px-4 pt-4 pb-3">
        <div className="flex w-full justify-between">
          <Skeleton className="size-5 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
        </div>
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </CardContent>
    </Card>
  )
}

function useGridColumnCount(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [columnCount, setColumnCount] = useState(1)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const update = () => {
      const width = element.clientWidth
      const count = Math.max(
        1,
        Math.floor((width + GRID_GAP_PX) / (CARD_MIN_WIDTH_PX + GRID_GAP_PX))
      )
      setColumnCount(count)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [containerRef])

  return columnCount
}

export function UserCardGrid({ locale }: { locale: ContentLocale }) {
  const router = useRouter()
  const pathname = usePathname()
  const dict = getDictionary(locale)
  const list = dict.users.list
  const card = dict.users.card
  const prefix = pathname.match(/^\/[^/]+/)?.[0] ?? `/${locale}`
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [role, setRole] = useState(ALL)
  const [status, setStatus] = useState(ALL)
  const [department, setDepartment] = useState(ALL)
  const [createOpen, setCreateOpen] = useState(false)
  const [rows, setRows] = useState<UserRow[]>(userList)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)
  const columnCount = useGridColumnCount(scrollRef)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2500)
    return () => window.clearTimeout(timer)
  }, [])

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

  const rowCount = Math.ceil(filtered.length / columnCount)

  const rowVirtualizer = useVirtualizer({
    count: loading ? 0 : rowCount,
    getScrollElement: () =>
      scrollRef.current?.closest<HTMLElement>("[data-page-scroll]") ?? scrollRef.current,
    estimateSize: () => ROW_ESTIMATE_HEIGHT,
    overscan: 2,
    measureElement: (element) => element.getBoundingClientRect().height,
  })

  const nextId = String(
    rows.reduce((max, row) => Math.max(max, Number.parseInt(row.id, 10) || 0), 0) + 1
  )

  function handleCreated(row: UserRow) {
    setRows((current) => [row, ...current])
    setCreateOpen(false)
  }

  function goEdit() {
    router.push(`${prefix}/users/edit`)
  }

  function toggleSelected(id: string, checked: boolean) {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  async function copyUser(user: UserRow) {
    try {
      await navigator.clipboard.writeText(user.email)
    } catch {
      /* ignore */
    }
  }

  return (
    <DensityBoard>
      <header
        data-density-toolbar=""
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{card.title}</h1>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
            {rows.length}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" className="bg-card">
            <FileSpreadsheet />
            {list.excel}
          </Button>
          <Button type="button" onClick={() => setCreateOpen(true)}>
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

      <div ref={scrollRef} className="w-full">
        {loading ? (
          <div
            data-skeleton-grid=""
            className="grid grid-cols-[repeat(auto-fill,minmax(15.5rem,1fr))] gap-4"
          >
            {Array.from({ length: 8 }, (_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{list.empty}</p>
        ) : (
          <div className="relative w-full" style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * columnCount
              const rowUsers = filtered.slice(startIndex, startIndex + columnCount)

              return (
                <div
                  key={virtualRow.key}
                  ref={rowVirtualizer.measureElement}
                  data-index={virtualRow.index}
                  className="absolute top-0 left-0 grid w-full gap-4 pb-4"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                  }}
                >
                  {rowUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      selected={selected.has(user.id)}
                      copyLabel={card.copy}
                      editLabel={list.edit}
                      deleteLabel={list.delete}
                      menuLabel={list.actionsMenu}
                      onToggle={toggleSelected}
                      onEdit={goEdit}
                      onDelete={(row) => {
                        setRows((current) => current.filter((item) => item.id !== row.id))
                        setSelected((current) => {
                          const next = new Set(current)
                          next.delete(row.id)
                          return next
                        })
                      }}
                      onCopy={copyUser}
                    />
                  ))}
                </div>
              )
            })}
          </div>
        )}
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
