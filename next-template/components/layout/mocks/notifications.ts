import type { Locale } from "@/lib/locales"

export const notifications: {
  id: string
  title: Record<Locale, string>
  time: Record<Locale, string>
}[] = [
  {
    id: "message",
    title: {
      tr: "Yeni bir mesajınız var",
      en: "You have a new message",
      de: "Sie haben eine neue Nachricht",
      fr: "Vous avez un nouveau message",
      it: "Hai un nuovo messaggio",
    },
    time: {
      tr: "5 dk önce",
      en: "5 min ago",
      de: "vor 5 Min.",
      fr: "il y a 5 min",
      it: "5 min fa",
    },
  },
  {
    id: "report",
    title: {
      tr: "Haftalık rapor hazır",
      en: "Weekly report is ready",
      de: "Wochenbericht ist fertig",
      fr: "Le rapport hebdomadaire est prêt",
      it: "Il report settimanale è pronto",
    },
    time: {
      tr: "1 sa önce",
      en: "1 hr ago",
      de: "vor 1 Std.",
      fr: "il y a 1 h",
      it: "1 ora fa",
    },
  },
  {
    id: "update",
    title: {
      tr: "Sistem güncellemesi tamamlandı",
      en: "System update completed",
      de: "Systemupdate abgeschlossen",
      fr: "Mise à jour du système terminée",
      it: "Aggiornamento di sistema completato",
    },
    time: {
      tr: "Dün",
      en: "Yesterday",
      de: "Gestern",
      fr: "Hier",
      it: "Ieri",
    },
  },
]
