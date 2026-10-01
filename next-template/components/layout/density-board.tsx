import type { ComponentProps } from "react"
import { cn } from "cn"

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
      className={cn("flex w-full shrink-0 flex-col gap-4", className)}
      {...props}
    />
  )
}
