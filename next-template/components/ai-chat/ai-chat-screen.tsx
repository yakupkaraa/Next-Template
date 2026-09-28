"use client"

import { useState } from "react"
import { Bug, CodeXml, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchBar } from "@/components/ui/search-bar"
import { aiChats, aiChatView } from "./data"

const suggestionIcons = {
  code: CodeXml,
  reply: Mail,
  debug: Bug,
} as const

export function AiChatScreen() {
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState("")
  const [extra, setExtra] = useState<Record<string, { role: "user"; text: string }[]>>({})

  const normalized = query.trim().toLocaleLowerCase("tr")
  const chats = normalized
    ? aiChats.filter((chat) =>
        `${chat.title} ${chat.preview}`.toLocaleLowerCase("tr").includes(normalized)
      )
    : aiChats
  const active = aiChats.find((chat) => chat.id === activeId)
  const messages = active ? [...active.messages, ...(extra[active.id] ?? [])] : []

  function send() {
    const text = draft.trim()
    if (!text || !active) return
    setExtra((current) => ({
      ...current,
      [active.id]: [...(current[active.id] ?? []), { role: "user", text }],
    }))
    setDraft("")
  }

  return (
    <div className="grid min-h-0 flex-1 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 lg:grid-cols-[14rem_1fr]">
      <aside className="flex min-h-0 flex-col border-b lg:border-r lg:border-b-0">
        <div className="px-3 pt-3">
          <Button type="button" size="sm" className="w-fit" onClick={() => setActiveId(null)}>
            {aiChatView.newChat}
          </Button>
        </div>
        <div className="px-3 py-3">
          <SearchBar
            value={query}
            onValueChange={setQuery}
            placeholder={aiChatView.search}
            className="max-w-none"
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setActiveId(chat.id)}
              className={`mb-1 w-full rounded-lg px-2 py-2 text-left hover:bg-muted ${
                chat.id === activeId ? "bg-muted" : ""
              }`}
            >
              <p className="truncate text-sm font-medium">{chat.title}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{chat.preview}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {active ? (
            <div className="flex flex-col gap-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.role === "user" ? "ml-auto bg-muted" : "bg-secondary"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
              <div>
                <h2 className="text-2xl font-semibold">{aiChatView.greeting}</h2>
                <p className="mt-1 text-muted-foreground">{aiChatView.greetingHint}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {aiChatView.suggestions.map((item) => {
                  const Icon = suggestionIcons[item.id as keyof typeof suggestionIcons]
                  return (
                    <Card key={item.id} size="sm">
                      <CardContent className="flex flex-col gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                          <Icon className="size-4" />
                        </span>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-muted-foreground">{item.detail}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 border-t p-3">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") send()
            }}
            placeholder={aiChatView.placeholder}
          />
          <Button type="button" size="icon" aria-label={aiChatView.send} onClick={send}>
            <Send />
          </Button>
        </div>
      </section>
    </div>
  )
}
