import type { Metadata } from "next"
import { ProfileScreen } from "@/features/profile"
import { getDictionary, resolveContentLocale } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)
  return { title: getDictionary(locale).layout.nav.profile }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <ProfileScreen locale={resolveContentLocale(locale)} />
}
