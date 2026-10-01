import { cn } from "cn"
import type { Locale } from "@/lib/locales"

function TurkishFlag() {
  return (
    <svg viewBox="0 0 16 12" className="size-full" aria-hidden>
      <rect width="16" height="12" rx="1" fill="#E30A17" />
      <circle cx="6.4" cy="6" r="2.7" fill="#fff" />
      <circle cx="7.15" cy="6" r="2.15" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="9.15,6 10.7,6.48 9.7,5.15 9.7,6.85 10.7,5.52"
      />
    </svg>
  )
}

function BritishFlag() {
  return (
    <svg viewBox="0 0 16 12" className="size-full" aria-hidden>
      <rect width="16" height="12" rx="1" fill="#012169" />
      <path d="M0 0 L16 12 M16 0 L0 12" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0 L16 12 M16 0 L0 12" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M8 0 V12 M0 6 H16" stroke="#fff" strokeWidth="3.2" />
      <path d="M8 0 V12 M0 6 H16" stroke="#C8102E" strokeWidth="1.8" />
    </svg>
  )
}

function GermanFlag() {
  return (
    <svg viewBox="0 0 16 12" className="size-full" aria-hidden>
      <rect width="16" height="12" rx="1" fill="#FFCE00" />
      <rect width="16" height="8" fill="#DD0000" />
      <rect width="16" height="4" fill="#000" />
    </svg>
  )
}

function FrenchFlag() {
  return (
    <svg viewBox="0 0 16 12" className="size-full" aria-hidden>
      <rect width="16" height="12" rx="1" fill="#EF4135" />
      <rect width="10.6" height="12" fill="#fff" />
      <rect width="5.3" height="12" fill="#0055A4" />
    </svg>
  )
}

function DutchFlag() {
  return (
    <svg viewBox="0 0 16 12" className="size-full" aria-hidden>
      <rect width="16" height="12" rx="1" fill="#21468B" />
      <rect width="16" height="8" fill="#fff" />
      <rect width="16" height="4" fill="#AE1C28" />
    </svg>
  )
}

function ItalianFlag() {
  return (
    <svg viewBox="0 0 16 12" className="size-full" aria-hidden>
      <rect width="16" height="12" rx="1" fill="#CE2B37" />
      <rect width="10.6" height="12" fill="#fff" />
      <rect width="5.3" height="12" fill="#009246" />
    </svg>
  )
}

const flags = {
  tr: TurkishFlag,
  en: BritishFlag,
  de: GermanFlag,
  fr: FrenchFlag,
  it: ItalianFlag,
}

const countryFlags: Record<string, typeof TurkishFlag> = {
  Türkiye: TurkishFlag,
  Almanya: GermanFlag,
  Hollanda: DutchFlag,
  İngiltere: BritishFlag,
}

export function LocaleFlag({ code, className }: { code: Locale; className?: string }) {
  const Flag = flags[code]
  return (
    <span className={cn("inline-flex size-4", className)}>
      <Flag />
    </span>
  )
}

export function CountryFlag({ country, className }: { country: string; className?: string }) {
  const Flag = countryFlags[country]
  if (!Flag) return null

  return (
    <span className={cn("inline-flex size-4 shrink-0 overflow-hidden rounded-sm", className)}>
      <Flag />
    </span>
  )
}
