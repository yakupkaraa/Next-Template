import { DensityBoard } from "@/components/layout/density-board"
import { Skeleton } from "@/components/ui/skeleton"

export function RouteLoading() {
  return (
    <DensityBoard>
      <Skeleton className="h-10 w-48 rounded-lg" />
      <div className="grid gap-3 lg:grid-cols-12">
        <Skeleton className="h-36 rounded-xl lg:col-span-8" />
        <Skeleton className="h-36 rounded-xl lg:col-span-4" />
      </div>
      <Skeleton className="min-h-64 flex-1 rounded-xl" />
    </DensityBoard>
  )
}
