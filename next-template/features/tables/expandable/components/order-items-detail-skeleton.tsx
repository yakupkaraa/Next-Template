import { Skeleton } from "@/components/ui/skeleton"

export function OrderItemsDetailSkeleton() {
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="ml-auto h-6 w-40" />
    </div>
  )
}
