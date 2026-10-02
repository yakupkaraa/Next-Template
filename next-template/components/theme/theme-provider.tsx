"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { ThemeAppearance } from "@/lib/theme/accents"
import {
  applyThemeToDocument,
  defaultStoredTheme,
  readStoredTheme,
  writeStoredTheme,
  type DensityMode,
  type ShellLayout,
  type StoredTheme,
} from "@/lib/theme/storage"

type ThemeContextValue = {
  appearance: ThemeAppearance
  density: DensityMode
  layout: ShellLayout
  footer: boolean
  setAppearance: (appearance: ThemeAppearance) => void
  setDensity: (density: DensityMode) => void
  setLayout: (layout: ShellLayout) => void
  setFooter: (footer: boolean) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<StoredTheme>(defaultStoredTheme)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = readStoredTheme()
    setTheme(stored)
    applyThemeToDocument(stored)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    applyThemeToDocument(theme)
    writeStoredTheme(theme)
  }, [ready, theme])

  const setAppearance = useCallback((appearance: ThemeAppearance) => {
    setTheme((current) => ({ ...current, appearance }))
  }, [])

  const setDensity = useCallback((density: DensityMode) => {
    setTheme((current) => ({ ...current, density }))
  }, [])

  const setLayout = useCallback((layout: ShellLayout) => {
    setTheme((current) => ({ ...current, layout }))
  }, [])

  const setFooter = useCallback((footer: boolean) => {
    setTheme((current) => ({ ...current, footer }))
  }, [])

  const value = useMemo(
    () => ({
      appearance: theme.appearance,
      density: theme.density,
      layout: theme.layout,
      footer: theme.footer,
      setAppearance,
      setDensity,
      setLayout,
      setFooter,
    }),
    [
      setAppearance,
      setDensity,
      setFooter,
      setLayout,
      theme.appearance,
      theme.density,
      theme.footer,
      theme.layout,
    ]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeSettings() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeSettings must be used within ThemeProvider")
  }
  return context
}
