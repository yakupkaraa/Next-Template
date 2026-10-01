import type { ContentLocale } from "@/lib/i18n"
import { UserCreateForm } from "./form"

export function UserCreateScreen({ locale }: { locale: ContentLocale }) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <UserCreateForm locale={locale} />
    </div>
  )
}
