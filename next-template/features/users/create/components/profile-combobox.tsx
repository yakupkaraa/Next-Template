"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "cn"
import { controlClass } from "../constants/profile-fields"

export function ProfileCombobox({
  id,
  value,
  options,
  placeholder,
  disabled,
  emptyLabel,
  invalid,
  describedBy,
  onChange,
}: {
  id: string
  value: string
  options: readonly string[]
  placeholder: string
  disabled?: boolean
  emptyLabel: string
  invalid?: boolean
  describedBy?: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(
              controlClass,
              "w-full min-h-11 justify-between font-normal",
              !value && "text-muted-foreground"
            )}
          />
        }
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--anchor-width) p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  <span className="truncate">{option}</span>
                  <Check
                    className={cn("ml-auto size-4", option === value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
