export const userListView = {
  title: "Kullanıcı Listesi",
  excel: "Excel",
  search: "Ara",
  empty: "Sonuç yok",
  confirmed: "Evet",
}

export const userColumns = [
  { key: "id", label: "No" },
  { key: "firstName", label: "Ad" },
  { key: "lastName", label: "Soyad" },
  { key: "email", label: "E-posta" },
  { key: "phone", label: "Telefon" },
  { key: "username", label: "Kullanıcı adı" },
  { key: "role", label: "Rol" },
  { key: "status", label: "Durum" },
  { key: "department", label: "Departman" },
  { key: "city", label: "Şehir" },
  { key: "country", label: "Ülke" },
  { key: "company", label: "Şirket" },
  { key: "title", label: "Ünvan" },
  { key: "joined", label: "Katılım" },
  { key: "lastSeen", label: "Son görülme" },
  { key: "language", label: "Dil" },
  { key: "timezone", label: "Saat dilimi" },
  { key: "plan", label: "Plan" },
  { key: "score", label: "Puan" },
  { key: "orders", label: "Sipariş" },
  { key: "balance", label: "Bakiye" },
  { key: "verified", label: "Doğrulama" },
  { key: "manager", label: "Yönetici" },
  { key: "team", label: "Takım" },
  { key: "note", label: "Not" },
] as const

export type UserColumnKey = (typeof userColumns)[number]["key"]
export type UserRow = Record<UserColumnKey, string>

const firstNames = ["Ayşe", "Mehmet", "Elif", "Can", "Zeynep", "Emre", "Deniz", "Selin"]
const lastNames = ["Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Aydın", "Koç", "Arslan"]
const roles = ["Yönetici", "Editör", "Üye", "Analist"]
const statuses = ["Aktif", "Pasif", "Beklemede"]
const departments = ["Ürün", "Satış", "Destek", "Finans", "Tasarım"]
const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"]
const countries = ["Türkiye", "Almanya", "Hollanda", "İngiltere"]
const companies = ["Nova", "Kuzey", "Mavi", "Lumen", "Atlas"]
const titles = ["Uzman", "Kıdemli", "Stajyer", "Müdür"]
const languages = ["Türkçe", "İngilizce"]
const timezones = ["Europe/Istanbul", "Europe/Berlin", "Europe/London"]
const plans = ["Ücretsiz", "Pro", "Takım"]
const teams = ["Alpha", "Beta", "Gamma", "Delta"]

function pick<T>(list: T[], index: number) {
  return list[index % list.length]
}

export const userList: UserRow[] = Array.from({ length: 200 }, (_, index) => {
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
