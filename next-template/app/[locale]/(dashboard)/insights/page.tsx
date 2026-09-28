import { InsightsScreen } from "@/components/insights/insights-screen"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-[5px]">
      <InsightsScreen locale={locale === "en" ? "en" : "tr"} />
    </div>
  )
}
