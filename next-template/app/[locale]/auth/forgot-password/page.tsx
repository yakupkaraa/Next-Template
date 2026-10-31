import type { Metadata } from "next"
import { ForgotForm } from "@/features/auth"
import { getDictionary, resolveContentLocale } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)
  return { title: getDictionary(locale).auth.forgot.title }
}

export default async function ForgotPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-sm">
        <ForgotForm locale={locale} />
      </div>
    </main>
  )
}
