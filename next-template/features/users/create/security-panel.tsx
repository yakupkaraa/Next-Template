"use client"

import { useState } from "react"
import {
  Check,
  Circle,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { cn } from "cn"

const initialPasswords = {
  current: "currentpass",
  next: "Password1",
  confirm: "Password1",
}

function passwordChecks(value: string) {
  return {
    min: value.length >= 8,
    upper: /[A-ZÇĞİÖŞÜ]/.test(value),
    number: /\d/.test(value),
    special: /[^A-Za-z0-9ÇĞİÖŞÜçğıöşü]/.test(value),
  }
}

function strengthScore(value: string) {
  const checks = passwordChecks(value)
  return [checks.min, checks.upper, checks.number, checks.special].filter(Boolean).length
}

function PasswordField({
  id,
  label,
  requiredLabel,
  value,
  autoComplete,
  icon: Icon,
  revealed,
  showLabel,
  hideLabel,
  onReveal,
  onChange,
}: {
  id: string
  label: string
  requiredLabel: string
  value: string
  autoComplete: string
  icon: typeof Lock
  revealed: boolean
  showLabel: string
  hideLabel: string
  onReveal: () => void
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {label} <span className="text-destructive">*</span>
        <span className="sr-only">({requiredLabel})</span>
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={revealed ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          className="pr-11 pl-10"
          onChange={(event) => onChange(event.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 min-h-8 min-w-8 -translate-y-1/2 text-muted-foreground"
          aria-label={revealed ? hideLabel : showLabel}
          aria-pressed={revealed}
          onClick={onReveal}
        >
          {revealed ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    </div>
  )
}

export function SecurityPanel({ locale }: { locale: ContentLocale }) {
  const security = getDictionary(locale).users.create.security
  const [passwords, setPasswords] = useState(initialPasswords)
  const [revealed, setRevealed] = useState({ current: false, next: false, confirm: false })
  const [twoFactor, setTwoFactor] = useState(true)

  const checks = passwordChecks(passwords.next)
  const score = strengthScore(passwords.next)
  const strengthLabel =
    score >= 3 ? security.strengthStrong : score === 2 ? security.strengthFair : score === 1 ? security.strengthWeak : ""

  const requirements = [
    { ok: checks.min, label: security.reqMin },
    { ok: checks.upper, label: security.reqUpper },
    { ok: checks.number, label: security.reqNumber },
    { ok: checks.special, label: security.reqSpecial },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Shield className="size-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.08em] text-primary uppercase">
            {security.kicker}
          </p>
          <h3 className="text-lg font-semibold tracking-tight">{security.pageTitle}</h3>
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <Card className="gap-0 py-0">
          <CardHeader className="border-b py-3">
            <CardTitle>{security.passwordTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 py-4">
            <PasswordField
              id="security-current"
              label={security.current}
              requiredLabel={security.required}
              value={passwords.current}
              autoComplete="current-password"
              icon={Lock}
              revealed={revealed.current}
              showLabel={security.showPassword}
              hideLabel={security.hidePassword}
              onReveal={() => setRevealed((current) => ({ ...current, current: !current.current }))}
              onChange={(value) => setPasswords((current) => ({ ...current, current: value }))}
            />
            <PasswordField
              id="security-next"
              label={security.next}
              requiredLabel={security.required}
              value={passwords.next}
              autoComplete="new-password"
              icon={KeyRound}
              revealed={revealed.next}
              showLabel={security.showPassword}
              hideLabel={security.hidePassword}
              onReveal={() => setRevealed((current) => ({ ...current, next: !current.next }))}
              onChange={(value) => setPasswords((current) => ({ ...current, next: value }))}
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-muted-foreground">{security.strength}</span>
                <span className="font-medium text-success">{strengthLabel}</span>
              </div>
              <div className="flex h-1.5 gap-1">
                {Array.from({ length: 4 }, (_, index) => (
                  <span
                    key={index}
                    className={cn(
                      "h-full flex-1 rounded-full",
                      index < score ? "bg-success" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>

            <PasswordField
              id="security-confirm"
              label={security.confirm}
              requiredLabel={security.required}
              value={passwords.confirm}
              autoComplete="new-password"
              icon={KeyRound}
              revealed={revealed.confirm}
              showLabel={security.showPassword}
              hideLabel={security.hidePassword}
              onReveal={() => setRevealed((current) => ({ ...current, confirm: !current.confirm }))}
              onChange={(value) => setPasswords((current) => ({ ...current, confirm: value }))}
            />

            <div className="rounded-xl border border-border bg-muted/40 p-3">
              <p className="mb-2 text-sm font-medium">{security.reqTitle}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {requirements.map((item) => (
                  <li key={item.label} className="flex items-center gap-2 text-sm">
                    {item.ok ? (
                      <Check className="size-4 text-success" />
                    ) : (
                      <Circle className="size-4 text-muted-foreground" />
                    )}
                    <span className={item.ok ? "text-foreground" : "text-muted-foreground"}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">{security.lastChanged}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setPasswords(initialPasswords)}
                >
                  {security.cancel}
                </Button>
                <Button type="button">{security.save}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="gap-0 py-0">
            <CardContent className="flex flex-col gap-3 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-2">
                  <Shield className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="font-medium">{security.twoFactorTitle}</p>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                  aria-label={security.twoFactorTitle}
                />
              </div>
              <p className="text-sm text-muted-foreground">{security.twoFactorHint}</p>
              {twoFactor ? (
                <p className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
                  <Check className="size-4 shrink-0" />
                  {security.twoFactorOn}
                </p>
              ) : null}
              <Button type="button" variant="outline" className="w-full">
                {security.backupCodes}
              </Button>
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardContent className="px-0 py-0">
              <div className="flex items-start justify-between gap-4 border-b px-4 py-4">
                <div>
                  <p className="font-medium">{security.pauseTitle}</p>
                  <p className="text-sm text-muted-foreground">{security.pauseHint}</p>
                </div>
                <Button type="button" variant="outline" className="shrink-0">
                  {security.pause}
                </Button>
              </div>
              <div className="flex items-start justify-between gap-4 px-4 py-4">
                <div>
                  <p className="font-medium">{security.deleteTitle}</p>
                  <p className="text-sm text-muted-foreground">{security.deleteHint}</p>
                </div>
                <Button type="button" variant="destructive" className="shrink-0">
                  {security.delete}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
