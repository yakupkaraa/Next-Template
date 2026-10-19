export type ToneSurface = "primary" | "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"

export const toneSurfaceClass: Record<ToneSurface, string> = {
  primary: "bg-primary/10 text-primary",
  "chart-1": "bg-[color-mix(in_oklch,var(--chart-1)_16%,var(--card))] text-primary",
  "chart-2": "bg-[color-mix(in_oklch,var(--chart-2)_18%,var(--card))] text-primary",
  "chart-3": "bg-[color-mix(in_oklch,var(--chart-3)_18%,var(--card))] text-primary",
  "chart-4": "bg-[color-mix(in_oklch,var(--chart-4)_16%,var(--card))] text-primary",
  "chart-5": "bg-[color-mix(in_oklch,var(--chart-5)_16%,var(--card))] text-primary",
}
