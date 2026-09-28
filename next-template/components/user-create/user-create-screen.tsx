"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BillingPanel } from "./billing-panel"
import { NotificationsPanel } from "./notifications-panel"
import { SecurityPanel } from "./security-panel"
import { userCreateView } from "./data"

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

export function UserCreateScreen() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const form = userCreateView.form

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="mx-auto flex w-[90%] min-w-0 flex-col gap-4">
      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-4">
          <CardTitle>{userCreateView.account}</CardTitle>
        </CardHeader>
        <Tabs defaultValue="profile">
          <div className="border-b px-4">
            <TabsList variant="line" className="h-auto justify-start bg-transparent">
              {userCreateView.tabs.map((tab) => (
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
                  <CardTitle>{userCreateView.picture.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
                  <Avatar className="size-24">
                    {preview ? <AvatarImage src={preview} alt="" /> : null}
                    <AvatarFallback className="text-lg">{userCreateView.picture.initials}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-muted-foreground">{userCreateView.picture.hint}</p>
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
                    {userCreateView.picture.action}
                  </Button>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4 lg:border-l lg:pl-4">
                <h3 className="text-sm font-medium">{form.title}</h3>
                <Field label={form.name} hint={form.nameHint}>
                  <Input defaultValue={form.nameValue} />
                </Field>
                <Field label={form.email}>
                  <Input type="email" defaultValue={form.emailValue} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={form.company}>
                    <Input defaultValue={form.companyValue} />
                  </Field>
                  <Field label={form.country}>
                    <Input defaultValue={form.countryValue} />
                  </Field>
                  <Field label={form.phone}>
                    <Input defaultValue={form.phoneValue} />
                  </Field>
                  <Field label={form.birthday}>
                    <Input defaultValue={form.birthdayValue} />
                  </Field>
                </div>
                <Button type="button" className="w-fit">
                  {form.submit}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="p-4">
            <BillingPanel />
          </TabsContent>

          <TabsContent value="security" className="p-4">
            <SecurityPanel />
          </TabsContent>

          <TabsContent value="notifications" className="p-4">
            <NotificationsPanel />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
