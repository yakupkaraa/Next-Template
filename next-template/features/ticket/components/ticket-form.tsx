"use client"

import {
  Bold,
  Code,
  ImagePlus,
  Italic,
  Link2,
  List,
  Send,
  Ticket,
} from "lucide-react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TicketAttachments, type TicketFile } from "@/features/ticket/components/ticket-attachments"
import { priorityDotClass } from "@/features/ticket/components/ticket-badges"
import { createCopy } from "@/features/ticket/create/constants/copy"
import {
  ticketCategories,
  ticketEnvironments,
  ticketModules,
  type TicketCategory,
  type TicketEnvironment,
  type TicketModule,
  type TicketPriority,
} from "@/features/ticket/constants/ticket"
import type { ContentLocale } from "@/lib/i18n"
import { cn } from "cn"

export type TicketFormValue = {
  subject: string
  category: TicketCategory | ""
  priority: TicketPriority
  module: TicketModule | ""
  environment: TicketEnvironment | ""
  description: string
  notify: boolean
  files: TicketFile[]
}

export type TicketFormErrors = Partial<Record<"subject" | "category" | "priority" | "description", string>>

export function TicketForm({
  locale,
  value,
  errors,
  errorBanner,
  onChange,
  onSubmit,
  onDraft,
  onCancel,
}: {
  locale: ContentLocale
  value: TicketFormValue
  errors: TicketFormErrors
  errorBanner: string
  onChange: (next: TicketFormValue) => void
  onSubmit: () => void
  onDraft: () => void
  onCancel: () => void
}) {
  const text = createCopy(locale)
  const firstErrorRef = useRef<HTMLInputElement>(null)

  const priorities: { id: TicketPriority; label: string }[] = [
    { id: "low", label: text.low },
    { id: "normal", label: text.normal },
    { id: "high", label: text.high },
    { id: "urgent", label: text.urgent },
  ]

  return (
    <Card className="gap-0 overflow-visible py-0 shadow-sm">
      <CardContent className="flex flex-col gap-5 py-5">
        <div className="flex items-center gap-3 border-b pb-4">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Ticket className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold">{text.formTitle}</h2>
            <p className="text-sm text-muted-foreground">{text.formHint}</p>
          </div>
        </div>

        {errorBanner ? (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            <span>{errorBanner}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="min-h-11 text-destructive"
              onClick={() => firstErrorRef.current?.focus()}
            >
              {text.firstError}
            </Button>
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="ticket-subject">
              {text.subject} <span className="text-destructive">{text.required}</span>
            </Label>
            <span className="text-xs text-muted-foreground">{value.subject.length} / 120</span>
          </div>
          <Input
            ref={firstErrorRef}
            id="ticket-subject"
            maxLength={120}
            value={value.subject}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "ticket-subject-error" : "ticket-subject-hint"}
            onChange={(event) => onChange({ ...value, subject: event.target.value })}
          />
          <p id="ticket-subject-hint" className="text-xs text-muted-foreground">
            {text.subjectHint}
          </p>
          {errors.subject ? (
            <p id="ticket-subject-error" className="text-sm text-destructive">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ticket-category">
              {text.category} <span className="text-destructive">{text.required}</span>
            </Label>
            <Select
              value={value.category || null}
              onValueChange={(next) =>
                onChange({ ...value, category: (next ?? "") as TicketCategory | "" })
              }
            >
              <SelectTrigger id="ticket-category" className="w-full min-h-11 md:min-h-8">
                <SelectValue placeholder={text.pick} />
              </SelectTrigger>
              <SelectContent>
                {ticketCategories.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category ? <p className="text-sm text-destructive">{errors.category}</p> : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>
              {text.priority} <span className="text-destructive">{text.required}</span>
            </Label>
            <ToggleGroup
              value={[value.priority]}
              onValueChange={(next) => {
                const picked = next[0]
                if (picked) onChange({ ...value, priority: picked as TicketPriority })
              }}
              className="grid w-full grid-cols-2 sm:flex sm:w-fit"
            >
              {priorities.map((item) => (
                <ToggleGroupItem
                  key={item.id}
                  value={item.id}
                  aria-label={item.label}
                  className="min-h-11 justify-center"
                >
                  <span className={cn("size-2 rounded-full", priorityDotClass(item.id))} />
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <p className="text-xs text-muted-foreground">{text.priorityHint}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ticket-module">{text.module}</Label>
            <Select
              value={value.module || null}
              onValueChange={(next) =>
                onChange({ ...value, module: (next ?? "") as TicketModule | "" })
              }
            >
              <SelectTrigger id="ticket-module" className="w-full min-h-11 md:min-h-8">
                <SelectValue placeholder={text.pick} />
              </SelectTrigger>
              <SelectContent>
                {ticketModules.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ticket-env">{text.environment}</Label>
            <Select
              value={value.environment || null}
              onValueChange={(next) =>
                onChange({ ...value, environment: (next ?? "") as TicketEnvironment | "" })
              }
            >
              <SelectTrigger id="ticket-env" className="w-full min-h-11 md:min-h-8">
                <SelectValue placeholder={text.pick} />
              </SelectTrigger>
              <SelectContent>
                {ticketEnvironments.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ticket-body">
            {text.description} <span className="text-destructive">{text.required}</span>
          </Label>
          <div className="overflow-hidden rounded-xl border border-input">
            <div className="flex items-center gap-1 border-b bg-muted px-2 py-1.5">
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Bold">
                <Bold />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Italic">
                <Italic />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Link">
                <Link2 />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="List">
                <List />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Code">
                <Code />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Image">
                <ImagePlus />
              </Button>
            </div>
            <Textarea
              id="ticket-body"
              className="min-h-40 rounded-none border-0 focus-visible:ring-0"
              maxLength={2000}
              value={value.description}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? "ticket-body-error" : "ticket-body-hint"}
              onChange={(event) => onChange({ ...value, description: event.target.value })}
            />
            <div className="flex items-center justify-between border-t px-3 py-1.5 text-xs text-muted-foreground">
              <span>{text.markdown}</span>
              <span>
                {value.description.length} / 2000
              </span>
            </div>
          </div>
          <p id="ticket-body-hint" className="text-xs text-muted-foreground">
            {text.descriptionHint}
          </p>
          {errors.description ? (
            <p id="ticket-body-error" className="text-sm text-destructive">
              {errors.description}
            </p>
          ) : null}
        </div>

        <TicketAttachments
          locale={locale}
          files={value.files}
          onChange={(files) => onChange({ ...value, files })}
        />

        <div className="flex items-center gap-3">
          <Switch
            id="ticket-notify"
            checked={value.notify}
            onCheckedChange={(checked) => onChange({ ...value, notify: checked === true })}
          />
          <Label htmlFor="ticket-notify">{text.notify}</Label>
        </div>

        <div className="hidden justify-end gap-2 md:flex">
          <Button type="button" variant="ghost" onClick={onCancel}>
            {text.cancel}
          </Button>
          <Button type="button" variant="outline" onClick={onDraft}>
            {text.saveDraft}
          </Button>
          <Button type="button" onClick={onSubmit}>
            <Send />
            {text.submit}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
