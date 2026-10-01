import { cn } from "cn"
import { Skeleton } from "@/components/ui/skeleton"

export function ChartBlockSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("w-full min-h-16 rounded-md", className)} />
}
