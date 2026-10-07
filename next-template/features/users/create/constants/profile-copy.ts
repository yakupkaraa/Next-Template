import type { ContentLocale } from "@/lib/i18n"

export const profileFormCopy = {
  tr: {
    tocTitle: "İçindekiler",
    accountSummary: "Hesap özeti",
    sections: {
      personal: {
        title: "Kişisel bilgiler",
        hint: "Adınız ve profil kartında görünen kısa açıklama.",
      },
      contact: {
        title: "İletişim",
        hint: "E-posta ve telefon bilgilerinizi güncel tutun.",
      },
      org: {
        title: "Kurumsal",
        hint: "Şirket ve ekip bilgileri.",
      },
      prefs: {
        title: "Tercihler",
        hint: "Dil, saat dilimi ve görünürlük.",
      },
      account: {
        title: "Hesap özeti",
        hint: "Bu alanlar yalnızca yöneticiler tarafından değiştirilebilir.",
      },
    },
    phoneOptional: "Telefon (opsiyonel)",
    noteLabel: "Hakkımda",
    noteHint: "Kullanıcı kartında kısa açıklama olarak görünür",
    cityDisabledHint: "Önce ülke seç",
    placeholders: {
      city: "Şehir ara…",
      department: "Departman ara…",
      title: "Ünvan ara…",
      team: "Takım ara…",
      manager: "Yönetici ara…",
      select: "Seçin",
    },
    empty: "Sonuç yok",
    requiredError: "Bu alan zorunlu.",
    emailError: "Geçerli bir e-posta adresi girin.",
    saved: "Profil bilgilerin güncellendi",
    saving: "Kaydediliyor…",
    roleChip: "Rol",
  },
  en: {
    tocTitle: "On this page",
    accountSummary: "Account summary",
    sections: {
      personal: {
        title: "Personal details",
        hint: "Your name and the short description shown on the profile card.",
      },
      contact: {
        title: "Contact",
        hint: "Keep your email and phone number up to date.",
      },
      org: {
        title: "Organization",
        hint: "Company and team details.",
      },
      prefs: {
        title: "Preferences",
        hint: "Language, time zone and visibility.",
      },
      account: {
        title: "Account summary",
        hint: "These fields can only be changed by administrators.",
      },
    },
    phoneOptional: "Phone (optional)",
    noteLabel: "About",
    noteHint: "Shown as a short description on the user card",
    cityDisabledHint: "Select a country first",
    placeholders: {
      city: "Search city…",
      department: "Search department…",
      title: "Search title…",
      team: "Search team…",
      manager: "Search manager…",
      select: "Select",
    },
    empty: "No results",
    requiredError: "This field is required.",
    emailError: "Enter a valid email address.",
    saved: "Your profile was updated",
    saving: "Saving…",
    roleChip: "Role",
  },
} as const

export function getProfileFormCopy(locale: ContentLocale) {
  return profileFormCopy[locale]
}
