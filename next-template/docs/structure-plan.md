# Structure Plan — Feature Bazlı Dosya Düzeni

> Oluşturulma: 2026-10-10  
> Güncelleme: 2026-10-10  
> Durum: ✅ Tamamlandı

---

## 1. Güncel Dosya Ağacı

```
app/
  [locale]/
    (dashboard)/     layout.tsx, page.tsx, loading.tsx
      ai-chat/       page.tsx
      blog/          page.tsx, create/page.tsx, edit/page.tsx
      insights/      page.tsx
      list/          page.tsx, [id]/page.tsx
      profile/       page.tsx
      ticket/        page.tsx, create/page.tsx
      users/         card/page.tsx, create/page.tsx, edit/page.tsx, list/page.tsx
    auth/            forgot-password/page.tsx, login/page.tsx
  layout.tsx, page.tsx

features/
  ai-chat/           components/screen.tsx, index.ts, mocks/ai-chat.mock.ts
  auth/              components/*.tsx, constants/copy.ts, index.ts
  blog/              components/*.tsx, constants/blog.ts,
                     editor/components/screen.tsx, editor/constants/copy.ts,
                     index.ts, mocks/blog.mock.ts
  dashboard/         components/*.tsx  ← chart dosyaları da burada (12→7),
                     constants/dashboard.ts, index.ts, mocks/dashboard.mock.ts
  insights/          components/*.tsx  ← chart dosyaları da burada (11→5+),
                     constants/insights.ts, index.ts, mocks/insights.mock.ts,
                     utils/section-props.ts
  list/              components/list-screen.tsx, components/list-detail-screen.tsx,
                     index.ts
  profile/           components/screen.tsx, constants/profile.ts, index.ts,
                     mocks/profile.mock.ts
  ticket/            components/*.tsx, constants/copy.ts, constants/ticket.ts,
                     create/components/screen.tsx, create/constants/copy.ts,
                     index.ts, mocks/ticket.mock.ts
  users/             actions.ts  ← KG-4: C kararıyla kökünde bırakıldı,
                     card/components/grid.tsx,
                     components/user-table-fields.tsx,
                     constants/users.ts,
                     create/components/*.tsx, create/constants/*.ts,
                     edit/components/screen.tsx,
                     index.ts, list/components/*.tsx,
                     mocks/users.mock.ts, utils/form-field-meta.ts

components/
  layout/
    app-shell.tsx, dashboard-page-content.tsx, density-board.tsx,
    page-content.tsx, route-loading.tsx, sticky-stepper-header.tsx
    constants/footer/content.ts, constants/header/copy.ts, constants/sidebar/copy.ts
    footer/footer.tsx
    header/breadcrumbs.tsx, header/header.tsx
    mocks/notifications.ts  ← bilerek bırakıldı (API fazına ertelendi)
    sidebar/menu-items.ts, sidebar/nav-label.ts, sidebar/sidebar.tsx
  shared/  analytics-page-header.tsx, chart-block-skeleton.tsx, confirm-modal.tsx,
           data-table.tsx, data-table-column-header.tsx, data-table-features.ts,
           locale-flag.tsx, search-bar.tsx, status-badge.tsx
  theme/   settings-panel.tsx  ← YENİ, theme.tsx, theme-provider.tsx
  toast/   notify.tsx, run-action.ts, toaster.tsx
  ui/      (shadcn primitives — dokunulmadı)

lib/
  api.ts, config.ts, locales.ts, mock-request.ts, mock-session.ts  ← YENİ,
  paths.ts, records.ts, session.ts, site.ts, utils.ts
  i18n/    content-locale.ts, get-dictionary.ts, index.ts, messages-type.ts
  messages/ en.ts, tr.ts
  theme/   accents.ts, fonts.ts, settings-options.ts  ← YENİ, storage.ts
```

---

## 2. Uygulama Sonucu

### Tamamlanan birimler

| Birim | Yapılan | Onay |
|---|---|---|
| CA-1 | `features/blog/blog.ts` silindi | ✅ |
| CA-2 | `SettingsPanel` + `data.ts` taşındı, `features/settings/` silindi | ✅ |
| CA-3 | Sidebar ticket import ihlali giderildi, `lib/mock-session.ts` oluşturuldu | ✅ |
| dashboard | `features/dashboard/charts/` (7 dosya) → `features/dashboard/components/` | ✅ |
| insights | `features/insights/charts/` (5 dosya) → `features/insights/components/` | ✅ |
| users | `actions.ts` yerinde bırakıldı (KG-4: C) | ✅ |

### KG Kararları

| # | Karar | Seçilen |
|---|---|---|
| KG-1 | `features/settings/` boşalınca silinsin mi? | **A — Sil.** Settings page zaten `return null`, menüde/paths'te linki yok. `app/[locale]/(dashboard)/settings/` da silindi. |
| KG-2 | Sidebar ticket import ihlali nasıl çözülsün? | **A — Props chain.** `app/[locale]/(dashboard)/layout.tsx` badge sayısını ve `isAdmin` değerini hesaplayıp `AppShell` → `Sidebar`'a geçiyor. |
| KG-3 | `charts/` klasörleri taşınsın mı? | **A — Taşı.** Her iki feature'da `charts/` → `components/` altına alındı. |
| KG-4 | `features/users/actions.ts` nereye? | **C — Yerinde kalsın.** API fazında endpoint'e bağlandığında yer yeniden değerlendirilecek. |

### Plandan sapmalar

| Sapma | Plan | Uygulanan | Neden |
|---|---|---|---|
| `SettingsPanel` hedef konumu | `components/shared/` | `components/theme/` | Tema ayarlarını düzenliyor; `theme-provider` ile aynı dizinde durması daha tutarlı. |
| `getCurrentUser()` taşıma | `lib/session.ts` | `lib/mock-session.ts` (yeni dosya) | `lib/session.ts` dosya düzeyinde `"use server"` direktifine sahip; aynı dosyaya client-uyumlu export eklenemez. Kavramsal ayrım korundu. |

### Bilerek açık bırakılanlar

| Dosya | Durum | Neden |
|---|---|---|
| `components/layout/mocks/notifications.ts` | Yerinde | Import yönü ihlali değil (layout → layout); API fazında header bildirim akışıyla birlikte ele alınacak. |
| `features/users/actions.ts` | Feature kökünde | KG-4: C. `utils/` veya `hooks/` kararı gerçek API entegrasyonuyla birlikte verilmeli. |
| `features/dashboard/` ve `features/insights/` | Ayrı feature'lar | Kapsam dışı bırakıldı. İçerik örtüşmesi var; birleştirme kararı ayrı bir analiz gerektirir. |
| `features/list/` stub dosyaları | `return null` ekranlar | Kasıtlı placeholder; dokunulmadı. |

### Sonraki fazlara devredilen işler

| İş | Faz |
|---|---|
| `features/users/actions.ts` → `utils/` veya `hooks/` | API entegrasyon fazı |
| `components/layout/mocks/notifications.ts` → feature veya API | API entegrasyon fazı |
| `dashboard` / `insights` feature birleştirme analizi | Ayrı karar; bu refactor kapsamı dışında |
| `MOCK_SESSION_ROLE` → gerçek session cookie'den okuma | Auth hardening fazı |
