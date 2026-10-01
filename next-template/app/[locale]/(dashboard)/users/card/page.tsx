import { UserCardGrid } from "@/features/users/card/grid"
import { resolveContentLocale } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)

  return <UserCardGrid locale={locale} />
}
