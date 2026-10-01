import { ProfileScreen } from "@/features/profile/screen"
import { resolveContentLocale } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <ProfileScreen locale={resolveContentLocale(locale)} />
}
