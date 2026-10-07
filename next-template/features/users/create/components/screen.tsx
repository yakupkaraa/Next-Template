import type { ContentLocale } from "@/lib/i18n"
import { DensityBoard } from "@/components/layout/density-board"
import { UserCreateForm } from "./form"

export function UserCreateScreen({ locale }: { locale: ContentLocale }) {
  return (
    <DensityBoard>
      <UserCreateForm locale={locale} intent="create" />
    </DensityBoard>
  )
}
