"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { getDictionary, type ContentLocale } from "@/lib/i18n"

export function NotificationsPanel({ locale }: { locale: ContentLocale }) {
  const notifications = getDictionary(locale).users.create.notifications
  const [enabled, setEnabled] = useState(() =>
    Object.fromEntries(notifications.items.map((item) => [item.id, item.enabled]))
  )

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-3">
        <CardTitle>{notifications.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{notifications.hint}</p>
      </CardHeader>
      <CardContent className="px-0">
        {notifications.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 border-b px-4 py-4 last:border-b-0"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-muted-foreground">{item.detail}</p>
            </div>
            <Switch
              checked={enabled[item.id]}
              onCheckedChange={(checked) =>
                setEnabled((current) => ({ ...current, [item.id]: checked }))
              }
              aria-label={item.title}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
