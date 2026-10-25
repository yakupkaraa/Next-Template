"use client"

import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { orderStatusOptions, paymentMethodOptions } from "@/features/tables/constants/orders"
import { emptyOrderFormValues, orderFormValuesFromRow, validateOrderForm } from "@/features/tables/crud/utils/order-form"
import type { OrderFormErrorCopy, OrderFormValues } from "@/features/tables/crud/types/order-form"
import type { OrderRow, OrderStatus, PaymentMethod } from "@/features/tables/types/order"

export const orderFormId = "order-form"

export function OrderForm({
  order,
  copy,
  errorCopy,
  onValid,
}: {
  order: OrderRow | null
  copy: { customer: string; date: string; status: string; paymentMethod: string; total: string }
  errorCopy: OrderFormErrorCopy
  onValid: (values: OrderFormValues) => void
}) {
  const [values, setValues] = useState<OrderFormValues>(() =>
    order ? orderFormValuesFromRow(order) : emptyOrderFormValues()
  )
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormValues, string>>>({})

  function setField<K extends keyof OrderFormValues>(key: K, value: OrderFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validateOrderForm(values, errorCopy)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onValid(values)
  }

  return (
    <form id={orderFormId} className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-customer">
          {copy.customer}
          <span className="text-destructive"> *</span>
        </Label>
        <Input
          id="order-customer"
          value={values.customer}
          aria-invalid={Boolean(errors.customer) || undefined}
          aria-describedby={errors.customer ? "order-customer-error" : undefined}
          onChange={(event) => setField("customer", event.target.value)}
        />
        {errors.customer ? (
          <p id="order-customer-error" className="text-sm text-destructive" role="alert">
            {errors.customer}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="order-date">
            {copy.date}
            <span className="text-destructive"> *</span>
          </Label>
          <Input
            id="order-date"
            type="date"
            value={values.date}
            aria-invalid={Boolean(errors.date) || undefined}
            aria-describedby={errors.date ? "order-date-error" : undefined}
            onChange={(event) => setField("date", event.target.value)}
          />
          {errors.date ? (
            <p id="order-date-error" className="text-sm text-destructive" role="alert">
              {errors.date}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="order-total">
            {copy.total}
            <span className="text-destructive"> *</span>
          </Label>
          <Input
            id="order-total"
            type="number"
            inputMode="decimal"
            min={0}
            value={values.total}
            aria-invalid={Boolean(errors.total) || undefined}
            aria-describedby={errors.total ? "order-total-error" : undefined}
            onChange={(event) => setField("total", event.target.value)}
          />
          {errors.total ? (
            <p id="order-total-error" className="text-sm text-destructive" role="alert">
              {errors.total}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="order-status">{copy.status}</Label>
          <Select<OrderStatus>
            value={values.status}
            onValueChange={(next) => next && setField("status", next)}
          >
            <SelectTrigger id="order-status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              {orderStatusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="order-payment-method">{copy.paymentMethod}</Label>
          <Select<PaymentMethod>
            value={values.paymentMethod}
            onValueChange={(next) => next && setField("paymentMethod", next)}
          >
            <SelectTrigger id="order-payment-method" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              {paymentMethodOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  )
}
