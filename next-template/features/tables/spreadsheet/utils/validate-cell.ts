export type OrderCellErrorCopy = {
  customerRequired: string
  totalInvalid: string
  dateInvalid: string
}

export function validateOrderCell(
  columnId: string,
  value: string,
  copy: OrderCellErrorCopy
): string | undefined {
  if (columnId === "customer" && !value.trim()) return copy.customerRequired

  if (columnId === "total") {
    const amount = Number(value)
    if (!value.trim() || !Number.isFinite(amount) || amount < 0) return copy.totalInvalid
  }

  if (columnId === "date") {
    if (!value.trim() || Number.isNaN(new Date(value).getTime())) return copy.dateInvalid
  }

  return undefined
}
