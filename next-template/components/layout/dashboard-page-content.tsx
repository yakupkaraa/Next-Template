"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { PageContent } from "@/components/layout/page-content"

/** AI sohbet ve kullanıcı listesi: kalan yüksekliği doldurur. */
export function DashboardPageContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAiChat = /\/ai-chat\/?$/.test(pathname)
  const isUserList = /\/users\/list\/?$/.test(pathname)
  const isBlog = /\/blog\/?$/.test(pathname)
  const isBlogEditor = /\/blog\/(create|edit)\/?$/.test(pathname)
  const isHome = /^\/[^/]+\/?$/.test(pathname)
  const isInsights = /\/insights\/?$/.test(pathname)
  const fill = isAiChat || isUserList || isBlog
  const wide = isUserList || isHome || isInsights || isBlog

  return (
    <PageContent
      fill={fill}
      width={isAiChat || isBlogEditor ? "full" : wide ? "wide" : "default"}
      className={fill ? "min-h-0 flex-1" : undefined}
    >
      {children}
    </PageContent>
  )
}
