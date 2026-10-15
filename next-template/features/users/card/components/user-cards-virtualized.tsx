"use client"

import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { CARD_ROW_PX, getCardGridGap } from "@/lib/theme/density-metrics"
import type { UserRow } from "@/features/users/types/user"

export const GRID_CLASS = "grid grid-cols-12 items-stretch gap-4"
export const CARD_CELL_CLASS = "col-span-6 sm:col-span-3 xl:col-span-2"

const INITIAL_SCROLL_RECT = { width: 1280, height: 720 }

function subscribeCardColumns(onStoreChange: () => void) {
  const mqSm = window.matchMedia("(min-width: 640px)")
  const mqXl = window.matchMedia("(min-width: 1280px)")
  mqSm.addEventListener("change", onStoreChange)
  mqXl.addEventListener("change", onStoreChange)
  return () => {
    mqSm.removeEventListener("change", onStoreChange)
    mqXl.removeEventListener("change", onStoreChange)
  }
}

function getCardColumns() {
  if (window.matchMedia("(min-width: 1280px)").matches) return 6
  if (window.matchMedia("(min-width: 640px)").matches) return 4
  return 2
}

function useCardColumns() {
  return useSyncExternalStore(subscribeCardColumns, getCardColumns, () => 6)
}

export function UserCardsVirtualized({
  users,
  renderCard,
}: {
  users: UserRow[]
  renderCard: (user: UserRow) => ReactNode
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const columns = useCardColumns()
  const { density } = useThemeSettings()
  const gap = getCardGridGap(density)
  const [scrollMargin, setScrollMargin] = useState(0)
  const rowCount = Math.ceil(users.length / columns)

  const getScrollElement = useCallback(
    () => listRef.current?.closest("[data-page-scroll]") ?? null,
    []
  )

  useLayoutEffect(() => {
    const list = listRef.current
    const scroll = list?.closest("[data-page-scroll]")
    if (!(list instanceof HTMLElement) || !(scroll instanceof HTMLElement)) return

    const update = () => {
      setScrollMargin(
        list.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop
      )
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [columns, gap, users.length])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize: () => CARD_ROW_PX,
    overscan: 2,
    gap,
    scrollMargin,
    initialRect: INITIAL_SCROLL_RECT,
  })

  return (
    <div
      ref={listRef}
      className="relative w-full"
      style={{ height: rowVirtualizer.getTotalSize() }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const start = virtualRow.index * columns
        const rowUsers = users.slice(start, start + columns)
        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            className={GRID_CLASS}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: CARD_ROW_PX,
              transform: `translateY(${virtualRow.start - scrollMargin}px)`,
            }}
          >
            {rowUsers.map((user) => (
              <div key={user.id} className={CARD_CELL_CLASS}>
                {renderCard(user)}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
