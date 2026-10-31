import { normalizeApiError } from "@/lib/api-types"

/**
 * Hata toast mesajı: backend'in döndürdüğü mesaj varsa onu kullanır, yoksa çağıranın verdiği
 * sabit metne düşer. Tam öncelik sırasının (dict.errors[code] → status → fallback) kalan
 * basamakları, gerçek API ve hata kodu sözlüğü gelmeden eklenmedi (over-engineering).
 */
export function resolveErrorMessage(error: unknown, fallback: string): string {
  const normalized = normalizeApiError(error)
  return normalized.code === "SERVER_MESSAGE" ? normalized.message : fallback
}
