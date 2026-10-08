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

export function emptyUserFormValues(): Record<UserColumnKey, string> {
  return Object.fromEntries(userFormFieldKeys.map((key) => [key, ""])) as Record<
    UserColumnKey,
    string
  >
}

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
