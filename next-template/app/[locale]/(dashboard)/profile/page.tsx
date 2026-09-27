import { ProfileScreen } from "@/components/profile/profile-screen"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <ProfileScreen locale={locale === "en" ? "en" : "tr"} />
    </div>
  )
}
