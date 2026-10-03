import { ForgotForm } from "@/features/auth/forgot-form"

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
