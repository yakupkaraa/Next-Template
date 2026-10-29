"use client"

import { useState, type ReactNode } from "react"
import { Footer } from "@/components/layout/footer/footer"
import { Header } from "@/components/layout/header/header"
import { Sidebar } from "@/components/layout/sidebar/sidebar"
import { SettingsEdgeTab } from "@/components/layout/settings-drawer/settings-edge-tab"
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
  const { layout, footer, density } = useThemeSettings()
  const [open, setOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsMounted, setSettingsMounted] = useState(false)
  const top = layout === "top"
  const right = layout === "right"
  const headerOnTop = !top && density === "comfortable"

  function openSettings() {
    setSettingsMounted(true)
    setSettingsOpen(true)
  }

  function toggleSettings() {
    setSettingsMounted(true)
    setSettingsOpen((value) => !value)
  }

  const settingsProps = {
    settingsOpen,
    onSettingsOpenChange: setSettingsOpen,
    settingsMounted,
    onOpenSettings: openSettings,
  }

  const sidebarStart = right ? null : (
    <Sidebar open={open} placement="start" badgeCounts={badgeCounts} isAdmin={isAdmin} />
  )
  const sidebarEnd = right ? (
    <Sidebar open={open} placement="end" badgeCounts={badgeCounts} isAdmin={isAdmin} />
  ) : null

  const contentColumn = (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {headerOnTop ? null : (
        <Header open={open} onToggle={() => setOpen((value) => !value)} {...settingsProps} />
      )}
      <main
        data-app-main
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-6 py-0"
      >
        {children}
      </main>
      {footer ? <Footer /> : null}
    </div>
  )

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <SettingsEdgeTab open={settingsOpen} onToggle={toggleSettings} />
      {top ? (
        <>
          <Header
            open={open}
            onToggle={() => setOpen((value) => !value)}
            showMenu
            showSidebarToggle={false}
            {...settingsProps}
          />
          <main
            data-app-main
            className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-6 py-0"
          >
            {children}
          </main>
          {footer ? <Footer /> : null}
        </>
      ) : headerOnTop ? (
        <>
          <Header open={open} onToggle={() => setOpen((value) => !value)} {...settingsProps} />
          <div className={cn("flex min-h-0 min-w-0 flex-1 flex-row", "floating:gap-3")}>
            {sidebarStart}
            {contentColumn}
            {sidebarEnd}
          </div>
        </>
      ) : (
        <div className="flex h-full min-h-0 w-full flex-row">
          {sidebarStart}
          {contentColumn}
          {sidebarEnd}
        </div>
      )}
    </div>
  )
}
