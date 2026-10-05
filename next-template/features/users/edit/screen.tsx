import type { ContentLocale } from "@/lib/i18n"
import { DensityBoard } from "@/components/layout/density-board"
import { UserCreateForm } from "@/features/users/create/form"

export function UserEditScreen({ locale }: { locale: ContentLocale }) {
  return (
    <DensityBoard>
      <UserCreateForm locale={locale} intent="edit" />
    </DensityBoard>
  )
}
