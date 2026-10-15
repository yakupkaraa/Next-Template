import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Person({
  name,
  src,
  className,
}: {
  name: string
  src: string
  className?: string
}) {
  return (
    <Avatar className={className}>
      <AvatarImage alt={name} src={src} />
      <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  )
}
