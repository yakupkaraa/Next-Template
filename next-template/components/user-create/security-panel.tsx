import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { userSecurity } from "./data"

function PasswordField({ label, autoComplete }: { label: string; autoComplete: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input type="password" autoComplete={autoComplete} />
    </div>
  )
}

export function SecurityPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-3">
          <CardTitle>{userSecurity.passwordTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex max-w-md flex-col gap-4 py-4">
          <PasswordField label={userSecurity.current} autoComplete="current-password" />
          <PasswordField label={userSecurity.next} autoComplete="new-password" />
          <PasswordField label={userSecurity.confirm} autoComplete="new-password" />
          <Button type="button" className="w-fit">
            {userSecurity.save}
          </Button>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-3">
          <CardTitle>{userSecurity.accountTitle}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex items-center justify-between gap-4 border-b px-4 py-4">
            <div>
              <p className="font-medium">{userSecurity.pauseTitle}</p>
              <p className="text-muted-foreground">{userSecurity.pauseHint}</p>
            </div>
            <Button type="button" variant="outline">
              {userSecurity.pause}
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div>
              <p className="font-medium">{userSecurity.deleteTitle}</p>
              <p className="text-muted-foreground">{userSecurity.deleteHint}</p>
            </div>
            <Button type="button" variant="destructive">
              {userSecurity.delete}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
