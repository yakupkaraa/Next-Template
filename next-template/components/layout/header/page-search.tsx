"use client"

import { Search, X } from "lucide-react"
import { useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { headerCopy } from "@/components/layout/constants/header/copy"
import type { localeFromPath } from "@/lib/locales"

declare global {
  interface Window {
    find?: (
      searchText: string,
      caseSensitive?: boolean,
      backwards?: boolean,
      wrapAround?: boolean
    ) => boolean
  }
}

export function PageSearch({ locale }: { locale: ReturnType<typeof localeFromPath> }) {
  const text = headerCopy[locale]
  const [value, setValue] = useState("")
  const [notFound, setNotFound] = useState(false)

  function runFind(query: string, backwards: boolean) {
    if (!query || typeof window.find !== "function") {
      setNotFound(false)
      return
    }
    const found = window.find(query, false, backwards, true)
    setNotFound(!found)
  }

  function handleChange(next: string) {
    setValue(next)
    window.getSelection()?.collapseToStart()
    runFind(next, false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault()
      runFind(value, event.shiftKey)
    } else if (event.key === "Escape") {
      handleClear()
    }
  }

  function handleClear() {
    setValue("")
    setNotFound(false)
    window.getSelection()?.removeAllRanges()
  }

  return (
    <div className="relative flex w-full items-center">
      <Search className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={text.search}
        aria-label={text.search}
        aria-invalid={notFound}
        className="h-9 border-border bg-white pl-8 pr-8 text-neutral-900 shadow-sm placeholder:text-neutral-500 dark:border-border dark:bg-white dark:text-neutral-900 dark:placeholder:text-neutral-500"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={text.search}
          onClick={handleClear}
          className="absolute right-1"
        >
          <X className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}
