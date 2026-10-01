import { ProfileScreen } from "@/features/profile/screen"
import { resolveContentLocale } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <div className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto">
      <ProfileScreen locale={resolveContentLocale(locale)} />
    </div>
  )
}
