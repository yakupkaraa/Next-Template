import type { ReactNode } from "react"

export function AccountSummaryList({
  items,
}: {
  items: { key: string; label: string; value: ReactNode }[]
}) {
  return (
    <dl className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <div key={item.key} className="min-w-0">
          <dt className="text-xs text-muted-foreground">{item.label}</dt>
          <dd className="truncate text-sm font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
