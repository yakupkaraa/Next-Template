import {
  userCityOptions,
  userCompanyOptions,
  userCountryOptions,
  userDepartmentOptions,
  userLanguageOptions,
  userPlanOptions,
  userRoleOptions,
  userStatusOptions,
  userTeamOptions,
  userTimezoneOptions,
  userTitleOptions,
  type UserRow,
} from "../constants/users"
import type { NotificationChannel, NotificationRowId } from "../create/constants/notifications"

const firstNames = ["Ayşe", "Mehmet", "Elif", "Can", "Zeynep", "Emre", "Deniz", "Selin"]
const lastNames = ["Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Aydın", "Koç", "Arslan"]
const roles = userRoleOptions
const statuses = userStatusOptions
const departments = userDepartmentOptions
const cities = userCityOptions
const countries = userCountryOptions
const companies = userCompanyOptions
const titles = userTitleOptions
const languages = userLanguageOptions
const timezones = userTimezoneOptions
const plans = userPlanOptions
const teams = userTeamOptions

function pick<T>(list: readonly T[], index: number) {
  return list[index % list.length]
}

export const userList: UserRow[] = Array.from({ length: 50 }, (_, index) => {
  const n = index + 1
  const firstName = pick(firstNames, index)
  const lastName = pick(lastNames, index * 3)
  const username = `${firstName}${lastName}${n}`.toLocaleLowerCase("tr")

  return {
    id: String(n),
    firstName,
    lastName,
    email: `${username}@example.com`,
    phone: `+90 532 ${String(100 + (n % 900)).padStart(3, "0")} ${String(10 + (n % 90)).padStart(2, "0")} ${String(n % 100).padStart(2, "0")}`,
    username,
    role: pick(roles, index),
    status: pick(statuses, index),
    department: pick(departments, index),
    city: pick(cities, index),
    country: pick(countries, index),
    company: pick(companies, index),
    title: pick(titles, index),
    joined: `${String((n % 28) + 1).padStart(2, "0")}.${String((n % 12) + 1).padStart(2, "0")}.2024`,
    lastSeen: `${String((n % 28) + 1).padStart(2, "0")}.09.2026`,
    language: pick(languages, index),
    timezone: pick(timezones, index),
    plan: pick(plans, index),
    score: String(40 + (n % 60)),
    orders: String(n % 48),
    balance: `${(n * 37) % 9000} TL`,
    verified: n % 4 === 0 ? "Hayır" : "Evet",
    manager: `${pick(firstNames, index + 2)} ${pick(lastNames, index + 1)}`,
    team: pick(teams, index),
    note: `Örnek kayıt ${n}`,
  }
})

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
