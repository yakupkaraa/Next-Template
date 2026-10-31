English | [Türkçe](#turkce)

# Next-Template Dashboard

A portfolio project: a feature-based Next.js (App Router, TypeScript) admin dashboard template. The focus is architecture discipline, performance (code splitting, RSC/client boundaries), and a cohesive design system — not a product meant for others to install and configure.

## Screens

- **Dashboard** — KPI cards and charts (Recharts)
- **Insights** — sales/segmentation/order-overview charts
- **Users** — card grid, list, create, edit
- **Blog** — list + editor
- **Ticket** — inbox, thread, composer, create
- **AI Chat**
- **Profile**
- **Tables** — 5 variants: standard, expandable rows, CRUD, drag-to-reorder, spreadsheet-style editable cells
- **Auth** — login, forgot-password (mock, no real credential check)

Cross-cutting: theme settings panel (accent color, light/dark, density, layout, font, footer), i18n (menu in 5 locales, screen text in tr/en), toast notifications.

## Tech stack

- Next.js 16.3.6 (App Router) · React 19.2.8 · TypeScript 5
- Tailwind CSS 4 · shadcn/ui 4.21 · Base UI 1.8 · `tw-animate-css`
- TanStack Table 9 · TanStack Virtual 3 · TanStack Query 5 (installed, not yet wired into feature hooks)
- Recharts 3 · lucide-react
- `@dnd-kit` (core, sortable, utilities) · `cmdk` · `sonner` (toasts)
- axios (client-side HTTP layer)

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Screenshots

_Not included in this repo._ If added, they belong in `docs/screenshots/`.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — folder structure, import rules, naming, code splitting
- [Design](docs/DESIGN.md) — color tokens, accent themes, density/layout modes, typography, motion

## Known limitations

- A handful of screen files exceed the project's own ~250-line guideline (e.g. `features/blog/editor/components/screen.tsx` at ~683 lines, `features/users/create/components/profile-tab.tsx` at ~482 lines) — not yet split.
- Mock data is imported directly into feature hooks (`features/<name>/mocks/*.mock.ts`); there is no real API layer yet, so `features/users` currently serves as the reference implementation for what the TanStack Query migration will look like.
- No Content-Security-Policy header — the theme bootstrap relies on an inline `<script>`, which would need nonce/hash plumbing to support a CSP safely.
- Authentication is fully mocked (`lib/session.ts` sets a cookie without verifying credentials); no server-side input validation exists yet since there is no real backend.

## License

No license file is included; this repository is private (`package.json` → `"private": true`) and not published for reuse.

---

## Turkce

[↑ English](#next-template-dashboard)

Bir portföy projesi: feature-based bir Next.js (App Router, TypeScript) admin dashboard template'i. Odak noktası mimari disiplin, performans (code splitting, RSC/client boundaries) ve tutarlı bir tasarım sistemi — başkalarının kurup yapılandıracağı bir ürün değil.

### Ekranlar

- **Dashboard** — KPI kartları ve grafikler (Recharts)
- **Insights** — satış/segmentasyon/sipariş-özeti grafikleri
- **Users** — kart grid, liste, oluşturma, düzenleme
- **Blog** — liste + editor
- **Ticket** — gelen kutusu, thread, composer, oluşturma
- **AI Chat**
- **Profile**
- **Tables** — 5 varyant: standard, genişleyebilir satırlar, CRUD, sürükle-bırak sıralama, spreadsheet tarzı düzenlenebilir hücreler
- **Auth** — login, forgot-password (mock, gerçek kimlik doğrulama yok)

Ortak parçalar: tema ayar paneli (accent color, light/dark, density, layout, font, footer), i18n (menü 5 locale'de, ekran metni tr/en), toast bildirimleri.

### Teknoloji yığını

Yukarıdaki "Tech stack" listesine bakın; sürümler oradaki gibidir.

### Yerel çalıştırma

Yukarıdaki komut bloğuna bakın (`npm install`, `npm run dev`, `npm run build`, `npm start`).

### Ekran görüntüleri

Bu repoya dahil değil. Eklenirse `docs/screenshots/` altına konur.

### Dokümantasyon

- [Architecture](docs/ARCHITECTURE.md) — klasör yapısı, import kuralları, isimlendirme, code splitting
- [Design](docs/DESIGN.md) — renk token'ları, accent temaları, density/layout modları, tipografi, motion

### Bilinen sınırlamalar

- Birkaç ekran dosyası projenin kendi ~250 satır kuralını aşıyor (örn. `features/blog/editor/components/screen.tsx` ~683 satır, `features/users/create/components/profile-tab.tsx` ~482 satır) — henüz bölünmedi.
- Mock veri feature hook'larına doğrudan import ediliyor (`features/<name>/mocks/*.mock.ts`); henüz gerçek bir API katmanı yok, bu yüzden `features/users` şu an TanStack Query geçişinin nasıl görüneceğine dair referans uygulama görevi görüyor.
- Content-Security-Policy header yok — tema bootstrap'i inline bir `<script>`'e dayanıyor, bu da CSP'yi güvenli şekilde desteklemek için nonce/hash altyapısı gerektirirdi.
- Authentication tamamen mock (`lib/session.ts` kimlik doğrulamadan bir cookie set ediyor); gerçek bir backend olmadığı için henüz server-side input validation yok.

### Lisans

Bir lisans dosyası yok; bu repo private'tır (`package.json` → `"private": true`) ve yeniden kullanım için yayınlanmamıştır.
