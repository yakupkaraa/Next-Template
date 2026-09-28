"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

export function SearchBar({
  value,
  onValueChange,
  placeholder = "",
  className,
}: {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cn("relative w-full max-w-xs", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        aria-label={placeholder}
        className="px-8"
      />
      {value ? (
        <button
          type="button"
          aria-label="Temizle"
          onClick={() => onValueChange("")}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
