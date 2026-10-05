"use client"

import type { CSSProperties } from "react"
import { Toaster as SonnerToaster } from "sonner"
import { useThemeSettings } from "@/components/theme/theme-provider"

const toastColors = {
  "--success-bg": "var(--success)",
  "--success-border": "var(--success)",
  "--success-text": "var(--success-foreground)",
  "--error-bg": "var(--destructive)",
  "--error-border": "var(--destructive)",
  "--error-text": "var(--destructive-foreground)",
  "--warning-bg": "var(--warning)",
  "--warning-border": "var(--warning)",
  "--warning-text": "var(--warning-foreground)",
  "--info-bg": "var(--info)",
  "--info-border": "var(--info)",
  "--info-text": "var(--info-foreground)",
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
