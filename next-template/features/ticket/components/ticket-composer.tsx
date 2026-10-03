"use client"

import { Bold, Italic, Link2, Paperclip, Send } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { inboxCopy } from "@/features/ticket/copy"
import type { TicketMessageType, TicketRole } from "@/features/ticket/data"
import type { ContentLocale } from "@/lib/i18n"

export function TicketComposer({
  locale,
  role,
  onSend,
  onCloseTicket,
}: {
  locale: ContentLocale
  role: TicketRole
  onSend: (body: string, type: TicketMessageType, markReview: boolean) => void
  onCloseTicket: () => void
}) {
  const text = inboxCopy(locale)
  const [tab, setTab] = useState<"reply" | "internal">("reply")
  const [body, setBody] = useState("")
  const [markReview, setMarkReview] = useState(true)

  function send() {
    if (!body.trim()) return
    onSend(body.trim(), tab === "internal" ? "internal" : role === "admin" ? "admin" : "user", markReview)
    setBody("")
  }

  return (
    <div className="border-t border-border bg-card p-3">
      <Tabs value={tab} onValueChange={(value) => setTab(value as "reply" | "internal")}>
        <TabsList>
          <TabsTrigger value="reply">{text.reply}</TabsTrigger>
          {role === "admin" ? <TabsTrigger value="internal">{text.internal}</TabsTrigger> : null}
        </TabsList>
        <TabsContent value={tab} className="mt-2">
          <div className="overflow-hidden rounded-xl border border-input">
            <div className="flex items-center gap-1 border-b bg-muted px-2 py-1">
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Bold">
                <Bold />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Italic">
                <Italic />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Link">
                <Link2 />
              </Button>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Attach">
                <Paperclip />
              </Button>
              {role === "admin" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    nativeButton
                    render={<Button type="button" size="xs" variant="ghost" />}
                  >
                    {text.canned}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setBody(text.canned1)}>
                      {text.canned1Title}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setBody(text.canned2)}>
                      {text.canned2Title}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setBody(text.canned3)}>
                      {text.canned3Title}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>
            <Textarea
              className="min-h-24 rounded-none border-0 focus-visible:ring-0"
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {role === "admin" ? (
          <div className="flex items-center gap-2">
            <Checkbox
              id="mark-review"
              checked={markReview}
              onCheckedChange={(value) => setMarkReview(value === true)}
            />
            <Label htmlFor="mark-review" className="text-xs">
              {text.markReview}
            </Label>
          </div>
        ) : (
          <Button type="button" variant="outline" className="min-h-11" onClick={onCloseTicket}>
            {text.closeTicket}
          </Button>
        )}
        <div className="flex gap-2">
          <Button type="button" variant="ghost" className="min-h-11 sm:min-h-8">
            {text.saveDraft}
          </Button>
          <Button type="button" className="min-h-11 sm:min-h-8" disabled={!body.trim()} onClick={send}>
            <Send />
            {text.send}
          </Button>
        </div>
      </div>
    </div>
  )
}
