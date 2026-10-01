import type { ContentLocale } from "@/lib/i18n"

export type InsightLocale = ContentLocale

export const insightCopy = {
  tr: {
    totalSales: "Lorem ipsum dolor",
    storeHint: "Sit amet consectetur",
    monthlySales: "Adipiscing elit sed",
    revenueGrowth: "Do eiusmod tempor",
    lastQuarter: "Incididunt ut labore",
    sinceMonth: "Ut enim ad minim",
    last7Days: "Quis nostrud exercitation",
    segmentation: "Ullamco laboris nisi",
    orderOverview: "Ut aliquip ex ea commodo",
    userActivity: "Consequat duis aute",
    recentOrders: "Irure dolor in reprehenderit",
    latestProducts: "Voluptate velit esse",
    totalAssets: "Cillum dolore eu fugiat",
    distribution: "Nulla pariatur excepteur",
    promoTitle: "Sint occaecat cupidatat",
    promoCta: "Non proident",
    viewed: "Sunt in culpa",
    checkout: "Qui officia deserunt",
    total: "Mollit anim id est",
    orders: "Laborum nisi ut aliquip",
    year: "2025",
    shopNow: "Lorem ipsum",
    payment: "Dolor sit",
    customer: "Amet consectetur",
    quantity: "Adipiscing elit",
    status: "Sed do eiusmod",
    price: "Tempor incididunt",
  },
  en: {
    totalSales: "Lorem ipsum dolor",
    storeHint: "Sit amet consectetur",
    monthlySales: "Adipiscing elit sed",
    revenueGrowth: "Do eiusmod tempor",
    lastQuarter: "Incididunt ut labore",
    sinceMonth: "Ut enim ad minim",
    last7Days: "Quis nostrud exercitation",
    segmentation: "Ullamco laboris nisi",
    orderOverview: "Ut aliquip ex ea commodo",
    userActivity: "Consequat duis aute",
    recentOrders: "Irure dolor in reprehenderit",
    latestProducts: "Voluptate velit esse",
    totalAssets: "Cillum dolore eu fugiat",
    distribution: "Nulla pariatur excepteur",
    promoTitle: "Sint occaecat cupidatat",
    promoCta: "Non proident",
    viewed: "Sunt in culpa",
    checkout: "Qui officia deserunt",
    total: "Mollit anim id est",
    orders: "Laborum nisi ut aliquip",
    year: "2025",
    shopNow: "Lorem ipsum",
    payment: "Dolor sit",
    customer: "Amet consectetur",
    quantity: "Adipiscing elit",
    status: "Sed do eiusmod",
    price: "Tempor incididunt",
  },
} as const

export const insightTotalSales = {
  amount: "$98,452.76",
  delta: 32.8,
  points: [
    { label: "1", value: 42 },
    { label: "2", value: 58 },
    { label: "3", value: 51 },
    { label: "4", value: 72 },
    { label: "5", value: 68 },
    { label: "6", value: 88 },
    { label: "7", value: 94 },
  ],
}

export const insightMonthly = {
  value: "$36,890",
  delta: 3.6,
  bars: [42, 58, 48, 72, 65, 88, 76],
}

export const insightGrowth = {
  percent: 24,
  delta: 6.2,
}

export const insightKpis = [
  { id: "orders", value: "1,920", delta: 6.1, direction: "up" as const },
  { id: "shipped", value: "1,785", delta: 4.3, direction: "down" as const },
  { id: "revenue", value: "$88,900", delta: 7.9, direction: "up" as const },
  { id: "rating", value: "4.9", suffix: "/ 5.0", delta: 2.5, direction: "up" as const },
]

export const insightKpiLabels = {
  orders: "Lorem ipsum dolor",
  shipped: "Sit amet consectetur",
  revenue: "Adipiscing elit sed",
  rating: "Do eiusmod tempor",
}

export const insightSegments = [
  { key: "a", label: "Lorem ipsum", value: 1240, delta: 12.4, color: "var(--chart-1)" },
  { key: "b", label: "Dolor sit amet", value: 980, delta: -3.2, color: "var(--chart-2)" },
  { key: "c", label: "Consectetur elit", value: 620, delta: 8.1, color: "var(--chart-4)" },
]

export const insightSegmentTotal = 3420

export const insightOrderOverview = {
  salesTotal: "$124,580",
  ordersTotal: "2,840",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  seriesA: [28, 35, 32, 44, 41, 52, 48],
  seriesB: [18, 22, 26, 30, 28, 36, 34],
}

export const insightUserActivity = [
  { day: "Mon", viewed: 420, checkout: 180 },
  { day: "Tue", viewed: 380, checkout: 160 },
  { day: "Wed", viewed: 510, checkout: 220 },
  { day: "Thu", viewed: 460, checkout: 190 },
  { day: "Fri", viewed: 590, checkout: 260 },
  { day: "Sat", viewed: 640, checkout: 290 },
  { day: "Sun", viewed: 520, checkout: 210 },
]

export const insightActivityTotals = { viewed: "3,520", checkout: "1,510" }

export type OrderStatus = "pending" | "shipped" | "delivered"

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

export const insightStatusLabels: Record<OrderStatus, { tr: string; en: string }> = {
  pending: { tr: "Lorem", en: "Lorem" },
  shipped: { tr: "Ipsum", en: "Ipsum" },
  delivered: { tr: "Dolor", en: "Dolor" },
}
