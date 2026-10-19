import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CARD_FRAME_CLASS } from "./user-card"

export function UserCardSkeleton() {
  return (
    <Card
      className={cn(
        CARD_FRAME_CLASS,
        "gap-0 overflow-hidden rounded-2xl border-0 bg-primary/10 py-0 shadow-none ring-1 ring-primary/15"
      )}
    >
      <CardContent className="flex flex-col gap-3 px-4 pt-4 pb-3">
        <div className="flex w-full justify-between">
          <Skeleton className="size-5 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
        </div>
        <div className="flex flex-col items-center text-center">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="mt-3 h-3.75 w-28" />
          <Skeleton className="mt-0.5 h-3 w-24" />
          <Skeleton className="mt-2 h-5 w-16 rounded-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
      </CardContent>
    </Card>
  )
}
