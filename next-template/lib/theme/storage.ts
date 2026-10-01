import {
  DEFAULT_THEME_ACCENT,
  DEFAULT_THEME_APPEARANCE,
  isThemeAccent,
  isThemeAppearance,
  type ThemeAppearance,
} from "./accents"

export const THEME_STORAGE_KEY = "next-template-theme"

export type DensityMode = "comfortable" | "compact"

export type StoredTheme = {
  appearance: ThemeAppearance
  density: DensityMode
}

export const DEFAULT_DENSITY: DensityMode = "comfortable"

export const defaultStoredTheme: StoredTheme = {
  appearance: DEFAULT_THEME_APPEARANCE,
  density: DEFAULT_DENSITY,
}

function parseDensity(parsed: Record<string, unknown>): DensityMode {
  return parsed.density === "compact" ? "compact" : DEFAULT_DENSITY
}

function migrateStoredTheme(parsed: Record<string, unknown>): StoredTheme {
  const density = parseDensity(parsed)

  if (parsed.appearance === "navy" || parsed.accent === "navy") {
    return { appearance: DEFAULT_THEME_APPEARANCE, density }
  }

  if (typeof parsed.appearance === "string" && isThemeAppearance(parsed.appearance)) {
    return { appearance: parsed.appearance, density }
  }

  if (parsed.dark === true) {
    return { appearance: "dark", density }
  }

  if (typeof parsed.accent === "string") {
    if (parsed.accent === "dark") return { appearance: "dark", density }
    if (isThemeAccent(parsed.accent)) return { appearance: parsed.accent, density }
  }

  return { ...defaultStoredTheme, density }
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
}
