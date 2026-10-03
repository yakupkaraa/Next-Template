import { Suspense } from "react"
import { RouteLoading } from "@/components/layout/route-loading"
import { TicketScreen } from "@/features/ticket/screen"
import { resolveContentLocale } from "@/lib/i18n"

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
