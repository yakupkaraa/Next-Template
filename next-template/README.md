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

## Env

Değişkenler `.env.example`'da listelenir; `NEXT_PUBLIC_SITE_URL` opsiyoneldir — verilmezse `metadataBase` Vercel'in `VERCEL_PROJECT_PRODUCTION_URL`'ini, o da yoksa `http://localhost:3000`'i kullanır.

## Security notes

- Authentication is a mock: `signIn` sets a `session=1` cookie without verifying any credentials. Replace `lib/session.ts` and `proxy.ts` with real credential checks and server-side session/token validation before production use.
- The session cookie is `httpOnly`, `sameSite=lax`, and `secure` in production (`NODE_ENV === "production"`). Access/refresh tokens for the (not-yet-connected) API are kept in `localStorage` (`lib/api.ts`) — acceptable for this mock stage, but revisit if XSS exposure becomes a concern once a real backend is wired up.
- `next.config.ts` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and a restrictive `Permissions-Policy`. No `Content-Security-Policy` is set: this template relies on inline `<script>` (theme bootstrap) and Next.js's own inline scripts, which would require nonce/hash plumbing to support a CSP safely — left as a deliberate gap, not an oversight.
- No request/form input is validated server-side yet (login, forgot-password, forms) because there is no real backend. When connecting to the real API, add server-side validation at that boundary — do not rely on client-side checks alone.
