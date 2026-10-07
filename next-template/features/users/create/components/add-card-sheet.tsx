"use client"

import { useMemo, useState } from "react"
import { CreditCard, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { runAction } from "@/components/toast/run-action"
import { mockRequest } from "@/lib/mock-request"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { cn } from "cn"

export type SavedCard = {
  brand: string
  detail: string
  isDefault: boolean
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

function formatCardNumber(value: string) {
  return digitsOnly(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ")
}

function formatExpiry(value: string) {
  const digits = digitsOnly(value).slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`
}

function detectBrand(digits: string) {
  if (digits.startsWith("9792")) return "Troy"
  if (digits.startsWith("4")) return "Visa"
  if (digits.startsWith("5") || digits.startsWith("2")) return "Mastercard"
  return ""
}

function maskNumber(digits: string) {
  const groups = digits.padEnd(16, "•").match(/.{1,4}/g) ?? ["••••", "••••", "••••", "••••"]
  return groups.join(" ")
}

export function AddCardSheet({
  locale,
  open,
  onOpenChange,
  onSaved,
}: {
  locale: ContentLocale
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved: (card: SavedCard) => void
}) {
  const text = getDictionary(locale).users.create.billing.addCard
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [nickname, setNickname] = useState("")
  const [makeDefault, setMakeDefault] = useState(false)
  const [saveForLater, setSaveForLater] = useState(true)
  const [errors, setErrors] = useState<Partial<Record<"number" | "name" | "expiry" | "cvv", string>>>({})
  const [saving, setSaving] = useState(false)
  const [showBack, setShowBack] = useState(false)

  const digits = digitsOnly(number)
  const brand = detectBrand(digits)
  const previewNumber = maskNumber(digits)
  const previewName = name.trim() || "—"
  const previewExpiry = expiry.trim() || "•• / ••"

  const required = useMemo(
    () => ({
      number: digits.length === 16,
      name: name.trim().length > 1,
      expiry: /^\d{2} \/ \d{2}$/.test(expiry),
      cvv: cvv.length >= 3,
    }),
    [cvv.length, digits.length, expiry, name]
  )

  function reset() {
    setNumber("")
    setName("")
    setExpiry("")
    setCvv("")
    setNickname("")
    setMakeDefault(false)
    setSaveForLater(true)
    setErrors({})
    setShowBack(false)
  }

  async function save() {
    const nextErrors: Partial<Record<"number" | "name" | "expiry" | "cvv", string>> = {}
    if (!required.number) nextErrors.number = text.numberError
    if (!required.name) nextErrors.name = text.nameError
    if (!required.expiry) nextErrors.expiry = text.expiryError
    if (!required.cvv) nextErrors.cvv = text.cvvError
    setErrors(nextErrors)
    if (nextErrors.number || nextErrors.name || nextErrors.expiry || nextErrors.cvv) return
    setSaving(true)
    const ok = await runAction({
      pending: text.saving,
      success: text.saved,
      error: text.saveFailed,
      run: () => mockRequest(() => undefined),
    })
    setSaving(false)
    if (!ok) return
    onSaved({
      brand: brand || nickname.trim() || "Kart",
      detail: `${digits.slice(0, 4)} ${digits.slice(4, 6)}•• •••• ${digits.slice(-4)}`,
      isDefault: makeDefault,
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
    >
      <SheetContent
        side="right"
        className="gap-0 overflow-y-auto p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-4xl"
      >
        <SheetHeader>
          <SheetTitle>{text.title}</SheetTitle>
          <SheetDescription>{text.hint}</SheetDescription>
        </SheetHeader>
        <div className="flex w-full flex-col gap-6 px-4 py-4 sm:px-6">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_17.5rem]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="add-card-number" className="text-sm font-medium">
                  {text.number}
                  <span className="text-destructive"> *</span>
                </Label>
                <div className="relative">
                  <CreditCard className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="add-card-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={number}
                    aria-invalid={Boolean(errors.number) || undefined}
                    className="h-11 pr-16 pl-10"
                    onChange={(event) => setNumber(formatCardNumber(event.target.value))}
                  />
                  {brand ? (
                    <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-semibold tracking-wide text-primary">
                      {brand.toUpperCase()}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground">{text.numberHint}</p>
                {errors.number ? <p className="text-sm text-destructive">{errors.number}</p> : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="add-card-name" className="text-sm font-medium">
                  {text.name}
                  <span className="text-destructive"> *</span>
                </Label>
                <Input
                  id="add-card-name"
                  autoComplete="cc-name"
                  value={name}
                  className="h-11 uppercase"
                  onChange={(event) => setName(event.target.value.toLocaleUpperCase("tr"))}
                />
                <p className="text-xs text-muted-foreground">{text.nameHint}</p>
                {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="add-card-expiry" className="text-sm font-medium">
                    {text.expiry}
                    <span className="text-destructive"> *</span>
                  </Label>
                  <Input
                    id="add-card-expiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="AA / YY"
                    value={expiry}
                    aria-invalid={Boolean(errors.expiry) || undefined}
                    className="h-11"
                    onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                  />
                  {errors.expiry ? <p className="text-sm text-destructive">{errors.expiry}</p> : null}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="add-card-cvv" className="text-sm font-medium">
                    {text.cvv}
                    <span className="text-destructive"> *</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="add-card-cvv"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      value={cvv}
                      maxLength={4}
                      aria-invalid={Boolean(errors.cvv) || undefined}
                      className="h-11 pr-10"
                      onFocus={() => setShowBack(true)}
                      onBlur={() => setShowBack(false)}
                      onChange={(event) => setCvv(digitsOnly(event.target.value).slice(0, 4))}
                    />
                    <Lock className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.cvv ? <p className="text-sm text-destructive">{errors.cvv}</p> : null}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="add-card-nick" className="text-sm font-medium">
                  {text.nickname}
                </Label>
                <Input
                  id="add-card-nick"
                  value={nickname}
                  placeholder={text.nicknamePlaceholder}
                  className="h-11"
                  onChange={(event) => setNickname(event.target.value)}
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-primary/5 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{text.defaultTitle}</p>
                  <p className="text-xs text-muted-foreground">{text.defaultHint}</p>
                </div>
                <Switch
                  checked={makeDefault}
                  onCheckedChange={setMakeDefault}
                  aria-label={text.defaultTitle}
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl bg-primary/5 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{text.saveTitle}</p>
                  <p className="text-xs text-muted-foreground">{text.saveHint}</p>
                </div>
                <Switch
                  checked={saveForLater}
                  onCheckedChange={setSaveForLater}
                  aria-label={text.saveTitle}
                />
              </div>
            </div>

            <aside className="lg:sticky lg:top-2 perspective-distant">
              <div
                className={cn(
                  "relative aspect-[1.58/1] w-full transform-3d transition-transform duration-500",
                  showBack && "rotate-y-180"
                )}
              >
                <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-primary p-5 text-primary-foreground shadow-md backface-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <span className="size-8 rounded-md bg-primary-foreground/25" aria-hidden />
                    <div className="text-right">
                      <p className="text-sm font-semibold">{nickname.trim() || text.previewLabel}</p>
                      <p className="text-[10px] tracking-wider uppercase opacity-80">{text.previewLabel}</p>
                    </div>
                  </div>
                  <p className="font-mono text-lg tracking-[0.18em]">{previewNumber}</p>
                  <div className="flex items-end justify-between gap-3 text-[11px] uppercase tracking-wide">
                    <div>
                      <p className="opacity-70">{text.previewHolder}</p>
                      <p className="truncate font-semibold">{previewName}</p>
                    </div>
                    <div>
                      <p className="opacity-70">{text.previewExpiry}</p>
                      <p className="font-semibold">{previewExpiry}</p>
                    </div>
                    <p className="font-bold tracking-widest">{brand ? brand.toUpperCase() : "••••"}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-primary pt-6 text-primary-foreground shadow-md backface-hidden rotate-y-180">
                  <div className="h-10 bg-foreground" aria-hidden />
                  <div className="mt-6 flex items-center gap-2 px-5">
                    <div className="h-8 flex-1 rounded-sm bg-background" aria-hidden />
                    <div className="flex min-w-12 flex-col items-end">
                      <p className="text-[10px] tracking-wider uppercase opacity-80">{text.previewCvv}</p>
                      <p className="rounded-sm bg-background px-2 py-0.5 font-mono text-sm font-semibold tracking-widest text-foreground">
                        {cvv ? "•".repeat(cvv.length) : "•••"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-auto px-5 pb-4 text-right text-[10px] font-bold tracking-widest opacity-80">
                    {brand ? brand.toUpperCase() : "••••"}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <SheetFooter className="flex-row justify-end gap-2 border-t p-0 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {text.cancel}
            </Button>
            <Button type="button" onClick={() => void save()} disabled={saving}>
              <Lock />
              {text.submit}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
