"use client"

import { useState } from "react"
import { Bell, CircleMinus, Lock, Moon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { cn } from "cn"
import {
  notificationChannels,
  notificationMuteDurations,
  notificationQuietHours,
  notificationRequiredRow,
  type NotificationChannel,
  type NotificationRowId,
} from "../constants/notifications"
import { notificationMatrixDefault } from "../../mocks/users.mock"

type DigestId = "instant" | "daily" | "weekly"
type MuteDuration = (typeof notificationMuteDurations)[number]

const initialPrefs = {
  muted: false,
  muteDuration: "1h" as MuteDuration,
  matrix: notificationMatrixDefault,
  digest: "daily" as DigestId,
  quiet: true,
  quietFrom: "22:00",
  quietTo: "08:00",
}

function cloneMatrix() {
  return structuredClone(notificationMatrixDefault)
}

export function NotificationsPanel({ locale }: { locale: ContentLocale }) {
  const text = getDictionary(locale).users.create.notifications
  const [muted, setMuted] = useState(initialPrefs.muted)
  const [muteDuration, setMuteDuration] = useState<MuteDuration>(initialPrefs.muteDuration)
  const [matrix, setMatrix] = useState(cloneMatrix)
  const [digest, setDigest] = useState<DigestId>(initialPrefs.digest)
  const [quiet, setQuiet] = useState(initialPrefs.quiet)
  const [quietFrom, setQuietFrom] = useState(initialPrefs.quietFrom)
  const [quietTo, setQuietTo] = useState(initialPrefs.quietTo)

  const digests: { id: DigestId; title: string; hint: string }[] = [
    { id: "instant", title: text.digestInstantTitle, hint: text.digestInstantHint },
    { id: "daily", title: text.digestDailyTitle, hint: text.digestDailyHint },
    { id: "weekly", title: text.digestWeeklyTitle, hint: text.digestWeeklyHint },
  ]

  function setCell(rowId: NotificationRowId, channel: NotificationChannel, checked: boolean) {
    if (rowId === notificationRequiredRow) return
    setMatrix((current) => ({
      ...current,
      [rowId]: { ...current[rowId], [channel]: checked },
    }))
  }

  function setAll(checked: boolean) {
    setMatrix((current) => {
      const next = { ...current }
      for (const row of text.rows) {
        const id = row.id as NotificationRowId
        if (id === notificationRequiredRow) continue
        next[id] = { email: checked, inApp: checked, push: checked }
      }
      return next
    })
  }

  function reset() {
    setMuted(initialPrefs.muted)
    setMuteDuration(initialPrefs.muteDuration)
    setMatrix(cloneMatrix())
    setDigest(initialPrefs.digest)
    setQuiet(initialPrefs.quiet)
    setQuietFrom(initialPrefs.quietFrom)
    setQuietTo(initialPrefs.quietTo)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Bell className="size-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.08em] text-primary uppercase">
            {text.kicker}
          </p>
          <h3 className="text-lg font-semibold tracking-tight">{text.pageTitle}</h3>
        </div>
      </div>

      <Card className="gap-0 py-0">
        <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <CircleMinus className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">{text.muteTitle}</p>
              <p className="text-sm text-muted-foreground">{text.muteHint}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Select
              value={muteDuration}
              onValueChange={(value) => {
                if (value) setMuteDuration(value as MuteDuration)
              }}
            >
              <SelectTrigger size="sm" aria-label={text.muteTitle}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {notificationMuteDurations.map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {text.muteDurations[duration]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Switch checked={muted} onCheckedChange={setMuted} aria-label={text.muteTitle} />
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 overflow-x-auto py-0">
        <CardHeader className="items-center border-b py-3">
          <CardTitle>{text.matrixTitle}</CardTitle>
          <CardAction className="flex items-center gap-2 text-sm">
            <Button type="button" variant="link" className="h-auto px-0" onClick={() => setAll(true)}>
              {text.enableAll}
            </Button>
            <span className="text-muted-foreground">·</span>
            <Button type="button" variant="link" className="h-auto px-0" onClick={() => setAll(false)}>
              {text.disableAll}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full min-w-xl text-sm">
            <thead>
              <tr className="border-b bg-primary/5 text-left text-[11px] font-semibold tracking-[0.08em] text-primary uppercase">
                <th className="px-4 py-2.5 font-semibold">{text.colType}</th>
                <th className="px-4 py-2.5 text-center font-semibold">{text.colEmail}</th>
                <th className="px-4 py-2.5 text-center font-semibold">{text.colInApp}</th>
                <th className="px-4 py-2.5 text-center font-semibold">{text.colPush}</th>
              </tr>
            </thead>
            <tbody>
              {text.rows.map((row) => {
                const id = row.id as NotificationRowId
                const locked = id === notificationRequiredRow
                return (
                  <tr key={row.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {locked ? <Lock className="size-3.5 text-muted-foreground" /> : null}
                        <span className="font-medium">{row.title}</span>
                        {locked ? (
                          <Badge className="bg-primary/10 text-primary">{text.requiredBadge}</Badge>
                        ) : null}
                      </div>
                    </td>
                    {notificationChannels.map((channel) => (
                      <td key={channel} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={matrix[id][channel]}
                            disabled={locked}
                            aria-label={`${row.title} ${channel}`}
                            onCheckedChange={(checked) => setCell(id, channel, checked === true)}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-3">
          <CardTitle>{text.digestTitle}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 py-4 md:grid-cols-3">
          {digests.map((option) => {
            const selected = digest === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 text-left",
                  selected ? "border-primary bg-primary/5" : "border-border bg-card"
                )}
                onClick={() => setDigest(option.id)}
              >
                <span className="min-w-0 flex-1">
                  <p className="font-medium">{option.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{option.hint}</p>
                </span>
                <span
                  className={cn(
                    "mt-1 size-4 shrink-0 rounded-full border",
                    selected ? "border-primary bg-primary" : "border-input bg-background"
                  )}
                  aria-hidden
                >
                  {selected ? <span className="block size-full rounded-full ring-2 ring-background ring-inset" /> : null}
                </span>
              </button>
            )
          })}
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <Moon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium">{text.quietTitle}</p>
              <p className="text-sm text-muted-foreground">{text.quietHint}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
            <Select value={quietFrom} onValueChange={(value) => value && setQuietFrom(value)}>
              <SelectTrigger size="sm" aria-label={text.quietTitle}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {notificationQuietHours.map((hour) => (
                  <SelectItem key={`from-${hour}`} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">–</span>
            <Select value={quietTo} onValueChange={(value) => value && setQuietTo(value)}>
              <SelectTrigger size="sm" aria-label={text.quietTitle}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {notificationQuietHours.map((hour) => (
                  <SelectItem key={`to-${hour}`} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Switch checked={quiet} onCheckedChange={setQuiet} aria-label={text.quietTitle} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={reset}>
          {text.reset}
        </Button>
        <Button type="button">{text.save}</Button>
      </div>
    </div>
  )
}
