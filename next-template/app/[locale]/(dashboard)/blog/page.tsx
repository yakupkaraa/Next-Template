import { BlogScreen } from "@/features/blog"
import { resolveContentLocale } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)

  return <BlogScreen locale={locale} />
}
