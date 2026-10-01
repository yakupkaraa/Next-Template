"use client"

import { useState, type ReactNode } from "react"
import { Footer } from "@/components/layout/footer/footer"
import { Header } from "@/components/layout/header/header"
import { Sidebar } from "@/components/layout/sidebar/sidebar"

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-full min-h-0 w-full">
      <Sidebar open={open} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header open={open} onToggle={() => setOpen((value) => !value)} />
        <main
          data-app-main
          className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-6"
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
