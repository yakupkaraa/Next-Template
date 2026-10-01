import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getDictionary, type ContentLocale } from "@/lib/i18n"

function PasswordField({ label, autoComplete }: { label: string; autoComplete: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input type="password" autoComplete={autoComplete} />
    </div>
  )
}

export function SecurityPanel({ locale }: { locale: ContentLocale }) {
  const security = getDictionary(locale).users.create.security

  return (
    <div className="flex flex-col gap-4">
      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-3">
          <CardTitle>{security.passwordTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex max-w-md flex-col gap-4 py-4">
          <PasswordField label={security.current} autoComplete="current-password" />
          <PasswordField label={security.next} autoComplete="new-password" />
          <PasswordField label={security.confirm} autoComplete="new-password" />
          <Button type="button" className="w-fit">
            {security.save}
          </Button>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-3">
          <CardTitle>{security.accountTitle}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex items-center justify-between gap-4 border-b px-4 py-4">
            <div>
              <p className="font-medium">{security.pauseTitle}</p>
              <p className="text-muted-foreground">{security.pauseHint}</p>
            </div>
            <Button type="button" variant="outline">
              {security.pause}
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div>
              <p className="font-medium">{security.deleteTitle}</p>
              <p className="text-muted-foreground">{security.deleteHint}</p>
            </div>
            <Button type="button" variant="destructive">
              {security.delete}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
