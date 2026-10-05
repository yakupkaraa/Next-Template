"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "cn"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { BillingPanel } from "./billing-panel"
import { NotificationsPanel } from "./notifications-panel"
import { ProfileTab, type ProfileFormMode } from "./profile-tab"
import { SecurityPanel } from "./security-panel"

export function UserCreateForm({
  locale,
  className,
  showHeader = true,
  mode = "self",
  intent = "create",
}: {
  locale: ContentLocale
  className?: string
  showHeader?: boolean
  mode?: ProfileFormMode
  intent?: "create" | "edit"
}) {
  const copy = getDictionary(locale).users.create
  const isEdit = intent === "edit"
  const tabs = [
    { value: "profile", label: copy.tabs.profile },
    ...(isEdit
      ? [
          { value: "billing", label: copy.tabs.billing },
          { value: "security", label: copy.tabs.security },
          { value: "notifications", label: copy.tabs.notifications },
        ]
      : []),
  ]

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
          <ProfileTab locale={locale} mode={mode} intent={intent} />
        </TabsContent>

        {isEdit ? (
          <>
            <TabsContent value="billing" className="p-4">
              <BillingPanel locale={locale} />
            </TabsContent>
            <TabsContent value="security" className="p-4">
              <SecurityPanel locale={locale} />
            </TabsContent>
            <TabsContent value="notifications" className="p-4">
              <NotificationsPanel locale={locale} />
            </TabsContent>
          </>
        ) : null}
      </Tabs>
    </Card>
  )
}
