"use client"

import { useState, type ReactNode } from "react"
import { PageBreadcrumb } from "@/components/layout/breadcrumb/page-breadcrumb"
import { Footer } from "@/components/layout/footer/footer"
import { Header } from "@/components/layout/header/header"
import { Sidebar } from "@/components/layout/sidebar/sidebar"

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <Header open={open} onToggle={() => setOpen((value) => !value)} />
      <div className="flex min-h-0 flex-1">
        <Sidebar open={open} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden p-6">
          <PageBreadcrumb />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
