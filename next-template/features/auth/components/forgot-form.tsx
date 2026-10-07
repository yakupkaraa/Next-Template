"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getDictionary, resolveContentLocale } from "@/lib/i18n"

export function ForgotForm({ locale: routeLocale }: { locale: string }) {
  const locale = resolveContentLocale(routeLocale)
  const { auth } = getDictionary(locale)
  const text = auth.forgot
  const [sent, setSent] = useState(false)

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{text.title}</h1>
        <p className="text-sm text-muted-foreground">
          {sent ? text.sent : text.description}
        </p>
      </div>
      {sent ? null : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="reset-email">{auth.login.email}</Label>
            <Input
              id="reset-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="h-10"
            />
          </div>
          <Button type="submit" className="h-10 w-full">
            {text.submit}
          </Button>
        </div>
      )}
      <Link
        href={`/${routeLocale}/auth/login`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {text.back}
      </Link>
    </form>
  )
}
