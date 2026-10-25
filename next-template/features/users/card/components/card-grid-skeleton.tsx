import { DensityBoard } from "@/components/layout/density-board"
import { Skeleton } from "@/components/ui/skeleton"
import { CARD_CELL_CLASS, GRID_CLASS } from "./user-cards-virtualized"
import { UserCardSkeleton } from "./user-card-skeleton"

/** users/card route.tsx için: gerçek sayfanın başlık/araç çubuğu + kart ızgarası yerleşimine yakın iskelet. */
export function UserCardGridSkeleton() {
  return (
    <DensityBoard>
      <header
        data-density-toolbar=""
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <Skeleton className="h-8 w-40" />
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </header>

      <Skeleton className="h-16 w-full rounded-[8px]" />

      <div data-skeleton-grid="" className={GRID_CLASS} aria-hidden>
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className={CARD_CELL_CLASS}>
            <UserCardSkeleton />
          </div>
        ))}
      </div>
    </DensityBoard>
  )
}
