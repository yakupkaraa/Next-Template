import type { ReactNode } from "react"
import { QueryProvider } from "@/components/shared/query-provider"

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>
}
