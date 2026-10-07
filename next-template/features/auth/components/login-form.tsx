"use client"

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Loader2, Lock, ShieldCheck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocialButtons } from "@/features/auth/components/social-buttons"
import { getLoginCopy } from "@/features/auth/constants/copy"
import { signIn } from "@/lib/session"
import { resolveContentLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/locales"

const DEFAULT_USERNAME = "admin"
const DEFAULT_PASSWORD = "password"

function subscribeLg(onStoreChange: () => void) {
  const media = window.matchMedia("(min-width: 1024px)")
  media.addEventListener("change", onStoreChange)
  return () => media.removeEventListener("change", onStoreChange)
}

export function LoginForm({ locale: routeLocale }: { locale: Locale }) {
  const locale = resolveContentLocale(routeLocale)
  const text = getLoginCopy(locale)
  const usernameId = useId()
  const passwordId = useId()
  const rememberId = useId()
  const usernameRef = useRef<HTMLInputElement>(null)
  const isLg = useSyncExternalStore(
    subscribeLg,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  )

  const [username, setUsername] = useState(DEFAULT_USERNAME)
  const [password, setPassword] = useState(DEFAULT_PASSWORD)
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isLg) usernameRef.current?.focus()
  }, [isLg])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.set("email", username)
      formData.set("password", password)
      if (remember) formData.set("remember", "on")
      await signIn(routeLocale, formData)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-6" noValidate>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight">{text.title}</h2>
        <p className="text-muted-foreground">{text.subtitle}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={usernameId}>{text.username}</Label>
        <div className="relative">
          <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={usernameRef}
            id={usernameId}
            name="username"
            type="text"
            autoComplete="username"
            placeholder={text.usernamePlaceholder}
            value={username}
            className="h-12 min-h-12 pl-10"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={passwordId}>{text.password}</Label>
          <Link
            href={`/${routeLocale}/auth/forgot-password`}
            className="text-[13px] font-semibold text-primary"
          >
            {text.forgot}
          </Link>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={passwordId}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder={text.passwordPlaceholder}
            value={password}
            className="h-12 min-h-12 pr-11 pl-10"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 min-h-11 min-w-11 -translate-y-1/2 text-muted-foreground"
            aria-label={showPassword ? text.hidePassword : text.showPassword}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id={rememberId}
          checked={remember}
          className="size-5"
          onCheckedChange={(checked) => setRemember(checked === true)}
        />
        <Label htmlFor={rememberId}>{text.remember}</Label>
      </div>

      <Button
        type="submit"
        className="h-12 min-h-12 w-full shadow-sm hover:bg-primary/90"
        disabled={submitting}
      >
        {submitting ? <Loader2 className="animate-spin" /> : null}
        {submitting ? text.submitting : text.submit}
        {submitting ? null : <ArrowRight data-icon="inline-end" />}
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{text.or}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <SocialButtons locale={locale} />

      <p className="text-center text-sm">
        {text.noAccount}{" "}
        <Link href="#" className="font-semibold text-primary">
          {text.register}
        </Link>
      </p>

      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <p className="text-xs text-muted-foreground">
          <Link href="#">{text.privacy}</Link>
          {" · "}
          <Link href="#">{text.terms}</Link>
          {" · "}
          <Link href="#">{text.support}</Link>
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          {text.encryption}
        </p>
      </div>
    </form>
  )
}
