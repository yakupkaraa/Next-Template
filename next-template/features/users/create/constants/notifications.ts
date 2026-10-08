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

export const notificationMuteDurations = ["1h", "2h", "4h", "8h"] as const
export const notificationQuietHours = Array.from({ length: 24 }, (_, hour) =>
  `${String(hour).padStart(2, "0")}:00`
)
