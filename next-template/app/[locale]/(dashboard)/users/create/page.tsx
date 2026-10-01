import { UserCreateScreen } from "@/features/users/create/screen"
import { resolveContentLocale } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)

  return (
    <div className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto px-1.25 py-3">
      <UserCreateScreen locale={locale} />
    </div>
  )
}
