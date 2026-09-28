export const userCreateView = {
  account: "Hesap",
  tabs: [
    { value: "profile", label: "Profile" },
    { value: "billing", label: "Billing" },
    { value: "security", label: "Security" },
    { value: "notifications", label: "Notifications" },
  ],
  picture: {
    title: "Profil fotoğrafı",
    hint: "Fotoğrafı yükle veya değiştir",
    action: "Fotoğraf seç",
    initials: "JD",
  },
  form: {
    title: "Hesap bilgileri",
    name: "Ad",
    nameValue: "John Doe",
    nameHint: "Bu ad listede ve kartta görünür.",
    email: "E-posta",
    emailValue: "lorem@ipsum.com",
    company: "Şirket",
    companyValue: "Nova",
    country: "Ülke",
    countryValue: "Türkiye",
    phone: "Telefon",
    phoneValue: "+90 532 214 08 16",
    birthday: "Doğum tarihi",
    birthdayValue: "14.06.1992",
    submit: "Kaydı oluştur",
  },
}

export const userNotifications = {
  title: "Bildirimler",
  hint: "Açık olan bildirimler kullanıcıya gelir.",
  items: [
    { id: "message", title: "Yeni mesaj", detail: "Gelen kutusuna yeni bir mesaj düştüğünde", enabled: true },
    { id: "invoice", title: "Fatura hatırlatması", detail: "Ödeme tarihi yaklaşınca", enabled: true },
    { id: "report", title: "Haftalık rapor", detail: "Her pazartesi özet rapor", enabled: false },
    { id: "security", title: "Güvenlik uyarısı", detail: "Yeni cihazdan giriş yapıldığında", enabled: true },
    { id: "product", title: "Ürün duyurusu", detail: "Yeni özellik ve bakım notları", enabled: false },
  ],
}

export const userSecurity = {
  passwordTitle: "Şifre değiştir",
  current: "Mevcut şifre",
  next: "Yeni şifre",
  confirm: "Yeni şifre tekrar",
  save: "Şifreyi güncelle",
  accountTitle: "Hesap işlemleri",
  pauseTitle: "Hesabı durdur",
  pauseHint: "Giriş kapanır. Hesap daha sonra yeniden açılabilir.",
  pause: "Durdur",
  deleteTitle: "Hesabı sil",
  deleteHint: "Hesap ve bağlı kayıtlar kalıcı olarak silinir.",
  delete: "Hesabı sil",
}

export const userBilling = {
  summaries: [
    {
      label: "Açık bakiye",
      value: "640 TL",
      action: "Ödemeye git",
    },
    {
      label: "Depolama",
      value: "86 GB",
      action: "Ayrıntı",
    },
    {
      label: "Paket",
      value: "Takım",
      action: "Paketi değiştir",
    },
  ],
  methodsTitle: "Ödeme yöntemleri",
  addMethod: "Yeni kart",
  makeDefault: "Varsayılan yap",
  edit: "Düzenle",
  defaultBadge: "Varsayılan",
  methods: [
    { brand: "Troy", detail: "9792 06•• •••• 4412", isDefault: true },
    { brand: "Visa", detail: "4532 18•• •••• 9081", isDefault: false },
    { brand: "Mastercard", detail: "5412 75•• •••• 2260", isDefault: false },
  ],
  historyTitle: "Fatura geçmişi",
  columns: ["Fiş no", "Tarih", "Tutar", "Durum"],
  rows: [
    { id: "FT-20418", date: "12.03.2026 14:20", price: "128 TL", status: "pending" },
    { id: "FT-19802", date: "02.02.2026 09:05", price: "96 TL", status: "paid" },
    { id: "FT-18755", date: "18.12.2025 16:40", price: "210 TL", status: "paid" },
    { id: "FT-17610", date: "03.11.2025 11:15", price: "54 TL", status: "cancelled" },
  ],
  statusLabel: {
    pending: "Bekliyor",
    paid: "Ödendi",
    cancelled: "İptal",
  },
} as const
