"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "cn"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { BillingPanel } from "./billing-panel"
import { NotificationsPanel } from "./notifications-panel"
import { SecurityPanel } from "./security-panel"
import { userCreateDemo } from "./data"

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function UserCreateForm({
  locale,
  className,
  showHeader = true,
}: {
  locale: ContentLocale
  className?: string
  showHeader?: boolean
}) {
  const copy = getDictionary(locale).users.create
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const form = copy.form
  const demo = userCreateDemo
  const tabs = [
    { value: "profile", label: copy.tabs.profile },
    { value: "billing", label: copy.tabs.billing },
    { value: "security", label: copy.tabs.security },
    { value: "notifications", label: copy.tabs.notifications },
  ]

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <Card className={cn("gap-0 py-0", className)}>
      {showHeader ? (
        <CardHeader className="border-b py-4">
          <CardTitle>{copy.account}</CardTitle>
        </CardHeader>
      ) : null}
      <Tabs defaultValue="profile">
        <div className="border-b px-4">
          <TabsList variant="line" className="h-auto justify-start bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="profile" className="p-4">
          <div className="grid items-start gap-4 lg:grid-cols-[17rem_1fr]">
            <Card className="py-0">
              <CardHeader className="border-b py-3">
                <CardTitle>{copy.picture.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
                <Avatar className="size-24">
                  {preview ? <AvatarImage src={preview} alt="" /> : null}
                  <AvatarFallback className="text-lg">{copy.picture.initials}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">{copy.picture.hint}</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
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
                <Button type="button" onClick={() => fileRef.current?.click()}>
                  <Upload />
                  {copy.picture.action}
                </Button>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 lg:border-l lg:pl-4">
              <h3 className="text-sm font-medium">{form.title}</h3>
              <Field label={form.name} hint={form.nameHint}>
                <Input defaultValue={demo.nameValue} />
              </Field>
              <Field label={form.email}>
                <Input type="email" defaultValue={demo.emailValue} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={form.company}>
                  <Input defaultValue={demo.companyValue} />
                </Field>
                <Field label={form.country}>
                  <Input defaultValue={demo.countryValue} />
                </Field>
                <Field label={form.phone}>
                  <Input defaultValue={demo.phoneValue} />
                </Field>
                <Field label={form.birthday}>
                  <Input defaultValue={demo.birthdayValue} />
                </Field>
              </div>
              <Button type="button" className="w-fit">
                {form.submit}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="p-4">
          <BillingPanel locale={locale} />
        </TabsContent>

        <TabsContent value="security" className="p-4">
          <SecurityPanel locale={locale} />
        </TabsContent>

        <TabsContent value="notifications" className="p-4">
          <NotificationsPanel locale={locale} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
