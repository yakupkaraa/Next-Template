# API Hazırlığı İlerlemesi

> Güncelleme: 2026-10-10

## Faz 1 — Tip Altyapısı + Auth Düzeltmeleri

| # | Görev | Durum |
|---|---|---|
| 1a | `lib/api-types.ts` — `ApiError`, `PaginatedResponse<T>`, `ListParams`, `adaptPaginatedResponse`, `normalizeApiError` | ✅ |
| 1b | `lib/api.ts` — `http.patch<T>()` eklendi | ✅ |
| 1c | `next.config.ts` — `images.remotePatterns: []` örneği | ✅ |
| 1d | `lib/api.ts` — `isAuthBypassRequest` (K-3: login/logout/refresh bypass) | ✅ |
| 1e | `lib/api.ts` — `redirectToLogin` async + `isSigningOut` guard + `/api/auth/sign-out` fetch | ✅ |
| 1f | `app/api/auth/sign-out/route.ts` — POST Route Handler, session cookie siler | ✅ |
| 1g | TanStack Query kurulumu (`@tanstack/react-query` + devtools) | ✅ |
| 1h | `components/shared/query-provider.tsx` — `QueryProvider` (useState ile QueryClient) | ✅ |
| 1i | `app/[locale]/layout.tsx` — `QueryProvider` sarmalayıcı eklendi | ✅ |
| 1j | AGENTS.md "Data / API Kuralları" güncellemesi (Onay Maddesi C) | ✅ |
| 1k | `.next` cache temizlendi (silinen settings route referansı) | ✅ |
| - | tsc `--noEmit` | ✅ temiz |
| - | lint | ✅ yeni hata yok (1 pre-existing error, 6 pre-existing warning) |

## Faz 2 — Users Hook'ları (bekliyor)

| # | Görev | Durum |
|---|---|---|
| 2a | **Onay Maddesi A**: `users/[id]/edit` route değişikliği (7 etkilenen nokta) | ⏳ ayrı onay |
| 2b | `features/users/hooks/use-user-list.ts` — `useUserList(params)` | ⏳ |
| 2c | `features/users/hooks/use-delete-user.ts` | ⏳ |
| 2d | `grid.tsx`, `table.tsx` — `useMemo` filtre + `setTimeout` loading → hook + debounce | ⏳ |
| 2e | `lib/messages/en.ts`, `lib/messages/tr.ts` — `errors` anahtarı | ⏳ |
| 2f | `features/users/actions.ts` kararı | ⏳ Faz 2'de |

## Faz 3 — Ticket Hook'ları (bekliyor)

| # | Görev | Durum |
|---|---|---|
| 3a | `useTicketList`, `useTicket`, `useUpdateTicket`, `useCreateTicket`, `useSendMessage` | ⏳ |
| 3b | `screen.tsx` local `setTickets` → hook çağrısına | ⏳ |

## Faz 4 — Blog, AI Chat, Profile, Dashboard, Insights (bekliyor)

⏳ Faz 3 sonrası

## Faz 5 — Sidebar badge + isAdmin + Notifications (bekliyor)

⏳ `useCurrentUser`, `useNavBadges`, `NavDataProvider`, `useNotifications`

## Faz 6 — Auth Seam (bekliyor)

⏳ Login akışı, signOut eş zamanlı, MOCK_SESSION_ROLE kaldırma

## Efsane
- ⏳ bekliyor
- 🔄 uygulandı — onay bekliyor
- ✅ onaylandı / tamamlandı
- ❌ reddedildi
