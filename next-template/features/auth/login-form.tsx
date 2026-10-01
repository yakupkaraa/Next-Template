"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from "@/lib/session"
import { getDictionary, resolveContentLocale } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({ locale: routeLocale }: { locale: string }) {
  const locale = resolveContentLocale(routeLocale)
  const { auth } = getDictionary(locale)
  const text = auth.login
  const [email, setEmail] = useState(auth.defaults.email)
  const [password, setPassword] = useState(auth.defaults.password)
  const [showPassword, setShowPassword] = useState(false)
  const ready = email.trim() !== "" && password.trim() !== ""

  return (
    <form action={signIn.bind(null, routeLocale)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{text.title}</h1>
        <p className="text-sm text-muted-foreground">{text.description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{text.email}</Label>
          <Input
            id="email"
            name="email"
            type="text"
            autoComplete="username"
            className="h-10"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{text.password}</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="h-10 pr-10"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? text.hidePassword : text.showPassword}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember">{text.remember}</Label>
          </div>
          <Link
            href={`/${routeLocale}/auth/forgot-password`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {text.forgot}
          </Link>
        </div>
      </div>
      <Button type="submit" className="h-10 w-full" disabled={!ready}>
        {text.submit}
      </Button>
    </form>
  )
}
