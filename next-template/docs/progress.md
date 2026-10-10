# Yapı Düzenleme İlerlemesi

> Güncelleme: 2026-10-10

## Ortak Adım

| # | Görev | Durum |
|---|---|---|
| CA-1 | `features/blog/blog.ts` sil | ✅ |
| CA-2 | `SettingsPanel` → `components/theme/`, `data.ts` → `lib/theme/settings-options.ts` | ✅ |
| CA-3 | `sidebar.tsx` ticket import ihlalini gider — props chain + `lib/mock-session.ts` | ✅ |

## Feature Adımları

| Feature | Görev | Durum |
|---|---|---|
| settings | CA-2 sonrası `features/settings/` silindi (KG-1: A) | ✅ |
| dashboard | `charts/` → `components/` (KG-3: A) | ✅ |
| insights | `charts/` → `components/` (KG-3: A) | ✅ |
| users | `actions.ts` yerinde kalsın (KG-4: C) | ✅ |
| ai-chat | Uyumlu, işlem yok | ✅ |
| auth | Uyumlu, işlem yok | ✅ |
| blog | CA-1 sonrası temiz | ✅ |
| list | Uyumlu (stub, kasıtlı), işlem yok | ✅ |
| profile | Uyumlu, işlem yok | ✅ |
| ticket | CA-3 sonrası temiz (import ihlali giderildi) | ✅ |

## Efsane
- ⏳ bekliyor
- 🔄 uygulandı — onay bekliyor
- ✅ onaylandı / işlem yok
- ❌ reddedildi
