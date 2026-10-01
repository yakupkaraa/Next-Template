import { LayoutDashboard } from "lucide-react"
import type { ReactNode } from "react"
import { headerBrand } from "@/components/layout/header/copy"

export function LoginShell({ children }: { children: ReactNode }) {
  return (
    <main className="grid h-full min-h-0 w-full lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-foreground text-background lg:flex lg:flex-col lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0, transparent 42%), radial-gradient(circle at 80% 70%, white 0, transparent 36%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-background text-foreground">
            <LayoutDashboard className="size-5" />
          </span>
          <p className="text-lg font-semibold tracking-tight">{headerBrand}</p>
        </div>
      </section>
      <section className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
              <LayoutDashboard className="size-5" />
            </span>
            <p className="text-lg font-semibold tracking-tight">{headerBrand}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  )
}
