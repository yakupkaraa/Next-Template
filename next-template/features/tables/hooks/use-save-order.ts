"use client"

import { useState } from "react"
import { mockRequest } from "@/lib/mock-request"
import type { OrderRow } from "@/features/tables/types/order"

// TODO: gerçek API'de burası TanStack Query mutation + features/tables/endpoint.ts olacak
export function useSaveOrder() {
  const [saving, setSaving] = useState(false)

  async function saveOrder(values: OrderRow): Promise<OrderRow> {
    setSaving(true)
    const result = await mockRequest(() => values)
    setSaving(false)
    return result
  }

  return { saveOrder, saving }
}
