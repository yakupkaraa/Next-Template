import { CloudSun, Moon, Sun, Sunset } from "lucide-react"

export function GreetingIcon({ hour }: { hour: number }) {
  const className = "size-5 text-white/90 dark:text-card-foreground"
  if (hour >= 5 && hour < 12) return <Sun className={className} aria-hidden />
  if (hour >= 12 && hour < 17) return <CloudSun className={className} aria-hidden />
  if (hour >= 17 && hour < 22) return <Sunset className={className} aria-hidden />
  return <Moon className={className} aria-hidden />
}
