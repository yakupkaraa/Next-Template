/** Demo alan değerleri — i18n dışında, örnek veri. */
export const userCreateDemo = {
  nameValue: "John Doe",
  emailValue: "lorem@ipsum.com",
  companyValue: "Nova",
  countryValue: "Türkiye",
  phoneValue: "+90 532 214 08 16",
  birthdayValue: "14.06.1992",
  noteValue:
    "Kurumsal yönetim paneli ve B2B SaaS arayüzleri üzerinde çalışan kıdemli geliştirici.",
}

export const userBillingFigures = {
  summaries: ["640 TL", "86 GB", "Takım"],
  methods: [
    { brand: "Troy", detail: "9792 06•• •••• 4412", isDefault: true },
    { brand: "Visa", detail: "4532 18•• •••• 9081", isDefault: false },
    { brand: "Mastercard", detail: "5412 75•• •••• 2260", isDefault: false },
  ],
  rows: [
    { id: "FT-20418", date: "12.03.2026 14:20", price: "128 TL", status: "pending" as const },
    { id: "FT-19802", date: "02.02.2026 09:05", price: "96 TL", status: "paid" as const },
    { id: "FT-18755", date: "18.12.2025 16:40", price: "210 TL", status: "paid" as const },
    { id: "FT-17610", date: "03.11.2025 11:15", price: "54 TL", status: "cancelled" as const },
  ],
}

export const notificationChannels = ["email", "inApp", "push"] as const
export type NotificationChannel = (typeof notificationChannels)[number]

export const notificationRowIds = [
  "ticketReplies",
  "ticketStatus",
  "blogComments",
  "system",
  "weekly",
  "security",
] as const
export type NotificationRowId = (typeof notificationRowIds)[number]

export const notificationRequiredRow = "security" as const

export const notificationMatrixDefault: Record<
  NotificationRowId,
  Record<NotificationChannel, boolean>
> = {
  ticketReplies: { email: true, inApp: true, push: true },
  ticketStatus: { email: true, inApp: true, push: false },
  blogComments: { email: false, inApp: true, push: false },
  system: { email: true, inApp: true, push: false },
  weekly: { email: true, inApp: false, push: false },
  security: { email: true, inApp: true, push: true },
}

export const notificationMuteDurations = ["1h", "2h", "4h", "8h"] as const
export const notificationQuietHours = Array.from({ length: 24 }, (_, hour) =>
  `${String(hour).padStart(2, "0")}:00`
)
