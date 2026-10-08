import type { OrderStatus } from "../constants/insights"

export const insightWelcome = {
  progress: 82,
}

export const insightTotalSales = {
  amount: "₺98.452,76",
  delta: 32.8,
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
  delta: 3.6,
  weekValue: "5.420",
  bars: [42, 58, 48, 72, 65, 80, 96],
}

export const insightKpis = [
  {
    id: "orders",
    value: "1.920",
    delta: 6.1,
    direction: "up" as const,
    bar: "bg-primary",
    iconBox: "bg-muted text-primary",
    spark: "M 2 18 L 12 14 L 22 17 L 32 9 L 42 12 L 54 3",
    sparkColor: "var(--chart-1)",
  },
  {
    id: "shipped",
    value: "1.785",
    delta: 4.3,
    direction: "down" as const,
    bar: "bg-chart-2",
    iconBox: "bg-chart-2/15 text-chart-2",
    spark: "M 2 5 L 12 8 L 22 6 L 32 14 L 42 12 L 54 20",
    sparkColor: "var(--chart-2)",
  },
  {
    id: "revenue",
    value: "₺88.900",
    delta: 7.9,
    direction: "up" as const,
    bar: "bg-chart-4",
    iconBox: "bg-chart-4/15 text-chart-4",
    spark: "M 2 16 L 14 15 L 24 10 L 34 12 L 44 6 L 54 4",
    sparkColor: "var(--chart-4)",
  },
  {
    id: "rating",
    value: "4,9",
    suffix: "/ 5,0",
    delta: 2.5,
    direction: "up" as const,
    bar: "bg-chart-3",
    iconBox: "bg-chart-3/15 text-chart-3",
    spark: "M 2 15 L 14 12 L 24 14 L 34 8 L 44 9 L 54 3",
    sparkColor: "var(--chart-3)",
  },
]

export const insightSegments = [
  { key: "a", label: "Kurumsal", value: 1984, delta: 4.2, color: "var(--chart-1)" },
  { key: "b", label: "KOBİ", value: 923, delta: 1.8, color: "var(--chart-2)" },
  { key: "c", label: "Bireysel", value: 513, delta: -0.5, color: "var(--chart-3)" },
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

export const insightLatestProducts = [
  {
    id: "p1",
    name: "Lorem ipsum dolor",
    price: "$128.00",
  },
  {
    id: "p2",
    name: "Sit amet consectetur",
    price: "$96.00",
  },
  {
    id: "p3",
    name: "Adipiscing elit sed",
    price: "$214.00",
  },
]

export const insightAssets = {
  total: "$842,120",
  segments: [
    { label: "Lorem ipsum", amount: "$412,000", share: 49, color: "var(--chart-1)" },
    { label: "Dolor sit", amount: "$268,400", share: 32, color: "var(--chart-2)" },
    { label: "Amet elit", amount: "$161,720", share: 19, color: "var(--chart-4)" },
  ],
}

export const insightPromo = {
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
}
