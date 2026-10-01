"use client"

import { memo, useEffect, useRef, useState } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Building2, Mail } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { userList, type UserRow } from "@/features/users/data"
import { type ContentLocale } from "@/lib/i18n"

const CARD_MIN_WIDTH_PX = 256
const GRID_GAP_PX = 24
const ROW_ESTIMATE_HEIGHT = 280

const statusColors: Record<string, string> = {
  Aktif: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Beklemede: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Pasif: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
}

function initials(user: UserRow) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toLocaleUpperCase("tr")
}

const UserCard = memo(function UserCard({ user }: { user: UserRow }) {
  return (
    <Card className="h-full gap-0 overflow-hidden py-0">
      <div className="flex flex-col items-center pb-4 text-center">
        <div className="h-16 w-full bg-linear-to-br from-primary/25 via-primary/10 to-muted" />
        <Avatar className="-mt-8 size-16 ring-4 ring-card">
          <AvatarFallback className="bg-background text-base font-medium text-foreground">
            {initials(user)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-3 px-4">
          {user.firstName} {user.lastName}
        </CardTitle>
        <p className="px-4 text-sm text-muted-foreground">
          {user.title} · {user.role}
        </p>
        <Badge variant="secondary" className={`mt-2 ${statusColors[user.status]}`}>
          {user.status}
        </Badge>
      </div>
      <Separator />
      <CardContent className="flex flex-col gap-2.5 bg-muted/40 py-3">
        <p className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="size-4 shrink-0 text-foreground" />
          <span className="truncate">{user.company}</span>
        </p>
        <p className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <Mail className="size-4 shrink-0 text-foreground" />
          <span className="truncate">{user.email}</span>
        </p>
      </CardContent>
    </Card>
  )
})

function UserCardSkeleton() {
  return (
    <Card className="h-full gap-0 overflow-hidden py-0">
      <div className="flex flex-col items-center pb-4">
        <Skeleton className="h-16 w-full rounded-none" />
        <Skeleton className="-mt-8 size-16 rounded-full" />
        <Skeleton className="mt-3 h-4 w-28" />
        <Skeleton className="mt-2 h-3 w-36" />
        <Skeleton className="mt-2 h-5 w-16 rounded-full" />
      </div>
      <Separator />
      <CardContent className="flex flex-col gap-2.5 bg-muted/40 py-3">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-full" />
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

export function UserCardGrid({ locale: _locale }: { locale: ContentLocale }) {
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const columnCount = useGridColumnCount(scrollRef)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  const rowCount = Math.ceil(userList.length / columnCount)

  const rowVirtualizer = useVirtualizer({
    count: loading ? 0 : rowCount,
    getScrollElement: () =>
      scrollRef.current?.closest<HTMLElement>("[data-page-scroll]") ?? scrollRef.current,
    estimateSize: () => ROW_ESTIMATE_HEIGHT,
    overscan: 2,
    measureElement: (element) => element.getBoundingClientRect().height,
  })

  return (
    <div ref={scrollRef} className="w-full">
      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-6">
          {Array.from({ length: 8 }, (_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div
          className="relative w-full"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * columnCount
            const rowUsers = userList.slice(startIndex, startIndex + columnCount)

            return (
              <div
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                className="absolute left-0 top-0 grid w-full gap-6 pb-6"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                }}
              >
                {rowUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
