const TRANSITION_DURATION_MS = 650

export type ThemeTransitionOrigin = {
  x: number
  y: number
}

export function originFromElement(
  element: Element | null | undefined
): ThemeTransitionOrigin | null {
  if (!element) return null
  const rect = element.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

function resolveOrigin(origin: ThemeTransitionOrigin | null | undefined): ThemeTransitionOrigin {
  if (origin) return origin
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
}

function maxRadius(origin: ThemeTransitionOrigin): number {
  const { innerWidth, innerHeight } = window
  const corners = [
    { x: 0, y: 0 },
    { x: innerWidth, y: 0 },
    { x: 0, y: innerHeight },
    { x: innerWidth, y: innerHeight },
  ]
  return Math.max(...corners.map((corner) => Math.hypot(corner.x - origin.x, corner.y - origin.y)))
}

/**
 * Runs `apply` (the synchronous DOM theme mutation) inside a View Transition
 * so the new theme reveals through an expanding circle from `origin`.
 * Falls back to a plain `apply()` call when the browser doesn't support
 * View Transitions or the user prefers reduced motion.
 */
export function runThemeTransition(
  origin: ThemeTransitionOrigin | null | undefined,
  apply: () => void
) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReducedMotion || !("startViewTransition" in document)) {
    apply()
    return
  }

  const resolvedOrigin = resolveOrigin(origin)
  const radius = maxRadius(resolvedOrigin)
  const transition = document.startViewTransition(apply)

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${resolvedOrigin.x}px ${resolvedOrigin.y}px)`,
            `circle(${radius}px at ${resolvedOrigin.x}px ${resolvedOrigin.y}px)`,
          ],
        },
        {
          duration: TRANSITION_DURATION_MS,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
    .catch(() => {})
}
