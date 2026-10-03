import { DensityBoard } from "@/components/layout/density-board"
import { Skeleton } from "@/components/ui/skeleton"

export function InsightsRouteFallback() {
  return (
    <DensityBoard data-skeleton-layout="">
      <div data-skeleton-grid="" className="grid gap-3 lg:grid-cols-12">
        <Skeleton className="h-52 rounded-xl lg:col-span-5" />
        <Skeleton className="h-52 rounded-xl lg:col-span-4" />
        <Skeleton className="h-52 rounded-xl lg:col-span-3" />
      </div>
      <div data-skeleton-grid="" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <div data-skeleton-grid="" className="grid gap-3 lg:grid-cols-12">
        <Skeleton className="h-72 rounded-xl lg:col-span-3" />
        <Skeleton className="h-72 rounded-xl lg:col-span-6" />
        <Skeleton className="h-72 rounded-xl lg:col-span-3" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
      <div data-skeleton-grid="" className="grid gap-3 lg:grid-cols-12">
        <Skeleton className="h-56 rounded-xl lg:col-span-4" />
        <Skeleton className="h-56 rounded-xl lg:col-span-4" />
        <Skeleton className="h-56 rounded-xl lg:col-span-4" />
      </div>
    </DensityBoard>
  )
}
