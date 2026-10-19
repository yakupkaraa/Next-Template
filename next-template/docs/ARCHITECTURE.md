# ARCHITECTURE.md

Bu proje yeniden kullanılabilir bir Next.js (App Router, TypeScript) **template**'idir. Yapı, kodun kendisi kadar üründür: yeni kod aşağıdaki kurallara uymak zorundadır. Teknik terimler İngilizce bırakılmıştır.

---

## Proje Yapısı

Root-level yapı kullanılır, `src/` YOKTUR.

```
app/                      # Sadece routing (page, layout, loading, error, route handler). Business logic yok.
features/<name>/
├── components/           # Tekil bileşenler düz durur; aynı türden 2+ varsa alt klasör (panels/, charts/, modals/, cards/)
├── hooks/                # Feature'a özel hook'lar (state'li mantık)
├── mocks/                # <name>.mock.ts -> mock data
├── types/                # Sadece interface/type, amaca göre dosya (örn. types/ticket.ts)
├── constants/            # Sadece değerler: seçenek listeleri, limitler; *copy.ts (örn. copy.ts, profile-copy.ts) dosyaları metin + locale seçici fonksiyon istisnasıyla kalır
├── utils/                # Varsayılan tek dosya utils/<feature>.ts; 250 satırı aşarsa konuya göre böl (format.ts, filters.ts vb.); bileşen grubu başına ayrı dosya AÇILMAZ
├── endpoint.ts           # Sadece http.* çağrıları (gerçek API'ye bağlanırken oluşturulur)
└── index.ts              # Feature'ın public API'si
```

Klasör sadece içine bir şey girecekse oluşturulur, boş klasör açılmaz. Alt route klasörleri (`create/`, `edit/`, `editor/`, `card/`, `list/` gibi bir feature'ın kendi route segmentine karşılık gelen alt klasörleri) kendi kapsamına özel `constants/`, `types/`, `utils/`, `components/` klasörlerini aynı kalıpla tutabilir (örn. `features/users/create/types/`, `features/blog/editor/types/`); bu durumda üst feature'ın `constants/` / `types/` dosyaları sadece tüm alt route'ların paylaştığı ortak tanımları barındırır.

```
components/
├── ui/                   # SADECE shadcn primitive'leri (shadcn CLI alanı)
├── shared/               # data-table, search-bar, status-badge, page-header, chart-loader, form/ ...
├── layout/               # app-shell, header, sidebar, footer (sadece component'ler)
├── theme/                # theme-provider ve tema component'leri
└── toast/                # notify, toaster, run-action
lib/                      # api.ts, api-types.ts, config.ts, utils.ts, session.ts, mock-request.ts, mock-session.ts, locales.ts, preload-on-hover.ts, i18n/, messages/, theme/
hooks/                    # Generic hook'lar (use-media-query.ts vb.)
docs/                     # plan.md, progress.md, structure-plan.md, api-readiness-plan.md, TEMPLATE-ANALYSIS.md
.env.example              # Gerekli env değişkenleri
```

Mevcut feature'lar: `ai-chat`, `auth` (login + forgot-password), `blog`, `dashboard`, `insights`, `list`, `profile`, `ticket`, `users` (card, create, edit, list). Tema ayarları ayrı bir `settings` feature'ı değildir; `components/theme/` ve `lib/theme/` altında tutulur.

### Klasör sorumlulukları

- `app/`: Sadece ince `page.tsx` / `layout.tsx`. İçeride feature'ın screen component'i render edilir.
- `features/`: Domain'e özel her şey. Bir route'un feature karşılığı olmalıdır.
- `components/ui/`: shadcn CLI'ın yönettiği primitive'ler. Elle yazılan composite component'ler buraya girmez.
- `components/shared/`: 2+ feature'ın kullandığı composite component'ler.
- `lib/`: Framework'ten bağımsız genel altyapı ve helper'lar.
- `hooks/`: 2+ feature'ın kullandığı generic hook'lar.

---

## Import Kuralları

- `app/` -> `features/`, `components/`, `lib/`, `hooks/` import edebilir.
- `features/` -> `components/`, `lib/`, `hooks/` import edebilir; `app/`'ten ASLA import etmez.
- `components/` ve `lib/` -> `features/` veya `app/`'ten import ETMEZ.
- Bir feature başka bir feature'ın iç dosyalarını import etmez, sadece o feature'ın `index.ts`'ini kullanır. Ortak kod `components/shared/` veya `lib/`'e taşınır.
- `components/ui/` sadece shadcn primitive'lerini içerir; kendi composite component'lerimiz `components/shared/` altına yazılır.
- Sadece tek feature'ın kullandığı component o feature'da kalır; 2+ feature kullanıyorsa `components/shared/`'a taşınır.
- Absolute import için `@/` alias'ı kullanılır.
- Birden fazla feature'ın kullandığı sabitler (örn. `settingsColors`) `lib/` altında tutulur (`lib/theme/`), feature'dan `lib/`'e bağımlılık yaratılmaz.

---

## Data / API Kuralları

- Ayrı bir service katmanı YOKTUR. Tek HTTP altyapısı `lib/api.ts`: axios instance, interceptor'lar ve `http` objesi (`get`, `post`, `patch`, `delete`, generic `<T>`, `r.data` döndürür).
- **Component'ler mock veya HTTP çağrısı yapmaz.** Tüm veri feature hook'larından gelir.
- `lib/api.ts` sadece client tarafında çalışır (`localStorage`, `window`); Server Component'lerde import edilmez.
- Server Component'lerde gerekirse native `fetch` kullanılır (Next cache/revalidate için), axios değil.
- Mock data `features/<name>/mocks/<name>.mock.ts`'te durur. Sabit metin/label/liste `constants/`'ta durur; mock ile karıştırılmaz.
- Env değişkenleri sadece `lib/config.ts` üzerinden okunur (`NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_API_URL`).
- Genel helper'lar `lib/utils.ts`'te kalır.
- `lib/utils.ts` içindeki shadcn `cn()` helper'ına dokunulmaz (`components.json` buna bağlı).
- `app/api/` klasörü yalnızca auth cookie işlemleri için Route Handler barındırır (örn. `app/api/auth/sign-out/route.ts`). Genel iş mantığı `app/api/`'ye konulmaz.
- **Kısmi güncellemeler PATCH kullanır.** `http.put` kullanılmaz (bağlanırken de geçerli).

### Şu an geçerli (gerçek API yokken)

- Feature hook'ları şu an düz `useState`/`useEffect` sarmalayıcısıdır, TanStack Query kullanılmaz.
- Mock çağrısı hook'ta tek yerde bulunur, yanında `// TODO: gerçek API'de burası TanStack Query + features/<name>/endpoint.ts olacak` (mutation'larda `... TanStack Query mutation + ...`) yorumu.
- Create/update/delete sadece local state'i değiştirir (örn. `setRows`); refetch veya query invalidation yoktur.
- `lib/api.ts`, `lib/config.ts`, `lib/api-types.ts` (`ApiError`, `PaginatedResponse<T>`, `ListParams`, `adaptPaginatedResponse`, `normalizeApiError`) altyapısı hazır durur ama feature hook'ları henüz bunları kullanmaz.
- Detaylı durum ve feature-feature swap noktaları için `docs/api-readiness-plan.md`'ye bakılır.

### API'ye bağlanırken (henüz uygulanmadı)

- **Feature hook'ları TanStack Query sarmalayıcısı olacak.** Dönüş imzası: `{ data, loading, error, refetch }`. Query hook'larında `loading` → `isLoading` (skeleton için), sonraki fetch'lerde `keepPreviousData`; mutation hook'larında `loading` → `isPending`.
- Mock satırı kaldırılır, `features/<name>/endpoint.ts` oluşturulur ve hook oradan çağırır. `endpoint.ts` yalnızca `http.*` çağrıları içerir; component'ler doğrudan çağırmaz, sadece hook'lar çağırır. TODO yorumu silinir.
- **Mock'lar `ListParams`'ı gerçekten uygular** (filtre, sıralama, sayfalama) ve `PaginatedResponse<T>` zarfını döndürür. Client-side filtre component'te yapılmaz.
- **Backend zarfı hook sınırında dönüştürülür.** `adaptPaginatedResponse()` (`lib/api-types.ts`) hook'un `queryFn`'i içinde çağrılır; component'te çağrılmaz.
- **Hata mesajı önceliği (UI):** (1) backend'in döndüğü `message`, (2) `dict.errors[code]`, (3) HTTP status'a göre genel mesaj (`dict.errors[String(status)]`), (4) genel fallback (`dict.errors.fallback`). Backend dil bazlı mesaj dönecekse locale `Accept-Language` header'ıyla iletilir. Yükleme hatası: inline mesaj + "Yeniden dene" butonu (`refetch`). Boş liste + toast kullanılmaz.
- **Mutation sonrası invalidate:** Her mutation hook'u `onSuccess`'te ilgili query anahtarlarını `queryClient.invalidateQueries(...)` ile geçersiz kılar.
- **Kullanıcı/rol/badge bilgisi client hook'larından gelecek** (`useCurrentUser`, `useNavBadges`). Layout Server Component'inde API fetch yapılmaz.

---

## Server / Client Component

- `"use client"` yalnızca hook, event handler, browser API (`window`, `localStorage`) veya client-only kütüphane gerektiren dosyada kullanılır.
- `page.tsx` feature'ın screen component'ini doğrudan import eder; `page-client.tsx` tarzı ayrı bir sarmalayıcı dosya açılmaz.
- `next/dynamic` ile `ssr: false` Server Component içinde kullanılmaz; bu sarmalayıcı client component olarak kalır.
- Server Component'ten Client Component'e fonksiyon prop'u geçilmez.

---

## Code Splitting

- İlk render'da görünmeyen ağır parçalar (dialog, sheet, modal, tab paneli, chart, editor) `next/dynamic` ile lazy yüklenir.
- Desen: `dynamic` + mount-flag (tıklanana/odaklanana kadar import edilmez) + `preloadOnHover` (`lib/preload-on-hover.ts`, `onPointerEnter`/`onFocus` ile önceden yükleme).
- Dialog/sheet için `loading` fallback'i `null`; tab paneli için aynı boyutta skeleton kullanılır (layout shift olmaz).
- Feature `index.ts` lazy yüklenen parçayı statik export etmez.
- Çok küçük parçalar (birkaç satırlık component) bölünmez, lazy yükleme sadece gerçekten ağır/az kullanılan parçalar için yapılır.

---

## İsimlendirme

- Klasör ve dosyalar kebab-case, component'ler PascalCase, hook'lar `useXxx`.
- Mock dosyaları `<name>.mock.ts`.
- JSX içermeyen dosyalar `.ts`, içerenler `.tsx`.

---

## Dosya Boyutu

- Component dosyaları 250 satırı geçince bölünür.
- Mock dosyaları (`<name>.mock.ts`) bu kurala dahil değildir, bölünmez.

---

## Yardımcı Fonksiyonlar

- Yardımcı fonksiyon, kullanıldığı yere en yakın yerde yazılır:
  1. Tek bir component kullanıyorsa o component dosyasının içinde kalır, ayrı dosyaya çıkarılmaz (15 satıra kadar).
  2. Aynı feature'daki birden fazla component kullanıyorsa `features/<name>/utils/` altına taşınır.
  3. 2+ feature kullanıyorsa `lib/utils.ts`'e (şiştiyse `lib/utils/<konu>.ts`) taşınır.
- `lib/` en son duraktır: önce yakına yaz, paylaşım ihtiyacı doğunca yukarı taşı.
- Feature'a özel helper'lar için `lib/`'e dosya açılmaz.
- `features/<name>/utils/` klasörü sadece ihtiyaç olunca açılır.
- Taşıma kararı verirken kullanım yerleri gerçekten taranır (grep), tahminle karar verilmez.
- Bileşen dosyasında import + bileşen bulunur. Tek bileşene ait 15 satıra kadar yardımcı aynı dosyada kalabilir; daha uzun veya paylaşılan yardımcılar `utils/`'e taşınır.
- Gömülü alt bileşenler (component içinde tanımlı başka bir component, örn. bir badge veya form alanı için yazılan yardımcı component) ayrı bileşen dosyasına çıkarılır.
- `*.utils.ts` adıyla bileşen klasöründe duran dosyalar feature'ın (veya ilgili alt route'un) `utils/` klasörüne taşınır.
- 2+ feature'ın kullandığı yardımcılar (örn. tarih/para biçimleme) `lib/`'e taşınır; tek feature içinde kalan yardımcılar (örn. ticket'a özel `formatRelative`) `lib/`'e çıkarılmaz.
- JSX döndüren render helper'ları (örn. bir tablo hücresini render eden fonksiyon) `utils/`'e taşınmaz, component dosyasında kalır — `utils/` sadece JSX içermeyen mantık içindir.

---

## Renk Kuralları

- Semantic renkler (`success`, `error`, `warning`, `info`) `app/globals.css` içinde tanımlanır ve accent temasından bağımsızdır.
- `theme-accents.css` ve `lib/theme/accents.ts` sadece `--primary` ve türevlerini değiştirir.
- Dark mode'da hue sabit kalır, sadece lightness/chroma ayarlanır.
- `info` rengi accent'ten bağımsız bir ton olmalıdır (sky/cyan), `primary` ile karışmamalıdır.
- Toast ve status component'leri hardcoded Tailwind rengi (`green-500` vb.) kullanmaz, sadece semantic token kullanır.
- Durum bilgisi sadece renkle verilmez, ikon da kullanılır (check, x, alert, info).
- `danger` ayrı bir semantic renk değildir, `error` token'ına bağlanır. Toast tipi olarak `error` kullanılır; `danger` sadece destructive button/dialog içindir.

---

## Yeni Feature Ekleme

1. `features/<name>/` altında `components/`, `hooks/`, `mocks/`, `types/`, `constants/`, `index.ts` oluştur (`utils/` ihtiyaç olunca).
2. `app/[locale]/...` altına sadece ince bir `page.tsx` ekle; feature'ın screen component'ini render etsin.
3. Sidebar menüsüne (`components/layout/sidebar/menu-items.ts`) ekle.
4. Mock veri için `mocks/<name>.mock.ts` yaz; gerçek API gelince `lib/api.ts`'teki `http` ile çağrıyı feature'ın `endpoint.ts`'i içinde yaz.
5. Toast/durum göstergesi eklerken renkleri semantic token'lardan al, yeni renk uydurma.
6. Feature'ın dışarıya açtığı şeyleri `index.ts`'ten export et; başka feature'lar sadece buradan import eder.
