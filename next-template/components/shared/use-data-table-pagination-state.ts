"use client"

import { useState } from "react"
import type { PaginationState } from "@tanstack/react-table"

/**
 * Sayfalama kapalıyken `pageSize: Infinity` ile tüm satırları tek "sayfada" tutar.
 * `pageSize` prop'u değiştiğinde (açık/kapalı geçişi) render sırasında senkron
 * resetlenir — bkz. https://react.dev/learn/you-might-not-need-an-effect.
 *
 * Önceki prop değeri ayrı bir state'te tutulur; `state.pageSize` ile
 * karşılaştırılmaz, çünkü sayfa boyutu seçicisi de aynı state'i `setState`
 * ile değiştirir — prop sabit kalsa bile kullanıcının seçimi her render'da
 * `pageSize` varsayılanına geri sıfırlanırdı.
 */
export function useDataTablePaginationState(pageSize: number) {
  const [state, setState] = useState<PaginationState>({ pageIndex: 0, pageSize })
  const [previousPageSizeProp, setPreviousPageSizeProp] = useState(pageSize)

  if (previousPageSizeProp !== pageSize) {
    setPreviousPageSizeProp(pageSize)
    setState({ pageIndex: 0, pageSize })
  }

  return [state, setState] as const
}
