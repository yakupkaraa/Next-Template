"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { Check, Loader2, Lock, Mail, Upload, User } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountryFlag } from "@/components/shared/locale-flag"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { StatusBadge, type StatusBadgeTone } from "@/components/shared/status-badge"
import { Textarea } from "@/components/ui/textarea"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import {
  emptyUserFormValues,
  userColumnKeys,
  type UserColumnKey,
  type UserRow,
} from "@/features/users/constants/users"
import { cn } from "cn"
import { userCreateDemo } from "../../mocks/users.mock"
import { getProfileFormCopy } from "../constants/profile-copy"
import { ProfileCombobox } from "./profile-combobox"
import {
  citiesByCountry,
  controlClass,
  fieldComboboxOptions,
  fieldSelectOptions,
  profileFields,
  profileSectionKeys,
  type ProfileFieldConfig,
  type ProfileSectionKey,
} from "../constants/profile-fields"
import {
  EMAIL_PATTERN,
  formatProfileBalance,
  formatProfileDate,
  isFieldEditable,
  NOTE_MAX,
} from "./profile-tab.utils"
import { formatPhoneInput, normalizeEmail } from "@/features/users/utils/form-field-meta"

export type ProfileFormMode = "self" | "admin"

type FieldErrors = Partial<Record<"firstName" | "lastName" | "email", string>>

function statusTone(value: string): StatusBadgeTone {
  if (value === "Aktif") return "success"
  if (value === "Beklemede") return "warning"
  return "danger"
}

function emptyProfileValues(): UserRow {
  return {
    ...emptyUserFormValues(),
    ...Object.fromEntries(userColumnKeys.map((key) => [key, ""])),
  } as UserRow
}

function initialValues(intent: "create" | "edit"): UserRow {
  if (intent === "create") return emptyProfileValues()
  return {
    ...emptyProfileValues(),
    id: "24",
    firstName: userCreateDemo.nameValue.split(" ")[0] ?? "",
    lastName: userCreateDemo.nameValue.split(" ").slice(1).join(" "),
    username: "jdoe",
    email: userCreateDemo.emailValue,
    phone: userCreateDemo.phoneValue,
    company: userCreateDemo.companyValue,
    country: userCreateDemo.countryValue,
    city: "İstanbul",
    department: "Ürün",
    title: "Kıdemli",
    team: "Alpha",
    manager: "Ayşe Yılmaz",
    language: "Türkçe",
    timezone: "Europe/Istanbul",
    note: userCreateDemo.noteValue,
    role: "Editör",
    status: "Aktif",
    plan: "Pro",
    joined: "12.03.2024",
    lastSeen: "03.10.2026",
    score: "86",
    orders: "14",
    balance: "1280 TL",
    verified: "Evet",
  }
}

function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function AccountSummaryList({
  items,
}: {
  items: { key: string; label: string; value: ReactNode }[]
}) {
  return (
    <dl className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <div key={item.key} className="min-w-0">
          <dt className="text-xs text-muted-foreground">{item.label}</dt>
          <dd className="truncate text-sm font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function ProfileTab({
  locale,
  mode = "self",
  intent = "create",
}: {
  locale: ContentLocale
  mode?: ProfileFormMode
  intent?: "create" | "edit"
}) {
  const dict = getDictionary(locale).users.create
  const text = getProfileFormCopy(locale)
  const columns = getDictionary(locale).users.list.columns
  const snapshot = useMemo(() => initialValues(intent), [intent])
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [values, setValues] = useState(snapshot)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [baseline, setBaseline] = useState(snapshot)

  const dirty = preview !== null || JSON.stringify(values) !== JSON.stringify(baseline)

  const dateLocale = locale === "en" ? "en" : "tr"
  const fullName = `${values.firstName} ${values.lastName}`.trim() || "—"
  const initials =
    `${values.firstName.charAt(0)}${values.lastName.charAt(0)}`.toUpperCase() || "?"
  const cities =
    values.country && values.country in citiesByCountry
      ? citiesByCountry[values.country as keyof typeof citiesByCountry]
      : []

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function setField(key: UserColumnKey, value: string) {
    setSaved(false)
    setValues((current) => {
      const next = { ...current, [key]: value }
      if (key === "country" && current.country !== value) next.city = ""
      return next
    })
  }

  function clearPreview() {
    setPreview((current) => {
      if (current) URL.revokeObjectURL(current)
      return null
    })
    if (fileRef.current) fileRef.current.value = ""
  }

  function reset() {
    clearPreview()
    setValues(baseline)
    setErrors({})
    setSaved(false)
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!values.firstName.trim()) next.firstName = text.requiredError
    if (!values.lastName.trim()) next.lastName = text.requiredError
    if (!values.email.trim()) next.email = text.requiredError
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = text.emailError
    return next
  }

  function save() {
    const nextErrors = validate()
    setErrors(nextErrors)
    const firstKey = (["firstName", "lastName", "email"] as const).find((key) => nextErrors[key])
    if (firstKey) {
      document.getElementById(`profile-${firstKey}`)?.focus()
      document.getElementById(`profile-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    setSaving(true)
    window.setTimeout(() => {
      setBaseline(values)
      setSaving(false)
      setSaved(true)
    }, 600)
  }

  function describedBy(id: string, hint?: string, error?: string) {
    return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined
  }

  function renderControl(field: ProfileFieldConfig) {
    const id = `profile-${field.key}`
    const error =
      field.key === "firstName" || field.key === "lastName" || field.key === "email"
        ? errors[field.key]
        : undefined
    const label =
      field.key === "phone" ? text.phoneOptional : field.key === "note" ? text.noteLabel : columns[field.key]
    const hint =
      field.key === "email"
        ? dict.form.emailHint
        : field.key === "note"
          ? text.noteHint
          : field.key === "city" && !values.country
            ? text.cityDisabledHint
            : undefined
    const invalid = Boolean(error)
    const common = {
      id,
      "aria-invalid": invalid || undefined,
      "aria-describedby": describedBy(id, hint, error),
    }

    if (field.kind === "readonly") {
      const selectOptions = fieldSelectOptions[field.key]
      if (field.key === "id") {
        return (
          <FieldShell id={id} label={label} hint={hint} error={error}>
            <div className="relative">
              <Input
                {...common}
                value={values[field.key]}
                disabled
                className={cn(controlClass, "bg-muted pr-10")}
              />
              <Lock className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            </div>
          </FieldShell>
        )
      }
      if (selectOptions) {
        return (
          <FieldShell id={id} label={label} hint={hint} error={error}>
            <Select value={values[field.key] || null} onValueChange={(next) => setField(field.key, next ?? "")}>
              <SelectTrigger
                id={id}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy(id, hint, error)}
                className={cn(controlClass, "w-full min-w-0")}
              >
                <SelectValue placeholder={text.placeholders.select} />
              </SelectTrigger>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldShell>
        )
      }
      return (
        <FieldShell id={id} label={label} hint={hint} error={error}>
          <Input
            {...common}
            value={values[field.key]}
            className={controlClass}
            onChange={(event) => setField(field.key, event.target.value)}
          />
        </FieldShell>
      )
    }

    if (field.kind === "textarea") {
      return (
        <FieldShell id={id} label={label} required={field.required} hint={hint} error={error}>
          <div className="flex justify-end text-xs text-muted-foreground">
            {values.note.length}/{NOTE_MAX}
          </div>
          <Textarea
            {...common}
            rows={3}
            maxLength={NOTE_MAX}
            value={values.note}
            className={cn(controlClass, "min-h-24 py-2")}
            onChange={(event) => setField("note", event.target.value.slice(0, NOTE_MAX))}
          />
        </FieldShell>
      )
    }

    if (field.kind === "email") {
      const valid = EMAIL_PATTERN.test(values.email.trim())
      return (
        <FieldShell id={id} label={label} required={field.required} hint={hint} error={error}>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              {...common}
              type="email"
              autoComplete="email"
              value={values.email}
              className={cn(controlClass, "pr-28 pl-10")}
              onChange={(event) => setField("email", event.target.value)}
              onBlur={() => setField("email", normalizeEmail(values.email))}
            />
            {valid ? (
              <span className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 text-xs font-medium text-success">
                <Check className="size-3.5" />
                {dict.form.verified}
              </span>
            ) : null}
          </div>
        </FieldShell>
      )
    }

    if (field.kind === "tel") {
      const local = values.phone.replace(/^\+90\s*/, "")
      return (
        <FieldShell id={id} label={label} required={field.required} hint={hint} error={error}>
          <div className="flex">
            <span className="flex h-11 items-center gap-1.5 rounded-l-lg border border-r-0 border-input px-2.5 text-sm text-muted-foreground">
              <CountryFlag country={values.country || "Türkiye"} />
              +90
            </span>
            <Input
              {...common}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={local}
              className={cn(controlClass, "rounded-l-none")}
              onChange={(event) => setField("phone", formatPhoneInput(event.target.value))}
            />
          </div>
        </FieldShell>
      )
    }

    if (field.kind === "select") {
      const options = fieldSelectOptions[field.key] ?? []
      return (
        <FieldShell id={id} label={label} required={field.required} hint={hint} error={error}>
          <Select value={values[field.key] || null} onValueChange={(next) => setField(field.key, next ?? "")}>
            <SelectTrigger
              id={id}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy(id, hint, error)}
              className={cn(controlClass, "w-full min-w-0")}
            >
              <SelectValue placeholder={text.placeholders.select} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldShell>
      )
    }

    if (field.kind === "combobox") {
      const options = field.key === "city" ? cities : (fieldComboboxOptions[field.key] ?? [])
      const placeholder =
        field.key === "city"
          ? text.placeholders.city
          : field.key === "department"
            ? text.placeholders.department
            : field.key === "title"
              ? text.placeholders.title
              : field.key === "team"
                ? text.placeholders.team
              : text.placeholders.manager
      return (
        <FieldShell id={id} label={label} required={field.required} hint={hint} error={error}>
          <ProfileCombobox
            id={id}
            value={values[field.key]}
            options={options}
            placeholder={placeholder}
            disabled={field.key === "city" && !values.country}
            emptyLabel={text.empty}
            invalid={invalid}
            describedBy={describedBy(id, hint, error)}
            onChange={(value) => setField(field.key, value)}
          />
        </FieldShell>
      )
    }

    return (
      <FieldShell id={id} label={label} required={field.required} hint={hint} error={error}>
        <Input
          {...common}
          value={values[field.key]}
          className={controlClass}
          onChange={(event) => setField(field.key, event.target.value)}
        />
      </FieldShell>
    )
  }

  function sectionFields(section: ProfileSectionKey | "account") {
    return profileFields.filter((field) => {
      if (field.section !== section) return false
      if (section === "account") return mode === "admin"
      return isFieldEditable(field, mode)
    })
  }

  const summaryItems = profileFields
    .filter((field) => field.section === "account")
    .map((field) => {
      const raw = values[field.key]
      let value: ReactNode = raw || "—"
      if (field.key === "status") {
        value = raw ? <StatusBadge tone={statusTone(raw)}>{raw}</StatusBadge> : "—"
      }
      if ((field.key === "joined" || field.key === "lastSeen") && raw) {
        value = formatProfileDate(raw, dateLocale)
      }
      if (field.key === "balance" && raw) value = formatProfileBalance(raw, dateLocale)
      return { key: field.key, label: columns[field.key], value }
    })

  const currentErrors = validate()
  const saveDisabled = !dirty || Boolean(currentErrors.firstName || currentErrors.lastName || currentErrors.email) || saving

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <User className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-[0.08em] text-primary uppercase">
            {dict.form.kicker}
          </p>
          <h3 className="text-lg font-semibold tracking-tight">{dict.form.pageTitle}</h3>
          <p className="text-sm text-muted-foreground">{dict.form.pageHint}</p>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-20 xl:self-start">
          <Card className="py-0">
            <CardContent className="flex flex-col gap-4 py-5">
              <div className="flex items-center gap-4 xl:flex-col xl:text-center">
                <Avatar className="size-16 shrink-0 rounded-2xl xl:size-28">
                  {preview ? <AvatarImage src={preview} alt="" /> : null}
                  <AvatarFallback className="rounded-2xl bg-muted text-lg font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 xl:flex-none">
                  <p className="truncate text-base font-semibold">{fullName}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 xl:justify-center">
                    {values.role ? (
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{values.role}</span>
                    ) : null}
                    {values.status ? (
                      <StatusBadge tone={statusTone(values.status)}>{values.status}</StatusBadge>
                    ) : null}
                  </div>
                  <Input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (!file) return
                      setPreview((current) => {
                        if (current) URL.revokeObjectURL(current)
                        return URL.createObjectURL(file)
                      })
                    }}
                  />
                  <div className="mt-3 flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11 w-full"
                      aria-label={dict.picture.action}
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload />
                      {dict.picture.action}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="min-h-11 w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      disabled={!preview}
                      onClick={clearPreview}
                    >
                      {dict.picture.remove}
                    </Button>
                    <p className="text-xs text-muted-foreground">{dict.picture.hint}</p>
                  </div>
                </div>
              </div>
              <div className="hidden xl:block">
                <Separator className="mb-4" />
                <p className="mb-3 text-sm font-semibold">{text.accountSummary}</p>
                <AccountSummaryList items={summaryItems} />
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="flex max-w-3xl min-w-0 flex-col">
          <Accordion className="mb-8 xl:hidden" defaultValue={[]}>
            <AccordionItem value="account-summary">
              <AccordionTrigger className="min-h-11 px-1">{text.accountSummary}</AccordionTrigger>
              <AccordionContent>
                <AccountSummaryList items={summaryItems} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-8">
            {profileSectionKeys.map((section) => {
              const fields = sectionFields(section)
              const byKey = Object.fromEntries(fields.map((field) => [field.key, field]))
              return (
                <section key={section} id={`profile-section-${section}`} className="scroll-mt-24">
                  <h4 className="text-base font-semibold">{text.sections[section].title}</h4>
                  <p className="text-sm text-muted-foreground">{text.sections[section].hint}</p>
                  <Separator className="my-3" />
                  {section === "personal" ? (
                    <div className="flex flex-col gap-y-5">
                      <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                        {byKey.firstName ? renderControl(byKey.firstName) : null}
                        {byKey.lastName ? renderControl(byKey.lastName) : null}
                      </div>
                      {byKey.username ? renderControl(byKey.username) : null}
                      {byKey.note ? renderControl(byKey.note) : null}
                    </div>
                  ) : null}
                  {section === "contact" ? (
                    <div className="flex flex-col gap-y-5">
                      {byKey.email ? renderControl(byKey.email) : null}
                      <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                        {byKey.phone ? renderControl(byKey.phone) : null}
                        {byKey.country ? renderControl(byKey.country) : null}
                        {byKey.city ? renderControl(byKey.city) : null}
                      </div>
                    </div>
                  ) : null}
                  {section === "org" ? (
                    <div className="flex flex-col gap-y-5">
                      <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                        {byKey.company ? renderControl(byKey.company) : null}
                        {byKey.department ? renderControl(byKey.department) : null}
                        {byKey.title ? renderControl(byKey.title) : null}
                      </div>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                        {byKey.team ? renderControl(byKey.team) : null}
                        {byKey.manager ? renderControl(byKey.manager) : null}
                      </div>
                    </div>
                  ) : null}
                  {section === "prefs" ? (
                    <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                      {byKey.language ? renderControl(byKey.language) : null}
                      {byKey.timezone ? renderControl(byKey.timezone) : null}
                    </div>
                  ) : null}
                </section>
              )
            })}

            {mode === "admin" ? (
              <section id="profile-section-account" className="scroll-mt-24">
                <h4 className="text-base font-semibold">{text.sections.account.title}</h4>
                <p className="text-sm text-muted-foreground">{text.sections.account.hint}</p>
                <Separator className="my-3" />
                <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                  {sectionFields("account").map((field) => (
                    <div key={field.key}>{renderControl(field)}</div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 -mx-4 mt-4 border-t bg-card px-4 py-3 shadow-[0_-8px_16px_-12px_rgb(0_0_0/0.15)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {dirty ? (
            <p className="inline-flex items-center gap-2 rounded-md bg-warning/10 px-2 py-1 text-sm font-medium text-warning">
              <span className="size-2 rounded-full bg-current" aria-hidden />
              {dict.form.unsaved}
            </p>
          ) : saved ? (
            <p className="text-sm text-success">{text.saved}</p>
          ) : (
            <span />
          )}
          <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
            <Button type="button" variant="ghost" className="min-h-11 w-full sm:w-auto" onClick={reset}>
              {dict.form.reset}
            </Button>
            <Button type="button" className="min-h-11 w-full sm:w-auto" disabled={saveDisabled} onClick={save}>
              {saving ? <Loader2 className="animate-spin" /> : null}
              {saving ? text.saving : dict.form.save}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
