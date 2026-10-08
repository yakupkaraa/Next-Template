// Bu modül yalnızca client tarafında çalışır (`localStorage`, `window`).
// Server Component'lerden import edilmemelidir.

import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios"
import { config } from "@/lib/config"
import { localeFromPath } from "@/lib/locales"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const REFRESH_PATH = "/auth/refresh"

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

type RefreshResponse = {
  accessToken: string
  refreshToken?: string
}

type QueueEntry = {
  resolve: (token: string) => void
  reject: (reason: unknown) => void
}

// Token okuma/yazma tek yerde. httpOnly cookie'ye geçerken yalnızca bu helper'lar değişir.
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(tokens: { accessToken: string; refreshToken?: string }) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
  if (tokens.refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
  }
}

export function clearTokens() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
})

let isRefreshing = false
let queue: QueueEntry[] = []

function isRefreshRequest(url: string | undefined) {
  return (url ?? "").includes(REFRESH_PATH)
}

function redirectToLogin() {
  if (typeof window === "undefined") return
  const locale = localeFromPath(window.location.pathname)
  const loginPath = `/${locale}/auth/login`
  if (window.location.pathname === loginPath) return
  // Axios interceptor React ağacının dışında; useRouter burada yok.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.assign(loginPath)
}

function processQueue(error: unknown, token: string | null) {
  queue.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error)
    else resolve(token)
  })
  queue = []
}

function setAuthorization(request: InternalAxiosRequestConfig, token: string) {
  request.headers.Authorization = `Bearer ${token}`
}

api.interceptors.request.use((request) => {
  const token = getAccessToken()
  if (token) setAuthorization(request, token)
  return request
})

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error)

    const original = error.config as RetryConfig | undefined
    const status = error.response?.status

    if (status !== 401 || !original || original._retry || isRefreshRequest(original.url)) {
      if (status === 401 && original && isRefreshRequest(original.url)) {
        clearTokens()
        redirectToLogin()
      }
      return Promise.reject(error)
    }

    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      clearTokens()
      redirectToLogin()
      return Promise.reject(error)
    }

    original._retry = true

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then((token) => {
        setAuthorization(original, token)
        return api(original)
      })
    }

    isRefreshing = true

    try {
      const { data } = await axios.post<RefreshResponse>(
        `${config.apiUrl.replace(/\/$/, "")}${REFRESH_PATH}`,
        { refreshToken },
        { timeout: 10000 },
      )
      if (typeof data?.accessToken !== "string" || !data.accessToken) {
        throw new Error("Refresh response is missing accessToken")
      }
      setTokens(data)
      isRefreshing = false
      processQueue(null, data.accessToken)
      setAuthorization(original, data.accessToken)
      return api(original)
    } catch (refreshError) {
      isRefreshing = false
      processQueue(refreshError, null)
      clearTokens()
      redirectToLogin()
      return Promise.reject(refreshError)
    }
  },
)

export const http = {
  get<T>(url: string, requestConfig?: AxiosRequestConfig) {
    return api.get<T>(url, requestConfig).then((r) => r.data)
  },
  post<T>(url: string, data?: unknown, requestConfig?: AxiosRequestConfig) {
    return api.post<T>(url, data, requestConfig).then((r) => r.data)
  },
  put<T>(url: string, data?: unknown, requestConfig?: AxiosRequestConfig) {
    return api.put<T>(url, data, requestConfig).then((r) => r.data)
  },
  delete<T>(url: string, requestConfig?: AxiosRequestConfig) {
    return api.delete<T>(url, requestConfig).then((r) => r.data)
  },
}
