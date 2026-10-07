"use client"

import { useState } from "react"
import {
  ArrowUp,
  Bug,
  CodeXml,
  ImageIcon,
  Mail,
  MessageSquarePlus,
} from "lucide-react"
import { DensityBoard } from "@/components/layout/density-board"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchBar } from "@/components/ui/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { cn } from "cn"
import { aiChats } from "../data"

const suggestionIcons = {
  code: CodeXml,
  reply: Mail,
  debug: Bug,
} as const

const suggestionIconClass: Record<keyof typeof suggestionIcons, string> = {
  code: "bg-chart-2/25 text-chart-1",
  reply: "bg-chart-3/30 text-chart-2",
  debug: "bg-chart-4/20 text-chart-4",
}

export function AiChatScreen({ locale }: { locale: ContentLocale }) {
  const view = getDictionary(locale).aiChat
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState("")
  const [extra, setExtra] = useState<Record<string, { role: "user"; text: string }[]>>({})

  const localeTag = locale === "en" ? "en" : "tr"
  const normalized = query.trim().toLocaleLowerCase(localeTag)
  const chats = normalized
    ? aiChats.filter((chat) =>
        `${chat.title} ${chat.preview}`.toLocaleLowerCase(localeTag).includes(normalized)
      )
    : aiChats
  const active = aiChats.find((chat) => chat.id === activeId)
  const messages = active ? [...active.messages, ...(extra[active.id] ?? [])] : []

  function send() {
    const text = draft.trim()
    if (!text) return
    const targetId = active?.id ?? chats[0]?.id
    if (!targetId) return
    if (!activeId) setActiveId(targetId)
    setExtra((current) => ({
      ...current,
      [targetId]: [...(current[targetId] ?? []), { role: "user", text }],
    }))
    setDraft("")
  }

  return (
    <DensityBoard className="min-h-0 flex-1">
    <div
      data-density-fill=""
      data-ai-chat=""
      className="box-border flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-2 border-border bg-card sm:flex-row"
    >
      <aside className="flex max-h-56 shrink-0 flex-col border-b-2 border-border bg-card sm:max-h-none sm:w-72 sm:min-h-0 sm:border-r-2 sm:border-b-0">
        <div className="shrink-0 px-4 pt-4 pb-2">
          <SearchBar
            value={query}
            onValueChange={setQuery}
            placeholder={view.search}
            className="max-w-none"
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2">
          {chats.map((chat) => {
            const selected = chat.id === activeId
            return (
              <Button
                key={chat.id}
                type="button"
                variant="ghost"
                onClick={() => setActiveId(chat.id)}
                className={cn(
                  "mb-1 h-auto w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left whitespace-normal",
                  selected
                    ? "bg-primary/10 text-foreground"
                    : "text-foreground hover:bg-muted/80"
                )}
              >
                <p className="truncate text-sm font-semibold">{chat.title}</p>
                <p className="line-clamp-2 text-xs leading-relaxed font-normal text-muted-foreground">
                  {chat.preview}
                </p>
              </Button>
            )
          })}
        </div>

        <div className="shrink-0 border-t-2 border-border p-4">
          <Button
            type="button"
            className="h-10 w-full rounded-lg text-base font-medium"
            onClick={() => setActiveId(null)}
          >
            <MessageSquarePlus />
            {view.newChat}
          </Button>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
        <div className="min-h-0 flex-1 overflow-y-auto">
          {active ? (
            <div className="flex flex-col gap-3 p-6">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[min(80%,36rem)] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {message.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-full flex-col items-center justify-center px-6 py-10">
              <div className="w-full max-w-4xl space-y-8">
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {view.greeting}
                  </h1>
                  <p className="mt-2 text-base text-muted-foreground sm:text-lg">
                    {view.greetingHint}
                  </p>
                </div>

                <div data-ai-suggest="" className="grid gap-4 md:grid-cols-3">
                  {view.suggestions.map((item) => {
                    const id = item.id as keyof typeof suggestionIcons
                    const Icon = suggestionIcons[id]
                    return (
                      <Button
                        key={item.id}
                        type="button"
                        variant="outline"
                        onClick={() => setDraft(item.detail)}
                        className="h-auto flex-col items-start gap-3 rounded-xl border-2 p-5 text-left whitespace-normal hover:border-primary/40 hover:bg-muted/30"
                      >
                        <span
                          className={cn(
                            "flex size-11 items-center justify-center rounded-xl",
                            suggestionIconClass[id]
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="flex flex-col items-start">
                          <span className="font-semibold text-foreground">{item.title}</span>
                          <span className="mt-1 text-sm font-normal text-muted-foreground">{item.detail}</span>
                        </span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t-2 border-border bg-card p-4">
          <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border-2 border-border bg-background px-3 py-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground"
              aria-label={view.attach}
            >
              <ImageIcon className="size-5" />
            </Button>
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  send()
                }
              }}
              placeholder={view.placeholder}
              className="h-auto min-w-0 flex-1 border-0 bg-transparent py-2 shadow-none focus-visible:ring-0"
            />
            <Button
              type="button"
              size="icon"
              className="size-10 shrink-0 rounded-full"
              aria-label={view.send}
              onClick={send}
              disabled={!draft.trim()}
            >
              <ArrowUp className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    </DensityBoard>
  )
}
