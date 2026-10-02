"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { cn } from "cn"
import {
  densityStickyBleedX,
} from "@/components/layout/density-board"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export type StepTone = "done" | "current" | "upcoming"

export function StickyStepperHeader({
  title,
  onCancel,
  cancelLabel,
  steps,
  active,
  onStepClick,
  stepTone,
}: {
  title?: string
  onCancel?: () => void
  cancelLabel?: string
  steps: readonly { title: string }[]
  active: number
  onStepClick: (index: number) => void
  stepTone: (index: number) => StepTone
}) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  const progress = steps.length ? ((active + 1) / steps.length) * 100 : 0

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const root = sentinel.closest("[data-page-scroll]")
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting)
      },
      { root: root instanceof Element ? root : null, threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none h-px w-full shrink-0 -mb-[var(--density-gap)]"
      />
      <div
        data-density-toolbar=""
        className={cn(
          "relative sticky top-0 z-30 border-b bg-card transition-shadow duration-200",
          densityStickyBleedX,
          "-mt-[var(--density-pad-y)]",
          stuck && "shadow-[0_10px_20px_-14px_rgb(0_0_0/0.25)]"
        )}
      >
        {title || (onCancel && cancelLabel) ? (
          <header className="flex items-center">
            {title ? (
              <h1 className="min-w-0 text-lg font-bold tracking-tight">{title}</h1>
            ) : null}
            {onCancel && cancelLabel ? (
              <Button type="button" variant="ghost" className="ml-auto" onClick={onCancel}>
                {cancelLabel}
              </Button>
            ) : null}
          </header>
        ) : null}

        <nav
          aria-label="Steps"
          className={cn("flex items-center overflow-x-auto py-2", title && "pt-1.5")}
        >
          {steps.map((step, index) => {
            const tone = stepTone(index)
            return (
              <div
                key={`${step.title}-${index}`}
                className="flex min-w-0 flex-1 items-center last:flex-none"
              >
                <Button
                  type="button"
                  variant="ghost"
                  aria-current={tone === "current" ? "step" : undefined}
                  onClick={() => onStepClick(index)}
                  className={cn(
                    "h-auto min-w-0 shrink-0 justify-start gap-1.5 rounded-lg px-1 py-0.5",
                    tone === "upcoming" && "opacity-60 hover:opacity-100"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                      tone === "done" && "bg-primary text-primary-foreground",
                      tone === "current" && "border-2 border-primary bg-primary/10 text-primary",
                      tone === "upcoming" && "border border-border bg-card text-muted-foreground"
                    )}
                  >
                    {tone === "done" ? <Check className="size-3" /> : index + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden truncate text-xs font-semibold md:block",
                      tone === "current" ? "text-primary" : "text-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </Button>
                {index < steps.length - 1 ? (
                  <Separator className="mx-2 h-px min-w-4 flex-1" />
                ) : null}
              </div>
            )
          })}
        </nav>

        <Progress value={progress} className="absolute inset-x-0 bottom-0 h-0.5 rounded-none bg-transparent" />
      </div>
    </>
  )
}
