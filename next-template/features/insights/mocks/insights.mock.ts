import type { OrderStatus } from "../types/insights"

export const insightTotalSales = {
  amount: "₺98.452,76",
  tooltipMonth: { tr: "Aralık", en: "December" },
  points: [
    { label: "Oca", value: 42 },
    { label: "Şub", value: 48 },
    { label: "Mar", value: 51 },
    { label: "Nis", value: 58 },
    { label: "May", value: 55 },
    { label: "Haz", value: 68 },
    { label: "Tem", value: 64 },
    { label: "Ağu", value: 78 },
    { label: "Eyl", value: 72 },
    { label: "Eki", value: 86 },
    { label: "Kas", value: 82 },
    { label: "Ara", value: 94 },
  ],
}

export const insightMonthly = {
  value: "36.890",
  weekValue: "5.420",
  bars: [42, 58, 48, 72, 65, 80, 96],
}

export const insightKpis = [
  {
    id: "orders",
    value: "1.920",
    tone: "primary",
  },
  {
    id: "shipped",
    value: "1.785",
    tone: "chart-2",
  },
  {
    id: "revenue",
    value: "₺88.900",
    tone: "chart-4",
  },
  {
    id: "rating",
    value: "4,9",
    suffix: "/ 5,0",
    tone: "chart-3",
  },
] as const

export const insightSegments = [
  { key: "a", label: "Kurumsal", value: 1984, color: "var(--chart-1)" },
  { key: "b", label: "KOBİ", value: 923, color: "var(--chart-2)" },
  { key: "c", label: "Bireysel", value: 513, color: "var(--chart-3)" },
]

export const insightSegmentTotal = 3420

export const insightOrderOverview = {
  salesTotal: "₺124.580",
  ordersTotal: "₺38.240",
  months: ["Oca", "Şub", "Mar", "Nis", "May", "Haz"],
  seriesA: [28, 42, 38, 52, 48, 68],
  seriesB: [18, 20, 24, 26, 28, 32],
}

export const insightUserActivity = [
  { day: "Pzt", viewed: 420, checkout: 180 },
  { day: "Sal", viewed: 380, checkout: 160 },
  { day: "Çar", viewed: 510, checkout: 220 },
  { day: "Per", viewed: 460, checkout: 190 },
  { day: "Cum", viewed: 590, checkout: 260 },
  { day: "Cmt", viewed: 640, checkout: 290 },
  { day: "Paz", viewed: 520, checkout: 210 },
]

export const insightActivityTotals = { viewed: "1.420", checkout: "310" }

export const insightRecentOrders = [
  {
    id: "1",
    product: "Lorem ipsum dolor sit",
    customer: "Amet Consectetur",
    qty: "3 Pcs",
    status: "pending" as OrderStatus,
    payment: "Visa",
    price: "$1,240.00",
  },
  {
    id: "2",
    product: "Adipiscing elit sed do",
    customer: "Eiusmod Tempor",
    qty: "1 Pcs",
    status: "shipped" as OrderStatus,
    payment: "PayPal",
    price: "$890.50",
  },
  {
    id: "3",
    product: "Ut labore et dolore magna",
    customer: "Aliqua Ut Enim",
    qty: "2 Pcs",
    status: "delivered" as OrderStatus,
    payment: "Mastercard",
    price: "$2,180.00",
  },
  {
    id: "4",
    product: "Quis nostrud exercitation",
    customer: "Ullamco Laboris",
    qty: "4 Pcs",
    status: "pending" as OrderStatus,
    payment: "Visa",
    price: "$640.00",
  },
  {
    id: "5",
    product: "Nisi ut aliquip ex ea",
    customer: "Commodo Consequat",
    qty: "1 Pcs",
    status: "shipped" as OrderStatus,
    payment: "Apple Pay",
    price: "$420.00",
  },
]
