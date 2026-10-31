English | [Türkçe](#turkce)

# Design

Visual system: color tokens, accent themes, density/layout modes, typography, motion, and accessibility — all values below are taken directly from `app/globals.css`, `app/theme-accents.css`, and `lib/theme/`.

## Base color tokens (`app/globals.css`)

Format is whatever the source uses per token — mostly `oklch()`, with a handful of hex values (`background`, `brand-deep*`) and semantic colors mixing both.

| Token | Light | Dark |
|---|---|---|
| `background` | `#f6f7f8` | `#101d22` |
| `foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `card` | `oklch(1 0 0)` | `#18262b` |
| `card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `popover` | `oklch(1 0 0)` | `#18262b` |
| `primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| `primary-foreground` | `oklch(0.985 0 0)` | `#101d22` |
| `secondary` | `oklch(0.97 0 0)` | `#20343a` |
| `secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `muted` | `oklch(0.97 0 0)` | `#20343a` |
| `muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `accent` | `oklch(0.97 0 0)` | `#20343a` |
| `accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `destructive` | `= error` | `= error` |
| `border` | `oklch(0.914 0 0)` | `oklch(1 0 0 / 11%)` |
| `input` | `oklch(0.914 0 0)` | `oklch(1 0 0 / 16.5%)` |
| `ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |
| `chart-1..5` | `0.87 / 0.556 / 0.439 / 0.371 / 0.269` (all `oklch(_ 0 0)`) | same values |
| `sidebar` | `oklch(0.985 0 0)` | `#18262b` |
| `sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `sidebar-primary` | `oklch(0.205 0 0)` | `oklch(0.488 0.243 264.376)` |
| `sidebar-border` | `oklch(0.914 0 0)` | `oklch(1 0 0 / 11%)` |
| `sidebar-ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |
| `brand-deep` | `#1e3a8a` | `#080f24` |
| `brand-deep-2` | `#1e40af` | `#0c1733` |
| `brand-deep-accent` | `#93c5fd` | `#93c5fd` |
| `radius` | `0.625rem` | — |

### Semantic colors (accent-independent)

| Token | Light | Dark |
|---|---|---|
| `success` | `oklch(0.45 0.09 168)` | `oklch(0.84 0.12 168)` |
| `success-foreground` | `oklch(0.985 0.005 168)` | `oklch(0.22 0.03 168)` |
| `success-bg` | `oklch(0.96 0.028 168)` | `oklch(0.27 0.045 168)` |
| `error` | `oklch(0.45 0.13 25)` | `oklch(0.84 0.08 25)` |
| `error-foreground` | `oklch(0.985 0.005 25)` | `oklch(0.22 0.04 25)` |
| `error-bg` | `oklch(0.96 0.018 25)` | `oklch(0.27 0.045 25)` |
| `warning` | `oklch(0.45 0.09 75)` | `oklch(0.84 0.12 75)` |
| `warning-foreground` | `oklch(0.985 0.005 75)` | `oklch(0.22 0.03 75)` |
| `warning-bg` | `oklch(0.96 0.028 75)` | `oklch(0.27 0.045 75)` |
| `info` | `oklch(0.45 0.078 220)` | `oklch(0.84 0.1 220)` |
| `info-foreground` | `oklch(0.985 0.005 220)` | `oklch(0.22 0.03 220)` |
| `info-bg` | `oklch(0.96 0.024 220)` | `oklch(0.27 0.04 220)` |

Dark mode keeps each semantic color's hue (168/25/75/220) fixed and only shifts lightness/chroma — this is a deliberate rule, not a coincidence of these specific values. `info` uses hue 220 (sky/cyan), kept distinct from whatever hue `primary` takes so the two are never confused. `danger` is not a separate token — it maps to `error`; `error` is used for toasts, `danger` only labels destructive buttons/dialogs.

## Accent themes (`app/theme-accents.css`, `lib/theme/accents.ts`)

Three accents, light mode only (dark mode reuses the base dark palette above, with `brand-deep*` varying per accent). Selected via `data-accent` on `<html>`.

| Accent | `primary` | `background` | `sidebar` | `surface-soft` |
|---|---|---|---|---|
| `blue` (default) | `#2563eb` | `#f3f6fb` | `#e3ecfb` | `#4f46e5` |
| `green` | `#006b2c` | `#f8fef9` | `#dff3e5` | `#00873a` |
| `violet` | `#7c3aed` | `#fbf9fe` | `#ebe5f8` | `#a21caf` |

Each accent also redefines `chart-1..5`, `border`, `input`, `muted`, `sidebar-border`, `sidebar-accent`, and `brand-deep/-2/-accent` (dark-mode variants under `.dark[data-accent="…"]`). In light mode, the sidebar surface is driven entirely by `primary`: `sidebar` background is `var(--primary)` and `sidebar-foreground` is near-white — so the sidebar always reads as a solid accent-colored panel, not a tinted neutral.

Appearance values: `blue | green | violet | dark` (`lib/theme/accents.ts` → `settingsColors`). `dark` is a 4th appearance entry but toggles the `.dark` class rather than selecting an accent; the last-used accent persists underneath it.

## Density modes

Two modes, set via `data-density` on `<html>`, default `comfortable`.

- **`compact`** — classic fixed chrome. Header and sidebar render in normal flow (no floating gap), `[data-density-board]` padding/gap collapse to `0`, cards/tables lose rounded corners and shadows in favor of a flat `2px` solid border (`app/globals.css`, `html[data-density="compact"] … [data-slot="card"]`).
- **`comfortable`** — floating chrome. The `floating` custom variant (`@custom-variant floating (&:is(html[data-density=comfortable] *))`) applies `floating:rounded-2xl`, `floating:border`, `floating:shadow-sm`, and a `floating:my-3`/`ml-3`/`mr-3` gap to the sidebar, visually detaching it from the window edge (`components/layout/sidebar/sidebar.tsx`). The content board (`[data-density-board]`) carries `--density-pad-y: 1.5rem` and `--density-gap: 1rem`.

Route-loading skeletons (`data-skeleton-layout`) always force the comfortable spacing values regardless of the active density, so the loading state never looks broken mid-transition.

`lib/theme/density-metrics.ts` only defines one concrete measurement tied to density: `CARD_ROW_PX = 336` (the virtualized user-card row height), with a grid gap of `16px` (comfortable) vs `0px` (compact).

## Layout modes

`data-layout` on `<html>`: `side` (default), `top`, `right`.

- **`side`** — sidebar at the start, header above the content column only (not full width).
- **`right`** — mirrors `side`; sidebar renders at the end, and header chrome order reverses (`reverseChrome` in `components/layout/header/header.tsx`).
- **`top`** — no sidebar; instead a pill-shaped nav (`HeaderNavPill`) sits in the header. The `topmenu` custom variant (`@custom-variant topmenu (&:is(html[data-layout=top] *))`) forces the pill nav's rounded/bordered/shadowed look regardless of density, and the header grows to `--header-row-h` (`4.25rem`) instead of the fixed `h-14` used elsewhere.

The top-nav pill (`header-nav-pill.tsx`) has an animated active-indicator span (`transition-[transform,width,height,opacity] duration-300`) that slides between items; the sidebar uses the same indicator pattern (`useActiveIndicator` hook) for its own active-route highlight.

## Typography

`data-font` on `<html>`: `nunito` (default) | `inter` | `outfit` | `source` (`lib/theme/fonts.ts`). Each maps to a CSS variable (`--font-nunito`, etc.) that becomes `--app-font`, which feeds `--font-sans`/`--font-heading` in the `@theme inline` block.

`data-font-size`: `14` | `16` (default) | `18` — set directly as the root `font-size` in px, so the whole rem-based scale resizes with it.

## Radius

Single source `--radius: 0.625rem`, with derived scale `--radius-sm` (×0.6) through `--radius-4xl` (×2.6), all defined once in the `@theme inline` block and reused via Tailwind's `rounded-*` utilities.

## Theme transition

Switching appearance (light/dark/accent) runs inside a View Transition (`lib/theme/theme-transition.ts`): the new theme reveals through an expanding circle `clip-path` animation, `650ms`, `ease-in-out`, originating from the control that triggered the change (falls back to viewport center). `prefers-reduced-motion: reduce`, or a browser without `startViewTransition`, skips the animation and applies the theme directly. `app/globals.css` disables the browser's default cross-fade on `::view-transition-old/new(root)` so only the circle-reveal animation is visible.

## Accessibility

- Status is never color-only: toasts and status badges pair a semantic color with an icon (check / x / alert / info).
- Focus is visible via the global `outline-ring/50` applied to every element (`@layer base`).
- Hardcoded Tailwind colors (`green-500`, etc.) are not used for toast/status components — only the semantic tokens above, so a future accent or dark-mode change can't silently desync a status color from the rest of the UI.

---

## Turkce

[↑ English](#design)

Görsel sistem: renk token'ları, accent temaları, density/layout modları, tipografi, motion ve erişilebilirlik — aşağıdaki değerlerin tamamı doğrudan `app/globals.css`, `app/theme-accents.css` ve `lib/theme/`'den alınmıştır.

### Temel renk token'ları (`app/globals.css`)

Yukarıdaki tabloya bakın; değerler kodda hangi formatta ise (çoğunlukla `oklch()`, bazı hex değerler) öyle bırakılmıştır.

#### Semantic renkler (accent'ten bağımsız)

Yukarıdaki tabloya bakın.

Dark mode her semantic rengin hue'sunu (168/25/75/220) sabit tutar, sadece lightness/chroma kayar — bu, bu değerlere özgü bir tesadüf değil, kasıtlı bir kural. `info` hue 220 (sky/cyan) kullanır, `primary`'nin hangi hue'yu alacağından bağımsız olarak ayrı tutulur, böylece ikisi karışmaz. `danger` ayrı bir token değildir — `error`'a bağlanır; `error` toast'larda kullanılır, `danger` sadece destructive buton/dialog'ları etiketler.

### Accent temaları (`app/theme-accents.css`, `lib/theme/accents.ts`)

Üç accent, yalnızca light mode'da (dark mode yukarıdaki temel dark palete döner, `brand-deep*` accent'e göre değişir). `<html>` üzerindeki `data-accent` ile seçilir.

Yukarıdaki tabloya bakın.

Her accent ayrıca `chart-1..5`, `border`, `input`, `muted`, `sidebar-border`, `sidebar-accent` ve `brand-deep/-2/-accent`'i yeniden tanımlar (`.dark[data-accent="…"]` altında dark-mode varyantları). Light mode'da sidebar yüzeyi tamamen `primary` tarafından sürülür: `sidebar` arka planı `var(--primary)`'dir ve `sidebar-foreground` beyaza yakındır — bu yüzden sidebar her zaman tonlanmış bir neutral değil, dolu bir accent renkli panel gibi okunur.

Appearance değerleri: `blue | green | violet | dark` (`lib/theme/accents.ts` → `settingsColors`). `dark` 4. bir appearance girdisidir ama bir accent seçmek yerine `.dark` class'ını açar; altındaki son kullanılan accent kalıcı olur.

### Density modları

`<html>` üzerindeki `data-density` ile ayarlanan iki mod, varsayılan `comfortable`.

- **`compact`** — klasik sabit chrome. Header ve sidebar normal akışta render olur (floating boşluk yok), `[data-density-board]` padding/gap `0`'a çöker, kartlar/tablolar yuvarlak köşe ve gölgeyi kaybedip düz `2px` solid border'a geçer (`app/globals.css`, `html[data-density="compact"] … [data-slot="card"]`).
- **`comfortable`** — floating chrome. `floating` custom variant'ı (`@custom-variant floating (&:is(html[data-density=comfortable] *))`) sidebar'a `floating:rounded-2xl`, `floating:border`, `floating:shadow-sm` ve `floating:my-3`/`ml-3`/`mr-3` boşluğu uygular, onu pencere kenarından görsel olarak ayırır (`components/layout/sidebar/sidebar.tsx`). İçerik board'u (`[data-density-board]`) `--density-pad-y: 1.5rem` ve `--density-gap: 1rem` taşır.

Route-loading skeleton'ları (`data-skeleton-layout`) aktif density'den bağımsız olarak her zaman comfortable boşluk değerlerini zorlar, böylece loading state geçiş sırasında hiçbir zaman bozuk görünmez.

`lib/theme/density-metrics.ts` density'e bağlı tek bir somut ölçüm tanımlar: `CARD_ROW_PX = 336` (virtualized user-card satır yüksekliği), grid gap'i comfortable'da `16px`, compact'ta `0px`.

### Layout modları

`<html>` üzerindeki `data-layout`: `side` (varsayılan), `top`, `right`.

- **`side`** — sidebar başta, header sadece içerik kolonunun üstünde (tam genişlik değil).
- **`right`** — `side`'ı yansıtır; sidebar sonda render olur, header chrome sırası tersine döner (`components/layout/header/header.tsx`'te `reverseChrome`).
- **`top`** — sidebar yok; onun yerine header'da hap şeklinde bir nav (`HeaderNavPill`) oturur. `topmenu` custom variant'ı (`@custom-variant topmenu (&:is(html[data-layout=top] *))`) hap nav'ın yuvarlak/bordürlü/gölgeli görünümünü density'den bağımsız zorlar, ve header diğer yerlerde kullanılan sabit `h-14` yerine `--header-row-h`'ye (`4.25rem`) büyür.

Üst nav hapının (`header-nav-pill.tsx`) öğeler arasında kayan animasyonlu bir active-indicator span'i vardır (`transition-[transform,width,height,opacity] duration-300`); sidebar kendi active-route vurgusu için aynı indicator kalıbını (`useActiveIndicator` hook'u) kullanır.

### Tipografi

`<html>` üzerindeki `data-font`: `nunito` (varsayılan) | `inter` | `outfit` | `source` (`lib/theme/fonts.ts`). Her biri bir CSS variable'a (`--font-nunito` vb.) eşlenir, bu da `@theme inline` bloğunda `--font-sans`/`--font-heading`'i besleyen `--app-font` olur.

`data-font-size`: `14` | `16` (varsayılan) | `18` — doğrudan root `font-size` olarak px cinsinden ayarlanır, böylece rem tabanlı ölçeğin tamamı onunla birlikte yeniden boyutlanır.

### Radius

Tek kaynak `--radius: 0.625rem`, `--radius-sm`'den (×0.6) `--radius-4xl`'ye (×2.6) türetilen ölçekle birlikte, hepsi `@theme inline` bloğunda bir kez tanımlanır ve Tailwind'in `rounded-*` utility'leri üzerinden yeniden kullanılır.

### Tema geçişi

Appearance değiştirmek (light/dark/accent) bir View Transition içinde çalışır (`lib/theme/theme-transition.ts`): yeni tema genişleyen bir daire `clip-path` animasyonuyla açılır, `650ms`, `ease-in-out`, değişikliği tetikleyen kontrolden köken alır (yoksa viewport merkezine düşer). `prefers-reduced-motion: reduce` veya `startViewTransition` olmayan bir tarayıcı animasyonu atlar ve temayı doğrudan uygular. `app/globals.css`, `::view-transition-old/new(root)` üzerindeki tarayıcının varsayılan cross-fade'ini kapatır, böylece sadece daire-açılma animasyonu görünür.

### Erişilebilirlik

- Durum hiçbir zaman sadece renkle verilmez: toast'lar ve status badge'ler semantic bir rengi bir ikonla eşleştirir (check / x / alert / info).
- Focus, her elemente uygulanan global `outline-ring/50` ile görünür kalır (`@layer base`).
- Hardcoded Tailwind renkleri (`green-500` vb.) toast/status component'lerinde kullanılmaz — sadece yukarıdaki semantic token'lar, böylece ileride bir accent veya dark-mode değişikliği bir status rengini UI'nin geri kalanından sessizce ayırmaz.
