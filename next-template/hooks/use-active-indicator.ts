"use client"

import { useLayoutEffect, useRef, useState } from "react"

type IndicatorStyle = {
  transform: string
  width: number
  height: number
  opacity: number
}

const hidden: IndicatorStyle = { transform: "translate(0px, 0px)", width: 0, height: 0, opacity: 0 }

/**
 * Tracks the element marked `data-nav-active="true"` inside the returned container
 * and reports its position so a shared highlight can slide to it instead of
 * popping in/out on every navigation.
 */
export function useActiveIndicator<T extends HTMLElement>(deps: readonly unknown[]) {
  const containerRef = useRef<T>(null)
  const [style, setStyle] = useState<IndicatorStyle>(hidden)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    function measure() {
      const active = container?.querySelector<HTMLElement>("[data-nav-active='true']")
      if (!container || !active) {
        setStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }))
        return
      }
      const containerBox = container.getBoundingClientRect()
      const activeBox = active.getBoundingClientRect()
      setStyle({
        transform: `translate(${activeBox.left - containerBox.left}px, ${activeBox.top - containerBox.top}px)`,
        width: activeBox.width,
        height: activeBox.height,
        opacity: 1,
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { containerRef, style }
}
