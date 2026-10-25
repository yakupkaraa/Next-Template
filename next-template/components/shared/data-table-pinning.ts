import type { CSSProperties } from "react"

export function pinningStyle(column: {
  getIsPinned: () => false | "start" | "end"
  getStart: (position?: false | "start" | "end" | "center") => number
  getAfter: (position?: false | "start" | "end" | "center") => number
}): CSSProperties {
  const pinned = column.getIsPinned()
  if (!pinned) return {}

  return {
    position: "sticky",
    left: pinned === "start" ? `${column.getStart("start")}px` : undefined,
    right: pinned === "end" ? `${column.getAfter("end")}px` : undefined,
  }
}

export function pinningClass(pinned: false | "start" | "end") {
  if (pinned === "end") {
    return "sticky right-0 z-20 bg-card shadow-[-8px_0_12px_-8px_hsl(0_0%_0%/0.18)]"
  }
  if (pinned === "start") {
    return "sticky left-0 z-20 bg-card group-hover:bg-primary/10 group-data-[state=selected]:bg-primary/10 shadow-[8px_0_12px_-8px_hsl(0_0%_0%/0.18)]"
  }
  return "bg-transparent group-hover:bg-primary/10 group-data-[state=selected]:bg-primary/10"
}
