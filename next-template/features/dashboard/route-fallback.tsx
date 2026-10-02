import { DensityBoard } from "@/components/layout/density-board"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardRouteFallback() {
  return (
    <DensityBoard>
      <div data-skeleton-grid="" className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-28 rounded-xl lg:col-span-8" />
        <Skeleton className="h-28 rounded-xl lg:col-span-4" />
      </div>
      <div data-skeleton-grid="" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-xl" />
        ))}
      </div>
      <div data-skeleton-grid="" className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-72 rounded-xl lg:col-span-8" />
        <div data-skeleton-grid="" className="grid gap-4 lg:col-span-4">
          <Skeleton className="h-36 rounded-xl" />
          <Skeleton className="h-36 rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-80 w-full rounded-xl" />
    </DensityBoard>
  )
}
