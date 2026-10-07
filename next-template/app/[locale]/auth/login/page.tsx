import { LoginScreen } from "@/features/auth"

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return <LoginScreen routeLocale={locale} />
}
