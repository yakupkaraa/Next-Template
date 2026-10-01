"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FormSelectField({
  id,
  value,
  placeholder,
  options,
  onValueChange,
}: {
  id: string
  value: string
  placeholder: string
  options: readonly string[]
  onValueChange: (value: string) => void
}) {
  return (
    <Select
      value={value === "" ? null : value}
      onValueChange={(next) => onValueChange(next ?? "")}
    >
      <SelectTrigger id={id} size="sm" className="w-full min-w-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="start" sideOffset={4}>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
