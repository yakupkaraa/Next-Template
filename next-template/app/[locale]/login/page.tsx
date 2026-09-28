import { signIn } from "@/lib/session"
import { loginCopy } from "./data"
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
  const text = locale === "en" ? loginCopy.en : loginCopy.tr

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <form action={signIn.bind(null, locale)} className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>{text.title}</CardTitle>
            <CardDescription>{text.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{text.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{text.password}</Label>
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
              {text.submit}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
