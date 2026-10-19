import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ALL = "all"

export function FilterSelect({
  id,
  value,
  allLabel,
  options,
  onValueChange,
}: {
  id: string
  value: string
  allLabel: string
  options: readonly string[]
  onValueChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={(next) => onValueChange(next ?? ALL)}>
      <SelectTrigger id={id} className="h-9 min-w-38 rounded-full border-border bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
