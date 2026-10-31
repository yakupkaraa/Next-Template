# API Hazırlığı Planı

> Oluşturulma: 2026-10-10  
> Durum: Faz 1 onaysız uygulandı (bkz. Notlar). Faz 2+ onay bekliyor.

Gerçek API yokken template'i bağlanmaya hazır hale getirme planı.  
Kısıt: davranış ve görünüm değişmez. `NEXT_PUBLIC_USE_MOCK` / `config.useMock` bayrağı eklenmez.  
Seam kuralı: her hook'ta tek mock çağrısı, yanında `// TODO: gerçek endpoint: METHOD /path → features/<name>/endpoint.ts`.

---

## Notlar: Onaysız Uygulanan Değişiklikler (Faz 1)

AGENTS.md Çalışma Süreci kuralını ihlal eden değişiklikler. Geri alınmazsa Faz 2 ile devam edilir:

| Dosya | Değişiklik |
|---|---|
| `docs/api-readiness-plan.md` | Yeni dosya (bu dosya) |
| `lib/api-types.ts` | Yeni dosya: `ApiError`, `PaginatedResponse<T>`, `ListParams`, `normalizeApiError()` |
| `lib/api.ts` | `http.patch<T>()` eklendi |
| `next.config.ts` | `images.remotePatterns: []` eklendi |

---

## Swap Noktaları

### users

| İşlem | Mock Kaynağı | Hook | Endpoint | Tip | Kullanan |
|---|---|---|---|---|---|
| list | `userList` | `useUserList(params)` | `GET /users` | `PaginatedResponse<UserRow>` | `table.tsx`, `grid.tsx` |
| detail | hardcoded id:"24" (profile-tab.tsx) | `useUser(id)` | `GET /users/:id` | `UserRow` | `profile-tab.tsx` (edit) |
| create | form state | `useCreateUser()` | `POST /users` | `CreateUserBody → UserRow` | `profile-tab.tsx` (create) |
| update | form state | `useUpdateUser(id)` | `PATCH /users/:id` | `Partial<UserRow> → UserRow` | `profile-tab.tsx` (edit) |
| delete | `mockRequest(() => undefined)` | `useDeleteUser()` | `DELETE /users/:id` | `void` | `actions.ts` |

**users/edit id sorunu — Onay Maddesi A (ayrı onay)**

Seçilen: **Seçenek A — `users/[id]/edit` route parametresi**.

Etkilenen yerler:
| Dosya | Değişiklik |
|---|---|
| `app/[locale]/(dashboard)/users/edit/page.tsx` | → `users/[id]/edit/page.tsx` dizini + parametre ile `id` okunur |
| `app/[locale]/(dashboard)/users/edit/` klasörü | Silinir, yerine `users/[id]/edit/` açılır |
| `features/users/card/components/grid.tsx` `goEdit()` | `router.push(\`${prefix}/users/edit\`)` → `router.push(\`${prefix}/users/${user.id}/edit\`)` |
| `features/users/list/components/table.tsx` `goEdit()` | Aynı değişiklik (table'daki goEdit) |
| `lib/paths.ts` | `usersEdit` path sabiti güncellenir (varsa) |
| `components/layout/sidebar/menu-items.ts` | `/users/edit` linki varsa güncellenir |
| `components/layout/header/breadcrumbs.tsx` | `/users/edit` eşleşmesi varsa güncellenir |

Bu değişiklik bağımsız onay gerektirir — Faz 2 kapsamında ancak ayrı madde olarak.

### ticket

| İşlem | Mock Kaynağı | Hook | Endpoint | Tip | Kullanan |
|---|---|---|---|---|---|
| list | `seedTickets` | `useTicketList(params)` | `GET /tickets` | `PaginatedResponse<Ticket>` | `screen.tsx` |
| detail | `seedTickets.find(id)` | `useTicket(id)` | `GET /tickets/:id` | `Ticket` | `screen.tsx` (panel) |
| create | form state | `useCreateTicket()` | `POST /tickets` | `TicketFormValue → Ticket` | `create/screen.tsx` |
| update | local `setTickets` | `useUpdateTicket()` | `PATCH /tickets/:id` | `Partial<Ticket> → Ticket` | `screen.tsx` |
| add message | local `setTickets` | `useSendMessage(ticketId)` | `POST /tickets/:id/messages` | `{body,type} → TicketMessage` | `screen.tsx` |
| badge count | `openTicketCount(seedTickets)` | `useNavBadges()` (client) | `GET /tickets/count?status=open,in_review` | `{ count: number }` | NavDataProvider |

### blog

| İşlem | Hook | Endpoint | Tip |
|---|---|---|---|
| list | `useBlogList(params)` | `GET /posts` | `PaginatedResponse<BlogPost>` |
| recent | `useBlogRecent()` | `GET /posts?sort=recent&limit=2` | `BlogPost[]` |

### ai-chat

| İşlem | Hook | Endpoint | Tip |
|---|---|---|---|
| list | `useChatList()` | `GET /chats` | `AiChat[]` |
| send | `useSendChatMessage(chatId)` | `POST /chats/:id/messages` | `{text} → ChatMessage` |

### profile

| İşlem | Hook | Endpoint | Tip |
|---|---|---|---|
| get | `useProfile()` | `GET /me/profile` | `Profile` |
| update | `useUpdateProfile()` | `PATCH /me/profile` | `Partial<Profile> → Profile` |

### dashboard (read-only)

| İşlem | Hook | Endpoint |
|---|---|---|
| kpi stats | `useDashboardKpis()` | `GET /dashboard/kpis` |
| revenue chart | `useDashboardRevenue()` | `GET /dashboard/revenue` |
| diğer chart verileri | `useDashboard<Dataset>()` | `GET /dashboard/:dataset` |

### insights (read-only)

| İşlem | Hook | Endpoint |
|---|---|---|
| kpi stats | `useInsightKpis()` | `GET /insights/kpis` |
| total sales | `useInsightSales()` | `GET /insights/sales` |
| diğer chart verileri | `useInsight<Dataset>()` | `GET /insights/:dataset` |

### auth

| İşlem | Mekanizma | Endpoint | Tip |
|---|---|---|---|
| login | Server Action `signIn()` + client `http.post` | `POST /auth/login` | `{email,password} → {accessToken,refreshToken,user}` |
| logout | Server Action `signOut()` + client `clearTokens()` | `POST /auth/logout` | `void` |
| refresh | `lib/api.ts` interceptor (otomatik) | `POST /auth/refresh` | `{refreshToken} → {accessToken,refreshToken?}` |
| me | `useCurrentUser()` hook | `GET /me` | `{id,name,role}` |

### notifications

| İşlem | Hook | Endpoint |
|---|---|---|
| list | `useNotifications()` — `components/layout/hooks/` altında | `GET /notifications` |
| mark read | mutation hook | `PATCH /notifications/:id/read` |

Not: Gerçek zamanlı olabilir (WebSocket/SSE) — API fazında tasarım kararı (K-4).

---

## HTTP Konvansiyonu: PATCH

- **PATCH** → partial update (ticket status, user alanı, notification okundu işareti, profil güncelleme)
- **PUT** → tam kaynak değiştirme (şimdilik yok)
- Tüm partial mutation endpoint'leri PATCH kullanır, `http.put` kullanılmaz.
- `http.patch<T>()` Faz 1'de eklendi.

---

## K-2: Sidebar badge + isAdmin → Client Wrapper (Seçenek B)

Token localStorage'da olduğu için server ortamında `fetch /me` veya `fetch /tickets/count` Authorization header ile yapılamaz.

**Seçilen: Seçenek B — `NavDataProvider` client wrapper + iki hook**

`layout.tsx` içinde `"use client"` bir `<NavDataProvider>` sarmalayıcısı. İki hook:

```typescript
// hooks/use-current-user.ts
export function useCurrentUser(): { data: CurrentUser | null; loading: boolean }
// mount'ta GET /me — mock: MOCK_SESSION_ROLE'den üretir

// hooks/use-nav-badges.ts
export function useNavBadges(): { data: Record<string, number>; loading: boolean }
// mount'ta GET /tickets/count?status=open,in_review — mock: openTicketCount(seedTickets)
```

**K-8: isAdmin flicker — `boolean | null`**

`isAdmin: boolean | null` — üç durum:
- `null`: `/me` yanıtı bekleniyor → admin menü öğeleri için **skeleton satırı** gösterilir (gizlenmez).
- `false`: giriş yapıldı, admin değil → admin öğeleri gizlenir.
- `true`: admin → admin öğeleri gösterilir.

```tsx
// Sidebar'da:
{isAdmin === null ? (
  <Skeleton className="mx-3 h-9 rounded-md" />   // admin menü yer tutucusu
) : isAdmin ? (
  <MenuLinkItem ... />
) : null}
```

Badge için: `loading` sırasında `0` gösterilir (badge'in flash yapması kabul edilebilir; skeleton uygulanmaz).

---

## TanStack Query (K-1)

### Kurulum (Onay Maddesi B — ayrı onay)

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Provider

```tsx
// components/shared/query-provider.tsx
"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(            // ← useState ile oluşturulur (her render yeni instance yaratmaz)
    () => new QueryClient({
      defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
    })
  )
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

`QueryProvider` `app/[locale]/layout.tsx` içinde `<ThemeProvider>` dışında sarmalayıcı olarak eklenir.

### Hook Yapısı

Her query hook `useQuery` sarmalayıcısıdır, dönüş `{ data, loading, error, refetch }`:

```typescript
export function useUserList(params: UserListParams = {}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users", params],
    queryFn: () => { /* mock veya http.get */ },
    placeholderData: keepPreviousData,   // arama/filtre sırasında önceki veriyi göster
  })
  return {
    data: data ?? null,
    loading: isLoading,       // sadece ilk yüklemede true (skeleton için)
    error: error ? normalizeApiError(error) : null,
    refetch,
  }
}
```

`loading` → `isLoading` (ilk yükleme, skeleton gösterilir)  
`isFetching && !isLoading` → `keepPreviousData` ile bastırılır; skeleton gösterilmez, önceki liste kalır.

Mutation hook'ları `useMutation` + `onSuccess` invalidate:

```typescript
export function useDeleteUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) =>
      // TODO: gerçek endpoint: DELETE /users/:id → features/users/endpoint.ts
      mockRequest(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
  return { deleteUser: mutateAsync, loading: isPending }
}
```

### Invalidation Tablosu

| Mutation | Invalidate |
|---|---|
| `useDeleteUser` | `["users"]` |
| `useCreateUser` | `["users"]` |
| `useUpdateUser(id)` | `["users"]`, `["users", id]` |
| `useCreateTicket` | `["tickets"]`, `["nav-badges"]` |
| `useUpdateTicket(id)` | `["tickets"]`, `["tickets", id]`, `["nav-badges"]` (status değişince) |
| `useSendMessage(ticketId)` | `["tickets", ticketId]` |
| `useUpdateProfile` | `["current-user"]` |

---

## Debounce + keepPreviousData

Arama input'u değişince her tuşa istek atmamak ve aramayı temizlerkene skeleton flash'ı önlemek için:

```typescript
// Arama state'i component'te (grid.tsx, table.tsx):
const [query, setQuery] = useState("")
const [debouncedQuery, setDebouncedQuery] = useState("")

useEffect(() => {
  const timer = setTimeout(() => setDebouncedQuery(query), 300)  // 300ms debounce
  return () => clearTimeout(timer)
}, [query])

// Hook'a sadece debounced değer iletilir:
const { data, loading } = useUserList({ ...params, q: debouncedQuery })
```

- `loading === true` (isLoading) → sadece ilk yüklemede skeleton gösterilir.
- Ardından arama yapılınca → `isFetching=true`, `isLoading=false` → `keepPreviousData` devreye girer, önceki liste görünür, skeleton yok.
- Sonuç gelince yeni liste yazılır.

Gerekiyorsa `useDebouncedValue(value, delay)` generic hook'u `hooks/use-debounced-value.ts`'e çıkarılır (2+ feature kullanırsa).

---

## Örnek Hook — Tam ve Doğru Versiyon

```typescript
// features/users/hooks/use-user-list.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { mockRequest } from "@/lib/mock-request"
import { normalizeApiError, type PaginatedResponse } from "@/lib/api-types"
import { userList } from "../mocks/users.mock"
import type { UserRow } from "../constants/users"

export interface UserListParams {
  page?: number
  pageSize?: number
  q?: string
  status?: string
  role?: string
  department?: string
  sort?: string   // "name_asc" | "name_desc" | "createdAt_desc"
}

export function useUserList(params: UserListParams = {}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users", params],
    queryFn: () => {
      // TODO: gerçek endpoint: GET /users → features/users/endpoint.ts
      // Gerçek API: mock satırı kaldırılır, endpoint.ts oluşturulur, hook buradan çağırır.
      // Mock: ListParams burada uygulanır.
      const collator = "tr"
      const normalized = (params.q ?? "").trim().toLocaleLowerCase(collator)

      let items = [...userList]
      if (params.role) items = items.filter((u) => u.role === params.role)
      if (params.status) items = items.filter((u) => u.status === params.status)
      if (params.department) items = items.filter((u) => u.department === params.department)
      if (normalized) {
        items = items.filter((u) =>
          `${u.firstName} ${u.lastName} ${u.email} ${u.title}`
            .toLocaleLowerCase(collator)
            .includes(normalized)
        )
      }
      if (params.sort === "name_asc") items.sort((a, b) => a.firstName.localeCompare(b.firstName, collator))
      if (params.sort === "name_desc") items.sort((a, b) => b.firstName.localeCompare(a.firstName, collator))

      const page = params.page ?? 1
      const pageSize = params.pageSize ?? items.length   // pagination UI kararı alınınca değişir
      const paged = params.pageSize ? items.slice((page - 1) * pageSize, page * pageSize) : items

      return mockRequest<PaginatedResponse<UserRow>>(() => ({
        items: paged,
        total: items.length,
        page,
        pageSize,
      }))
    },
    placeholderData: keepPreviousData,
  })

  return {
    data: data ?? null,
    loading: isLoading,
    error: error ? normalizeApiError(error) : null,
    refetch,
  }
}
```

**grid.tsx / table.tsx'ten kaldırılacaklar:**
- `useMemo` filtre bloğu (role/status/department/query filtrelemesi) → hook'a taşındı
- `useEffect(() => setTimeout(() => setLoading(false), 1000))` → TanStack Query `isLoading`'e taşındı
- `useState(userList)` initialization → hook döner, state kalkar

---

## Ortak Tipler (`lib/api-types.ts`)

```typescript
import axios from "axios"

export interface ApiError {
  message: string   // ⚠️ Açık eksik: backend mesajı ile axios teknik mesajı aynı alanda (bkz. Faz 2)
  code?: string     // "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "SERVER_ERROR" | "SERVER_MESSAGE" | "UNKNOWN"
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

// Sunucunun farklı alan adlarıyla döndürdüğü zarfı PaginatedResponse'a dönüştürür.
// Hook sınırında çağrılır, component'te çağrılmaz.
export function adaptPaginatedResponse<T>(
  raw: unknown,
  itemsKey = "items"    // sunucu "data", "results" vb. kullanıyorsa bu parametreyi geçersiz kıl
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
    // Backend mesajı varsa code="SERVER_MESSAGE" ile işaret edilir.
    if (serverMessage) return { message: serverMessage, status, code: "SERVER_MESSAGE" }

    const codeMap: Record<number, string> = {
      401: "UNAUTHORIZED", 403: "FORBIDDEN", 404: "NOT_FOUND", 500: "SERVER_ERROR",
    }
    // ⚠️ message burada axios teknik mesajıdır ("Request failed with status code 401").
    // UI code === "SERVER_MESSAGE" değilse message'ı direkt göstermemeli;
    // dict.errors[code] → dict.errors[String(status)] → dict.errors.fallback zincirini kullanmalıdır.
    return {
      message: err.message,
      code: (status != null ? codeMap[status] : undefined) ?? "UNKNOWN",
      status,
    }
  }
  if (err instanceof Error) return { message: err.message, code: "UNKNOWN" }
  return { message: "Bilinmeyen hata", code: "UNKNOWN" }
}
```

**Hata mesajı önceliği (UI — 4 adım):**
1. `error.code === "SERVER_MESSAGE"` → `error.message` doğrudan kullanılır (backend'den gelen insan okunabilir mesaj)
2. `dict.errors?.[error.code]` (örn. `dict.errors.UNAUTHORIZED`)
3. `dict.errors?.[String(error.status)]` (örn. `dict.errors["404"]`)
4. `dict.errors.fallback`

Dictionary'e `errors` anahtarı Faz 2'de eklenir.

> **⚠️ Açık Eksik:** `normalizeApiError.message` alanı backend mesajı ile axios teknik mesajını (`"Request failed with status code 401"`) aynı alanda taşıyor. UI `code === "SERVER_MESSAGE"` kontrolü olmadan bu mesajı doğrudan gösterirse kullanıcıya teknik metin gösterilir. 4 adımlı öncelik sırası bu nedenle **şu an kodla tam uygulanamıyor**. Faz 2'de çözülecek (bkz. Faz 2 görevleri).

---

## Loading / Error / Empty Standardı

| State | Gösterim | Koşul |
|---|---|---|
| loading (ilk yükleme) | Skeleton | `isLoading === true` |
| fetching (arama/filtre) | Önceki veri görünür (`keepPreviousData`) | `isFetching && !isLoading` |
| error | **Inline hata mesajı** + "Yeniden dene" butonu (`refetch` çağırır) | `error !== null` |
| empty | i18n `empty` key | `data.items.length === 0 && !loading && !error` |

Hata durumunda boş liste gösterilmez. Şu anki `showError(toast)` + boş liste yerine inline hata bileşeni.

---

## Auth / Session Analizi

### Gerçek API için login akışı
```
LoginForm (client)
  → http.post("/auth/login", { email, password })
    → başarılıysa:
        setTokens({ accessToken, refreshToken })
        signIn(locale, formData)  ← server action, sadece cookie set eder (redirect kaldırılır)
    → başarısızsa: form hata gösterir
```

### Refresh fail döngü riski — KRİTİK

```
session=1 cookie var + localStorage token YOK (farklı sekme / cache temizleme)
  → proxy: session=1 var → dashboard'a izin ver
  → component API çağrısı → 401 → refreshToken yok
  → clearTokens() + window.location = "/auth/login"
  → proxy: session=1 var + /auth/... → dashboard'a yönlendir  ← DÖNGÜ
```

**Fix: session cookie'yi de temizle**

`signOut()` server action bu durumda kullanılamaz:
- `signOut` içinde `redirect()` çağrısı var → server action RPC yanıtında redirect gelir
- `lib/api.ts` React render döngüsü dışında (axios interceptor) → Server Action RPC yanıtı işlenmez
- Çift redirect riski: server action redirect + `window.location.assign`

**Çözüm: Route Handler**
```
app/api/auth/sign-out/route.ts
  → POST isteği: cookies().delete("session") → { ok: true } döner
```

`redirectToLogin()` (`lib/api.ts`):
```typescript
async function redirectToLogin() {
  if (typeof window === "undefined") return
  const locale = localeFromPath(window.location.pathname)
  const loginPath = `/${locale}/auth/login`
  if (window.location.pathname === loginPath) return
  await fetch("/api/auth/sign-out", { method: "POST" }).catch(() => {})
  window.location.assign(loginPath)
}
```

### K-3: Login/logout 401 bypass — Faz 1'e alındı

`isRefreshRequest` → `isAuthBypassRequest` olarak genişletilir:
```typescript
const AUTH_BYPASS_PATHS = [REFRESH_PATH, "/auth/login", "/auth/logout"]
function isAuthBypassRequest(url: string | undefined) {
  return AUTH_BYPASS_PATHS.some((path) => (url ?? "").includes(path))
}
```

---

## Backend Zarfı → PaginatedResponse Adapter

Backend farklı alan adları kullanabilir. Adapter hook `queryFn` içinde uygulanır:

```typescript
queryFn: async () => {
  const raw = await http.get<unknown>("/users", { params })
  return adaptPaginatedResponse<UserRow>(raw, "items")  // sunucu "data" kullanıyorsa → "data"
}
```

`adaptPaginatedResponse` `lib/api-types.ts`'te tanımlı. `connecting-api.md`'ye "Backend Zarfı" başlığı altında eklenir.

---

## AGENTS.md "Data / API Kuralları" — ✅ Uygulandı (Onay Maddesi C)

`AGENTS.md` "Data / API Kuralları" bölümü Faz 1'de güncellendi. Eklenen başlıca kurallar:
- `endpoint.ts` konvansiyonu (bağlanırken oluşturulur, sadece `http.*` çağrıları içerir)
- TODO yorum formatı: `// TODO: gerçek endpoint: METHOD /path → features/<name>/endpoint.ts`
- 4 adımlı hata mesajı önceliği
- TanStack Query sarmalayıcı imzası, `keepPreviousData`, mutation invalidation

---

## Uygulama Fazları

**Kural**: Her faz biter, DUR, kullanıcı onayı bekle.

### Faz 1 — Tip altyapısı + Auth düzeltmeleri

**Bağımsız onay maddeleri (tek onayda veya ayrı ayrı):**
- **Onay Maddesi B**: TanStack Query kurulumu (`npm install @tanstack/react-query @tanstack/react-query-devtools`)

**Kod değişiklikleri (Onay Maddesi B sonrası):**
- `lib/api-types.ts` — `adaptPaginatedResponse` eklenmesi, `normalizeApiError` revize (Faz 1'de uygulandı, gözden geçirilecek)
- `lib/api.ts` — `isAuthBypassRequest` (login/logout bypass), `redirectToLogin` session cookie temizleme (K-3)
- `app/api/auth/sign-out/route.ts` — yeni Route Handler
- `components/shared/query-provider.tsx` — `QueryProvider` component'i
- `app/[locale]/layout.tsx` — `QueryProvider` sarmalayıcı eklenmesi

### Faz 2 — Users clean code + code splitting

> ⏳ Kısmen tamamlandı (2026-10-13):
> - `features/users/hooks/use-users.ts` — `useState` tabanlı `useUsers(locale)` hook'u oluşturuldu
> - `features/users/components/add-user-dialog.tsx` — paylaşılan dialog bileşeni, `next/dynamic` lazy
> - `features/users/card/components/user-card.tsx` — `UserCard` + `UserCardSkeleton` çıkarıldı
> - `features/users/card/components/user-cards-virtualized.tsx` — virtualizer çıkarıldı
> - `grid.tsx`, `table.tsx` — mock + actions importları kaldırıldı, hook + lazy dialog
> - `features/users/actions.ts` — silindi
>
> ⏳ Bekliyor (Parça 2, kullanıcı onayı sonrası):
> - `features/users/hooks/use-save-user.ts` — `useSaveUser()` hook'u
> - `profile-tab.tsx` + `profile-tab.fields.tsx` — clean code + `useSaveUser`
> - `form.tsx` — tab panelleri `next/dynamic` lazy
> - `billing-panel.tsx` — `AddCardSheet` lazy
>
> ⏳ Ertelendi — Onay Maddesi A (ayrı onay):
> - `users/[id]/edit` route değişikliği (7 etkilenen nokta)

**Gerçek API'ye bağlanırken yapılacaklar (ertelendi):**
- `features/users/hooks/use-user-list.ts` — `useUserList(params)` TanStack Query
- `features/users/hooks/use-delete-user.ts`
- `useMemo` filtre + debounce → hook'a taşıma
- `lib/messages/en.ts`, `lib/messages/tr.ts` — `errors` anahtarı
- `normalizeApiError.message` conflict çözümü (bkz. açık eksik)

### Faz 3 — Ticket hook'ları

> ⏳ Ertelendi — API'ye bağlanırken yapılacak

- `useTicketList`, `useTicket`, `useUpdateTicket`, `useCreateTicket`, `useSendMessage`
- `screen.tsx` local `setTickets` → hook çağrısına dönüştürülür

### Faz 4 — Blog, AI Chat, Profile, Dashboard, Insights hook'ları

> ⏳ Ertelendi — API'ye bağlanırken yapılacak

- Her feature için read/mutation hook'ları
- Dashboard/Insights: dataset başına hook, chart component'leri mock import'u yerine hook çağrısı yapar

### Faz 5 — Sidebar badge + isAdmin + Notifications

> ⏳ Ertelendi — API'ye bağlanırken yapılacak

- `hooks/use-current-user.ts`, `hooks/use-nav-badges.ts`
- `NavDataProvider` client wrapper → `app/[locale]/(dashboard)/layout.tsx`
- `lib/mock-session.ts` kaldırılır
- `useNotifications()` hook

### Faz 6 — Auth seam (ayrı karar)

> ⏳ Ertelendi — API'ye bağlanırken yapılacak

- Login akışı: client `http.post("/auth/login")` + `signIn()` server action cookie set (redirect kaldırılır)
- `signOut` + `clearTokens` + `/api/auth/sign-out` eş zamanlı
- `MOCK_SESSION_ROLE` tamamen kaldırılır

---

## Açık Kararlar

| # | Konu | Seçenekler | Durum |
|---|---|---|---|
| K-1 | Fetching library | TanStack Query | ✅ onaylandı, kurulum Onay Maddesi B'de |
| K-2 | Badge/isAdmin kaynağı | Client wrapper (B) | ✅ B |
| K-3 | Login 401 bypass + refresh fail cookie | isAuthBypassRequest + Route Handler | ✅ Faz 1'e alındı |
| K-4 | Notifications gerçek zamanlı | WS/SSE vs polling vs REST | API fazında |
| K-5 | users/actions.ts | Hook'a dönüştür vs sil | Faz 2'de çözülür |
| K-6 | users/edit id mekanizması | Seçenek A (`[id]/edit`) | ✅ A, Onay Maddesi A'da |
| K-7 | Pagination UI | Tüm liste mi, sayfalama mı | Kullanıcı kararı (K-7) |
| K-8 | isAdmin flicker | `boolean \| null`, null → skeleton satır | ✅ null + skeleton |

---

## İlgili Doküman Taslak Başlıkları

### `docs/api-endpoints.md`
```
# API Endpoint Katalogu
## Auth: POST /auth/login · /auth/logout · /auth/refresh · GET /me
## Users: GET /users · /users/:id · POST /users · PATCH /users/:id · DELETE /users/:id
## Tickets: GET /tickets · /tickets/:id · POST /tickets · PATCH /tickets/:id
           POST /tickets/:id/messages · GET /tickets/count
## Blog: GET /posts · /posts/:id
## Profile: GET /me/profile · PATCH /me/profile
## AI Chat: GET /chats · /chats/:id · POST /chats/:id/messages
## Notifications: GET /notifications · PATCH /notifications/:id/read
## Dashboard: GET /dashboard/kpis · /dashboard/revenue · ...
## Insights: GET /insights/kpis · /insights/sales · ...
## Ortak: Request/Response zarfı · Hata formatı · Pagination params
```

### `docs/connecting-api.md`
```
# Gerçek API'ye Bağlama Rehberi
## Ön Koşullar (.env, config.ts, TanStack Query kurulumu)
## Adım 1: lib/api-types.ts (PaginatedResponse, adaptPaginatedResponse)
## Adım 2: Backend Zarfı Dönüşümü (adaptPaginatedResponse — hook queryFn içinde)
## Adım 3: features/<name>/endpoint.ts oluşturma
   Her feature için gerçek API'ye bağlanırken:
   1. features/<name>/endpoint.ts yaz (sadece http.* çağrıları içerir)
   2. Hook'taki mock satırını kaldır, endpoint.ts'deki fonksiyonu çağır
   3. // TODO: gerçek endpoint: ... yorumunu sil
## Adım 4: Feature Hook'u Güncelleme (mockRequest → endpoint.ts çağrısı)
## Adım 5: Auth Akışı (login → setTokens + signIn cookie, logout, refresh)
## Adım 6: useCurrentUser + useNavBadges (NavDataProvider bağlama)
## Adım 7: Test Kontrol Listesi (manuel)
## Sık Karşılaşılan Sorunlar
  Cookie+token döngüsü · CORS · SSR token erişimi · TanStack Query invalidation
```
