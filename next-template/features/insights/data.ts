import type { ContentLocale } from "@/lib/i18n"

export type InsightLocale = ContentLocale

export const insightRevenueConfig = {
  value: { label: "Revenue", color: "oklch(0.62 0.14 230)" },
}

export const insightOccupancyConfig = {
  occupied: { label: "Occupied", color: "oklch(0.55 0.18 265)" },
  open: { label: "Open", color: "oklch(0.78 0.12 85)" },
}

export const insightPipelineColors = [
  "oklch(0.75 0.14 75)",
  "oklch(0.65 0.18 25)",
  "oklch(0.62 0.14 155)",
]

export const insightCopy = {
  tr: {
    reservations: "Açık rezervasyon",
    confirmed: "Onaylanan",
    refunds: "İade",
    sinceMonth: "geçen aya göre",
    revenue: "Net ciro",
    lastQuarter: "son çeyrek",
    pipeline: "Talep durumu",
    capacity: "Kapasite",
    occupied: "Dolu",
    open: "Boş",
    rooms: "oda",
    checkIn: "Giriş oranı",
    balance: "Bakiye bekleyen",
    guests: "misafir",
    occupancy: "Doluluk",
    period: "Çeyreklik",
    reviews: "Misafir notları",
    reviewCount: "yorum",
    reject: "Ertele",
    accept: "Onayla",
    arrivals: "Yaklaşan konaklamalar",
    stayCount: "kayıt",
    nights: "gece",
    guestsShort: "kişi",
  },
  en: {
    reservations: "Open reservations",
    confirmed: "Confirmed",
    refunds: "Refunds",
    sinceMonth: "vs last month",
    revenue: "Net revenue",
    lastQuarter: "last quarter",
    pipeline: "Request status",
    capacity: "Capacity",
    occupied: "Occupied",
    open: "Open",
    rooms: "rooms",
    checkIn: "Check-in rate",
    balance: "Awaiting balance",
    guests: "guests",
    occupancy: "Occupancy",
    period: "Quarterly",
    reviews: "Guest notes",
    reviewCount: "reviews",
    reject: "Hold",
    accept: "Approve",
    arrivals: "Upcoming stays",
    stayCount: "records",
    nights: "nights",
    guestsShort: "guests",
  },
} as const

export const insightStats = [
  { id: "reservations", value: "86.4k", delta: 4.1, direction: "up" as const },
  { id: "confirmed", value: "52.8k", delta: 1.4, direction: "up" as const },
  { id: "refunds", value: "6.2k", delta: 0.8, direction: "down" as const },
]

export const insightRevenue = {
  amount: "€42,180",
  delta: 3.4,
  points: [
    { tr: "Oca", en: "Jan", value: 28 },
    { tr: "Şub", en: "Feb", value: 31 },
    { tr: "Mar", en: "Mar", value: 29 },
    { tr: "Nis", en: "Apr", value: 36 },
    { tr: "May", en: "May", value: 34 },
    { tr: "Haz", en: "Jun", value: 41 },
    { tr: "Tem", en: "Jul", value: 47 },
  ],
}

export const insightPipeline = [
  { id: "hold", label: { tr: "Beklemede", en: "On hold" }, value: "4.2k", share: 18 },
  { id: "refund", label: { tr: "İade", en: "Refund" }, value: "1.1k", share: 7 },
  { id: "done", label: { tr: "Tamamlandı", en: "Completed" }, value: "21.6k", share: 75 },
]

export const insightCapacity = {
  occupied: 142,
  open: 38,
  totalRooms: 180,
}

export const insightRates = [
  { id: "checkIn", percent: 81, figure: "12,904" },
  { id: "balance", percent: 27, figure: "3,418" },
]

export const insightOccupancy = [
  { period: "Q1", occupied: 62, open: 28 },
  { period: "Q2", occupied: 48, open: 35 },
  { period: "Q3", occupied: 74, open: 22 },
  { period: "Q4", occupied: 55, open: 31 },
]

export const insightReviews = {
  count: 12,
  author: "Mira Solak",
  posted: { tr: "12 Eyl 2026 09:40", en: "12 Sep 2026 09:40" },
  stars: 4,
  body: {
    tr: "Oda sessizdi, kahvaltı saati esnekti. Resepsiyon geç dönüş yaptı ama çıkış işlemi hızlıydı.",
    en: "The room was quiet and breakfast hours were flexible. The desk replied late, but checkout was quick.",
  },
  tags: {
    tr: ["Sessiz oda", "Esnek kahvaltı", "Hızlı çıkış"],
    en: ["Quiet room", "Flexible breakfast", "Fast checkout"],
  },
}

export const insightStays = [
  {
    id: "stay-1",
    guest: "Mira Solak",
    when: { tr: "18 Eki 2026 14:00", en: "18 Oct 2026 14:00" },
    nights: 4,
    guests: 2,
    price: "€640",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "stay-2",
    guest: "Kerem Aydın",
    when: { tr: "21 Eki 2026 11:30", en: "21 Oct 2026 11:30" },
    nights: 2,
    guests: 1,
    price: "€280",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "stay-3",
    guest: "Elif Nar",
    when: { tr: "02 Kas 2026 16:15", en: "02 Nov 2026 16:15" },
    nights: 6,
    guests: 3,
    price: "€1,120",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
  },
]
