import axios from "axios"

export interface ApiError {
  message: string
  code?: string   // "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "SERVER_ERROR" | "UNKNOWN"
  status?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface ListParams {
  page?: number
  pageSize?: number
  q?: string
  sort?: string
}

// Farklı backend zarflarını PaginatedResponse'a dönüştürür.
// Hook queryFn içinde çağrılır, component'te çağrılmaz.
export function adaptPaginatedResponse<T>(
  raw: unknown,
  itemsKey = "items"
): PaginatedResponse<T> {
  const r = raw as Record<string, unknown>
  return {
    items: (r[itemsKey] ?? r.data ?? r.results ?? []) as T[],
    total: (r.total ?? r.count ?? r.totalCount ?? 0) as number,
    page: (r.page ?? r.currentPage ?? 1) as number,
    pageSize: (r.pageSize ?? r.limit ?? r.perPage ?? 20) as number,
  }
}

export function normalizeApiError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status
    const serverMessage =
      typeof err.response?.data?.message === "string" ? err.response.data.message : undefined

    if (serverMessage) return { message: serverMessage, status, code: "SERVER_MESSAGE" }

    const codeMap: Record<number, string> = {
      401: "UNAUTHORIZED",
      403: "FORBIDDEN",
      404: "NOT_FOUND",
      500: "SERVER_ERROR",
    }

    return {
      message: err.message,
      code: (status != null ? codeMap[status] : undefined) ?? "UNKNOWN",
      status,
    }
  }

  if (err instanceof Error) return { message: err.message, code: "UNKNOWN" }

  return { message: "Bilinmeyen hata", code: "UNKNOWN" }
}
