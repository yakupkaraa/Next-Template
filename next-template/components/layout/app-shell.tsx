"use client"

import { useState, type ReactNode } from "react"
import { Footer } from "@/components/layout/footer/footer"
import { Header } from "@/components/layout/header/header"
import { Sidebar } from "@/components/layout/sidebar/sidebar"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { cn } from "cn"

export function AppShell({ children }: { children: ReactNode }) {
  const { layout, footer } = useThemeSettings()
  const [open, setOpen] = useState(true)
  const top = layout === "top"
  const right = layout === "right"

  return (
    <div
      className={cn("flex h-full min-h-0 w-full", top ? "flex-col" : "flex-row")}
    >
      {top ? (
        <>
          <Header
            open={open}
            onToggle={() => setOpen((value) => !value)}
            showMenu
            showSidebarToggle={false}
          />
          <main
            data-app-main
            className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-6 py-0"
          >
            {children}
          </main>
          {footer ? <Footer /> : null}
        </>
      ) : (
        <>
          {right ? null : <Sidebar open={open} placement="start" />}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <Header open={open} onToggle={() => setOpen((value) => !value)} />
            <main
              data-app-main
              className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-6 py-0"
            >
              {children}
            </main>
            {footer ? <Footer /> : null}
          </div>
          {right ? <Sidebar open={open} placement="end" /> : null}
        </>
      )}
    </div>
  )
}
