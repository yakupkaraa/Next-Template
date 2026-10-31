import type { ContentLocale } from "@/lib/i18n"

export const profileFormCopy = {
  tr: {
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
        hint: "Dil ve saat dilimi.",
      },
      account: {
        title: "Hesap özeti",
        hint: "Bu alanlar yalnızca yöneticiler tarafından değiştirilebilir.",
      },
    },
    phoneOptional: "Telefon (opsiyonel)",
    noteLabel: "Hakkımda",
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
    saveFailed: "Profil kaydedilemedi. Lütfen tekrar deneyin.",
    formInvalid: "Lütfen gerekli alanları doldurun.",
    roleChip: "Rol",
    avatarTypeError: "Yalnızca PNG, JPEG veya WEBP görseli yükleyebilirsiniz.",
    avatarSizeError: "Görsel en fazla 2 MB olabilir.",
  },
  en: {
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
        hint: "Language and time zone.",
      },
      account: {
        title: "Account summary",
        hint: "These fields can only be changed by administrators.",
      },
    },
    phoneOptional: "Phone (optional)",
    noteLabel: "About",
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
    saveFailed: "Couldn't save your profile. Please try again.",
    formInvalid: "Please fill in the required fields.",
    roleChip: "Role",
    avatarTypeError: "Only PNG, JPEG, or WEBP images are allowed.",
    avatarSizeError: "The image must be 2 MB or smaller.",
  },
} as const

export function getProfileFormCopy(locale: ContentLocale) {
  return profileFormCopy[locale]
}
