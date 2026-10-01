# Mimari İnceleme ve Refactor Haritası

> **Kapsam:** Next.js 16 dashboard şablonu (`app/`, `components/`, `lib/`). Kod değişikliği yapılmadan, yazılım mimarı perspektifiyle hazırlanmıştır.  
> **Tarih:** 2026-09-30

---

## 1. Kod tabanı özeti

| Alan | Durum |
|------|--------|
| **Routing** | `app/[locale]/(dashboard)/*` + `auth/*`, Next 16 `proxy.ts` ile oturum yönlendirmesi |
| **UI** | shadcn/Base UI, Tailwind 4, çoğunlukla mock `components/*/data.ts` |
| **Global state** | Yok (Context/Zustand/Redux yok); yerel `useState` ağırlıklı |
| **i18n** | Menü ve kopyalar `Record<Locale, string>`; `lib/messages/*` boş; sayfalar çoğunlukla yalnızca `tr` / `en` |
| **Sunucu / istemci** | Sayfalar ince; dashboard kabuğu ve ekranların büyük kısmı `"use client"` |

### Bileşen hiyerarşisi (yüksek seviye)

```mermaid
flowchart TB
  subgraph root [Root]
    RL[app/layout.tsx - Server]
  end

  subgraph locale [Locale]
    LL[app/[locale]/layout.tsx - passthrough]
  end

  subgraph dash [Dashboard]
    DL[app/(dashboard)/layout.tsx - Server]
    AS[AppShell - Client]
    H[Header - Client]
    SB[Sidebar - Client]
    BC[PageBreadcrumb - Client]
    F[Footer - Client]
    P[page.tsx - Server/Client karışık]
    SCR[*Screen veya *Table - Client ağırlıklı]
  end

  RL --> LL --> DL --> AS
  AS --> H
  AS --> SB
  AS --> BC
  AS --> P
  AS --> F
  P --> SCR
  H --> SP[SettingsPanel - Client]
```

---

## 2. Bileşen hiyerarşisindeki darboğazlar

### 2.1 Geniş istemci sınırı: `AppShell`

**Konum:** `components/layout/app-shell.tsx`

Tüm dashboard rotaları tek bir istemci ağacına bağlanıyor: `Header`, `Sidebar`, `PageBreadcrumb`, `Footer` ve sayfa içeriği aynı client boundary altında (shell `useState` ile sidebar açık/kapalı tutuyor).

**Etki:**

- Her rota geçişinde layout parçaları yeniden hidrat edilir; RSC ile sayfa içeriği sunucuda kalsa bile kabuk maliyeti sabittir.
- Sidebar toggle state’i yalnızca shell’de; kalıcılık veya URL ile senkron yok (dar ekran / erişilebilirlik senaryolarında zayıf).

**Önerilen yön:** Shell’i mümkün olduğunca parçalamak — örneğin `SidebarProvider` yalnızca toggle gerektiren alt ağaç, breadcrumb/footer için locale’i sunucudan prop veya layout’tan geçirmek.

---

### 2.2 `Header` monolith

**Konum:** `components/layout/header/header.tsx`

Tek bileşende: sidebar toggle, marka, dil menüsü, bildirimler, ayarlar sheet’i (`SettingsPanel`), profil/çıkış, isteğe bağlı yatay menü (`showMenu` — sidebar ile aynı `menuItems`).

**Etki:**

- Test ve değişiklik maliyeti yüksek; yeni üst-bar özelliği her seferinde aynı dosyaya ekleniyor.
- `SettingsPanel` header’a sıkı coupling — ayarlar UI’si routing (`/settings`) ile ilişkisiz.

---

### 2.3 Dev monolitik ekran bileşenleri

| Bileşen | Satır ~ | Sorun |
|---------|---------|--------|
| `dashboard-screen.tsx` | ~250 | Grafikler, tablo, stat kartları tek client dosyada; Recharts bundle’ı tüm dashboard ile birlikte yüklenir |
| `insights-screen.tsx` | ~350 | Aynı pattern; paylaşılan chart wrapper’ları yok |
| `profile-screen.tsx` | ~270 | Sunucu bileşeni (iyi); ancak dashboard/insights ile tutarsız pattern |

**Etki:** Kod tekrarı (chart container, trend satırı, badge tonları), lazy load / code splitting fırsatı kaçırılıyor, ekip paralel çalışması zorlaşıyor.

---

### 2.4 Navigasyon mantığının üç yerde tekrarı

| Kaynak | Sorumluluk |
|--------|------------|
| `sidebar.tsx` | `itemHref`, `isActive`, collapsible gruplar |
| `header.tsx` (`showMenu`) | Aynı `menuItems`, benzer active hesabı |
| `page-breadcrumb.tsx` | `currentPage()` — menü ağacından breadcrumb türetme + rota bazlı genişlik (`w-[90%]`, `w-4/5`) |

**Etki:** Yeni rota veya menü grubu eklendiğinde üç nokta güncellenmeli; breadcrumb “grup” linki her zaman ilk child’a gidiyor (`item.children[0]`) — semantik hata riski.

---

### 2.5 `PageBreadcrumb` layout ile rota coupling

**Konum:** `components/layout/breadcrumb/page-breadcrumb.tsx`

Breadcrumb yalnızca navigasyon değil; `path === "/insights"` gibi koşullarla sayfa genişliğini de belirliyor.

**Etki:** Layout concern ile rota styling karışıyor; yeni sayfa eklerken shell davranışı breadcrumb dosyasına taşınıyor.

---

### 2.6 Gereksiz client bileşenleri (hidratasyon maliyeti)

| Bileşen | Neden client? | Alternatif |
|---------|----------------|------------|
| `footer.tsx` | `usePathname` → locale | `[locale]` layout’tan `locale` prop |
| `columns.tsx` | Hücre render JSX | Column tanımlarını sunucuda tutup hücreleri küçük client chip’lere ayırmak |
| `user-list-table.tsx` | Arama + sahte loading | Sunucuda filtre (searchParams) + Suspense skeleton |

---

### 2.7 Ölü veya eksik rotalar

- `app/[locale]/(dashboard)/settings/page.tsx` → `null`
- `app/[locale]/(dashboard)/list/page.tsx` → `null`
- README ve menü `lib/site.ts` ile gerçek yapı arasında drift (ör. tema `theme.tsx`’te denmiş ama bileşen `return null`)

**Etki:** Kullanıcı `/settings` veya `/list` açtığında boş sayfa; ayarlar yalnızca sheet’te — tutarsız bilgi mimarisi.

---

### 2.8 Cross-feature import coupling

- `user-card-grid.tsx` → `@/components/user-list/data` (liste domain’ine bağımlı)
- `columns.tsx` → `CountryFlag` header altından (`layout/header/locale-flag`)

**Etki:** Feature klasörleri “dikey dilim” değil; refactor veya modül ayırma zor.

---

### 2.9 Tekrarlayan sunum katmanı

- `statusColors` / onay badge stilleri: `user-list/columns.tsx` ve `user-card/user-card-grid.tsx`
- Sahte yükleme: `UserListTable` ve `UserCardGrid` — aynı `setTimeout(2500)` pattern’i
- Client-side arama: `UserListTable` ve `AiChatScreen` — aynı `toLocaleLowerCase("tr")` filtre mantığı

---

## 3. State yönetiminde anti-pattern’ler

### 3.1 “Hayalet ayarlar” — UI state uygulamayı etkilemiyor

**Konum:** `components/layout/settings/settings-panel.tsx`

`layout`, `color`, `font`, `size`, `footer`, `dark` tamamen yerel `useState`. README’nin vaat ettiği `components/theme/theme.tsx` ise `return null`.

**Anti-pattern adı:** **Disconnected UI state** / **façade settings**

**Risk:** Kullanıcı koyu modu açtı sanır; hiçbir CSS sınıfı veya `class` on `html` değişmez. Ürün güvenilirliği ve destek maliyeti.

---

### 3.2 Tema için çift kaynak (gelecekte çakışma)

- Dokümantasyon: tema `theme.tsx` + tarayıcıda kalıcılık
- Gerçek: `SettingsPanel` içinde izole `dark` switch
- Root: `app/layout.tsx` sabit `lang="en"`, next-themes yok

**Anti-pattern:** **Paralel, senkronize olmayan tema kaynakları**

---

### 3.3 Form state: kontrolsüz + çok sekmeli kopukluk

**Konum:** `user-create-screen.tsx` ve alt paneller

- Profil alanları `defaultValue` (uncontrolled); gönder butonu form state toplamıyor
- `NotificationsPanel` kendi `enabled` map’ini tutuyor; billing/security ile paylaşım yok
- Avatar `preview` yalnızca profil sekmesinde; sekmeler arası “kaydet” yok

**Anti-pattern:** **Fragmented form state** — wizard/tabs için ortak model yok

---

### 3.4 Sunucu action + gereksiz controlled login alanları

**Konum:** `login-form.tsx`

Form `action={signIn}` ile çalışıyor; email/password state’i esas olarak `disabled={!ready}` için. Checkbox `remember` controlled değil (native — bu kısım doğru).

**Anti-pattern:** Hafif **duplicate source of truth** (DOM + React state). `useFormStatus` veya yalnızca native validation ile sadeleştirilebilir.

---

### 3.5 Sohbet state’inin bellekte mock veriye yapışması

**Konum:** `ai-chat-screen.tsx`

- `activeId`, `draft`, `extra` Record — gönderilen mesajlar yalnızca bellekte; sayfa yenilenince kaybolur
- `active` her zaman `aiChats.find` — filtrelenmiş listede olmayan id seçilebilir (edge case)
- Mesaj key: `` `${message.role}-${index}` `` — append-only için kırılgan

**Anti-pattern:** **Ephemeral overlay state** without normalization (id tabanlı mesaj listesi yok)

---

### 3.6 Sidebar collapsible: stale initial state

**Konum:** `sidebar.tsx` → `MenuGroupItem`

```ts
const [expanded, setExpanded] = useState(childActive)
```

Route değişince `childActive` güncellenir ama `expanded` otomatik senkronize olmaz (yalnızca ilk mount).

**Anti-pattern:** **Derived state initialized once** — `useEffect` veya doğrudan türetilmiş `open` pattern gerekir.

---

### 3.7 Sahte async loading state

**Konum:** `user-list-table.tsx`, `user-card-grid.tsx`

Veri zaten senkron import; 2.5s yapay gecikme `useEffect` ile.

**Anti-pattern:** **Simulated loading** — gerçek veri katmanına geçildiğinde iki kez yazılacak; Suspense/React Query ile değiştirilmeli.

---

### 3.8 Locale state’inin pathname’ten defalarca türetilmesi

`localeFromPath(usePathname())` — Header, Sidebar, Footer, Breadcrumb, birçok client bileşende.

**Anti-pattern:** **Prop drilling kaçınırken her leaf’te aynı türetim** — `[locale]` layout’ta bir kez okuyup context veya prop geçmek daha tutarlı (özellikle 5 locale tanımlı ama UI’da 2’si destekleniyorsa).

---

### 3.9 i18n altyapısı kullanılmıyor

- `lib/messages/tr.ts`, `en.ts` → `export {}`
- Sayfalar: `locale === "en" ? "en" : "tr"` (de, fr, it menüde var ama içerik yok)

**Anti-pattern:** **Split-brain i18n** — menü 5 dil, ekran 2 dil, merkezi message catalog boş.

---

## 4. Diğer mimari gözlemler

1. **Oturum modeli:** `session=1` cookie — şablon için yeterli; production için JWT/session store, CSRF ve action doğrulama planlanmalı.
2. **Veri katmanı:** Tüm domain verisi client bundle’a giren statik TS — API Routes / Server Components + fetch yok.
3. **Erişilebilirlik:** Sidebar toggle `aria-controls` iyi; settings state DOM’a yansımıyor (tema).
4. **Performans:** Dashboard + Insights Recharts’ı aynı vendor chunk’a iter; rota bazlı `dynamic(..., { ssr: false })` henüz yok.
5. **Tutarlı sayfa sarmalayıcıları:** Bazı sayfalar `w-[90%] overflow-y-auto`, bazıları `flex min-h-0 flex-1` — scroll container kimde belirsiz (shell `main` overflow-hidden).

---

## 5. Refactor haritası (adım adım)

Öncelik: **yüksek kullanıcı etkisi + düşük risk** → **yapısal borç** → **ölçeklenebilirlik**.

### Faz 0 — Envanter ve hedef mimari (1–2 gün, kod minimal)

- [ ] Feature sınırlarını yazılı tanımla: `dashboard`, `users`, `auth`, `layout`, `settings/theme`.
- [ ] RSC/Client matrisi: hangi ekranların gerçekten client olması gerektiğini listele.
- [ ] i18n hedefi: 2 dil mi 5 dil mi — menü ile hizala.
- [ ] `/settings`, `/list` rotalarını ya kaldır ya da gerçek içerikle doldur (404/breadcrumb tutarlılığı).

**Çıktı:** Kısa ADR veya bu belgenin “Hedef durum” bölümü onayı.

---

### Faz 1 — Tema ve ayarlar (kritik UX borcu)

1. **Tek tema kaynağı** seç: `next-themes` veya cookie + `class` on `<html>`.
2. `SettingsPanel` state’ini tema provider / server cookie ile birleştir; switch’ler gerçekten uygulamayı değiştirsin.
3. `Theme` bileşenini README ile uyumlu hale getir veya README’yi güncelle.
4. Font/size seçimleri: CSS variable veya `data-*` attribute convention — panelden root’a bağla.
5. Layout seçimi (top/side/right): uzun vadeli ise feature flag; kısa vadede UI’dan kaldır veya “yakında” ile gizle (hayalet kontrol bırakma).

**Başarı kriteri:** Koyu mod yenilemeden sonra kalıcı; kabuk renkleri seçilen paletle uyumlu.

---

### Faz 2 — Layout kabuğunu inceltme

1. `app/[locale]/(dashboard)/layout.tsx` içinde `params.locale` oku; `Footer`, mümkünse `PageBreadcrumb` için server wrapper oluştur.
2. `Header`’ı parçala: `HeaderActions`, `LocaleMenu`, `NotificationsMenu`, `UserMenu`, `SettingsSheet`.
3. Sidebar open state: `localStorage` veya cookie (isteğe bağlı) + küçük client provider; shell sadeleşir.
4. Breadcrumb genişlik kurallarını breadcrumb’dan çıkar → ilgili `page.tsx` layout class’ları veya ortak `PageContainer` variant.

**Başarı kriteri:** Footer client değil veya tek satırlık client; pathname okuyan bileşen sayısı azalır.

---

### Faz 3 — Navigasyon tek kaynak

1. `lib/navigation/` (veya `components/layout/navigation/`): `buildHref`, `isActiveRoute`, `resolveBreadcrumb(path, locale)`.
2. Sidebar ve Header bu modülü kullansın; breadcrumb grup linki mantığı düzeltilsin (ilk child yerine grup hub veya inactive label).
3. `menu-items.ts` ile `lib/site.ts` / README hizalansın.

**Başarı kriteri:** Yeni menü maddesi tek dosya + otomatik breadcrumb.

---

### Faz 4 — Feature modülleri (users)

1. `components/users/` altında birleştir: `list`, `card`, `create`, paylaşılan `types`, `status-badge`, `user-mocks`.
2. `statusColors` ve verified badge → tek `UserStatusBadge` (client minimal).
3. Sahte loading kaldır; `loading.tsx` + Suspense veya gerçek fetch.
4. Liste araması: `searchParams.q` + server filter (RSC) veya paylaşılan `useDebouncedSearch` hook (client kalacaksa).

**Başarı kriteri:** Card ve list aynı domain modülünden import eder; layout/header’a domain import yok.

---

### Faz 5 — Dashboard / Insights parçalama ve performans

1. Ortak `components/charts/` — `WorkflowLineChart`, `MarketingBarChart`, chart config tipleri.
2. `DashboardScreen` → `DashboardStats`, `DashboardDocumentsTable`, grid composition.
3. Recharts içeren parçaları `next/dynamic` ile lazy load.
4. Statik `data.ts` dosyalarını mümkün olduğunca server-only import (client ekranlarda yalnızca serialize edilmiş props).

**Başarı kriteri:** Lighthouse/ bundle analizinde dashboard ilk yük JS’inde ölçülebilir düşüş.

---

### Faz 6 — Form ve auth sertleştirme

1. `UserCreateScreen`: `react-hook-form` veya native FormData + tek server action; sekmeler aynı form state.
2. Login: `useFormStatus` ile submit disabled; gereksiz email/password state kaldır.
3. Oturum: production planı (secret, rotation, middleware/proxy ile korumalı matcher gözden geçirme).

---

### Faz 7 — i18n birleştirme

1. `lib/messages` veya `next-intl` benzeri yapı — tüm `data.ts` kopyalarını locale key’lerine taşıma planı (kademeli).
2. `resolveDashboardLocale(locale)` helper — `en/tr` hack’ini tek yerde topla; de/fr/it ya desteklenir ya menüden çıkar.
3. `app/layout.tsx` `lang={locale}` dinamik (locale layout üzerinden).

---

### Faz 8 — AI Chat (ileride API bağlanacaksa)

1. State: normalized `{ chatsById, messageIds, activeChatId }` veya URL `?chat=id`.
2. Optimistic UI + server persistence sözleşmesi.
3. Sidebar liste filtreleme ile `activeId` tutarlılığı.

---

## 6. Öncelik matrisi (özet)

| Öncelik | Konu | Gerekçe |
|---------|------|---------|
| P0 | Tema/ayarlar bağlantısı | Kullanıcıya yanlış geri bildirim |
| P0 | Ölü rotalar (`settings`, `list`) | Güven ve SEO |
| P1 | Header/shell client ağırlığı | Performans, bakım |
| P1 | Navigasyon tek kaynak | Bug riski (breadcrumb) |
| P2 | Users modül birleştirme | Tekrar, coupling |
| P2 | Dashboard chart splitting | Bundle boyutu |
| P3 | i18n 5 dil tutarlılığı | Ürün kapsamı netliği |
| P3 | AI chat state modeli | API öncesi hazırlık |

---

## 7. Hedef durum (kısa vizyon)

```text
app/[locale]/(dashboard)/layout.tsx   → locale prop, Server
components/layout/
  app-shell.tsx                       → ince client (sidebar toggle provider)
  navigation/                         → paylaşılan href/active/breadcrumb
  header/*                            → küçük birleşik parçalar
features/ veya components/
  dashboard/ | users/ | insights/     → dikey dilimler, paylaşılan ui/
lib/
  theme/                              → cookie + provider
  i18n/                               → messages, resolveLocale
  session.ts                          → (evrimleşmiş auth)
```

Bu yapı ile: **RSC veri + ince client etkileşim**, **tek tema/ locale kaynağı**, **menü–breadcrumb–sidebar uyumu** ve **feature bazlı ölçekleme** hedeflenir.

---

## 8. Bilinçli olarak ertelenenler

- Global state kütüphanesi eklemek — yalnızca tema/sidebar için Context yeterli olabilir; chat veya bildirimler büyürse Zustand değerlendirilir.
- Micro-frontend / monorepo ayrımı — mevcut boyut için gerek yok.
- E2E test altyapısı — refactor fazlarından sonra Playwright eklenebilir (Faz 6 sonrası mantıklı).

---

*Bu belge canlı bir refactor backlog’udur; faz tamamlandıkça maddeler işaretlenip “Lessons learned” bölümü eklenebilir.*
