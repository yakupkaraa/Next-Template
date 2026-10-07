import { BarChart3, Languages, LayoutGrid, ShieldCheck } from "lucide-react"
import { LoginChrome } from "@/features/auth/components/login-chrome"
import { getLoginCopy } from "@/features/auth/constants/copy"
import { headerBrand } from "@/components/layout/header/copy"
import type { ContentLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/locales"
import { cn } from "cn"

const featureIcons = [BarChart3, ShieldCheck, Languages] as const

export function BrandPanel({
  locale,
  routeLocale,
}: {
  locale: ContentLocale
  routeLocale: Locale
}) {
  const text = getLoginCopy(locale)
  const appName = headerBrand

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-brand-deep text-primary-foreground",
        "rounded-b-[28px] px-6 py-6",
        "lg:flex lg:h-full lg:min-h-0 lg:flex-1 lg:flex-col lg:rounded-[28px] lg:px-6 lg:py-6",
        "xl:px-8 xl:py-8"
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg className="absolute inset-0 size-full text-primary-foreground opacity-10">
          <defs>
            <pattern id="login-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-dot-grid)" />
        </svg>
        <div className="absolute -top-16 -right-8 size-[240px] rounded-full bg-primary/35" />
        <div className="absolute -right-20 -bottom-32 size-[560px] rounded-full bg-brand-deep-2" />
        <div className="absolute top-36 left-[42%] size-12 rounded-full border-[6px] border-warning lg:left-[48%]" />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-col gap-4 lg:gap-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-foreground text-primary">
              <LayoutGrid className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold">{appName}</p>
              <p className="text-[11px] font-semibold tracking-[0.08em] text-primary-foreground/70 uppercase">
                {text.panelKicker}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-primary-foreground/10 px-2.5 py-1 text-xs font-medium text-primary-foreground lg:inline">
              {text.version}
            </span>
            <div className="lg:hidden">
              <LoginChrome locale={routeLocale} variant="mobile" />
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <h1 className="text-[1.75rem] leading-tight font-extrabold tracking-tight lg:text-4xl lg:leading-[1.08] xl:text-5xl 2xl:text-[56px] 2xl:leading-[1.05]">
            <span className="lg:hidden">{text.headlineMobile}</span>
            <span className="hidden lg:inline">
              {text.headlineLead}{" "}
              <span className="text-brand-deep-accent">{text.headlineAccent}</span>
            </span>
          </h1>
          <p className="mt-3 hidden text-base text-primary-foreground/80 lg:block xl:mt-4 xl:text-lg">
            {text.panelBody}
          </p>
          <ul className="mt-4 hidden flex-col gap-2.5 lg:flex xl:mt-6 xl:gap-3">
            {text.features.map((feature, index) => {
              const Icon = featureIcons[index]
              return (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15">
                    <Icon className="size-4" />
                  </span>
                  <span className="font-medium">{feature}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
