import type { notificationChannels, notificationRowIds } from "../constants/notifications"

export type NotificationChannel = (typeof notificationChannels)[number]
export type NotificationRowId = (typeof notificationRowIds)[number]
