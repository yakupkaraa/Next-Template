import { LoginForm } from "@/features/auth/login-form"
import { LoginShell } from "@/features/auth/login-shell"

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <LoginShell>
      <LoginForm locale={locale} />
    </LoginShell>
  )
}
