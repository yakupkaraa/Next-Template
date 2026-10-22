import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("size-5", className)}>
      <g style={{ transform: "skewX(-8deg)", transformOrigin: "12px 12px" }}>
        <path d="M6.5 19V5" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <path d="M17.5 19V5" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <path d="M7 5.5L17 18.5" stroke="currentColor" strokeWidth="4.25" strokeLinecap="square" />
      </g>
    </svg>
  )
}
