import type { StatusBadgeTone } from "@/components/shared/status-badge"
import type { ContentLocale } from "@/lib/i18n"
import type { OrderRow, OrderStatus } from "@/features/tables/types/order"

const orderStatusTones: Record<OrderStatus, StatusBadgeTone> = {
  Beklemede: "warning",
  Hazırlanıyor: "neutral",
  Kargoda: "neutral",
  "Teslim edildi": "success",
  İptal: "danger",
}

export function orderStatusTone(status: OrderStatus): StatusBadgeTone {
  return orderStatusTones[status]
}

function intlLocale(locale: ContentLocale) {
  return locale === "en" ? "en-US" : "tr-TR"
}

export function formatOrderAmount(amount: number, locale: ContentLocale) {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatOrderDate(iso: string, locale: ContentLocale) {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function orderItemsSubtotal(order: { items: { quantity: number; unitPrice: number }[] }) {
  return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
}

/** Mevcut en büyük `id`'den bir sonraki sıra numarasını üretir (yeni sipariş id'si + no'su için). */
export function nextOrderSequence(rows: readonly OrderRow[]) {
  return rows.reduce((max, row) => Math.max(max, Number.parseInt(row.id, 10) || 0), 0) + 1
}

/** Mock üretecindeki (`SP-2026-0001`) kalıpla aynı biçimde sipariş no'su üretir. */
export function formatOrderNo(sequence: number) {
  return `SP-2026-${String(sequence).padStart(4, "0")}`
}
