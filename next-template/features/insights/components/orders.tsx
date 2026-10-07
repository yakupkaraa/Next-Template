import { Box, CreditCard } from "lucide-react"
import { StatusBadge, type StatusBadgeTone } from "@/components/shared/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { insightCopy, insightRecentOrders, insightStatusLabels, type OrderStatus } from "../data"
import type { InsightsSectionProps } from "../utils/section-props"

const statusTone: Record<OrderStatus, StatusBadgeTone> = {
  pending: "warning",
  shipped: "neutral",
  delivered: "success",
}

export function InsightsOrders({ locale }: InsightsSectionProps) {
  const text = insightCopy[locale]

  return (
    <Card className="shrink-0 overflow-visible rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{text.recentOrders}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">{text.totalSales}</TableHead>
              <TableHead>{text.customer}</TableHead>
              <TableHead>{text.quantity}</TableHead>
              <TableHead>{text.status}</TableHead>
              <TableHead>{text.payment}</TableHead>
              <TableHead className="pr-6 text-right">{text.price}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insightRecentOrders.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="pl-6">
                  <div className="flex min-w-[12rem] items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary ring-1 ring-border">
                      <Box className="size-4" aria-hidden />
                    </span>
                    <span className="font-medium">{row.product}</span>
                  </div>
                </TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell>
                  <StatusBadge tone={statusTone[row.status]}>
                    {insightStatusLabels[row.status][locale]}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <CreditCard className="size-3.5" />
                    {row.payment}
                  </span>
                </TableCell>
                <TableCell className="pr-6 text-right font-medium">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
