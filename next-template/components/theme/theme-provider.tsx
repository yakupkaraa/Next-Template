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
import type { FontFamily, FontSize } from "@/lib/theme/fonts"
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
  fontFamily: FontFamily
  fontSize: FontSize
  setAppearance: (appearance: ThemeAppearance) => void
  setDensity: (density: DensityMode) => void
  setLayout: (layout: ShellLayout) => void
  setFooter: (footer: boolean) => void
  setFontFamily: (fontFamily: FontFamily) => void
  setFontSize: (fontSize: FontSize) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<StoredTheme>(defaultStoredTheme)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = readStoredTheme()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate stored theme after mount
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

  const setFontFamily = useCallback((fontFamily: FontFamily) => {
    setTheme((current) => ({ ...current, fontFamily }))
  }, [])

  const setFontSize = useCallback((fontSize: FontSize) => {
    setTheme((current) => ({ ...current, fontSize }))
  }, [])

  const value = useMemo(
    () => ({
      appearance: theme.appearance,
      density: theme.density,
      layout: theme.layout,
      footer: theme.footer,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      setAppearance,
      setDensity,
      setLayout,
      setFooter,
      setFontFamily,
      setFontSize,
    }),
    [
      setAppearance,
      setDensity,
      setFooter,
      setFontFamily,
      setFontSize,
      setLayout,
      theme.appearance,
      theme.density,
      theme.footer,
      theme.fontFamily,
      theme.fontSize,
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
