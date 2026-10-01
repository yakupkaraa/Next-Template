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
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { cn } from "cn"
import { aiChats } from "./data"

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
    <div className="box-border flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm sm:flex-row">
      <aside className="flex max-h-56 shrink-0 flex-col border-b border-border bg-card sm:max-h-none sm:w-72 sm:min-h-0 sm:border-r sm:border-b-0">
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
              <button
                key={chat.id}
                type="button"
                onClick={() => setActiveId(chat.id)}
                className={cn(
                  "mb-1 w-full rounded-lg px-3 py-2.5 text-left transition-colors",
                  selected
                    ? "bg-primary/10 text-foreground"
                    : "text-foreground hover:bg-muted/80"
                )}
              >
                <p className="truncate text-sm font-semibold">{chat.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {chat.preview}
                </p>
              </button>
            )
          })}
        </div>

        <div className="shrink-0 border-t border-border p-4">
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
                  <h1 className="bg-gradient-to-r from-primary via-chart-2 to-chart-1 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                    {view.greeting}
                  </h1>
                  <p className="mt-2 text-base text-muted-foreground sm:text-lg">
                    {view.greetingHint}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {view.suggestions.map((item) => {
                    const id = item.id as keyof typeof suggestionIcons
                    const Icon = suggestionIcons[id]
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDraft(item.detail)}
                        className="flex flex-col gap-3 rounded-xl border-2 border-border bg-card p-5 text-left shadow-sm transition-colors hover:border-primary/40 hover:bg-muted/30"
                      >
                        <span
                          className={cn(
                            "flex size-11 items-center justify-center rounded-xl",
                            suggestionIconClass[id]
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t-2 border-border bg-card p-4">
          <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border-2 border-border bg-background px-3 py-2 shadow-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground"
              aria-label={view.attach}
            >
              <ImageIcon className="size-5" />
            </Button>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  send()
                }
              }}
              placeholder={view.placeholder}
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
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
  )
}
