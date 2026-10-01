import { AiChatScreen } from "@/features/ai-chat/screen"
import { resolveContentLocale } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: routeLocale } = await params
  const locale = resolveContentLocale(routeLocale)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AiChatScreen locale={locale} />
    </div>
  )
}
