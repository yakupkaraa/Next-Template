"use client"

import { mockRequest } from "@/lib/mock-request"
import type { OrderRow } from "@/features/tables/types/order"

// TODO: gerçek API'de burası TanStack Query mutation + features/tables/endpoint.ts olacak
export function useUpdateOrderField(updateOrder: (row: OrderRow) => void) {
  /** İyimser günceller; mock istek başarısız olursa önceki satıra geri döner ve hatayı fırlatır. */
  async function updateField(previous: OrderRow, next: OrderRow): Promise<void> {
    updateOrder(next)
    try {
      await mockRequest(() => undefined)
    } catch (error) {
      updateOrder(previous)
      throw error
    }
  }

  return { updateField }
}
