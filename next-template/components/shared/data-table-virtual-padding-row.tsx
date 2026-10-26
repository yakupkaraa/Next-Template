import { TableCell, TableRow } from "@/components/ui/table"

export function DataTableVirtualPaddingRow({
  height,
  colSpan,
}: {
  height: number
  colSpan: number
}) {
  if (height <= 0) return null
  return (
    <TableRow aria-hidden className="pointer-events-none border-0 hover:bg-transparent">
      <TableCell colSpan={colSpan} className="p-0" style={{ height }} />
    </TableRow>
  )
}
