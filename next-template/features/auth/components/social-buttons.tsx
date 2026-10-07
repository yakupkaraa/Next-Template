"use client"

import { useState } from "react"
import { GoogleMark, MicrosoftMark } from "@/features/auth/components/brand-icons"
import { getLoginCopy } from "@/features/auth/constants/copy"
import { Button } from "@/components/ui/button"
import type { ContentLocale } from "@/lib/i18n"

export function SocialButtons({ locale }: { locale: ContentLocale }) {
  const text = getLoginCopy(locale)
  const [soon, setSoon] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="h-11 min-h-11 w-full"
          onClick={() => setSoon(true)}
        >
          <GoogleMark className="size-4" />
          {text.google}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 min-h-11 w-full"
          onClick={() => setSoon(true)}
        >
          <MicrosoftMark className="size-4" />
          {text.microsoft}
        </Button>
      </div>
      {soon ? (
        <p className="text-center text-xs text-muted-foreground" aria-live="polite">
          {text.soon}
        </p>
      ) : null}
    </div>
  )
}
