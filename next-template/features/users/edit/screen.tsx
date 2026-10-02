import type { ContentLocale } from "@/lib/i18n"
import { UserCreateForm } from "@/features/users/create/form"

export function UserEditScreen({ locale }: { locale: ContentLocale }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 py-6">
      <UserCreateForm locale={locale} />
    </div>
  )
}
