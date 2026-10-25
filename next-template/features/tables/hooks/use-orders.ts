"use client"

import { useEffect, useState } from "react"
import { mockRequest } from "@/lib/mock-request"
import { orderList } from "@/features/tables/mocks/orders.mock"
import type { OrderRow } from "@/features/tables/types/order"

// TODO: gerçek API'de burası TanStack Query + features/tables/endpoint.ts olacak
export function useOrders() {
  const [rows, setRows] = useState<OrderRow[]>(() => [...orderList])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600)
    return () => window.clearTimeout(timer)
  }, [])

  function addOrder(row: OrderRow) {
    setRows((current) => [row, ...current])
  }

  function updateOrder(row: OrderRow) {
    setRows((current) => current.map((item) => (item.id === row.id ? row : item)))
  }

  async function removeOrder(id: string): Promise<void> {
    await mockRequest(() => undefined)
    setRows((current) => current.filter((item) => item.id !== id))
  }

  async function removeOrders(ids: ReadonlySet<string>): Promise<void> {
    await mockRequest(() => undefined)
    setRows((current) => current.filter((item) => !ids.has(item.id)))
  }

  return { rows, loading, addOrder, updateOrder, removeOrder, removeOrders }
}
