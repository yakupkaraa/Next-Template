# Next Template

Dashboard şablonu. Türkçe `/tr`, İngilizce `/en` altındadır. Giriş yapmayan kullanıcı yalnızca giriş sayfasını görür.

```bash
npm install
npm run dev
```

## Dosya yapısı

```text
app/
  layout.tsx, globals.css
  [locale]/
    auth/.../page.tsx          yalnızca route; ekranlar features/auth/
    (dashboard)/.../page.tsx   yalnızca route; ekranlar features/
components/
  ui/                          shadcn primitive'leri
  layout/                      header, sidebar, footer, app-shell
  shared/                      data-table, search-bar, status-badge, bayrak vb.
  theme/                       theme-provider
  toast/
features/
  <ad>/
    components/                ekran ve alt bileşenler
    constants/                 copy ve sabit listeler (varsa)
    index.ts                   sayfanın import ettiği public API
    data.ts                    mock veri (varsa, feature kökünde)
  auth/                        login + forgot-password
  blog/                        liste + editor/
  dashboard/
  insights/
  list/
  profile/
  ai-chat/
  settings/                    ayar paneli (header sheet)
  ticket/                      liste + create/
  users/                       data.ts ortak mock; list/, card/, create/, edit/
lib/
  i18n/                        resolveContentLocale, getDictionary
  messages/tr.ts, en.ts
  theme/                       accents.ts (settingsColors), fonts, storage
  locales.ts, session.ts, records.ts, utils.ts
proxy.ts
public/
```

Dosya adları İngilizcedir. `(dashboard)` adreste görünmez. Giriş, `session` çerezini yazar; çerez yoksa diğer adresler `/auth/login` sayfasına döner.

## Yeni sayfa / özellik

1. `features/<ad>/components/` altında ekran bileşeni, gerekirse `constants/` ve `data.ts`.
2. `features/<ad>/index.ts` yalnızca sayfanın kullanacağı export'u açsın.
3. `app/[locale]/(dashboard)/<rota>/page.tsx` — `@/features/<ad>` import etsin, locale prop geçsin.
4. Gerekirse `lib/messages/tr.ts` ve `en.ts` aynı anahtar.
5. Menü: `components/layout/sidebar/menu-items.ts`.

## Özelleştirme

Kurum adı header’da `components/layout/constants/header/copy.ts` → `headerBrand`. Menü `components/layout/sidebar/menu-items.ts`.

Renk, açık/koyu, yerleşim ve yazı tipi ayar paneli `features/settings/` içindedir. Renk listesi `lib/theme/accents.ts` → `settingsColors`. Tema `components/theme/theme-provider.tsx` ile bağlanır.

Renkler lacivert, mavi, yeşil, turuncu ve mordur. Yeni renk `globals.css` içindeki listeye eklenir.

## Dil (i18n)

- **URL:** `/tr/...` ve `/en/...` (menüde de, fr, it vardır; sayfa metinleri şimdilik **tr** ve **en**).
- **Sözlükler:** `lib/messages/tr.ts` ve `lib/messages/en.ts` — şema: `lib/i18n/messages-type.ts`.
- **Yardımcılar:** `resolveContentLocale()`, `getDictionary()` — `lib/i18n`.
- **Mock veri:** feature `data.ts` (ör. `features/users/data.ts`).

Dashboard, insights ve profile metinleri hâlâ ilgili feature `data.ts` içindeki `tr` / `en` bloklarındadır; istenirse `lib/messages` altına taşınır.
