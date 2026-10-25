import type { ReactNode } from "react"
import { TableCell, TableRow } from "@/components/ui/table"

export function DataTableDetailRow({
  id,
  colSpan,
  children,
}: {
  id: string
  colSpan: number
  children: ReactNode
}) {
  return (
    <TableRow id={id} className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="bg-muted/30 p-0">
        {children}
      </TableCell>
    </TableRow>
  )
}
