# Next Template

Dashboard şablonu. Türkçe `/tr`, İngilizce `/en` altındadır. Giriş yapmayan kullanıcı yalnızca giriş sayfasını görür.

```bash
npm install
npm run dev
```

## Dosya yapısı

```text
app/
  layout.tsx
  globals.css
  [locale]/
    layout.tsx
    login/page.tsx          giriş yokken tek açık sayfa
    not-found.tsx
    (dashboard)/            girişten sonra
      layout.tsx
      page.tsx
      list/ list/[id]/ settings/ profile/
components/
  layout/
    header/header.tsx       menüyü sidebar/menu-items.ts dosyasından okur
    footer/                 footer.tsx, content.ts
    sidebar/                sidebar.tsx, menu-items.ts
  theme/theme.tsx            renk, açık/koyu, yerleşim, yazı tipi
  ui/                       shadcn parçaları
lib/
  site.ts                   ad, açıklama, menü
  session.ts                giriş ve çıkış
  paths.ts                  adres karşılıkları
  messages/tr.ts
  messages/en.ts
  blog.ts
  records.ts
proxy.ts
public/
```

Dosya adları İngilizcedir. `(dashboard)` adreste görünmez. Giriş, `session` çerezini yazar; çerez yoksa diğer adresler `/login` sayfasına döner.

## Özelleştirme

Kurum adı, kısa açıklama ve menü `lib/site.ts` içindedir. Örnek ad **Site Adı**dır.

Renk, açık/koyu, yerleşim ve yazı tipi `components/theme/theme.tsx` içindedir. Seçim ziyaretçinin tarayıcısında durur.

Renkler lacivert, mavi, yeşil, turuncu ve mordur. Varsayılan laciverttir. Yeni renk `globals.css` içindeki listeye eklenir. Yazı tipi listesi boştur; eklenene kadar Geist kullanılır.

Yeni bir sayfa her iki dilde de açılır. Ortak buton, form, kart ve tablo `components/ui` altındadır.
