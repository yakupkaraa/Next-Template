import type { ReactNode } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { DashboardPageContent } from "@/components/layout/dashboard-page-content"
import { openTicketCount } from "@/features/ticket/constants/ticket"
import { seedTickets } from "@/features/ticket/mocks/ticket.mock"
import { MOCK_SESSION_ROLE } from "@/lib/mock-session"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const badgeCounts = { "open-tickets": openTicketCount(seedTickets) }
  const isAdmin = MOCK_SESSION_ROLE === "admin"

  return (
    <AppShell badgeCounts={badgeCounts} isAdmin={isAdmin}>
      <DashboardPageContent>{children}</DashboardPageContent>
    </AppShell>
  )
}
