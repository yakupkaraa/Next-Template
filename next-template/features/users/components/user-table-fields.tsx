"use client"

import { Check, Mail } from "lucide-react"
import { CountryFlag } from "@/components/shared/locale-flag"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormSelectField } from "@/features/users/list/components/form-select-field"
import { userFormFieldKeys, type UserColumnKey } from "@/features/users/constants/users"
import {
  formatDateInput,
  formatPhoneInput,
  normalizeEmail,
  userFormFieldKind,
} from "@/features/users/utils/form-field-meta"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { cn } from "cn"

const NOTE_MAX = 160
const REQUIRED_KEYS: UserColumnKey[] = ["firstName", "lastName", "email"]
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function UserTableFields({
  locale,
  values,
  onChange,
  idPrefix,
  compact = false,
  appearance = "default",
  keys = userFormFieldKeys,
}: {
  locale: ContentLocale
  values: Record<UserColumnKey, string>
  onChange: (key: UserColumnKey, value: string) => void
  idPrefix: string
  compact?: boolean
  appearance?: "default" | "profile"
  keys?: readonly UserColumnKey[]
}) {
  const list = getDictionary(locale).users.list
  const form = getDictionary(locale).users.create.form
  const profile = appearance === "profile"

  function handleFieldChange(key: UserColumnKey, raw: string) {
    const kind = userFormFieldKind(key, locale)
    if (kind.type === "tel") {
      onChange(key, formatPhoneInput(raw))
      return
    }
    if (kind.type === "date") {
      onChange(key, formatDateInput(raw))
      return
    }
    if (key === "note") {
      onChange(key, raw.slice(0, NOTE_MAX))
      return
    }
    onChange(key, raw)
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        compact ? "gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-3" : profile ? "gap-4 sm:grid-cols-2" : "gap-4 sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {keys.map((key) => {
        const label = list.columns[key]
        const kind = userFormFieldKind(key, locale)
        const wide = key === "note"
        const fieldId = `${idPrefix}-${key}`
        const required = profile && REQUIRED_KEYS.includes(key)
        const emailValid = EMAIL_PATTERN.test(values.email.trim())
        const phoneLocal = values.phone.replace(/^\+90\s*/, "")

        return (
          <div
            key={key}
            className={cn(
              "flex min-w-0 flex-col",
              compact ? "gap-0.5" : "gap-1.5",
              wide && (profile ? "sm:col-span-2" : "lg:col-span-3")
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor={fieldId} className={compact ? "text-xs font-medium" : undefined}>
                {label}
                {required ? <span className="text-destructive"> *</span> : null}
              </Label>
              {profile && key === "note" ? (
                <span className="text-xs text-muted-foreground">
                  {values.note.length}/{NOTE_MAX}
                </span>
              ) : null}
            </div>
            {kind.type === "textarea" ? (
              <Textarea
                id={fieldId}
                value={values[key]}
                onChange={(event) => handleFieldChange(key, event.target.value)}
                rows={profile ? 4 : 2}
                maxLength={profile ? NOTE_MAX : undefined}
                className={cn("resize-none", compact ? "min-h-16 py-1.5 text-sm" : profile ? "min-h-24" : "min-h-20")}
              />
            ) : kind.type === "select" ? (
              <FormSelectField
                id={fieldId}
                value={values[key]}
                placeholder={list.selectPlaceholder}
                options={kind.options}
                onValueChange={(value) => onChange(key, value)}
                size={profile ? "default" : "sm"}
              />
            ) : profile && key === "email" ? (
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={fieldId}
                  value={values[key]}
                  onChange={(event) => handleFieldChange(key, event.target.value)}
                  onBlur={() => onChange(key, normalizeEmail(values[key]))}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="ornek@firma.com"
                  className="pr-28 pl-10"
                />
                {emailValid ? (
                  <span className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 text-xs font-medium text-success">
                    <Check className="size-3.5" />
                    {form.verified}
                  </span>
                ) : null}
              </div>
            ) : profile && key === "phone" ? (
              <div className="flex">
                <span className="flex items-center gap-1.5 rounded-l-lg border border-r-0 border-input px-2.5 text-sm text-muted-foreground">
                  <CountryFlag country={values.country || "Türkiye"} />
                  +90
                </span>
                <Input
                  id={fieldId}
                  value={phoneLocal}
                  onChange={(event) => handleFieldChange(key, event.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="532 000 00 00"
                  className="rounded-l-none"
                />
              </div>
            ) : (
              <Input
                id={fieldId}
                value={values[key]}
                onChange={(event) => handleFieldChange(key, event.target.value)}
                onBlur={
                  kind.type === "email"
                    ? () => onChange(key, normalizeEmail(values[key]))
                    : undefined
                }
                type={kind.type === "number" ? "text" : kind.type}
                inputMode={
                  kind.type === "number"
                    ? "numeric"
                    : kind.type === "tel"
                      ? "tel"
                      : kind.type === "email"
                        ? "email"
                        : undefined
                }
                autoComplete={
                  kind.type === "email" ? "email" : kind.type === "tel" ? "tel" : "off"
                }
                placeholder={
                  kind.type === "tel"
                    ? "+90 532 000 00 00"
                    : kind.type === "email"
                      ? "ornek@firma.com"
                      : kind.type === "date"
                        ? "GG.AA.YYYY"
                        : undefined
                }
                pattern={kind.type === "date" ? "\\d{2}\\.\\d{2}\\.\\d{4}" : undefined}
                className={compact ? "h-8 py-1 text-sm" : undefined}
              />
            )}
            {profile && key === "email" ? (
              <p className="text-xs text-muted-foreground">{form.emailHint}</p>
            ) : null}
            {profile && key === "phone" ? (
              <p className="text-xs text-muted-foreground">{form.phoneHint}</p>
            ) : null}
            {profile && key === "note" ? (
              <p className="text-xs text-muted-foreground">{form.noteHint}</p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
