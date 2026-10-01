import type { ContentLocale } from "@/lib/i18n"

export type DashboardLocale = ContentLocale

export const dashboardTrend = "17 %"

export const dashboardFigures = {
  document: "146.000",
  contact: "1400",
  email: "150.700",
  order: "860",
}

export const dashboardVisitSegments = [
  { key: "web", value: 1240 },
  { key: "mobile", value: 890 },
  { key: "other", value: 328 },
] as const

export const dashboardVisitChartConfig = {
  web: { label: "Web", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  other: { label: "Other", color: "var(--chart-3)" },
} satisfies Record<
  (typeof dashboardVisitSegments)[number]["key"],
  { label: string; color: string }
>

export const dashboardWelcome = {
  tr: {
    userName: "John Doe",
    hint: "Mağazanızın bugünkü performansını takip edin. Önemli istatistiklere hızlıca göz atın.",
    cta: "Tam raporu görüntüle",
    greetingMorning: "Günaydın",
    greetingAfternoon: "İyi günler",
    greetingEvening: "İyi akşamlar",
    greetingNight: "İyi geceler",
    visitChartTitle: "Ziyaret dağılımı",
    visitTotal: "2.458",
    visitTotalLabel: "toplam ziyaret",
  },
  en: {
    userName: "John Doe",
    hint: "Stay updated with your store's performance today. Get a quick snapshot of key statistics.",
    cta: "View full report",
    greetingMorning: "Good morning",
    greetingAfternoon: "Good afternoon",
    greetingEvening: "Good evening",
    greetingNight: "Good night",
    visitChartTitle: "Visit breakdown",
    visitTotal: "2,458",
    visitTotalLabel: "total visits",
  },
} as const

export const dashboardCopy = {
  tr: {
    document: "Belge",
    contact: "Kişi",
    email: "E-posta",
    order: "Sipariş",
    since: "Geçen haftadan beri",
    workflow: "Son iş akışı",
    marketing: "Son pazarlama",
    tracking: "Belge takip bilgisi",
    weekly: "Haftalık",
    name: "Ad",
    file: "Dosya",
    category: "Kategori",
    author: "Yazar",
    status: "Durum",
    sent: "Gönderildi",
    pending: "Beklemede",
    popular: "Popüler ürün",
    chat: "Sohbet",
  },
  en: {
    document: "Document",
    contact: "Contact",
    email: "Email",
    order: "Orders",
    since: "Since last week",
    workflow: "Recent Workflow",
    marketing: "Recent Marketing",
    tracking: "Document tracking information",
    weekly: "Weekly",
    name: "Name",
    file: "File",
    category: "Category",
    author: "Author",
    status: "Status",
    sent: "Sent",
    pending: "Pending",
    popular: "Popular Product",
    chat: "Chat",
  },
}

export const dashboardDocuments = [
  {
    name: "Annual Report",
    file: "PDF",
    category: "Property",
    author: "Diana Matthews",
    status: "sent" as const,
  },
  {
    name: "Business Plan",
    file: "WORD",
    category: "Cryptocurrency",
    author: "Philip James",
    status: "sent" as const,
  },
  {
    name: "Marketing Tool",
    file: "PDF",
    category: "Content Creator",
    author: "Amanda Ross",
    status: "pending" as const,
  },
]

export const dashboardProducts = [
  { name: "Gadget Converter", price: "$200" },
  { name: "Lens Camera", price: "$50" },
  { name: "Airpods", price: "$100" },
  { name: "Macbook", price: "$300" },
]

export const dashboardChats = [
  { name: "Debra Young", note: "What is the status?" },
  { name: "Dorothy Collins", note: "Can we talk this morning" },
  { name: "Chris Jordan", note: "How about the meeting" },
  { name: "Denise Murphy", note: "What is the status?" },
]

const bars = [46, 62, 38, 78, 52, 70, 40, 96, 58, 84, 48, 88]

export const dashboardWorkflow = [
  { label: "1", value: 38 },
  { label: "2", value: 60 },
  { label: "3", value: 28 },
  { label: "4", value: 52 },
  { label: "5", value: 92 },
  { label: "6", value: 80 },
  { label: "7", value: 94 },
  { label: "8", value: 86 },
  { label: "9", value: 64 },
  { label: "10", value: 88 },
  { label: "11", value: 94 },
]

export const dashboardMarketing = bars.map((value, index) => ({
  label: String(index + 1),
  value,
}))

export const dashboardWorkflowConfig = {
  value: { label: "Workflow", color: "oklch(0.62 0.14 230)" },
}

export const dashboardMarketingConfig = {
  value: { label: "Marketing", color: "oklch(0.68 0.12 195)" },
}
