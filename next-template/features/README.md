# features/

Uygulama özellikleri (ekranlar, mock veri, feature’a özel alt bileşenler) burada tutulur.

## Kurallar

1. **`app/` yalnızca routing** — `page.tsx` ince kalır: `params` oku, `resolveContentLocale`, feature `screen` render et.
2. **Her feature klasörü** — en az bir `screen.tsx` (ana ekran export’u) ve gerekiyorsa `data.ts` (mock / sabit veri).
3. **UI parçaları** — shadcn ve genel bileşenler `components/ui/`; kabuk `components/layout/`; feature’lar arası küçük parçalar `components/shared/`.
4. **Metin (i18n)** — TR/EN arayüz metinleri `lib/messages/tr.ts` ve `en.ts`; sayısal mock veri feature `data.ts` içinde kalabilir.
5. **Alt modül** — büyük domain (ör. `users`) altında `list/`, `card/`, `create/`; ortak mock `users/data.ts`.

## Yeni feature ekleme

```text
features/<ad>/
  screen.tsx      → export function XxxScreen(...)
  data.ts         → mock veri (isteğe bağlı)

app/[locale]/(dashboard)/<route>/page.tsx
  → import { XxxScreen } from "@/features/<ad>/screen"
```

Menü: `components/layout/sidebar/menu-items.ts`

## Mevcut feature’lar

| Klasör | Route örneği |
|--------|----------------|
| `auth/` | `/[locale]/auth/login` |
| `dashboard/` | `/[locale]` |
| `insights/` | `/[locale]/insights` |
| `profile/` | `/[locale]/profile` |
| `ai-chat/` | `/[locale]/ai-chat` |
| `users/` | `/[locale]/users/list`, `card`, `create` |
