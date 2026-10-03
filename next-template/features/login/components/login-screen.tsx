import { BrandPanel } from "@/features/login/components/brand-panel"
import { LoginChrome } from "@/features/login/components/login-chrome"
import { LoginForm } from "@/features/login/components/login-form"
import { resolveContentLocale } from "@/lib/i18n"
import { isLocale, type Locale } from "@/lib/locales"

export function LoginScreen({ routeLocale }: { routeLocale: string }) {
  const locale: Locale = isLocale(routeLocale) ? routeLocale : "tr"
  const contentLocale = resolveContentLocale(locale)

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background lg:h-dvh lg:overflow-hidden">
      <div className="lg:grid lg:h-full lg:min-h-0 lg:grid-cols-[55fr_45fr]">
        <div className="lg:flex lg:h-full lg:min-h-0 lg:p-4">
          <BrandPanel locale={contentLocale} routeLocale={locale} />
        </div>
        <section className="relative flex flex-col justify-center bg-background px-6 py-10 lg:min-h-0 lg:overflow-y-auto lg:px-10">
          <div className="absolute top-4 right-4 hidden lg:block">
            <LoginChrome locale={locale} variant="desktop" />
          </div>
          <div className="mx-auto w-full max-w-sm">
            <LoginForm locale={locale} />
          </div>
        </section>
      </div>
    </div>
  )
}
