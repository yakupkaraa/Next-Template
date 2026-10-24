"use client"

import { useState, type ReactNode } from "react"
import { Footer } from "@/components/layout/footer/footer"
import { Header } from "@/components/layout/header/header"
import { Sidebar } from "@/components/layout/sidebar/sidebar"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { cn } from "@/lib/utils"

export function AppShell({
  children,
  badgeCounts,
  isAdmin,
}: {
  children: ReactNode
  badgeCounts?: Partial<Record<string, number>>
  isAdmin?: boolean
}) {
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
          <div className="relative flex min-h-0 flex-1 flex-col">
            <Header
              open={open}
              onToggle={() => setOpen((value) => !value)}
              showMenu
              showSidebarToggle={false}
              className="absolute inset-x-0 top-0 z-20"
            />
            <main
              data-app-main
              className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto px-6 pt-14 pb-0"
            >
              {children}
            </main>
          </div>
          {footer ? <Footer /> : null}
        </>
      ) : (
        <>
          {right ? null : <Sidebar open={open} placement="start" badgeCounts={badgeCounts} isAdmin={isAdmin} />}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div className="relative flex min-h-0 flex-1 flex-col">
              <Header
                open={open}
                onToggle={() => setOpen((value) => !value)}
                className="absolute inset-x-0 top-0 z-20"
              />
              <main
                data-app-main
                className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto px-6 pt-14 pb-0"
              >
                {children}
              </main>
            </div>
            {footer ? <Footer /> : null}
          </div>
          {right ? <Sidebar open={open} placement="end" badgeCounts={badgeCounts} isAdmin={isAdmin} /> : null}
        </>
      )}
    </div>
  )
}
