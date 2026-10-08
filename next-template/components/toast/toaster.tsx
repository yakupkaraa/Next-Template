"use client"

import type { CSSProperties } from "react"
import { Toaster as SonnerToaster } from "sonner"
import { useThemeSettings } from "@/components/theme/theme-provider"

const toastColors = {
  "--success-bg": "inherit",
  "--success-border": "var(--success)",
  "--success-text": "var(--success)",
  "--error-bg": "inherit",
  "--error-border": "var(--error)",
  "--error-text": "var(--error)",
  "--warning-bg": "inherit",
  "--warning-border": "var(--warning)",
  "--warning-text": "var(--warning)",
  "--info-bg": "inherit",
  "--info-border": "var(--info)",
  "--info-text": "var(--info)",
  "--normal-bg": "var(--card)",
  "--normal-border": "var(--border)",
  "--normal-text": "var(--card-foreground)",
} as CSSProperties

export function Toaster() {
  const { appearance } = useThemeSettings()
  const theme = appearance === "dark" ? "dark" : "light"

  return (
    <SonnerToaster
      richColors
      theme={theme}
      position="top-right"
      style={toastColors}
      toastOptions={{
        classNames: {
          toast: "shadow-md",
          title: "text-sm font-medium",
          description: "text-sm opacity-90",
        },
      }}
    />
  )
}
