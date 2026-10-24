import { DEFAULT_THEME_ACCENT, themeAppearanceIds } from "./accents"
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, fontFamilies, fontSizes } from "./fonts"
import { DEFAULT_DENSITY, DEFAULT_FOOTER, DEFAULT_LAYOUT, THEME_STORAGE_KEY } from "./storage"

type BootstrapConfig = {
  storageKey: string
  defaultAccent: string
  appearanceIds: readonly string[]
  defaultDensity: string
  defaultLayout: string
  layoutIds: readonly string[]
  defaultFooter: boolean
  defaultFontFamily: string
  fontFamilyIds: readonly string[]
  defaultFontSize: string
  fontSizeIds: readonly string[]
}

// Runs as a literal inline <script> before first paint (see its .toString() use below), so it
// cannot import applyThemeToDocument — only the constant VALUES are shared; the validation shape
// is intentionally re-expressed here. Only validates the current ("appearance"-based) stored
// shape; the legacy migrations in storage.ts (old "accent"/"dark" fields) are skipped here and
// correct themselves a tick later when ThemeProvider mounts, to keep this pre-paint step small.
function bootstrapTheme(config: BootstrapConfig) {
  try {
    const raw = window.localStorage.getItem(config.storageKey)
    const parsed = raw ? JSON.parse(raw) : {}
    const density = parsed.density === "compact" ? "compact" : config.defaultDensity
    const layout = config.layoutIds.indexOf(parsed.layout) !== -1 ? parsed.layout : config.defaultLayout
    const footer = parsed.footer === false ? false : config.defaultFooter
    const fontFamily =
      config.fontFamilyIds.indexOf(parsed.fontFamily) !== -1 ? parsed.fontFamily : config.defaultFontFamily
    const fontSize = config.fontSizeIds.indexOf(parsed.fontSize) !== -1 ? parsed.fontSize : config.defaultFontSize
    const appearance = config.appearanceIds.indexOf(parsed.appearance) !== -1 ? parsed.appearance : config.defaultAccent
    const isDark = appearance === "dark"
    const root = document.documentElement
    root.classList.toggle("dark", isDark)
    root.dataset.accent = isDark ? config.defaultAccent : appearance
    root.dataset.density = density
    root.dataset.layout = layout
    root.dataset.footer = footer ? "on" : "off"
    root.dataset.font = fontFamily
    root.dataset.fontSize = fontSize
  } catch {
    // localStorage unavailable or malformed JSON: static html defaults stand, ThemeProvider corrects after mount.
  }
}

export function themeBootstrapScript(): string {
  const config: BootstrapConfig = {
    storageKey: THEME_STORAGE_KEY,
    defaultAccent: DEFAULT_THEME_ACCENT,
    appearanceIds: themeAppearanceIds,
    defaultDensity: DEFAULT_DENSITY,
    defaultLayout: DEFAULT_LAYOUT,
    layoutIds: ["side", "top", "right"],
    defaultFooter: DEFAULT_FOOTER,
    defaultFontFamily: DEFAULT_FONT_FAMILY,
    fontFamilyIds: fontFamilies,
    defaultFontSize: DEFAULT_FONT_SIZE,
    fontSizeIds: fontSizes,
  }
  return `(${bootstrapTheme.toString()})(${JSON.stringify(config)})`
}
