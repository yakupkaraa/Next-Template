export const userColumnKeys = [
  "id",
  "firstName",
  "lastName",
  "email",
  "phone",
  "username",
  "role",
  "status",
  "department",
  "city",
  "country",
  "company",
  "title",
  "joined",
  "lastSeen",
  "language",
  "timezone",
  "plan",
  "score",
  "orders",
  "balance",
  "verified",
  "manager",
  "team",
  "note",
] as const

export type UserColumnKey = (typeof userColumnKeys)[number]
export type UserRow = Record<UserColumnKey, string>

/** Liste tablosu ile aynı alanlar; `id` ve `lastSeen` kayıtta otomatik doldurulur. */
export const userFormFieldKeys = userColumnKeys.filter(
  (key): key is UserColumnKey => key !== "id" && key !== "lastSeen"
)

const firstNames = ["Ayşe", "Mehmet", "Elif", "Can", "Zeynep", "Emre", "Deniz", "Selin"]
const lastNames = ["Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Aydın", "Koç", "Arslan"]
export const userRoleOptions = ["Yönetici", "Editör", "Üye", "Analist"] as const
export const userStatusOptions = ["Aktif", "Pasif", "Beklemede"] as const
export const userDepartmentOptions = ["Ürün", "Satış", "Destek", "Finans", "Tasarım"] as const
export const userCityOptions = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"] as const
export const userCountryOptions = ["Türkiye", "Almanya", "Hollanda", "İngiltere"] as const
export const userCompanyOptions = ["Nova", "Kuzey", "Mavi", "Lumen", "Atlas"] as const
export const userTitleOptions = ["Uzman", "Kıdemli", "Stajyer", "Müdür"] as const
export const userLanguageOptions = ["Türkçe", "İngilizce"] as const
export const userTimezoneOptions = ["Europe/Istanbul", "Europe/Berlin", "Europe/London"] as const
export const userPlanOptions = ["Ücretsiz", "Pro", "Takım"] as const
export const userTeamOptions = ["Alpha", "Beta", "Gamma", "Delta"] as const

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
