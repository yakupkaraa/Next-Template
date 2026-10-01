/** Demo alan değerleri — i18n dışında, örnek veri. */
export const userCreateDemo = {
  nameValue: "John Doe",
  emailValue: "lorem@ipsum.com",
  companyValue: "Nova",
  countryValue: "Türkiye",
  phoneValue: "+90 532 214 08 16",
  birthdayValue: "14.06.1992",
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
