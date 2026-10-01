import { ForgotForm } from "@/features/auth/forgot-form"
import { LoginShell } from "@/features/auth/login-shell"

export default async function ForgotPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <LoginShell>
      <ForgotForm locale={locale} />
    </LoginShell>
  )
}
