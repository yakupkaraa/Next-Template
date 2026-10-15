"use client"

import { Eye, EyeOff, type Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PasswordField({
  id,
  label,
  requiredLabel,
  value,
  autoComplete,
  icon: Icon,
  revealed,
  showLabel,
  hideLabel,
  onReveal,
  onChange,
}: {
  id: string
  label: string
  requiredLabel: string
  value: string
  autoComplete: string
  icon: typeof Lock
  revealed: boolean
  showLabel: string
  hideLabel: string
  onReveal: () => void
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {label} <span className="text-destructive">*</span>
        <span className="sr-only">({requiredLabel})</span>
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={revealed ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          className="pr-11 pl-10"
          onChange={(event) => onChange(event.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 min-h-8 min-w-8 -translate-y-1/2 text-muted-foreground"
          aria-label={revealed ? hideLabel : showLabel}
          aria-pressed={revealed}
          onClick={onReveal}
        >
          {revealed ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    </div>
  )
}
