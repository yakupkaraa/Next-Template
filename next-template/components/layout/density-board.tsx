import type { ComponentProps } from "react"
import { cn } from "cn"

/** DensityBoard `py-6` — sticky chrome `--density-pad-y` ile aynı */
export const densityStickyBleedX =
  "mx-[calc(-1*var(--sticky-bleed-x))] px-[var(--sticky-bleed-x)]"
export const densityStickyBleedTop =
  "-mt-[var(--density-pad-y)] pt-[var(--density-pad-y)]"
export const densityStickyBleedBottom =
  "-mb-[var(--density-pad-y)] py-[var(--density-pad-y)]"

/**
 * Yeni ekranı yoğun yerleşime bağlar.
 * Ayarlar > Yoğun açıkken kabuk boşluğu, %90 genişlik ve kart kenarları otomatik uygulanır.
 *
 * @example
 * import { DensityBoard } from "@/components/layout/density-board"
 *
 * export function OrdersScreen() {
 *   return (
 *     <DensityBoard>
 *       <Card>...</Card>
 *     </DensityBoard>
 *   )
 * }
 */
export function DensityBoard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-density-board=""
      className={cn("flex w-full shrink-0 flex-col gap-4 py-6", className)}
      {...props}
    />
  )
}
