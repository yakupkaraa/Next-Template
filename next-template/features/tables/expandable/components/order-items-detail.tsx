import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { formatOrderAmount, orderItemsSubtotal } from "@/features/tables/utils/orders"
import type { OrderRow } from "@/features/tables/types/order"

export function OrderItemsDetail({ order, locale }: { order: OrderRow; locale: ContentLocale }) {
  const copy = getDictionary(locale).tables.expandable.detail
  const subtotal = orderItemsSubtotal(order)

  return (
    <div className="px-4 py-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{copy.itemName}</TableHead>
            <TableHead className="text-right">{copy.quantity}</TableHead>
            <TableHead className="text-right">{copy.unitPrice}</TableHead>
            <TableHead className="text-right">{copy.lineTotal}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.items.map((item, index) => (
            <TableRow key={`${order.id}-${index}`}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right tabular-nums">{item.quantity}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatOrderAmount(item.unitPrice, locale)}
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {formatOrderAmount(item.quantity * item.unitPrice, locale)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col items-end gap-1 px-2 py-3 text-sm">
        <div className="flex gap-3 text-muted-foreground">
          <span>{copy.subtotal}</span>
          <span className="tabular-nums">{formatOrderAmount(subtotal, locale)}</span>
        </div>
        <div className="flex gap-3 font-semibold">
          <span>{copy.total}</span>
          <span className="tabular-nums">{formatOrderAmount(order.total, locale)}</span>
        </div>
      </div>
    </div>
  )
}
