import { UserListTable } from "@/features/users/list/table"
import { resolveContentLocale } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <UserListTable locale={locale} />
    </div>
  )
}
