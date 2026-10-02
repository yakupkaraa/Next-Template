import {
  DEFAULT_THEME_ACCENT,
  DEFAULT_THEME_APPEARANCE,
  isThemeAccent,
  isThemeAppearance,
  type ThemeAppearance,
} from "./accents"

export const THEME_STORAGE_KEY = "next-template-theme"

export type DensityMode = "comfortable" | "compact"

export type ShellLayout = "side" | "top" | "right"

export type StoredTheme = {
  appearance: ThemeAppearance
  density: DensityMode
  layout: ShellLayout
  footer: boolean
}

export const DEFAULT_DENSITY: DensityMode = "comfortable"
export const DEFAULT_LAYOUT: ShellLayout = "side"
export const DEFAULT_FOOTER = true

export const defaultStoredTheme: StoredTheme = {
  appearance: DEFAULT_THEME_APPEARANCE,
  density: DEFAULT_DENSITY,
  layout: DEFAULT_LAYOUT,
  footer: DEFAULT_FOOTER,
}

function parseDensity(parsed: Record<string, unknown>): DensityMode {
  return parsed.density === "compact" ? "compact" : DEFAULT_DENSITY
}

function parseLayout(parsed: Record<string, unknown>): ShellLayout {
  return parsed.layout === "top" || parsed.layout === "right" ? parsed.layout : DEFAULT_LAYOUT
}

function parseFooter(parsed: Record<string, unknown>): boolean {
  return parsed.footer === false ? false : DEFAULT_FOOTER
}

function migrateStoredTheme(parsed: Record<string, unknown>): StoredTheme {
  const density = parseDensity(parsed)
  const layout = parseLayout(parsed)
  const footer = parseFooter(parsed)
  const extras = { density, layout, footer }

  if (parsed.appearance === "navy" || parsed.accent === "navy") {
    return { appearance: DEFAULT_THEME_APPEARANCE, ...extras }
  }

  if (typeof parsed.appearance === "string" && isThemeAppearance(parsed.appearance)) {
    return { appearance: parsed.appearance, ...extras }
  }

  if (parsed.dark === true) {
    return { appearance: "dark", ...extras }
  }

  if (typeof parsed.accent === "string") {
    if (parsed.accent === "dark") return { appearance: "dark", ...extras }
    if (isThemeAccent(parsed.accent)) return { appearance: parsed.accent, ...extras }
  }

  return { ...defaultStoredTheme, ...extras }
}

export function readStoredTheme(): StoredTheme {
  if (typeof window === "undefined") return defaultStoredTheme
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (!raw) return defaultStoredTheme
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return migrateStoredTheme(parsed)
  } catch {
    return defaultStoredTheme
  }
}

export function writeStoredTheme(theme: StoredTheme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
}

export function applyThemeToDocument(theme: StoredTheme) {
  const root = document.documentElement
  const isDark = theme.appearance === "dark"
  root.classList.toggle("dark", isDark)
  root.dataset.accent = isDark ? DEFAULT_THEME_ACCENT : theme.appearance
  root.dataset.density = theme.density
  root.dataset.layout = theme.layout
  root.dataset.footer = theme.footer ? "on" : "off"
}
