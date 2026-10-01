import type { ReactNode } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { DashboardPageContent } from "@/components/layout/dashboard-page-content"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <DashboardPageContent>{children}</DashboardPageContent>
    </AppShell>
  )
}
