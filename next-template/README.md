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
    auth/.../page.tsx          yalnızca route; formlar features/auth/
    (dashboard)/.../page.tsx   yalnızca route; ekranlar features/
components/
  ui/                          shadcn tasarım sistemi
  layout/                      header, sidebar, footer, app-shell, ayarlar
  shared/                      feature’lar arası küçük parçalar (bayrak vb.)
  theme/                       tema (ileride)
features/                      ← ekranlar + mock data (ayrıntı: features/README.md)
  auth/
  dashboard/
  insights/
  profile/
  ai-chat/
  users/                       data.ts (ortak mock), list/, card/, create/
lib/
  i18n/                        resolveContentLocale, getDictionary
  messages/tr.ts, en.ts
  locales.ts, session.ts, utils.ts
proxy.ts
public/
```

Dosya adları İngilizcedir. `(dashboard)` adreste görünmez. Giriş, `session` çerezini yazar; çerez yoksa diğer adresler `/auth/login` sayfasına döner.

## Yeni sayfa / özellik

1. `features/<ad>/screen.tsx` (+ isteğe bağlı `data.ts`)
2. `app/[locale]/(dashboard)/<rota>/page.tsx` — locale prop ile screen
3. Gerekirse `lib/messages/tr.ts` ve `en.ts` aynı anahtar
4. Menü: `components/layout/sidebar/menu-items.ts`

## Özelleştirme

Kurum adı header’da `components/layout/header/copy.ts` → `headerBrand`. Menü `components/layout/sidebar/menu-items.ts`.

Renk, açık/koyu, yerleşim ve yazı tipi ayar panelinde (`components/layout/settings/`) — işlevler ileride `components/theme/` ile bağlanacak.

Renkler lacivert, mavi, yeşil, turuncu ve mordur. Yeni renk `globals.css` içindeki listeye eklenir.

## Dil (i18n)

- **URL:** `/tr/...` ve `/en/...` (menüde de, fr, it vardır; sayfa metinleri şimdilik **tr** ve **en**).
- **Sözlükler:** `lib/messages/tr.ts` ve `lib/messages/en.ts` — şema: `lib/i18n/messages-type.ts`.
- **Yardımcılar:** `resolveContentLocale()`, `getDictionary()` — `lib/i18n`.
- **Mock veri:** feature `data.ts` (ör. `features/users/data.ts`).

Dashboard, insights ve profile metinleri hâlâ ilgili feature `data.ts` içindeki `tr` / `en` bloklarındadır; istenirse `lib/messages` altına taşınır.
