import { Suspense } from "react"
import type { Metadata } from "next"
import { RouteLoading } from "@/components/layout/route-loading"
import { TicketScreen } from "@/features/ticket"
import { getDictionary, resolveContentLocale } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)
  return { title: getDictionary(locale).layout.nav.ticketsInbox }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)

  return (
    <Suspense fallback={<RouteLoading />}>
      <TicketScreen locale={locale} />
    </Suspense>
  )
}
