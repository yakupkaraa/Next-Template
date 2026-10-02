import { ArrowRight, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge, type StatusBadgeTone } from "@/components/ui/status-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getDictionary, type ContentLocale } from "@/lib/i18n"
import { userBillingFigures } from "./data"

const billingStatusTone: Record<"pending" | "paid" | "cancelled", StatusBadgeTone> = {
  pending: "warning",
  paid: "success",
  cancelled: "neutral",
}

export function BillingPanel({ locale }: { locale: ContentLocale }) {
  const billing = getDictionary(locale).users.create.billing

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        {billing.summaries.map((item, index) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-2xl font-semibold">{userBillingFigures.summaries[index]}</p>
              <Button type="button" variant="link" className="h-auto w-fit px-0">
                {item.action}
                <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="gap-0 py-0">
        <CardHeader className="items-center border-b py-3">
          <CardTitle>{billing.methodsTitle}</CardTitle>
          <CardAction>
            <Button type="button" size="sm">
              {billing.addMethod}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="px-0">
          {userBillingFigures.methods.map((method) => (
            <div
              key={method.detail}
              className="flex items-center justify-between gap-3 border-b px-4 py-3 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-muted">
                  <CreditCard className="size-4" />
                </span>
                <div>
                  <p className="font-medium">{method.brand}</p>
                  <p className="text-muted-foreground">{method.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.isDefault ? (
                  <StatusBadge tone="neutral">{billing.defaultBadge}</StatusBadge>
                ) : (
                  <Button type="button" variant="link" className="h-auto px-0">
                    {billing.makeDefault}
                  </Button>
                )}
                <span className="text-muted-foreground">|</span>
                <Button type="button" variant="link" className="h-auto px-0">
                  {billing.edit}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-3">
          <CardTitle>{billing.historyTitle}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                {billing.columns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBillingFigures.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <StatusBadge tone={billingStatusTone[row.status]}>
                      {billing.statusLabel[row.status]}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
