"use client"

import { useEffect, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable"
import { mockRequest } from "@/lib/mock-request"
import { orderList } from "@/features/tables/mocks/orders.mock"
import type { OrderRow } from "@/features/tables/types/order"

// TODO: gerçek API'de burası TanStack Query mutation + features/tables/endpoint.ts olacak
export function useReorderOrders() {
  const [rows, setRows] = useState<OrderRow[]>(() =>
    [...orderList].sort((a, b) => a.position - b.position)
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600)
    return () => window.clearTimeout(timer)
  }, [])

  /** İyimser olarak uygular; mock istek başarısız olursa önceki sıraya geri döner ve hatayı fırlatır. */
  async function reorder(activeId: string, overId: string): Promise<void> {
    const oldIndex = rows.findIndex((row) => row.id === activeId)
    const newIndex = rows.findIndex((row) => row.id === overId)
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

    const previous = rows
    const reordered = arrayMove(rows, oldIndex, newIndex).map((row, index) => ({
      ...row,
      position: index,
    }))
    setRows(reordered)
    try {
      await mockRequest(() => undefined)
    } catch (error) {
      setRows(previous)
      throw error
    }
  }

  return { rows, loading, reorder }
}
