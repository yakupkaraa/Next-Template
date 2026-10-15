import type { DensityMode } from "@/lib/theme/storage"

/** features/users/card grid'inde kart satırı yüksekliği (px). Virtualizer bu sabiti kullanır. */
export const CARD_ROW_PX = 336

const CARD_GRID_GAP: Record<DensityMode, number> = {
  comfortable: 16,
  compact: 0,
}

export function getCardGridGap(density: DensityMode): number {
  return CARD_GRID_GAP[density]
}
