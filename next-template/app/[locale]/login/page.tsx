import { signIn } from "@/lib/session"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const english = locale === "en"

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <form action={signIn.bind(null, locale)} className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>{english ? "Sign in" : "Giriş"}</CardTitle>
            <CardDescription>
              {english
                ? "The dashboard stays closed until you sign in."
                : "Giriş yapılmadan panele geçilmez."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{english ? "Email" : "E-posta"}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{english ? "Password" : "Parola"}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {english ? "Sign in" : "Giriş"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
