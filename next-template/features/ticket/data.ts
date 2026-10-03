import type { ContentLocale } from "@/lib/i18n"

/** Göreli zaman hesapları için sabit referans (render'da Date.now yok). */
export const TICKET_NOW_MS = Date.parse("2026-10-03T12:00:00.000Z")

export type TicketRole = "admin" | "user"

export type TicketStatus = "open" | "in_review" | "resolved" | "closed"
export type TicketPriority = "low" | "normal" | "high" | "urgent"
export type TicketCategory = "technical" | "account" | "billing" | "feature" | "other"
export type TicketModule = "users" | "blog" | "operations" | "other"
export type TicketEnvironment = "production" | "test"
export type TicketMessageType = "user" | "admin" | "internal" | "system"

export type TicketPerson = {
  id: string
  name: string
  email: string
  role: TicketRole
}

export type TicketAttachment = {
  id: string
  name: string
  sizeLabel: string
}

export type TicketMessage = {
  id: string
  type: TicketMessageType
  authorId: string
  body: string
  createdAt: string
  attachments?: TicketAttachment[]
}

export type Ticket = {
  id: number
  subject: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  module: TicketModule
  environment: TicketEnvironment
  requesterId: string
  assigneeId?: string
  createdAt: string
  updatedAt: string
  slaDueAt?: string
  unread: boolean
  tags: string[]
  attachments: TicketAttachment[]
  messages: TicketMessage[]
}

export type HelpArticle = {
  id: string
  title: { tr: string; en: string }
  excerpt: { tr: string; en: string }
  keywords: string[]
}

/** Rol denemesi: "admin" | "user" */
export const MOCK_SESSION_ROLE: TicketRole = "admin"

export const ticketPeople: TicketPerson[] = [
  {
    id: "user-ece",
    name: "Ece Polat",
    email: "ece.polat@example.com",
    role: "user",
  },
  {
    id: "user-yakup",
    name: "Yakup K.",
    email: "yakup.k@example.com",
    role: "admin",
  },
  {
    id: "user-mert",
    name: "Mert Aydin",
    email: "mert.aydin@example.com",
    role: "admin",
  },
]

export function getCurrentUser(): TicketPerson {
  return MOCK_SESSION_ROLE === "admin"
    ? ticketPeople[1]
    : ticketPeople[0]
}

export function personById(id: string): TicketPerson | undefined {
  return ticketPeople.find((person) => person.id === id)
}

export const ticketCategories: { id: TicketCategory; tr: string; en: string }[] = [
  { id: "technical", tr: "Teknik sorun", en: "Technical issue" },
  { id: "account", tr: "Hesap ve giriş", en: "Account and sign-in" },
  { id: "billing", tr: "Faturalama", en: "Billing" },
  { id: "feature", tr: "Özellik talebi", en: "Feature request" },
  { id: "other", tr: "Diğer", en: "Other" },
]

export const ticketModules: { id: TicketModule; tr: string; en: string }[] = [
  { id: "users", tr: "Kullanıcı", en: "Users" },
  { id: "blog", tr: "Blog", en: "Blog" },
  { id: "operations", tr: "Operasyon", en: "Operations" },
  { id: "other", tr: "Diğer", en: "Other" },
]

export const ticketEnvironments: { id: TicketEnvironment; tr: string; en: string }[] = [
  { id: "production", tr: "Üretim", en: "Production" },
  { id: "test", tr: "Test", en: "Test" },
]

export const helpArticles: HelpArticle[] = [
  {
    id: "h1",
    title: { tr: "Excel dışa aktarma hataları", en: "Excel export errors" },
    excerpt: {
      tr: "Raporu dışa aktarmadan önce filtreleri sadeleştirin.",
      en: "Simplify filters before exporting a report.",
    },
    keywords: ["excel", "rapor", "aktar", "export"],
  },
  {
    id: "h2",
    title: { tr: "Çift fatura kesilmesi", en: "Duplicate invoices" },
    excerpt: {
      tr: "Aynı dönemde iki fatura görürseniz iptal talebi açın.",
      en: "Open a cancel request if two invoices appear for the same period.",
    },
    keywords: ["fatura", "kesilmiş", "invoice", "çift"],
  },
  {
    id: "h3",
    title: { tr: "2FA kodu gelmiyor", en: "2FA code not arriving" },
    excerpt: {
      tr: "SMS gecikmesinde yedek kodları veya e-posta kanalını deneyin.",
      en: "If SMS is delayed, try backup codes or email.",
    },
    keywords: ["2fa", "giriş", "kod", "login"],
  },
  {
    id: "h4",
    title: { tr: "Şifre sıfırlama e-postası", en: "Password reset email" },
    excerpt: {
      tr: "Spam klasörünü ve izin verilen gönderen listesini kontrol edin.",
      en: "Check spam and the allowed senders list.",
    },
    keywords: ["şifre", "e-posta", "sıfırlama", "password"],
  },
  {
    id: "h5",
    title: { tr: "Blog taslaklarını geri alma", en: "Restore blog drafts" },
    excerpt: {
      tr: "Taslaklar tarayıcı deposunda 24 saat tutulur.",
      en: "Drafts stay in browser storage for 24 hours.",
    },
    keywords: ["blog", "taslak", "kayboldu", "draft"],
  },
]

function hoursAgo(hours: number) {
  return new Date(TICKET_NOW_MS - hours * 3600_000).toISOString()
}

function hoursFromNow(hours: number) {
  return new Date(TICKET_NOW_MS + hours * 3600_000).toISOString()
}

export const seedTickets: Ticket[] = [
  {
    id: 1042,
    subject: "Sipariş raporu Excel'e aktarılırken hata alıyorum",
    description:
      "Operasyon ekranında son 30 gün filtresiyle Excel'e aktar deyince işlem yarıda kesiliyor.",
    status: "open",
    priority: "high",
    category: "technical",
    module: "operations",
    environment: "production",
    requesterId: "user-ece",
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(1),
    slaDueAt: hoursFromNow(4),
    unread: true,
    tags: ["excel", "rapor"],
    attachments: [{ id: "a1", name: "export-log.txt", sizeLabel: "28 KB" }],
    messages: [
      {
        id: "m1042-1",
        type: "user",
        authorId: "user-ece",
        body: "Aktar butonuna basınca 'Beklenmeyen hata' dönüyor. Ekran görüntüsünü ekledim.",
        createdAt: hoursAgo(2),
        attachments: [{ id: "a1", name: "export-log.txt", sizeLabel: "28 KB" }],
      },
      {
        id: "m1042-2",
        type: "system",
        authorId: "user-yakup",
        body: "Yakup K. talebi kendine atadı",
        createdAt: hoursAgo(1.5),
      },
      {
        id: "m1042-3",
        type: "internal",
        authorId: "user-yakup",
        body: "Export kuyruğu dolu görünüyor, worker loglarına bakacağım.",
        createdAt: hoursAgo(1.2),
      },
      {
        id: "m1042-4",
        type: "admin",
        authorId: "user-yakup",
        body: "Kaydı aldık. Büyük tarih aralığında zaman aşımı oluyor, daraltmayı deneyin; kalıcı düzeltmeyi hazırlıyoruz.",
        createdAt: hoursAgo(1),
      },
    ],
  },
  {
    id: 1041,
    subject: "Faturam iki kez kesilmiş",
    description: "Eylül dönemi için iki ayrı fatura görüyorum, biri mükerrer.",
    status: "in_review",
    priority: "urgent",
    category: "billing",
    module: "other",
    environment: "production",
    requesterId: "user-ece",
    assigneeId: "user-mert",
    createdAt: hoursAgo(8),
    updatedAt: hoursAgo(3),
    slaDueAt: hoursAgo(1),
    unread: true,
    tags: ["fatura"],
    attachments: [],
    messages: [
      {
        id: "m1041-1",
        type: "user",
        authorId: "user-ece",
        body: "INV-3391 ve INV-3398 aynı tutar. Hangisini ödemeliyim?",
        createdAt: hoursAgo(8),
      },
      {
        id: "m1041-2",
        type: "admin",
        authorId: "user-mert",
        body: "INV-3398 iptal kuyruğuna alındı, teyit maili gidecek.",
        createdAt: hoursAgo(3),
      },
    ],
  },
  {
    id: 1040,
    subject: "Giriş yaparken 2FA kodu gelmiyor",
    description: "SMS kodu 10 dakikadır gelmedi, yedek kodlarım da yok.",
    status: "open",
    priority: "urgent",
    category: "account",
    module: "users",
    environment: "production",
    requesterId: "user-ece",
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(5),
    slaDueAt: hoursFromNow(1),
    unread: true,
    tags: ["2fa"],
    attachments: [],
    messages: [
      {
        id: "m1040-1",
        type: "user",
        authorId: "user-ece",
        body: "Numaram doğru, yine de SMS düşmüyor.",
        createdAt: hoursAgo(5),
      },
    ],
  },
  {
    id: 1039,
    subject: "Kullanıcı listesine toplu içe aktarma istiyorum",
    description: "CSV ile 200 kişiyi bir seferde eklemek istiyoruz.",
    status: "open",
    priority: "normal",
    category: "feature",
    module: "users",
    environment: "production",
    requesterId: "user-ece",
    assigneeId: "user-yakup",
    createdAt: hoursAgo(20),
    updatedAt: hoursAgo(6),
    slaDueAt: hoursFromNow(20),
    unread: false,
    tags: ["içe aktarma"],
    attachments: [{ id: "a2", name: "ornek.csv", sizeLabel: "12 KB" }],
    messages: [
      {
        id: "m1039-1",
        type: "user",
        authorId: "user-ece",
        body: "Örnek CSV'yi ekledim. Sütun eşlemesi nasıl olacak?",
        createdAt: hoursAgo(20),
      },
      {
        id: "m1039-2",
        type: "system",
        authorId: "user-yakup",
        body: "Yakup K. önceliği 'Normal' yaptı",
        createdAt: hoursAgo(12),
      },
      {
        id: "m1039-3",
        type: "internal",
        authorId: "user-yakup",
        body: "Q4 kapsamına alalım, geçici olarak Excel şablonu verelim.",
        createdAt: hoursAgo(8),
      },
      {
        id: "m1039-4",
        type: "admin",
        authorId: "user-yakup",
        body: "Toplu aktarma yol haritasında. Şimdilik şablon dosyasını paylaşacağım.",
        createdAt: hoursAgo(6),
      },
    ],
  },
  {
    id: 1038,
    subject: "Blog taslakları kayboldu",
    description: "Dün kaydettiğim üç taslak listede yok.",
    status: "resolved",
    priority: "high",
    category: "technical",
    module: "blog",
    environment: "production",
    requesterId: "user-ece",
    assigneeId: "user-yakup",
    createdAt: hoursAgo(40),
    updatedAt: hoursAgo(10),
    slaDueAt: hoursAgo(16),
    unread: false,
    tags: ["blog"],
    attachments: [],
    messages: [
      {
        id: "m1038-1",
        type: "user",
        authorId: "user-ece",
        body: "Tarayıcıyı yenileyince taslaklar silindi.",
        createdAt: hoursAgo(40),
      },
      {
        id: "m1038-2",
        type: "admin",
        authorId: "user-yakup",
        body: "Taslaklar geri yüklendi. Oturum zaman aşımında yedek alınıyor artık.",
        createdAt: hoursAgo(10),
      },
    ],
  },
  {
    id: 1037,
    subject: "Şifre sıfırlama e-postası ulaşmıyor",
    description: "Sıfırlama bağlantısı 30 dakikadır gelmedi.",
    status: "in_review",
    priority: "normal",
    category: "account",
    module: "users",
    environment: "production",
    requesterId: "user-ece",
    assigneeId: "user-mert",
    createdAt: hoursAgo(14),
    updatedAt: hoursAgo(4),
    slaDueAt: hoursFromNow(8),
    unread: false,
    tags: ["e-posta"],
    attachments: [],
    messages: [
      {
        id: "m1037-1",
        type: "user",
        authorId: "user-ece",
        body: "Spam klasörü boş. Kurumsal filtre mi kesiyor?",
        createdAt: hoursAgo(14),
      },
    ],
  },
  {
    id: 1036,
    subject: "Mobilde tablo taşıyor",
    description: "Kullanıcı listesi telefonda yatay taşıyor, sütunlar kesilmiyor.",
    status: "open",
    priority: "low",
    category: "technical",
    module: "users",
    environment: "production",
    requesterId: "user-ece",
    createdAt: hoursAgo(30),
    updatedAt: hoursAgo(30),
    slaDueAt: hoursFromNow(40),
    unread: false,
    tags: ["mobil"],
    attachments: [],
    messages: [
      {
        id: "m1036-1",
        type: "user",
        authorId: "user-ece",
        body: "iPhone 13, Safari. Yatay kaydırınca başlık kayboluyor.",
        createdAt: hoursAgo(30),
      },
    ],
  },
  {
    id: 1035,
    subject: "Dashboard grafikleri yavaş yükleniyor",
    description: "Ana sayfa grafikleri 8-10 saniye sonra geliyor.",
    status: "in_review",
    priority: "high",
    category: "technical",
    module: "operations",
    environment: "production",
    requesterId: "user-ece",
    assigneeId: "user-yakup",
    createdAt: hoursAgo(18),
    updatedAt: hoursAgo(2),
    slaDueAt: hoursFromNow(2),
    unread: true,
    tags: ["performans"],
    attachments: [],
    messages: [
      {
        id: "m1035-1",
        type: "user",
        authorId: "user-ece",
        body: "Öğleden sonra daha da yavaşlıyor.",
        createdAt: hoursAgo(18),
      },
      {
        id: "m1035-2",
        type: "internal",
        authorId: "user-yakup",
        body: "Recharts yeniden boyutlanıyor, debounce ekleyelim.",
        createdAt: hoursAgo(3),
      },
      {
        id: "m1035-3",
        type: "admin",
        authorId: "user-yakup",
        body: "Grafik yüklemesini erteliyoruz, bugün bir yama çıkacak.",
        createdAt: hoursAgo(2),
      },
    ],
  },
  {
    id: 1034,
    subject: "Profil fotoğrafı yüklenmiyor",
    description: "2 MB JPEG seçince 'dosya reddedildi' diyor.",
    status: "closed",
    priority: "low",
    category: "technical",
    module: "users",
    environment: "production",
    requesterId: "user-ece",
    assigneeId: "user-mert",
    createdAt: hoursAgo(90),
    updatedAt: hoursAgo(50),
    unread: false,
    tags: ["profil"],
    attachments: [],
    messages: [
      {
        id: "m1034-1",
        type: "user",
        authorId: "user-ece",
        body: "Limit 1 MB mı? Belgede 5 MB yazıyor.",
        createdAt: hoursAgo(90),
      },
      {
        id: "m1034-2",
        type: "admin",
        authorId: "user-mert",
        body: "Limit 5 MB olacak şekilde güncellendi, tekrar deneyin.",
        createdAt: hoursAgo(55),
      },
      {
        id: "m1034-3",
        type: "system",
        authorId: "user-ece",
        body: "Ece Polat talebi kapattı",
        createdAt: hoursAgo(50),
      },
    ],
  },
  {
    id: 1033,
    subject: "Test ortamında blog yayını üretimde görünüyor",
    description: "Testte yayınladığım yazı canlı sitede de çıktı.",
    status: "resolved",
    priority: "urgent",
    category: "technical",
    module: "blog",
    environment: "test",
    requesterId: "user-ece",
    assigneeId: "user-yakup",
    createdAt: hoursAgo(60),
    updatedAt: hoursAgo(22),
    slaDueAt: hoursAgo(48),
    unread: false,
    tags: ["ortam"],
    attachments: [],
    messages: [
      {
        id: "m1033-1",
        type: "user",
        authorId: "user-ece",
        body: "Yazıyı hemen kaldırmamız lazım.",
        createdAt: hoursAgo(60),
      },
      {
        id: "m1033-2",
        type: "admin",
        authorId: "user-yakup",
        body: "Yanlış bağlantı düzeldi, yazı canlıdan alındı.",
        createdAt: hoursAgo(22),
      },
    ],
  },
  {
    id: 1032,
    subject: "Operasyon filtresi kaydı unutuluyor",
    description: "Sayfayı yenileyince tarih filtresi sıfırlanıyor.",
    status: "open",
    priority: "normal",
    category: "feature",
    module: "operations",
    environment: "production",
    requesterId: "user-ece",
    createdAt: hoursAgo(9),
    updatedAt: hoursAgo(9),
    slaDueAt: hoursFromNow(30),
    unread: false,
    tags: ["filtre"],
    attachments: [],
    messages: [
      {
        id: "m1032-1",
        type: "user",
        authorId: "user-ece",
        body: "URL'de kalsın isteriz, paylaşabilelim.",
        createdAt: hoursAgo(9),
      },
    ],
  },
  {
    id: 1031,
    subject: "Hesap dilini İngilizceye çevirince menü karışıyor",
    description: "Bazı etiketler Türkçe kalıyor, bazıları İngilizce.",
    status: "closed",
    priority: "low",
    category: "other",
    module: "other",
    environment: "production",
    requesterId: "user-ece",
    assigneeId: "user-mert",
    createdAt: hoursAgo(120),
    updatedAt: hoursAgo(70),
    unread: false,
    tags: ["i18n"],
    attachments: [],
    messages: [
      {
        id: "m1031-1",
        type: "user",
        authorId: "user-ece",
        body: "Blog menüsü İngilizce, kullanıcı menüsü Türkçe.",
        createdAt: hoursAgo(120),
      },
      {
        id: "m1031-2",
        type: "admin",
        authorId: "user-mert",
        body: "Eksik anahtarlar tamamlandı.",
        createdAt: hoursAgo(72),
      },
    ],
  },
]

export function labelOf(
  items: { id: string; tr: string; en: string }[],
  id: string,
  locale: ContentLocale
) {
  return items.find((item) => item.id === id)?.[locale] ?? id
}

export function openTicketCount(tickets: Ticket[]) {
  return tickets.filter((ticket) => ticket.status === "open" || ticket.status === "in_review")
    .length
}

export function slaBreached(ticket: Ticket) {
  return Boolean(ticket.slaDueAt && Date.parse(ticket.slaDueAt) < TICKET_NOW_MS)
}

export function formatRelative(iso: string, locale: ContentLocale) {
  const diffMs = Date.parse(iso) - TICKET_NOW_MS
  const abs = Math.abs(diffMs)
  const minute = 60_000
  const hour = 3600_000
  const day = 86_400_000
  const rtf = new Intl.RelativeTimeFormat(locale === "en" ? "en" : "tr", { numeric: "auto" })
  if (abs < hour) return rtf.format(Math.round(diffMs / minute), "minute")
  if (abs < day) return rtf.format(Math.round(diffMs / hour), "hour")
  return rtf.format(Math.round(diffMs / day), "day")
}

export function formatDateTime(iso: string, locale: ContentLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso))
}

export function formatSla(iso: string | undefined, locale: ContentLocale) {
  if (!iso) return "—"
  const diff = Date.parse(iso) - TICKET_NOW_MS
  if (diff < 0) return locale === "en" ? "SLA overdue" : "SLA aşıldı"
  const hours = Math.floor(diff / 3600_000)
  const minutes = Math.round((diff % 3600_000) / 60_000)
  return locale === "en" ? `SLA ${hours}h ${minutes}m` : `SLA ${hours}s ${minutes}dk`
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr")
}

export function nextTicketId(tickets: Ticket[]) {
  return tickets.reduce((max, ticket) => Math.max(max, ticket.id), 0) + 1
}
